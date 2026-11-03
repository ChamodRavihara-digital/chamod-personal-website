/**
 * Real proof: client logos, ad-account results and published creatives.
 * Images live in /public. To add more, drop the file in the folder and add a line here.
 */

export interface ClientLogo {
  name: string;
  industry: string;
  src: string;
  /** Logo artwork sits on a dark background. */
  dark?: boolean;
  /** Exact background colour of the logo file, so tiles blend seamlessly. */
  bg?: string;
}

export const clients: ClientLogo[] = [
  { name: "anythingatsupun.lk", industry: "E-commerce, Sri Lanka", src: "/logos/clients/anythingatsupun.png" },
  { name: "Apex.lk", industry: "Jewellery retail", src: "/logos/clients/apex.png", dark: true, bg: "#151f28" },
  { name: "CAMY", industry: "Manufacturing & retail", src: "/logos/clients/camy.png" },
  { name: "Bird Flight Travels", industry: "Travel agency", src: "/logos/clients/bird-flight.png" },
  { name: "Channel Way Nursing Home", industry: "Healthcare, Sri Lanka", src: "/logos/clients/channel-way.png" },
  { name: "The International University Hub", industry: "Education", src: "/logos/clients/international-university-hub.png" },
  { name: "InDecor Interiors", industry: "Interior design", src: "/logos/clients/indecor.png" },
  { name: "OtaLabz", industry: "OTA management, Sri Lanka", src: "/logos/clients/otalabz.png" },
  { name: "StayNoova", industry: "OTA management, Sri Lanka & Italy", src: "/logos/clients/staynoova.png" },
  { name: "Thushi Iron Works & Electricals", industry: "Services, Sri Lanka", src: "/logos/clients/thushi.png" },
  { name: "The Morang", industry: "Restaurant, Australia", src: "/logos/clients/the-morang.png", dark: true, bg: "#111111" },
];

export interface ResultShot {
  src: string;
  title: string;
  /** The headline figure as it appears in the screenshot. */
  figure?: string;
  figureLabel?: string;
  line: string;
  tag: "Meta Ads" | "Tracking" | "Lead generation" | "E-commerce";
}

export const results: ResultShot[] = [
  {
    src: "/images/results/result-2.jpg",
    title: "E-commerce sales ads",
    figure: "361",
    figureLabel: "website purchases",
    line: "£14.31 per purchase on £5,164.78 spend.",
    tag: "E-commerce",
  },
  {
    src: "/images/results/result-3.jpg",
    title: "High-performance Meta lead ads",
    figure: "587",
    figureLabel: "website leads",
    line: "$9.99 per lead on $5,865.09 spend.",
    tag: "Lead generation",
  },
  {
    src: "/images/results/result-1.jpg",
    title: "Meta conversion ads",
    figure: "826",
    figureLabel: "conversations started",
    line: "$1.80 per messaging conversation on $1,489.46 spend.",
    tag: "Meta Ads",
  },
  {
    src: "/images/results/result-8.jpg",
    title: "Facebook lead generation",
    figure: "7.01%",
    figureLabel: "CTR",
    line: "84 website leads at £2.82 each from new vs. old video creatives.",
    tag: "Lead generation",
  },
  {
    src: "/images/results/result-4.jpg",
    title: "E-commerce Facebook sales ads",
    line: "Ad-set level view of an e-commerce account: prospecting, lookalikes and customer-list retargeting.",
    tag: "E-commerce",
  },
  {
    src: "/images/results/result-5.jpg",
    title: "GA4 e-commerce tracking on WordPress",
    line: "Full GA4 e-commerce event set and Google Ads conversions, built in Google Tag Manager.",
    tag: "Tracking",
  },
  {
    src: "/images/results/result-6.jpg",
    title: "Facebook Pixel + Conversions API",
    line: "Browser and server events received and deduplicated in Events Manager.",
    tag: "Tracking",
  },
  {
    src: "/images/results/result-7.jpg",
    title: "Meta Pixel and Conversions API",
    line: "Pixel, Conversions API and lead-ads CAPI integrations all active.",
    tag: "Tracking",
  },
];

export interface Creative {
  src: string;
  client: string;
  alt: string;
}

export const creatives: Creative[] = [
  { src: "/images/creatives/post-8.jpg", client: "Bird Flight Travels", alt: "Travel ad: It's time to come to Sri Lanka" },
  { src: "/images/creatives/post-3.jpg", client: "anythingatsupun.lk", alt: "Casio Edifice watch product ad with feature callouts" },
  { src: "/images/creatives/post-4.jpg", client: "CAMY × anythingatsupun.lk", alt: "CAMY 32-inch HD Smart TV price offer ad" },
  { src: "/images/creatives/post-7.jpg", client: "Channel Way Nursing Home", alt: "Acne treatment ad: Don't pop it, stop it" },
  { src: "/images/creatives/post-2.jpg", client: "anythingatsupun.lk", alt: "Avurudu 10% off offer illustration" },
  { src: "/images/creatives/post-5.jpg", client: "Channel Way Nursing Home", alt: "Pigmentation treatment ad: Don't hide your skin, heal it" },
  { src: "/images/creatives/post-6.jpg", client: "Channel Way Nursing Home", alt: "PRP hair regrowth treatment ad in Sinhala" },
  { src: "/images/creatives/post-1.jpg", client: "Withdrawal service", alt: "Lightning-fast withdrawals service ad" },
];

export interface VideoWork {
  src: string;
  poster: string;
  title: string;
  line: string;
  tag: string;
  /** "portrait" for 9:16 reels, "landscape" for 16:9. */
  shape: "portrait" | "landscape";
}

export const videos: VideoWork[] = [
  {
    src: "/video/chamod-case-study-reel.mp4",
    poster: "/images/case-study-reel-poster.jpg",
    title: "Case study showreel",
    line: "Real Meta Ads results and the tracking stack behind them, in 52 seconds.",
    tag: "Motion graphics",
    shape: "landscape",
  },
  {
    src: "/video/sozo-mona-lisa-reel.mp4",
    poster: "/images/sozo-mona-lisa-poster.jpg",
    title: "The day the Mona Lisa went missing",
    line: "A 34-second storytelling reel built to hold attention from the first frame.",
    tag: "Storytelling reel · 9:16",
    shape: "portrait",
  },
  {
    src: "/video/tiktok-ads-promo.mp4",
    poster: "/images/tiktok-ads-poster.jpg",
    title: "Grow with TikTok Ads",
    line: "A 15-second promo ad — kinetic type, one idea, one call to action.",
    tag: "Ad creative · 16:9",
    shape: "landscape",
  },
];
