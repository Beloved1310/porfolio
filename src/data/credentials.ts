import type { ImageSource } from "./projects";

export interface Credential {
  title: string;
  issuer: string;
  period?: string;
  kind: "Education" | "Award" | "Certification" | "Membership" | "Programme" | "Training";
  points?: string[];
  images?: ImageSource[];
}

export const credentials: Credential[] = [
  {
    title: "MSc Software Engineering and Management",
    issuer: "Kingston University, London",
    period: "January 2025 to July 2026",
    kind: "Education",
    points: [
      "Distinction.",
      "Software Architecture and Programming Models (86%), Agile Project Development (84%), Software Quality Engineering (66%).",
    ],
  },
  {
    title: "The Kingston Award, Gold",
    issuer: "Kingston University, London",
    period: "15 July 2025",
    kind: "Award",
    points: [
      "Recognises students who take part fully in university life alongside their studies.",
      "Achieved at Bronze, Silver and Gold.",
    ],
    images: [{ src: "/cert-kingston-award-gold.jpg", alt: "The Kingston Award Gold certificate, Adefisayo Adejumo" }],
  },
  {
    title: "Bachelor's degree in Education and Language Arts",
    issuer: "Obafemi Awolowo University, Nigeria",
    period: "2015 to 2019",
    kind: "Education",
  },
  {
    title: "Software engineering bootcamp",
    issuer: "AboCoders",
    kind: "Education",
    points: ["Graduated at the top of my class."],
  },
  {
    title: "Professional Member (MBCS)",
    issuer: "BCS, The Chartered Institute for IT",
    kind: "Membership",
    images: [{ src: "/cert-bcs.png", alt: "BCS Professional Member certificate, Adefisayo Adejumo" }],
  },
  {
    title: "Registered teacher",
    issuer: "Teachers Registration Council of Nigeria (TRCN)",
    kind: "Membership",
  },
  {
    title: "Certificate of Completion, DeFi and Web3 programme",
    issuer: "SheFi",
    kind: "Certification",
    images: [{ src: "/cert-shefi.png", alt: "SheFi Certificate of Completion, Adefisayo Adejumo" }],
  },
  {
    title: "AI Deployment Consultant programme (12 weeks)",
    issuer: "Frontier Fellowship",
    kind: "Programme",
    points: ["Accepted onto the programme."],
  },
  {
    title: "AI DevCamp 2026",
    issuer: "AI DevCamp",
    period: "2026",
    kind: "Programme",
    points: ["Completed the programme."],
  },
  {
    title: "PRINCE2 and Microsoft Project",
    issuer: "Training",
    kind: "Training",
    points: ["Training in project management methods and tools."],
  },
];
