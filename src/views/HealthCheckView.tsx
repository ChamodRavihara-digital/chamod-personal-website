import React, { useMemo, useRef, useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { site } from "../../content/site";
import { questions, scoredQuestions, maxScore, bandFor, Area } from "../../content/healthCheck";
import { Button } from "../components/Button";
import { sendLead } from "../lib/web3forms";
import { track } from "../lib/analytics";

interface HealthCheckViewProps {
  onNavigate: (href: string) => void;
}

type Answers = Record<string, string>;

const fieldClass =
  "w-full rounded-[12px] border border-[#86868b] bg-white px-4 py-3.5 text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:focus:outline-none focus-visible:outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/20 transition-shadow";
const labelClass = "block text-[14px] font-semibold text-[#1d1d1f] mb-2";

export const HealthCheckView: React.FC<HealthCheckViewProps> = ({ onNavigate }) => {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Lead form
  const [lead, setLead] = useState({ name: "", email: "", whatsapp: "", website: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [botcheck, setBotcheck] = useState(false);

  // Move focus to the new heading when the step changes (helps keyboard & screen-reader users)
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage, step]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  const result = useMemo(() => {
    const areas: { area: Area; points: number }[] = [];
    const fixes: { area: Area; text: string; lost: number }[] = [];
    let score = 0;
    scoredQuestions.forEach((q) => {
      const opt = q.options.find((o) => o.id === answers[q.id]);
      const pts = opt?.points ?? 0;
      score += pts;
      areas.push({ area: q.area!, points: pts });
      if (opt?.fix) fixes.push({ area: q.area!, text: opt.fix, lost: 25 - pts });
    });
    fixes.sort((a, b) => b.lost - a.lost);
    const pct = Math.round((score / maxScore) * 100);
    return { score: pct, areas, fixes, band: bandFor(pct) };
  }, [answers]);

  const answerLabel = (qid: string) =>
    questions.find((q) => q.id === qid)?.options.find((o) => o.id === answers[qid])?.label ?? "—";

  const choose = (qid: string, oid: string) => {
    setAnswers((a) => ({ ...a, [qid]: oid }));
    // short pause so the selection is visible, then advance
    setTimeout(() => {
      if (step < questions.length - 1) setStep((s) => s + 1);
      else {
        setStage("result");
        track("health_check_complete");
      }
    }, 220);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setSent(false);
    setError("");
    setStage("quiz");
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    const fields: Record<string, string | number> = {
      name: lead.name,
      email: lead.email,
      WhatsApp: lead.whatsapp,
      Website: lead.website,
      "Health score": `${result.score} / 100 — ${result.band.title}`,
      "Lead source": "Ad Health Check",
    };
    questions.forEach((q) => (fields[q.question] = answerLabel(q.id)));
    const res = await sendLead(`Ad Health Check: ${lead.name} scored ${result.score}/100`, fields, {
      fromName: "chamod.digital — Ad Health Check",
      replyTo: lead.email,
      botcheck,
    });
    setSending(false);
    if (res.ok) {
      setSent(true);
      track("generate_lead", { lead_source: "ad_health_check", health_score: result.score });
    }
    else setError("Sorry — that didn't send. Please try again, or send your score on WhatsApp.");
  };

  const whatsappHref = `${site.whatsapp}?text=${encodeURIComponent(
    `Hi Chamod, I just took the Ad Health Check and scored ${result.score}/100 (${result.band.title.replace(".", "")}). Can you help me fix it?`
  )}`;

  /* ---------------- Intro ---------------- */
  if (stage === "intro") {
    return (
      <main className="w-full pt-[52px]">
        <section className="bg-[#f5f5f7] text-center min-h-[calc(100vh-52px)] flex items-center py-20">
          <div className="ap-wrap">
            <p className="ap-eyebrow text-[#bf4800] mb-3">Free · 5 questions · 1 minute</p>
            <h1 ref={headingRef} tabIndex={-1} className="ap-hero mx-auto max-w-[13ch] focus:outline-none focus-visible:outline-none">
              How healthy are your ads?
            </h1>
            <p className="ap-sub text-[#424245] mt-6 mx-auto max-w-[34ch]">
              Answer five quick questions and get a score out of 100, plus the three fixes that will make the biggest
              difference to your results.
            </p>
            <div className="mt-10">
              <Button size="lg" onClick={() => setStage("quiz")}>
                Start the health check
              </Button>
            </div>
            <ul className="mt-14 flex flex-wrap justify-center gap-3 text-[15px] text-[#1d1d1f]">
              {["Tracking", "Creative", "Retargeting", "Campaign setup"].map((a) => (
                <li key={a} className="rounded-full bg-white px-5 py-2.5">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    );
  }

  /* ---------------- Quiz ---------------- */
  if (stage === "quiz") {
    const q = questions[step];
    const progress = (step / questions.length) * 100;
    return (
      <main className="w-full pt-[52px]">
        <section className="bg-[#f5f5f7] min-h-[calc(100vh-52px)] pt-10 sm:pt-16 pb-20">
          <div className="max-w-[720px] mx-auto px-[22px]">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => (step === 0 ? setStage("intro") : setStep((s) => s - 1))}
                className="min-h-[44px] inline-flex items-center gap-1.5 text-[15px] text-[#0066cc] hover:underline cursor-pointer"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back
              </button>
              <span className="text-[14px] text-[#6e6e73]">
                Question {step + 1} of {questions.length}
              </span>
            </div>
            <div
              className="mt-3 h-[6px] rounded-full bg-[#e8e8ed] overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={step}
              aria-label="Progress"
            >
              <div className="h-full rounded-full bg-[#0071e3] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <h1
              ref={headingRef}
              tabIndex={-1}
              key={q.id}
              className="mt-12 text-[32px] sm:text-[44px] font-bold tracking-[-0.03em] leading-[1.1] focus:outline-none focus-visible:outline-none animate-fadeIn"
            >
              {q.question}
            </h1>
            {q.help && <p className="mt-3 text-[17px] text-[#6e6e73]">{q.help}</p>}

            <div role="radiogroup" aria-label={q.question} className="mt-9 grid gap-3">
              {q.options.map((o) => {
                const selected = answers[q.id] === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => choose(q.id, o.id)}
                    className={`w-full min-h-[60px] text-left rounded-[16px] px-5 py-4 text-[17px] leading-snug flex items-center justify-between gap-4 transition-all cursor-pointer border-2 ${
                      selected
                        ? "bg-white border-[#0071e3] shadow-[0_6px_20px_rgba(0,113,227,0.15)]"
                        : "bg-white border-transparent hover:border-[#d2d2d7]"
                    }`}
                  >
                    <span>{o.label}</span>
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selected ? "bg-[#0071e3] border-[#0071e3] text-white" : "border-[#d2d2d7]"
                      }`}
                      aria-hidden="true"
                    >
                      {selected && <Check size={14} strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* ---------------- Result ---------------- */
  const { score, band, areas, fixes } = result;
  const r = 88;
  const circ = 2 * Math.PI * r;

  return (
    <main className="w-full pt-[52px]">
      {/* Score */}
      <section className="bg-[#f5f5f7] text-center pt-16 sm:pt-24 pb-20">
        <div className="ap-wrap">
          <p className="ap-eyebrow text-[#6e6e73] mb-6">Your ad health score</p>
          <div className="relative w-[220px] h-[220px] mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90" aria-hidden="true">
              <circle cx="100" cy="100" r={r} fill="none" stroke="#e8e8ed" strokeWidth="14" />
              <circle
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke={band.color}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - score / 100)}
                style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.25,1,.5,1)" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[72px] font-bold tracking-[-0.05em] leading-none tabular-nums">{score}</span>
              <span className="text-[15px] text-[#6e6e73] mt-1">out of 100</span>
            </div>
          </div>
          <h1 ref={headingRef} tabIndex={-1} className="ap-headline mt-10 focus:outline-none focus-visible:outline-none" style={{ color: band.color }}>
            {band.title}
          </h1>
          <p className="ap-sub text-[#424245] mt-4 mx-auto max-w-[34ch]">{band.line}</p>

          {/* Area bars */}
          <ul className="mt-12 max-w-[640px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {areas.map((a) => (
              <li key={a.area} className="rounded-[18px] bg-white px-5 py-4">
                <div className="flex justify-between text-[15px]">
                  <span className="font-semibold">{a.area}</span>
                  <span className="text-[#6e6e73] tabular-nums">{a.points} / 25</span>
                </div>
                <div className="mt-2.5 h-[6px] rounded-full bg-[#e8e8ed] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(a.points / 25) * 100}%`,
                      background: a.points >= 20 ? "#1a9e4b" : a.points >= 12 ? "#0071e3" : "#bf4800",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Fixes */}
      <section className="bg-white ap-section">
        <div className="max-w-[760px] mx-auto px-[22px]">
          <h2 className="ap-title">{fixes.length ? "What to fix first." : "Nothing urgent to fix."}</h2>
          {fixes.length ? (
            <ol className="mt-10 space-y-4">
              {fixes.slice(0, 3).map((f, i) => (
                <li key={f.area} className="rounded-[22px] bg-[#f5f5f7] p-7 flex gap-5">
                  <span className="text-[40px] font-bold tracking-[-0.04em] leading-none text-[#d2d2d7]" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#bf4800]">{f.area}</p>
                    <p className="mt-1.5 text-[19px] leading-[1.45] tracking-[-0.015em]">{f.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-6 text-[19px] text-[#424245]">
              Your foundations look solid. The next step is sharper creative testing and scaling the campaigns that already
              work.
            </p>
          )}
        </div>
      </section>

      {/* Lead capture */}
      <section className="bg-black text-[#f5f5f7] ap-section">
        <div className="max-w-[760px] mx-auto px-[22px]">
          {sent ? (
            <div className="text-center" role="status">
              <div className="w-14 h-14 rounded-full bg-[#0071e3] text-white flex items-center justify-center mx-auto">
                <Check size={28} aria-hidden="true" />
              </div>
              <h2 className="ap-title mt-6">Got it, {lead.name.split(" ")[0]}.</h2>
              <p className="ap-sub text-[#a1a1a6] mt-4 mx-auto max-w-[34ch]">
                I'll review your answers and send a personal fix plan to {lead.email} within 24 hours.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" href={whatsappHref} external>
                  Chat on WhatsApp now
                </Button>
                <Button variant="inverse" onClick={restart}>
                  Retake the check
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="ap-eyebrow text-[#a1a1a6] mb-3">Free personal fix plan</p>
              <h2 className="ap-headline max-w-[16ch]">Want help fixing this?</h2>
              <p className="ap-sub text-[#a1a1a6] mt-4 max-w-[38ch]">
                Send your score and I'll reply within 24 hours with a short, personal plan for your account. No obligation.
              </p>

              <form onSubmit={submitLead} className="mt-10 rounded-[28px] bg-[#f5f5f7] text-[#1d1d1f] p-7 sm:p-9 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="hc-name" className={labelClass}>
                      Your name *
                    </label>
                    <input
                      id="hc-name"
                      required
                      autoComplete="name"
                      value={lead.name}
                      onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="hc-email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      id="hc-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={lead.email}
                      onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="hc-wa" className={labelClass}>
                      WhatsApp number
                    </label>
                    <input
                      id="hc-wa"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+94 7X XXX XXXX"
                      value={lead.whatsapp}
                      onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="hc-site" className={labelClass}>
                      Website or Facebook page
                    </label>
                    <input
                      id="hc-site"
                      placeholder="yourbrand.lk"
                      value={lead.website}
                      onChange={(e) => setLead({ ...lead, website: e.target.value })}
                      className={fieldClass}
                    />
                  </div>
                </div>

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
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                      Send on WhatsApp
                    </a>
                  </div>
                )}

                <Button type="submit" size="lg" disabled={sending} className="w-full">
                  {sending ? "Sending…" : "Send me my fix plan"}
                </Button>
                <p className="text-[13px] text-[#6e6e73] text-center">
                  Your answers are sent to me only. Prefer to chat?{" "}
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-[#0066cc] hover:underline">
                    Message me on WhatsApp
                  </a>
                  .
                </p>
              </form>
            </>
          )}

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[17px]">
            <button type="button" onClick={restart} className="min-h-[44px] text-[#2997ff] hover:underline cursor-pointer">
              Retake the check
            </button>
            <a href="/services" onClick={go("/services")} className="min-h-[44px] inline-flex items-center text-[#2997ff] hover:underline">
              See services ›
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
