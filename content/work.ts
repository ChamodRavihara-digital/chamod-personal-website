export interface CaseStudyMetric {
  value: string;
  label: string;
  detail?: string;
}

export interface CaseStudyQuote {
  text: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: "E-commerce" | "Lead generation" | "Brand" | "Tracking" | "Video";
  industry: string;
  market: string;
  channels: string[];
  period: string;
  role: string;
  featured: boolean;
  order: number;
  cover: string;
  headlineMetric: {
    value: string;
    label: string;
  };
  metrics: CaseStudyMetric[];
  quote: CaseStudyQuote | null;
  sections: {
    challenge?: string;
    strategy?: string;
    execution?: string;
    results?: string;
    next?: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "anythingatsupun-meta-ads",
    title: "Full-funnel Meta for a Sri Lankan e-commerce store",
    client: "anythingatsupun.lk",
    category: "E-commerce",
    industry: "E-commerce retail",
    market: "Sri Lanka",
    channels: ["Meta Ads"],
    period: "TODO",
    role: "Head of Digital Marketing (in-house)",
    featured: true,
    order: 1,
    cover: "/images/work/anythingatsupun/cover.jpg",
    headlineMetric: { value: "3.2×", label: "ROAS" },
    metrics: [
      { value: "3.2×", label: "ROAS", detail: "TODO: from X× over [period]" },
      { value: "+64%", label: "Revenue", detail: "TODO" },
      { value: "−38%", label: "CPA", detail: "TODO" },
    ],
    quote: null,
    sections: {
      challenge: "TODO",
      strategy: "A full-funnel Meta strategy built from scratch: cold-audience prospecting, warm retargeting and cart-abandonment recovery.",
      execution: "TODO",
      results: "TODO",
      next: "TODO",
    },
  },
  {
    slug: "apex-lk-ecommerce-tracking",
    title: "Setting up tracking to scale an online store",
    client: "Apex.lk",
    category: "Tracking",
    industry: "E-commerce",
    market: "Sri Lanka",
    channels: ["Meta Ads"],
    period: "TODO",
    role: "Performance marketing and tracking",
    featured: true,
    order: 2,
    cover: "/images/work/apex/cover.jpg",
    headlineMetric: { value: "4.1×", label: "ROAS" },
    metrics: [
      { value: "4.1×", label: "ROAS", detail: "TODO" },
      { value: "+78%", label: "Orders", detail: "TODO" },
    ],
    quote: null,
    sections: {
      challenge: "TODO",
      strategy: "An end-to-end e-commerce performance setup: full Conversions API implementation, catalogue creation and dynamic ad deployment.",
      execution: "TODO",
      results: "TODO",
      next: "TODO",
    },
  },
  {
    slug: "university-lead-generation",
    title: "Lead ads that halved the cost per lead",
    client: "TODO: university name or 'International university'",
    category: "Lead generation",
    industry: "Higher education",
    market: "TODO",
    channels: ["Meta Lead Ads"],
    period: "TODO",
    role: "Performance marketing",
    featured: true,
    order: 3,
    cover: "/images/work/university/cover.jpg",
    headlineMetric: { value: "−52%", label: "Cost per lead" },
    metrics: [
      { value: "−52%", label: "Cost per lead", detail: "TODO" },
      { value: "4×", label: "Leads", detail: "TODO" },
    ],
    quote: null,
    sections: {
      challenge: "TODO",
      strategy: "A lead-generation campaign targeting prospective international university students, using Meta Lead Ads with a multi-step form.",
      execution: "TODO",
      results: "TODO",
      next: "TODO",
    },
  },
  {
    slug: "jayaratna-group-awareness-sales",
    title: "Awareness and sales in one campaign",
    client: "Jayaratna Group",
    category: "Brand",
    industry: "Diversified business group",
    market: "Sri Lanka",
    channels: ["Meta Ads"],
    period: "TODO",
    role: "Performance marketing",
    featured: false,
    order: 4,
    cover: "/images/work/jayaratna/cover.jpg",
    headlineMetric: { value: "+95%", label: "Sales" },
    metrics: [
      { value: "+95%", label: "Sales", detail: "TODO" },
      { value: "2.8×", label: "ROAS", detail: "TODO" },
    ],
    quote: null,
    sections: {
      challenge: "TODO",
      strategy: "A dual-objective campaign combining brand awareness with direct sales conversion for a diversified business group, using custom audiences.",
      execution: "TODO",
      results: "TODO",
      next: "TODO",
    },
  },
  {
    slug: "supun-group-brand-awareness",
    title: "Awareness for a diversified group of companies",
    client: "Supun Group of Companies",
    category: "Brand",
    industry: "Diversified group",
    market: "Sri Lanka",
    channels: ["Meta Ads"],
    period: "TODO",
    role: "Head of Digital Marketing (in-house)",
    featured: false,
    order: 5,
    cover: "/images/work/supun-group/cover.jpg",
    headlineMetric: { value: "+120%", label: "Reach" },
    metrics: [
      { value: "+120%", label: "Reach", detail: "TODO" },
      { value: "+85%", label: "Engagement", detail: "TODO" },
    ],
    quote: null,
    sections: {
      challenge: "TODO",
      strategy: "A multi-platform brand awareness strategy for a diversified group, using Meta reach and frequency buying.",
      execution: "TODO",
      results: "TODO",
      next: "TODO",
    },
  },
];
