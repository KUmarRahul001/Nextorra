# RahBot Architecture & Engineering Specification

## 1. System Architecture

```text
USER INPUT
    ↓
[Message Normalizer] (Trims whitespace, strips control chars, tokenizes)
    ↓
[Conversation Context] (Tracks active serviceId, current intent, previous intent)
    ↓
[Service Resolver] (Matches name, slug, aliases, and contextual topic focus)
    ↓
[Intent Detector] (Contextual multi-factor intent classifier: Service != Enquiry)
    ↓
[Deterministic Knowledge Retriever] (Authoritative data source from RahBot-Knowledge.md)
    ↓
[AI Gateway & Fallback Layer] (Remote LLM with sub-50ms local fallback engine)
    ↓
[CTA & Action Engine] (Non-intrusive action buttons & in-chat project enquiry router)
    ↓
[Renderer Boundary] (FormattedMessage with try/catch plain-text fallback)
```

## 2. API Contract

- **Endpoint**: `POST /v1/chat`
- **Rate Limit**: 30 requests / minute per client IP
- **Payload Max Length**: 1,500 characters
- **Standard Response**:
```json
{
  "success": true,
  "conversation_id": "conv-1787195859500-orwiq",
  "message": {
    "role": "assistant",
    "content": "Markdown formatted string"
  },
  "intent": "erp_query"
}
```
