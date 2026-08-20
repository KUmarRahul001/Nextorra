# RahBot Automated & Manual QA Suite

## 1. Quick Verification Command
```bash
# Verify backend chat endpoint
curl -i -X POST "http://localhost:10000/v1/chat" \
  -H "Content-Type: application/json" \
  -d '{"message":"Can you build a custom ERP system?"}'

# Verify production build
npm run build
```

## 2. Test Coverage Matrix
- **Greetings & Polite Conversational Closures**: PASS
- **14 Commercial Services Spectrum**: PASS
- **Pricing & Tier Breakdowns**: PASS
- **Context Preservation & Topic Switching**: PASS
- **Enquiry Submission & Form Actions**: PASS
- **Internship Guidance**: PASS
- **Safety & Injection Refusal**: PASS
