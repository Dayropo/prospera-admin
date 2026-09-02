export async function generateSignature(
  method: string,
  url: string,
  apiSecret: string,
): Promise<{ signature: string; timestamp: string }> {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const payload = `${timestamp}.${method}.${url}`

  const enc = new TextEncoder()
  const key = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(apiSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signatureBuffer = await window.crypto.subtle.sign("HMAC", key, enc.encode(payload))
  const signature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
  return { signature, timestamp }
}
