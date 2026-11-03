export interface Education {
  title: string;
  institution: string | null;
  status: string;
}

export interface Certification {
  id: string;
  type: string;
  category: string;
  issuer: string;
  title: string;
  issued: string;
  expires: string | null;
  credentialId: string | null;
  verifyUrl: string;
  image: string;
  featured: boolean;
}

export const education: Education[] = [
  { title: "Higher Diploma", institution: "ICBT Campus", status: "Completed" },
  { title: "Diploma in Digital Marketing", institution: "E-Minds Australia", status: "Completed" },
];

export const certifications: Certification[] = [
  {
    id: "cisco-intro-cybersecurity",
    type: "Certification",
    category: "Technology",
    issuer: "Cisco Networking Academy",
    title: "Introduction to Cybersecurity",
    issued: "2026-07",
    expires: null,
    credentialId: null,
    verifyUrl: "https://www.credly.com/badges/1a244767-9cb9-4b3f-8a3c-681ae90371d1/public_url",
    image: "/certificates/cisco-intro-cybersecurity.png",
    featured: false,
  },
  {
    id: "hubspot-social-media-marketing",
    type: "Certification",
    category: "Marketing",
    issuer: "HubSpot Academy",
    title: "Social Media Marketing",
    issued: "2026-03",
    expires: "2028-04",
    credentialId: "3014f9cfb95945fa9fde21bd113341fc",
    verifyUrl: "https://app-na2.hubspot.com/academy/achievements/hzrf8wv4/en/1/chamod-ravihara/social-media-marketing",
    image: "/certificates/hubspot-social-media-marketing.png",
    featured: true,
  },
  {
    id: "google-ads-measurement",
    type: "Certification",
    category: "Analytics",
    issuer: "Google",
    title: "Google Ads Measurement Certification",
    issued: "2026-01",
    expires: "2027-01",
    credentialId: "173293598",
    verifyUrl: "https://skillshop.credential.net/8e24bf7d-0d27-4ea1-89ec-1cce37f603bc#acc.NoE8IYJK",
    image: "/certificates/google-ads-measurement.png",
    featured: true,
  },
  {
    id: "google-ai-performance-ads",
    type: "Certification",
    category: "Advertising",
    issuer: "Google",
    title: "AI-Powered Performance Ads Certification",
    issued: "2026-01",
    expires: "2027-01",
    credentialId: "173163650",
    verifyUrl: "https://skillshop.credential.net/a0ea28ea-3f5c-4526-904d-89e8a92fb958#acc.fz4uTG3W",
    image: "/certificates/google-ai-performance-ads.png",
    featured: true,
  },
  {
    id: "canva-essentials",
    type: "Certification",
    category: "Design",
    issuer: "Canva",
    title: "Canva Essentials",
    issued: "2025-12",
    expires: null,
    credentialId: "4be29b",
    verifyUrl: "https://canva.com/design-school/certification-award/4be29be5-f52b-4aa9-a82c-719383ef84b0",
    image: "/certificates/canva-essentials.png",
    featured: false,
  },
];
