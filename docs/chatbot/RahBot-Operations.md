# RahBot Operations & Runbook

## 1. Health & Status Endpoints
- **Service Health**: `GET /health`
- **Database Status**: `GET /health/database`
- **AI Gateway Status**: `GET /health/ai`

## 2. Troubleshooting & Incident Recovery
### Symptom: Bot hangs or displays "..."
1. **Check Backend Process**: `ss -tulpn | grep 10000`
2. **Direct API Verification**:
   ```bash
   curl -i -X POST "http://localhost:10000/v1/chat" -H "Content-Type: application/json" -d '{"message":"Hello"}'
   ```
3. **Restart API Service**: `node backend/server.js &`
4. **Client-side Fallback**: The client contains an active 10s AbortController timeout that automatically engages the local rule engine if the backend is unreachable.

## 3. Rollback Procedure
1. Identify previous stable commit: `git log -n 5`
2. Rollback codebase: `git revert <commit_hash>` or `git checkout <commit_hash>`
3. Build verification: `npm run build`
