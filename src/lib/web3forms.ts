/**
 * Sends a lead to Web3Forms, which emails it to hello@chamod.digital.
 * The access key is public by design (Web3Forms keys are meant for client-side forms).
 * Change it only here.
 */
export const WEB3FORMS_ACCESS_KEY = "8b738c71-62fe-48e1-8021-8452d46f2a27";

export interface LeadResult {
  ok: boolean;
  message: string;
}

export async function sendLead(
  subject: string,
  fields: Record<string, string | number | undefined>,
  options: { fromName?: string; replyTo?: string; botcheck?: boolean } = {}
): Promise<LeadResult> {
  // Honeypot: real people never tick the hidden field.
  if (options.botcheck) return { ok: true, message: "ok" };

  const payload: Record<string, unknown> = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject,
    from_name: options.fromName || "chamod.digital website",
    page: typeof window !== "undefined" ? window.location.href : "",
  };
  if (options.replyTo) payload.replyto = options.replyTo;
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== "") payload[k] = v;
  });

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success !== false) return { ok: true, message: data.message || "Sent" };
    return { ok: false, message: data.message || `Request failed (${res.status})` };
  } catch {
    return { ok: false, message: "Network error" };
  }
}
