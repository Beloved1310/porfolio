export type ProjectCategory = "AI" | "Backend" | "Frontend";

export interface ImageSource {
  src: string;
  alt: string;
}

export interface CaseStudy {
  problem: string;
  approach: string[];
  role: string;
  outcome?: string;
  simulation?: { label: string; to: string };
  // Runs a simulation inline on the case study page. Keys match the map in ProjectCaseStudy.tsx.
  liveSimulation?: "lar";
  story?: { label: string; to: string };
}

export interface SlideLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  period?: string;
  summary: string;
  images: ImageSource[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  // A standout result (an award, a grant) shown as a badge; the card is lifted above the rest.
  highlight?: { label: string; postUrl?: string };
  // Canva decks or other slides, shown as buttons on the case study page.
  slides?: SlideLink[];
  // A project can sit under more than one tab on the Work page; full-stack work is Frontend and Backend.
  categories: ProjectCategory[];
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "content-creation-studio",
    title: "Content Creation Studio",
    period: "May 2026 to present",
    summary:
      "A team of AI agents that researches, writes, reviews and publishes content, and stops to ask a human before anything risky.",
    images: [{ src: "/project-content-studio.png", alt: "Content Creation Studio control plane" }],
    technologies: ["Python", "Google ADK", "Vertex AI Agent Engine", "FastAPI", "React"],
    githubUrl: "https://github.com/Beloved1310/Content-Creation-Studio",
    categories: ["AI"],
    caseStudy: {
      problem:
        "Agents that research, write and publish on their own are fast. They can also post the wrong thing to every channel in one go. I wanted the speed without the risk.",
      approach: [
        "One agent researches. Review loops check quality. Writers for each channel work in parallel. It runs on Google ADK and Vertex AI Agent Engine.",
        "Every session gets its own short-lived credentials. Every action is recorded against the person it was done for. High-risk actions stop at an approval gate until a human says yes.",
        "A FastAPI and React control plane streams each step live, so a person can watch and steer.",
      ],
      role: "I built the pipeline, its safety tooling and the control plane.",
      outcome:
        "It is also my LAR test bed. I run two copies side by side, one governed by LAR and one not, and the difference speaks for itself.",
      simulation: { label: "Try the LAR governance simulation", to: "/projects/lar-framework#lar-framework-simulation" },
    },
  },
  {
    slug: "lar-framework",
    title: "LAR framework (Lock, Attribute, Require)",
    summary:
      "My framework for keeping AI agents in check while they run. Lock what they can do. Attribute every action to a person. Require a human yes for anything risky.",
    images: [],
    technologies: ["OAuth 2.0 Token Exchange", "CIBA", "Agent governance"],
    // TODO: add Canva links, e.g. { label: "LLMday London slides", url: "https://www.canva.com/design/..." }
    slides: [],
    categories: ["AI"],
    caseStudy: {
      problem:
        "Many agents borrow the full access of whoever started them. If the agent misreads the task, nothing stops it. Afterwards, nobody can say who approved what.",
      approach: [
        "Lock. The agent swaps the person's access for a narrow, short-lived token through OAuth 2.0 Token Exchange. It can do the task, and nothing else.",
        "Attribute. Every action is logged against the named person the agent works for. The audit trail points to a human, not just a bot.",
        "Require. Risky actions pause until that person approves them on a separate channel, through CIBA (Client-Initiated Backchannel Authentication). Think of it as a bank asking you to confirm a payment on your phone.",
      ],
      role: "LAR is my own original work, and the direction I have chosen for my career.",
      outcome:
        "I demo LAR on two running copies of Content Creation Studio, one governed and one not. I presented it at LLMday London in my talk \"Your Agent Left the Laptop Open. LAR Closes It\".",
      liveSimulation: "lar",
    },
  },
  {
    slug: "consumer-duty-sludge-audit",
    title: "Consumer Duty Sludge Audit Tool",
    period: "March 2026 to April 2026",
    summary:
      "An AI pipeline that reads long regulatory documents and points out where customers are being slowed down, grounded in FCA guidance FG22/5.",
    images: [{ src: "/project-sludge-audit.png", alt: "Consumer Duty Sludge Audit Tool interface" }],
    technologies: ["Python", "LangChain", "LangGraph", "ChromaDB", "Groq (LLaMA)"],
    githubUrl: "https://github.com/Beloved1310/cd-audit-tool",
    categories: ["AI"],
    caseStudy: {
      problem:
        "The FCA Consumer Duty asks firms to find \"sludge\": the extra steps and small print that make it harder for customers to cancel, switch or complain. The evidence hides in long, vague documents that are slow to read by hand.",
      approach: [
        "LangChain and LangGraph run the agent steps. ChromaDB finds the passages that matter by meaning, not just keywords.",
        "I chose how to split the documents, how to search them and how to prompt the model, so every finding ties back to FG22/5.",
        "LLaMA models on Groq handle the reading and writing.",
      ],
      role: "I designed and implemented the pipeline.",
      outcome: "It turns vague source material into clear patterns of customer friction.",
    },
  },
  {
    slug: "equitie-portfolio-assistant",
    title: "EquiTie investor portfolio assistant",
    period: "[TODO: add date]",
    summary:
      "A prototype that answers investors' questions about their portfolios in plain English, with the maths done by code, not by the model.",
    images: [{ src: "/project-equitie.png", alt: "EquiTie investor portfolio assistant prototype" }],
    technologies: ["FastAPI", "pandas", "pgvector", "Redis", "Groq (LLaMA)"],
    categories: ["AI"],
    caseStudy: {
      problem:
        "Investors want plain answers about their money. A language model doing the arithmetic can be wrong and sound certain.",
      approach: [
        "I answered questions straight from the CSV data instead of using retrieval-augmented generation.",
        "Python and pandas do every calculation. The model only does language: reading the question and wording the answer.",
        "I wrote a requirements document and a six-month roadmap alongside it, because a forward deployed engineer owns the plan as well as the code.",
      ],
      role: "I built the prototype for a forward deployed engineer case study, and wrote the requirements and roadmap.",
    },
  },
  {
    slug: "worknoon",
    title: "Worknoon",
    period: "[TODO: add date]",
    summary:
      "A live platform for finding and booking coworking desks, private offices and meeting rooms.",
    images: [{ src: "/project-worknoon.png", alt: "Worknoon coworking booking platform" }],
    technologies: [],
    liveUrl: "https://worknoon.com",
    liveLabel: "Visit worknoon.com",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      problem:
        "Booking a desk or a meeting room should take a minute, not a chain of emails.",
      approach: ["I built the booking and account system, from the first design to launch day."],
      role: "I owned booking and accounts. [TODO: add stack]",
      outcome: "Worknoon is live at worknoon.com.",
    },
  },
  {
    slug: "driver-certified",
    title: "Driver Certified",
    period: "[TODO: add date]",
    summary:
      "A ride booking app, live on the iOS App Store in Nigeria. Book now, reserve for later, buy time plans, watch your driver arrive.",
    images: [
      { src: "/project-driver-certified.png", alt: "Driver Certified ride booking app" },
      { src: "/driver-certified.jpg", alt: "Driver Certified listing on the App Store" },
    ],
    technologies: ["Node.js", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/Beloved1310/Driver-Certified-Project",
    // TODO: add the App Store link as liveUrl.
    categories: ["Backend"],
    caseStudy: {
      problem:
        "Riders need to book now or later, pay in a way that suits them, and know exactly where their driver is.",
      approach: [
        "I built the backend: accounts, trip logic and payment plans.",
        "That backend powers booking, reservations, time plans and live driver tracking.",
      ],
      role: "I built the backend alongside another contributor.",
      outcome: "Driver Certified is live on the iOS App Store in Nigeria. [TODO: App Store link]",
    },
  },
  {
    slug: "image-management-system",
    title: "Image Management System",
    period: "MSc project, Kingston University",
    summary:
      "A GDPR-compliant system for medical images, built as separate services so one failure cannot take the rest down.",
    images: [{ src: "/optimized/ims.jpg", alt: "Image Management System dashboard" }],
    technologies: ["React", "Node.js", "Redis", "MongoDB", "Docker"],
    githubUrl: "https://github.com/Beloved1310/ABC-Healthcare-Image-Management-System",
    liveUrl: "https://drive.google.com/file/d/1thOixwBknIPQhU3e68eW-ypTYcil6MES/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      problem:
        "Medical images are personal data. A diagnostic workflow cannot stop because one part broke.",
      approach: [
        "I split the system into separate services in React, Node.js, Redis and MongoDB.",
        "Each service runs in its own Docker container, so it behaves the same on every machine and deploys reliably.",
        "Patient data handling follows GDPR from the start, not as an afterthought.",
      ],
      role: "I designed and built it during my MSc at Kingston University.",
    },
  },
  {
    slug: "learnquest",
    title: "LearnQuest",
    period: "MSc dissertation, Kingston University",
    summary:
      "A learning platform built on Grit Theory that adapts to each learner and helps them keep going when it gets hard.",
    images: [{ src: "/optimized/learnquest.jpg", alt: "Learn Quest account sign-up screen" }],
    technologies: ["JavaScript", "LLMs", "React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/Beloved1310/Behavioural-learning-platformBE/tree/feat/core-grit-therory",
    liveUrl: "https://drive.google.com/file/d/1-oHydyrSeqxvyHfaIuuFCd1OGb4vmB2i/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["AI", "Frontend", "Backend"],
    caseStudy: {
      problem:
        "As a teacher, I watched learners give up at the first hard moment. LearnQuest asks one question: can software help them keep going?",
      approach: [
        "I grounded it in Grit Theory and built it with JavaScript and large language models.",
        "Learning paths adapt to the learner, progress is analysed, and feedback is personal.",
        "I wrote the documentation for readers outside engineering too.",
      ],
      role: "My MSc dissertation. The point where teaching and engineering met.",
      outcome:
        "I graduated with a Distinction.",
    },
  },
  {
    slug: "voting-module-sidechain",
    title: "Voting Module Sidechain",
    period: "October 2024 to December 2024",
    summary:
      "A blockchain voting module that verifies every vote and closes polls on time. It won a grant.",
    images: [{ src: "/optimized/voting-module.jpg", alt: "Voting Module code and terminal output in a code editor" }],
    technologies: ["TypeScript", "Klayr SDK", "Blockchain"],
    githubUrl: "https://github.com/Beloved1310/voting-module",
    highlight: { label: "Grant winner", postUrl: "https://lnkd.in/p/eZfhQaGj" },
    liveUrl: "https://drive.google.com/file/d/1UP7HZGOc6euso3gTK4pi9z3_r7RyrTuN/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["Backend"],
    caseStudy: {
      problem: "A poll only works if people trust it: one vote each, counted once, closed on time.",
      approach: [
        "I built a voting sidechain with TypeScript and the Klayr SDK.",
        "Separate commands, stores and API endpoints handle creating polls, verifying votes, changing options and closing polls when they expire.",
      ],
      role: "Solo project.",
      outcome: "The project won a grant.",
    },
  },
  {
    slug: "first-aid-app-generator",
    title: "First-Aid-App-Generator",
    summary:
      "Describe an emergency, get clear first-aid steps straight away. Powered by the Gemini API.",
    images: [{ src: "/optimized/first-aid.jpg", alt: "QuickAid first-aid guidance form" }],
    technologies: ["Python", "Gemini API", "Streamlit"],
    githubUrl: "https://github.com/Beloved1310/First-Aid-App-Generator",
    liveUrl: "https://drive.google.com/file/d/17iG_j87JgZhA7VfMZp9zczOsYART1VYj/view?usp=sharing",
    categories: ["AI"],
  },
  {
    slug: "nowdevhub",
    title: "NowDevHub",
    summary:
      "A home for ServiceNow developers to find resources and share components.",
    images: [{ src: "/optimized/nowdevhub.jpg", alt: "NowDevHub login screen" }],
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    githubUrl: "https://github.com/Beloved1310",
    liveUrl: "https://nowdevhub-frontend-webapp.vercel.app/login",
    categories: ["Frontend", "Backend"],
  },
  {
    slug: "shefi-solana",
    title: "Solana project (SheFi programme)",
    summary: "[TODO: add details of the Solana project from the SheFi programme]",
    images: [],
    technologies: ["Solana"],
    categories: ["Backend"],
  },
];

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

export interface OpenSourceContribution {
  repo: string;
  title: string;
  description: string;
  url: string;
  status: string;
}

export const openSource: OpenSourceContribution[] = [
  {
    repo: "Tracer-Cloud/opensre",
    title: "Issue #4650",
    description: "Contribution to opensre, an AI SRE agent toolkit.",
    url: "https://github.com/Tracer-Cloud/opensre/issues/4650",
    status: "[TODO: PR link and status]",
  },
  {
    repo: "CodeYourFuture/curriculum",
    title: "PR #1752",
    description: "Moved professional development content out of a CMS that was being retired.",
    url: "https://github.com/CodeYourFuture/curriculum/pull/1752",
    status: "Contributed",
  },
];
