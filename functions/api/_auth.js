/**
 * Edge JWT-compatible Authentication & Session Verification Helper
 */

const AUTH_SECRET = "rahnoxa_jwt_secret_production_key_2025";

/**
 * Generate a signed JWT-like token
 */
export async function createToken(payload, secret = AUTH_SECRET) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  
  const tokenPayload = {
    ...payload,
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
 * Verify signed token and return payload or null
 */
export async function verifyToken(token, secret = AUTH_SECRET) {
  if (!token || typeof token !== "string") return null;
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
    
    // Convert base64url back to Uint8Array
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
    
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    
    return payload;
  } catch {
    return null;
  }
}

/**
 * Middleware to require valid Admin authentication header
 */
export async function requireAuth(context) {
  const authHeader = context.request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      authenticated: false,
      response: new Response(
        JSON.stringify({ error: "Unauthorized: Missing or invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
  
  const token = authHeader.substring(7);
  const secret = context.env?.AUTH_SECRET || AUTH_SECRET;
  const payload = await verifyToken(token, secret);
  
  if (!payload) {
    return {
      authenticated: false,
      response: new Response(
        JSON.stringify({ error: "Unauthorized: Token invalid or expired" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
  
  return { authenticated: true, user: payload };
}
