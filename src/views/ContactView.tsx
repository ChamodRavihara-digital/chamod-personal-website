import React, { useState } from "react";
import { Check } from "lucide-react";
import { site } from "../../content/site";
import { Button, ChevronLink } from "../components/Button";
import { sendLead } from "../lib/web3forms";

interface ContactViewProps {
  onNavigate: (href: string) => void;
}

const emptyForm = {
  name: "",
  email: "",
  brand: "",
  service: "Paid media",
  spend: "Under $2k/mo",
  message: "",
};

const fieldClass =
  "w-full rounded-[12px] border border-[#86868b] bg-white px-4 py-3.5 text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/20 transition-shadow";
const labelClass = "block text-[14px] font-semibold text-[#1d1d1f] mb-2";

export const ContactView: React.FC<ContactViewProps> = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [botcheck, setBotcheck] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await sendLead(
      `New project brief from ${formData.name}`,
      {
        name: formData.name,
        email: formData.email,
        "Brand / website": formData.brand,
        "Needs": formData.service,
        message: formData.message,
        "Lead source": "Contact page",
      },
      { fromName: "chamod.digital — Contact form", replyTo: formData.email, botcheck }
    );
    setLoading(false);
    if (result.ok) setSubmitted(true);
    else setError("Sorry — the message didn't send. Please try again, or message me on WhatsApp.");
  };

  const channels = [
    { k: "Email", v: site.email, href: `mailto:${site.email}`, note: "For briefs, RFPs and client enquiries." },
    { k: "WhatsApp", v: site.phoneDisplay, href: site.whatsapp, note: "Direct line for quick consultations.", external: true },
    { k: "Base", v: site.location },
  ];

  return (
    <main className="w-full pt-[52px]">
      <section className="bg-[#f5f5f7] text-center pt-20 sm:pt-28 pb-16">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#bf4800] mb-3">Contact</p>
          <h1 className="ap-hero mx-auto max-w-[12ch]">Let's grow something.</h1>
          <p className="ap-sub text-[#424245] mt-6 mx-auto max-w-[34ch]">
            Tell me about your ad accounts, tracking challenges and growth goals. You'll get a reply within 24 hours.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-[15px] text-[#1d1d1f]">
            <span className="w-2 h-2 rounded-full bg-[#1a9e4b]" aria-hidden="true" />
            {site.availability}
          </p>
        </div>
      </section>

      <section className="bg-[#f5f5f7] pb-24 sm:pb-32">
        <div className="ap-wrap-wide grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Channels */}
          <div className="lg:col-span-5 rounded-[28px] bg-white p-8 sm:p-10">
            <h2 className="text-[28px] font-bold tracking-[-0.025em]">Reach me directly.</h2>
            <ul className="mt-6 divide-y divide-[#d2d2d7]">
              {channels.map((c) => (
                <li key={c.k} className="py-5">
                  <p className="text-[14px] text-[#6e6e73]">{c.k}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className="mt-1 inline-block text-[21px] sm:text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f] hover:text-[#0066cc] transition-colors break-all"
                    >
                      {c.v}
                    </a>
                  ) : (
                    <p className="mt-1 text-[19px] font-semibold tracking-[-0.02em]">{c.v}</p>
                  )}
                  {c.note && <p className="mt-1 text-[15px] text-[#6e6e73]">{c.note}</p>}
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <ChevronLink href={site.whatsapp} external>
                Start a WhatsApp chat
              </ChevronLink>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 rounded-[28px] bg-white p-8 sm:p-10">
            {submitted ? (
              <div className="py-16 text-center" role="status">
                <div className="w-14 h-14 rounded-full bg-[#0071e3] text-white flex items-center justify-center mx-auto">
                  <Check size={28} aria-hidden="true" />
                </div>
                <h2 className="mt-6 text-[32px] font-bold tracking-[-0.025em]">Brief received.</h2>
                <p className="mt-3 text-[17px] text-[#6e6e73] max-w-[40ch] mx-auto">
                  Thank you. I'll reply within 24 hours to {formData.email || site.email}.
                </p>
                <div className="mt-8">
                  <Button
                    variant="secondaryLight"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData(emptyForm);
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-[28px] font-bold tracking-[-0.025em]">Send a project brief.</h2>
                  <p className="mt-1 text-[15px] text-[#6e6e73]">Fields marked * are required.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Your name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Work email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-brand" className={labelClass}>
                      Brand or website
                    </label>
                    <input
                      id="contact-brand"
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="brand.com"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-service" className={labelClass}>
                      What do you need?
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`${fieldClass} appearance-none pr-10 bg-no-repeat`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236e6e73' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                        backgroundPosition: "right 16px center",
                      }}
                    >
                      <option value="Paid media">Paid media (Meta / Google Ads)</option>
                      <option value="Tracking">Tracking (CAPI / GA4 / GTM)</option>
                      <option value="Social">Social media management</option>
                      <option value="Creative">Creative / video (SOZO Visuals)</option>
                      <option value="Agency retainer">Full agency retainer (WEGOT Digital)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Project details and goals *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Current ad accounts, past ROAS, key challenges…"
                    className={fieldClass}
                  />
                </div>

                {/* Honeypot for spam bots — hidden from people and screen readers */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                  className="hidden"
                />

                {error && (
                  <div role="alert" className="rounded-[14px] bg-[#fff2f0] border border-[#ffd2cc] px-5 py-4 text-[15px] text-[#b3261e]">
                    {error}{" "}
                    <a
                      href={`${site.whatsapp}?text=${encodeURIComponent(
                        `Hi Chamod, I'm ${formData.name}. ${formData.message}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      Send it on WhatsApp instead
                    </a>
                  </div>
                )}

                <Button type="submit" size="lg" disabled={loading} className="w-full">
                  {loading ? "Sending…" : "Submit project brief"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
