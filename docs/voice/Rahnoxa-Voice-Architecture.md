# Rahnoxa Open-Source Zero-License-Cost AI Voice Agent Architecture

This document specifies the end-to-end, 100% self-hosted, zero-subscription AI Voice Calling Agent pipeline for Rahnoxa.

---

## 1. High-Level Architecture Overview

```text
                           RAHNOXA ADMIN CONSOLE
                        (http://localhost:5173/admin/leads)
                                  │
                          Select Lead & Click
                            [ 🎙️ AI Call ]
                                  │
                                  ▼
                     RAHNOXA CALL ORCHESTRATOR
                     (backend/src/services/call.service.js)
                                  │
                                  ▼
                ┌───────────────────────────────────┐
                │       LIVEKIT AGENT PIPELINE      │
                │        (Self-Hosted LiveKit)      │
                └─────────────────┬─────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
  [ OPEN-SOURCE STT ]     [ SELF-HOSTED LLM ]     [ OPEN-SOURCE TTS ]
    Faster-Whisper             Ollama / vLLM          Kokoro-82M / Piper
   (Local GPU / CPU)       (Llama-3.1 / Qwen-2.5)      (<150ms Latency)
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                                  ▼
                       TWO-WAY AUDIO STREAM
                    (LiveKit Room / SIP Trunk)
                                  │
                                  ▼
                         PROSPECT / CLIENT
                                  │
                                  ▼
                      POST-CALL INTELLIGENCE
                (Transcript + AI Analysis Engine)
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
    Lead Scoring             Extracted Budget       Requirement Scope
 (0–100 Hot/Warm/Cold)      (INR / Package Tier)   (ERP, Web, Mobile, etc.)
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                                  ▼
                        DATABASE / SUPABASE
                     (Table: `voice_call_logs`)
                                  │
                                  ▼
                        ADMIN LEADS VIEW
                   (Full Audio & Transcript Modal)
```

---

## 2. Zero-License-Cost Component Breakdown

| Layer | Open-Source / Self-Hosted Solution | License | Cost |
| :--- | :--- | :--- | :---: |
| **Real-time WebRTC / Voice Server** | **LiveKit Server (Self-Hosted)** | Apache 2.0 | **₹0** |
| **Agent Orchestration Framework** | **LiveKit Agents SDK (Python/Node)** | Apache 2.0 | **₹0** |
| **Speech-to-Text (STT)** | **Faster-Whisper / Whisper.cpp** | MIT | **₹0** |
| **Brain / Conversation LLM** | **Ollama / vLLM (Llama 3.1 8B / Qwen 2.5 7B)** | Apache 2.0 | **₹0** |
| **Text-to-Speech (TTS)** | **Kokoro-82M / Piper TTS** | Apache 2.0 / MIT | **₹0** |
| **Database & Analytics** | **Supabase (Self-Hosted / PostgreSQL)** | Apache 2.0 | **₹0** |
| **Telephony / SIP Gateway** | **Asterisk / FreeSWITCH / LiveKit SIP** | GPLv2 / MPL | **₹0** (PSTN usage billed at raw wholesale carrier rates e.g. Twilio Elastic SIP / Tata SIP) |

---

## 3. LiveKit Agents Voice Script Template (`voice_agent.py`)

```python
"""
Rahnoxa Voice Assistant: Open-Source Zero-License Real-Time Voice Agent
Built on LiveKit Agents, Faster-Whisper, Ollama (Llama 3.1), and Kokoro TTS.
"""

import asyncio
from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
from livekit.agents.voice_assistant import VoiceAssistant
from livekit.plugins import openai, silero

# 1. System Prompt with Rahnoxa Engineering & Pricing Knowledge
RAHNOXA_VOICE_SYSTEM_PROMPT = """
You are RahBot Voice, the senior technical qualification specialist at Rahnoxa (an Indian software engineering firm).
Your mission is to conduct a friendly, professional, 2-minute discovery call with a potential client who submitted an enquiry.

Key Guidelines:
1. Speak concisely in natural spoken English with a warm, professional tone.
2. Ask one question at a time.
3. Clarify their primary requirement (Custom ERP, Full-Stack Web App, Mobile App, SaaS, or API Integration).
4. Understand their target timeline (e.g., 2–4 weeks, within 1 month).
5. Mention Rahnoxa's milestone delivery model (50% start, 50% handover) and 30-Day Post-Launch Bug Warranty.
6. Reassure them that a senior software architect will follow up within 24 to 48 hours.
"""

async def entrypoint(ctx: JobContext):
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    # 2. Local Open-Source Voice Pipeline Setup
    # - VAD: Silero (Local)
    # - STT: Local Faster-Whisper
    # - LLM: Local Ollama endpoint (http://localhost:11434/v1)
    # - TTS: Local Kokoro / Piper audio engine
    assistant = VoiceAssistant(
        vad=silero.VAD.load(),
        stt=openai.STT(base_url="http://localhost:8000/v1", model="whisper-large-v3-turbo"),
        llm=openai.LLM(base_url="http://localhost:11434/v1", model="llama3.1:8b"),
        tts=openai.TTS(base_url="http://localhost:8880/v1", model="kokoro"),
        system_message=RAHNOXA_VOICE_SYSTEM_PROMPT,
    )

    # 3. Start Call with Personalized Greeting
    assistant.start(ctx.room)
    await assistant.say("Hi! This is RahBot calling from Rahnoxa. I noticed you recently enquired about our software development services. Do you have two minutes to discuss your project scope?", allow_interruptions=True)

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
```

---

## 4. Telephony & Deployment Strategy
- **Docker Compose Deployment**:
  - `livekit/livekit-server`: Real-time WebRTC audio transport.
  - `ollama/ollama`: Local model weights.
  - `hexgrad/kokoro-fastapi`: Ultra-fast (<150ms) neural speech synthesis.
  - `fedirz/faster-whisper-server`: OpenAI-compatible local STT endpoint.
- **PSTN / Mobile Dialing**:
  - Point LiveKit SIP Dispatcher directly to any standard low-cost SIP trunk (e.g. Airtel Enterprise SIP, Tata Tele Business, or Twilio Programmable Voice SIP) paying only local telecom terminating minutes (~₹0.30 - ₹0.60/min) with **₹0 platform markup**.
