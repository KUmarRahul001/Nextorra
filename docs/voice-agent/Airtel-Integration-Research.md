# Airtel Xstream Fiber Landline Integration Research

**Date**: 2026-08-20  
**Target**: Connecting Rahnoxa's Rishima AI Voice Agent to Existing Airtel Fiber Landline

---

## 1. RESEARCH SUMMARY & TELEPHONY ARCHITECTURE

| Component / Interface | Verification Status | Official Reality / Findings |
| :--- | :---: | :--- |
| **Airtel Residential Landline** | **VoIP via Fiber (ONT)** | Airtel delivers consumer landline over a dedicated voice VLAN (SIP) locked inside the optical router. |
| **SIP Credentials Exposure** | ❌ **NOT PROVIDED TO CONSUMERS** | Residential Airtel plans do not officially provide SIP username, password, or registrar endpoints to users. |
| **Physical Router Port** | ✅ **RJ-11 Analog FXS Port** | The router has a physical `PHONE` / `TEL1` (RJ-11) port intended for an ordinary analog telephone instrument. |
| **Analog-to-Asterisk Gateway** | ✅ **FXO Gateway Required** | Because the router's port acts as **FXS** (providing dial tone), the gateway connected to it must be an **FXO Gateway** (e.g., Grandstream HT813, HT801+FXO, or Dinstar DAG1000). |
| **Airtel Business Alternative** | ✅ **Official SIP Trunking** | Airtel Business provides dedicated multi-channel SIP Trunks with official registration credentials, static IP binding, and SLA. |

---

## 2. THE THREE AIRTEL ARCHITECTURAL OPTIONS

```text
========================================================================
OPTION A: Direct SIP Credentials (Residential) — ❌ NOT OFFICIALLY SUPPORTED
========================================================================
Airtel Fiber ONT (VoIP VLAN) ➔ [Locked Credentials] ➔ Asterisk
• Status: Unofficial ONT config extraction or packet sniffing required.
• Risk: Breaks on remote TR-069 firmware updates / voids ISP terms.

========================================================================
OPTION B: Hardware FXO Bridge (Residential Landline) — ✅ VERIFIED WORKING
========================================================================
Airtel Fiber Router (PHONE / FXS Port)
           │ (RJ-11 Analog Telephone Cable)
           ▼
     FXO VoIP Gateway (e.g. Grandstream HT813 / Dinstar)
           │ (Ethernet / SIP over Local LAN)
           ▼
   Asterisk PBX / LiveKit SIP (Local Server)
           │
           ▼
     Rishima AI Voice Agent (Faster-Whisper + Ollama + Kokoro)

• Status: 100% legal, uses standard analog telephone interface.
• Cost: One-time hardware (FXO Gateway ~$40-$80) + ₹0 ongoing software license.

========================================================================
OPTION C: Airtel Business SIP Trunk — ✅ ENTERPRISE GRADE
========================================================================
Airtel Business Cloud SIP ➔ Direct IP/SIP Trunk ➔ Asterisk ➔ Rishima
• Status: Provides multi-channel concurrent dialing and official DLT headers.
• Cost: Billed under Airtel Enterprise billing.
========================================================================
```

---

## 3. HARDWARE SPECIFICATION (OPTION B)

### How the FXS/FXO Relationship Works:
1. **Airtel ONT Router Phone Jack = FXS (Foreign eXchange Station)**:
   - It supplies battery voltage, ring current, and dial tone (where you normally plug a landline receiver).
2. **Gateway Port = FXO (Foreign eXchange Office)**:
   - It acts like a phone receiver, capturing dial tone and audio from the Airtel router and converting it into two-way SIP/RTP packets for Asterisk.

### ⚠️ DO NOT PURCHASE HARDWARE YET:
Before buying an FXO gateway, we need to inspect your exact Airtel router model to confirm whether it has an active **RJ-11 PHONE port** on the back panel.
