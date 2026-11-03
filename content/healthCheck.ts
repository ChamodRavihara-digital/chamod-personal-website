/**
 * Ad Health Check — questions, scoring and advice.
 * Each scored question is worth up to 25 points (4 × 25 = 100).
 * The spend question isn't scored; it's context for the lead.
 */

export type Area = "Tracking" | "Creative" | "Retargeting" | "Campaign setup";

export interface Option {
  id: string;
  label: string;
  points: number;
  /** Advice shown when this answer leaves points on the table. */
  fix?: string;
}

export interface Question {
  id: string;
  question: string;
  help?: string;
  area?: Area; // undefined = not scored
  options: Option[];
}

export const questions: Question[] = [
  {
    id: "spend",
    question: "How much do you spend on ads each month?",
    help: "Across Meta, Google and TikTok combined.",
    options: [
      { id: "none", label: "Not running ads yet", points: 0 },
      { id: "lt50", label: "Under LKR 50,000", points: 0 },
      { id: "50-200", label: "LKR 50,000 – 200,000", points: 0 },
      { id: "200-1m", label: "LKR 200,000 – 1,000,000", points: 0 },
      { id: "1m+", label: "Over LKR 1,000,000", points: 0 },
    ],
  },
  {
    id: "pixel",
    question: "Is the Meta Pixel installed on your website?",
    help: "The Pixel tells Meta who bought or enquired, so it can find more people like them.",
    area: "Tracking",
    options: [
      { id: "yes-working", label: "Yes, and purchases or leads show up in Ads Manager", points: 25 },
      {
        id: "yes-unsure",
        label: "Yes, but I'm not sure it's tracking correctly",
        points: 12,
        fix: "Check your Pixel events. If purchases or leads don't match your real sales, Meta is optimising on wrong data. Adding the Conversions API (server-side tracking) recovers sales the browser Pixel misses.",
      },
      {
        id: "no",
        label: "No",
        points: 0,
        fix: "Install the Meta Pixel and Conversions API. Without them Meta can't see who buys, so it can't optimise for sales — you're paying for clicks and reach, not customers.",
      },
      {
        id: "unknown",
        label: "I don't know what that is",
        points: 0,
        fix: "Get tracking set up first. A Pixel + Conversions API setup is the foundation: until it's in place, you can't tell which ads make money and which waste it.",
      },
      {
        id: "no-site",
        label: "I don't have a website",
        points: 10,
        fix: "Without a website, run Lead Form or WhatsApp campaigns and track every enquiry. Measuring cost per lead is how you know which ads are worth scaling.",
      },
    ],
  },
  {
    id: "creative",
    question: "How often do you launch new ad creatives?",
    help: "New images, videos or angles — not just new budgets.",
    area: "Creative",
    options: [
      { id: "weekly", label: "Every week", points: 25 },
      {
        id: "biweekly",
        label: "Every 2–4 weeks",
        points: 18,
        fix: "Test a little faster. Two or three new creatives a week, in different angles and formats, finds winners sooner and keeps costs from creeping up.",
      },
      {
        id: "monthly",
        label: "Every 1–3 months",
        points: 8,
        fix: "Refresh creative more often. Audiences tire of the same ad within weeks; when frequency rises, cost per result rises with it.",
      },
      {
        id: "rarely",
        label: "Rarely — the same ads run for months",
        points: 0,
        fix: "Creative is your biggest lever. Start a simple testing rhythm: new hooks and formats every week or two, then put budget behind the ones that win.",
      },
    ],
  },
  {
    id: "retargeting",
    question: "Do you run retargeting campaigns?",
    help: "Ads shown to people who already visited your site, engaged with your page or added to cart.",
    area: "Retargeting",
    options: [
      { id: "full", label: "Yes — website visitors and social engagers", points: 25 },
      {
        id: "social",
        label: "Only to people who engaged on Facebook or Instagram",
        points: 15,
        fix: "Add website retargeting. People who viewed a product or added to cart are your warmest audience and usually your cheapest sales.",
      },
      {
        id: "unsure",
        label: "Not sure",
        points: 5,
        fix: "Set up a retargeting layer. Most people don't buy on the first visit — reminding warm audiences is usually the highest-return campaign in an account.",
      },
      {
        id: "no",
        label: "No",
        points: 0,
        fix: "Start retargeting. A small, always-on campaign for site visitors and engagers turns interest you already paid for into sales.",
      },
    ],
  },
  {
    id: "setup",
    question: "Do you boost posts, or build campaigns in Ads Manager?",
    area: "Campaign setup",
    options: [
      { id: "ads-manager", label: "Campaigns in Ads Manager with a clear objective", points: 25 },
      {
        id: "mix",
        label: "A mix of both",
        points: 14,
        fix: "Move your spend into Ads Manager. Boosting is fine for reach, but sales and lead campaigns give you objectives, audiences and placements boosting can't.",
      },
      {
        id: "boost",
        label: "Mostly boosted posts",
        points: 5,
        fix: "Stop relying on the Boost button. It optimises for likes and reach, not customers. Build Sales or Leads campaigns in Ads Manager so Meta chases the result you want.",
      },
      {
        id: "agency",
        label: "Someone else runs it — I'm not sure",
        points: 8,
        fix: "Ask for access and a simple monthly report: spend, results, cost per result and what changed. If you can't see it, you can't judge whether it's working.",
      },
    ],
  },
];

export const scoredQuestions = questions.filter((q) => q.area);
export const maxScore = scoredQuestions.length * 25;

export interface Band {
  min: number;
  title: string;
  line: string;
  color: string;
}

export const bands: Band[] = [
  { min: 80, title: "Strong foundations.", line: "Your setup is in good shape. The next gains come from sharper testing and scaling what works.", color: "#1a9e4b" },
  { min: 55, title: "Room to grow.", line: "The basics are there, but a few gaps are holding your results back.", color: "#0071e3" },
  { min: 30, title: "Money is leaking.", line: "Some of your budget is working blind. Fixing the gaps below should make every rupee go further.", color: "#bf4800" },
  { min: 0, title: "Starting from scratch.", line: "Your ads are missing the foundations that make paid media profitable. The good news: these are fixable.", color: "#d70015" },
];

export const bandFor = (score: number) => bands.find((b) => score >= b.min) ?? bands[bands.length - 1];
