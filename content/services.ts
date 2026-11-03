export const services = [
  {
    n: "01",
    slug: "paid-media",
    title: "Paid media",
    subtitle: "Meta, Google and TikTok Ads",
    promise: "Spend that pays back.",
    includes: [
      "Account structure and audiences",
      "Catalogue and dynamic ads, lead forms",
      "Creative testing, scaling and weekly optimisation",
    ],
    proof: { text: "3.2× ROAS for anythingatsupun.lk", href: "/work/anythingatsupun-meta-ads" },
  },
  {
    n: "02",
    slug: "tracking",
    title: "Tracking and measurement",
    subtitle: "Pixel, Conversions API, GA4, GTM",
    promise: "Data you can trust.",
    includes: [
      "Meta Pixel + Conversions API with deduplication",
      "GA4 and Google Tag Manager, server-side tagging",
      "Event match quality, catalogue sync, reporting dashboards",
    ],
    proof: { text: "Full Conversions API setup for Apex.lk — 4.1× ROAS", href: "/work/apex-lk-ecommerce-tracking" },
  },
  {
    n: "03",
    slug: "social",
    title: "Social media management",
    subtitle: "Strategy to reporting",
    promise: "A feed that builds trust.",
    includes: [
      "Strategy and content calendar",
      "Scheduling and community management",
      "Monthly performance reporting",
    ],
    proof: { text: "+85% engagement for Supun Group", href: "/work/supun-group-brand-awareness" },
  },
  {
    n: "04",
    slug: "creative",
    title: "Creative and video",
    subtitle: "By SOZO Visuals",
    promise: "Creative that stops the scroll.",
    includes: [
      "Reels and short-form edits",
      "Product videos",
      "Ad creative variants for testing",
    ],
    proof: { text: "Watch the SOZO reel", href: "/sozo-visuals" },
  },
];

export const addOn = {
  title: "Add-on: landing pages and store setup",
  line: "Landing pages built to convert, plus WooCommerce and Shopify tracking setups.",
};

export const engagementModels = [
  {
    name: "Audit",
    for: "Brands unsure why ads underperform",
    what: "One-off tracking and account audit, a prioritised fix list and a 60-minute walkthrough.",
    price: null,
  }, // TODO optional fixed price, e.g. "From $X"
  {
    name: "Launch",
    for: "New accounts or relaunches",
    what: "Tracking setup plus the first 90 days of campaigns.",
    price: null,
  },
  {
    name: "Scale",
    for: "Brands already selling",
    what: "Monthly retainer: optimisation, creative testing and a monthly report.",
    price: null,
  },
  {
    name: "Creative add-on",
    for: "Any of the above",
    what: "A monthly video and creative package from SOZO Visuals.",
    price: null,
  },
];

export const process = [
  { step: "Audit", line: "Find what's broken in your tracking and ad accounts." },
  { step: "Fix tracking", line: "Pixel, Conversions API and GA4 set up so every sale is counted." },
  { step: "Launch", line: "Campaigns built on clean data and tested creative." },
  { step: "Scale", line: "Budget moves to what works, week by week." },
  { step: "Report", line: "One clear monthly report: what happened, why, and what's next." },
];
