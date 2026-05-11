/**
 * Best-effort detection of phone-class browsers from the User-Agent header.
 * Desktop and typical tablet UAs are excluded so /mobile can be gated at the edge.
 * (UAs can be spoofed; this is not a security boundary on its own.)
 */
export function isPhoneUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent || typeof userAgent !== "string") return false;
  const ua = userAgent.trim();
  if (!ua) return false;

  if (/\b(iPad|Tablet|Kindle|Silk|PlayBook)\b/i.test(ua)) return false;

  if (/\biPhone\b|\biPod\b/i.test(ua)) return true;

  if (/\bAndroid\b/i.test(ua)) {
    return /\bMobile\b/i.test(ua);
  }

  if (
    /\bwebOS\b|BlackBerry|BB10|IEMobile|Opera Mini|Opera Mobi|Mobile Firefox\b/i.test(ua)
  ) {
    return true;
  }

  return false;
}
