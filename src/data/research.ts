import type { ImageSource } from "./projects";
import type { CardLink } from "./work";

export interface Publication {
  title: string;
  authors?: string;
  venue: string;
  status: string;
  contribution?: string;
  link: CardLink;
}

export const publications: Publication[] = [
  {
    title:
      "CausalAgentBench: Reliability-Aware Benchmarking of Causal Reasoning, Coordination and Explainability in Multi-Agent Consumer Intelligence",
    authors:
      "Olufemi Taiwo, Brain Aboze, Oluwole Fagbohun, Victor Omoboye, Chinomso Okere, Adefisayo Adejumo Oreoluwa",
    venue: "ICSRS 2026, the 10th International Conference on System Reliability and Safety",
    status: "Accepted",
    contribution: "I contributed the abstract and framing.",
    // TODO: add the paper link once published.
    link: { label: "Read the paper", href: "#", placeholder: true },
  },
  {
    title: "Who Should Do What? Adaptive Task Allocation in Heterogeneous Multi-Agent AI Systems",
    venue: "Co-author",
    status: "Under review",
    contribution: "I contributed the abstract and introduction.",
    link: { label: "Read the paper", href: "#", placeholder: true },
  },
  {
    title: "LearnQuest (MSc dissertation)",
    venue: "Kingston University",
    status: "Distinction",
    contribution:
      "A learning platform grounded in Grit Theory and motivated by a real problem from my teaching years.",
    link: { label: "Read the case study", href: "/projects/learnquest", internal: true },
  },
];

export const researchInterests = [
  "Runtime governance of AI agents",
  "Explainable AI for learners with additional needs",
  "AI security",
];

export interface Talk {
  title: string;
  event: string;
  date?: string;
  format: "Talk" | "Panel" | "Speaking";
  // One line on what the talk was about.
  brief?: string;
  image?: ImageSource[];
  // The LinkedIn or X post about the talk.
  link?: string;
}

export const talks: Talk[] = [
  {
    title: "Your Agent Left the Laptop Open. LAR Closes It",
    event: "Large Language Models, AI and ML Conference London (LLMday London)",
    format: "Talk",
    brief: "I presented LAR, my framework for AI agents that are safe to trust, with a live demo.",
    image: [
      {
        src: "/ayo-speaking-llmday.jpg",
        alt: "Adefisayo Adejumo speaking about the LAR framework at LLMday London",
      },
    ],
    link: "https://lnkd.in/p/eJCFCXHh",
  },
  {
    title: "Bitwise in the Browser: The Superpower You've Been Ignoring",
    event: "JSMonthly",
    format: "Talk",
    brief: "Working directly with bits, a superpower most web developers ignore.",
    image: [
      { src: "/optimized/bitwise-talk.jpg", alt: "Adefisayo Adejumo presenting Bitwise in the Browser at JSMonthly" },
    ],
  },
  {
    title: "Moderator: From vibe to value: Engineering in an agent-driven world",
    event: "DTX London 2026",
    date: "14 October 2026",
    format: "Panel",
    brief: "I moderated engineers from Barclays, Switch2 and a building society.",
    image: [{ src: "/ayo-dtx-panel.jpg", alt: "Adefisayo Adejumo moderating the DTX London 2026 panel" }],
  },
  {
    title: "Why traditional debugging fails",
    event: "DevFest (Google Developer Group)",
    format: "Speaking",
    image: [{ src: "/optimized/devfest.jpg", alt: "Adefisayo Adejumo speaking on stage at DevFest" }],
  },
  {
    title: "From Web2 to Web3: Onboarding a Million Developers Using web3.js",
    event: "Web3 Lagos Conference 2024",
    format: "Talk",
    image: [
      {
        src: "/optimized/web3lagos-room.jpg",
        alt: "Adefisayo Adejumo presenting From Web2 to Web3 to a full room at the Web3 Lagos Conference 2024",
      },
    ],
  },
  {
    title: "Engagement in Web3: How Marketing and Community Building Intersect",
    event: "Web3 Global Conference, Africa Edition 2024",
    format: "Panel",
    image: [
      {
        src: "/optimized/web3global-panel.jpg",
        alt: "Adefisayo Adejumo speaking on the Engagement in Web3 panel at the Web3 Global Conference Africa Edition",
      },
    ],
  },
  {
    title: "The Multicall Plugin",
    event: "Web3.js African Tour",
    format: "Talk",
    brief: "As a web3.js ambassador, I walked Lagos developers through the plugin.",
    image: [
      {
        src: "/optimized/web3js-africa-tour-talk.jpg",
        alt: "Adefisayo Adejumo presenting the Multicall Plugin to developers at the Web3.js Africa Tour",
      },
    ],
  },
];
