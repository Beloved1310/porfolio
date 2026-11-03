import type { ImageSource } from "./projects";

// A link on a Work page card. Placeholder links render as "Link coming soon" until a real URL is added.
export interface CardLink {
  label: string;
  href: string;
  placeholder?: boolean;
  // Internal routes use the router; everything else opens in a new tab.
  internal?: boolean;
}

export interface WorkRole {
  id: string;
  company: string;
  role: string;
  period: string;
  // What the company does and what I did there, in two short sentences.
  summary: string;
  technologies: string[];
  images: ImageSource[];
  link: CardLink;
}

// Titles, dates and figures are worded as on the CV; the CV has the full detail.
export const workRoles: WorkRole[] = [
  {
    id: "dti",
    company: "DTI",
    role: "Developer",
    period: "March 2024 to January 2025",
    summary:
      "A multi-tenant community app for 1,000+ concurrent users. I built its type-safe API and real-time notifications, which lifted engagement by 20%.",
    technologies: ["tRPC", "TypeScript", "PostgreSQL", "Firebase", "React", "React Query", "Tailwind"],
    images: [],
    // TODO: add DTI's website.
    link: { label: "Visit DTI", href: "#", placeholder: true },
  },
  {
    id: "bujeti",
    company: "Bujeti",
    role: "Engineer",
    period: "February 2023 to March 2024",
    summary:
      "Fintech for African businesses. I led the QuickBooks integration and rebuilt onboarding, cutting registration errors by 50%.",
    technologies: ["TypeScript", "Node.js", "React", "MySQL", "MongoDB", "AWS SQS", "Express"],
    images: [],
    link: { label: "Visit bujeti.com", href: "https://www.bujeti.com" },
  },
  {
    id: "lextego",
    company: "Lextego",
    role: "Engineer",
    period: "January 2022 to February 2023",
    summary:
      "Regtech that monitors payments for financial crime. I deployed 50+ transaction monitoring microservices.",
    technologies: ["Node.js", "TypeScript", "NestJS", "Docker", "Kubernetes", "Jest", "AWS"],
    images: [],
    link: { label: "Visit lextego.com", href: "https://www.lextego.com" },
  },
];

export interface Hackathon {
  title: string;
  role: "Competed" | "Mentored" | "Judged";
  text: string;
  images: ImageSource[];
  link: CardLink;
}

// TODO: add the post or event page for each hackathon.
export const hackathons: Hackathon[] = [
  {
    title: "Large Language Models hackathon, Westminster Business School",
    role: "Competed",
    text: "I won it.",
    // TODO: add the Westminster hackathon photo.
    images: [],
    link: { label: "Read about it", href: "https://lnkd.in/p/eNgVSN-B" },
  },
  {
    title: "SwitchPoint at EAT_HACK (Really Good Culture)",
    role: "Competed",
    text: "Built for the Human Truth track: what really makes shoppers switch products, versus what they say would.",
    images: [],
    link: { label: "Read about it", href: "#", placeholder: true },
  },
  {
    title: "Avalanche London Hackathon 2025",
    role: "Mentored",
    text: "I mentored teams at the hackathon.",
    images: [
      { src: "/optimized/avalanche-wide.jpg", alt: "Adefisayo Adejumo working at a laptop during an Avalanche event" },
    ],
    link: { label: "Read about it", href: "#", placeholder: true },
  },
  {
    title: "Web3 community hackathons",
    role: "Judged",
    text: "I judged web3 community hackathons.",
    images: [],
    link: { label: "Read about it", href: "#", placeholder: true },
  },
  {
    title: "Women Techsters Fellowship",
    role: "Judged",
    text: "I judged demo sessions for the fellowship.",
    images: [],
    link: { label: "Read about it", href: "#", placeholder: true },
  },
];
