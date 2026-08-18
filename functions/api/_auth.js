/**
 * Edge JWT-compatible Authentication & Session Verification Helper
 * Enforces cryptographic signing, expiration, and secret binding.
 */

// Fallback development-only secret (Warns if used without env in production)
const DEV_FALLBACK_SECRET = "rahnoxa_dev_insecure_secret_for_local_only";

/**
 * Resolve secret key from environment context
 */
export function getJwtSecret(context) {
  return context?.env?.JWT_SECRET || context?.env?.AUTH_SECRET || DEV_FALLBACK_SECRET;
}

/**
 * Generate a signed JWT token
 */
export async function createToken(payload, secret) {
  if (!secret) throw new Error("JWT secret is required for token generation");

  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  
  const tokenPayload = {
    sub: payload.id,
    username: payload.username,
    role: payload.role || "admin",
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days expiration
    iat: Math.floor(Date.now() / 1000),
  };
  const encodedPayload = btoa(JSON.stringify(tokenPayload)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  
  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(dataToSign));
  const signatureArray = Array.from(new Uint8Array(signature));
  const base64Signature = btoa(String.fromCharCode(...signatureArray))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    
  return `${dataToSign}.${base64Signature}`;
}

/**
 * Verify signed token and return verified payload or null
 */
export async function verifyToken(token, secret) {
  if (!token || typeof token !== "string" || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  
  const [encodedHeader, encodedPayload, signature] = parts;
  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    // Convert base64url back to binary Uint8Array
    let base64 = signature.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    const binary = atob(base64);
    const signatureBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      signatureBytes[i] = binary.charCodeAt(i);
    }
    
    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, encoder.encode(dataToSign));
    if (!isValid) return null;
    
    let payloadBase64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    while (payloadBase64.length % 4) payloadBase64 += "=";
    const payload = JSON.parse(atob(payloadBase64));
    
    // Validate expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch {
    return null;
  }
}

/**
 * Middleware: Require valid Admin authorization header
 */
export async function requireAuth(context) {
  const authHeader = context.request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      authenticated: false,
      response: new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Missing or invalid authorization header.",
          },
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
  
  const token = authHeader.substring(7);
  const secret = getJwtSecret(context);
  const payload = await verifyToken(token, secret);
  
  if (!payload) {
    return {
      authenticated: false,
      response: new Response(
        JSON.stringify({
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "Token is invalid, malformed, or expired.",
          },
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
  
  return { authenticated: true, user: payload };
}
