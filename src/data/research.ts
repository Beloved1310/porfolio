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

export interface TalkStoryDetail {
  mistakeOrContextTitle?: string;
  mistakeOrContextText: string;
  solutionOrArchitectureTitle?: string;
  solutionOrArchitectureText: string;
  reflectionOrTakeaway?: string;
  caseStudyUrl?: string;
  caseStudyLabel?: string;
}

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
  story?: TalkStoryDetail;
}

export const talks: Talk[] = [
  {
    title: "Your Agent Left the Laptop Open. LAR Closes It",
    event: "Large Language Models, AI and ML Conference London (LLMday London)",
    format: "Talk",
    brief: "I presented LAR (Lock, Attribute, Require), my framework for AI agents you can trust at work, with a live demo of phone approval using CIBA.",
    image: [
      {
        src: "/ayo-speaking-llmday.jpg",
        alt: "Adefisayo Adejumo speaking about the LAR framework at LLMday London",
      },
    ],
    link: "https://lnkd.in/p/eJCFCXHh",
    story: {
      mistakeOrContextTitle: "The mistake: giving agents our own access",
      mistakeOrContextText:
        "When we first added AI agents to our code and workflows, we made a common mistake. We gave them our own full login. The agent could edit code, but it could also delete databases and open private files. It was like leaving your laptop open and unlocked in a busy café.",
      solutionOrArchitectureTitle: "The fix: the LAR framework",
      solutionOrArchitectureText:
        "I shared what went wrong and how we fixed it with a room of AI engineers in London. LAR has three parts. Lock: swap broad access for a narrow, short-lived token (RFC 8693). Attribute: link every action to a real person. Require: ask that person to approve on their phone (CIBA) before anything high risk runs.",
      reflectionOrTakeaway:
        "“The best part of a talk is not the 30 minutes on stage. It is the hour after, in the hallway, when other engineers say they have the same problem and thought they were the only ones. That is why I speak.”",
      caseStudyUrl: "/projects/lar-framework",
      caseStudyLabel: "See the LAR case study and simulator",
    },
  },
  {
    title: "Bitwise in the Browser: The Superpower You've Been Ignoring",
    event: "JSMonthly",
    format: "Talk",
    brief: "Working directly with bits, a skill most web developers never use.",
    image: [
      { src: "/optimized/bitwise-talk.jpg", alt: "Adefisayo Adejumo presenting Bitwise in the Browser at JSMonthly" },
      { src: "/bitwise-talk.jpg", alt: "Adefisayo Adejumo presenting Bitwise in the Browser at JSMonthly" },
    ],
    story: {
      mistakeOrContextTitle: "The gap: ignoring bits",
      mistakeOrContextText:
        "Many web developers treat JavaScript as purely high level. They reach for big libraries and nested objects for jobs that plain numbers and bit masks could do much faster.",
      solutionOrArchitectureTitle: "The patterns: flags and bit masks",
      solutionOrArchitectureText:
        "I showed the London JS community bitwise patterns they can use today: permissions packed into one number, fast state flags, saving memory in heavy canvas work and bit checks inside Web Workers.",
      reflectionOrTakeaway:
        "“Knowing the basics does not mean writing assembly. It means knowing what the V8 engine is doing underneath, so you make better choices.”",
    },
  },
  {
    title: "Moderator: From vibe to value: Engineering in an agent-driven world",
    event: "DTX London 2026",
    date: "14 October 2026",
    format: "Panel",
    brief: "I moderated a panel of senior engineers from Barclays, Switch2 and building societies on moving AI from demos to real business value.",
    image: [{ src: "/ayo-dtx-panel.jpg", alt: "Adefisayo Adejumo moderating the DTX London 2026 panel" }],
    story: {
      mistakeOrContextTitle: "The problem: from demo to production",
      mistakeOrContextText:
        "Many companies have impressive AI demos. In regulated fields like banking, healthcare and housing, those demos often stall. The security risks are unclear and there is no audit trail.",
      solutionOrArchitectureTitle: "The discussion: making agents safe to ship",
      solutionOrArchitectureText:
        "I led a discussion with engineers from Barclays, Switch2 and building societies. We covered fixed guardrails, narrow access tokens, automatic compliance checks and how to help engineers adopt AI safely.",
      reflectionOrTakeaway:
        "“What holds back AI at work is rarely how smart the model is. It is control at runtime, a clear record of what happened and trust inside the company.”",
    },
  },
  {
    title: "Why traditional debugging fails",
    event: "DevFest (Google Developer Group)",
    format: "Speaking",
    brief: "Why stepping through code with breakpoints stops working in async, distributed and event-driven systems.",
    image: [
      { src: "/optimized/devfest.jpg", alt: "Adefisayo Adejumo speaking on stage at DevFest" },
      { src: "/devfest.JPG", alt: "Adefisayo Adejumo speaking on stage at DevFest" },
    ],
    story: {
      mistakeOrContextTitle: "The problem: breakpoints in distributed systems",
      mistakeOrContextText:
        "Stepping through code line by line does not help with timing bugs, a blocked event loop, network race conditions or messages passing between services.",
      solutionOrArchitectureTitle: "The approach: debug with evidence",
      solutionOrArchitectureText:
        "I showed a different way to think. Map out the states your system can be in, collect structured traces and write tests that reproduce the bug, instead of adding console logs after the fact.",
      reflectionOrTakeaway:
        "“If you cannot reproduce a bug with a test, you are guessing, not engineering.”",
    },
  },
  {
    title: "From Web2 to Web3: Onboarding a Million Developers Using web3.js",
    event: "Web3 Lagos Conference 2024",
    format: "Talk",
    brief: "A talk to a full room in Lagos on helping web developers move into web3 using TypeScript patterns they already know.",
    image: [
      {
        src: "/optimized/web3lagos-room.jpg",
        alt: "Adefisayo Adejumo presenting From Web2 to Web3 to a full room at the Web3 Lagos Conference 2024",
      },
      {
        src: "/web3lagos.jpg",
        alt: "Adefisayo Adejumo presenting From Web2 to Web3 to a full room at the Web3 Lagos Conference 2024",
      },
    ],
    story: {
      mistakeOrContextTitle: "The barrier: web3 is hard to start",
      mistakeOrContextText:
        "Web3 puts off good web developers. The tools are confusing, the addresses are hard to read and the libraries are poorly documented.",
      solutionOrArchitectureTitle: "The bridge: familiar TypeScript",
      solutionOrArchitectureText:
        "I showed more than 300 Nigerian engineers how to build web3 apps with web3.js using normal TypeScript: typed contract wrappers and clear error handling.",
      reflectionOrTakeaway:
        "“Good developer tools meet engineers where they already are. They do not make them start again from zero.”",
    },
  },
  {
    title: "Engagement in Web3: How Marketing and Community Building Intersect",
    event: "Web3 Global Conference, Africa Edition 2024",
    format: "Panel",
    brief: "A panel on building real developer communities, not short-lived token hype.",
    image: [
      {
        src: "/optimized/web3global-panel.jpg",
        alt: "Adefisayo Adejumo speaking on the Engagement in Web3 panel at the Web3 Global Conference Africa Edition",
      },
    ],
    story: {
      mistakeOrContextTitle: "The problem: hype over substance",
      mistakeOrContextText:
        "Tech communities often chase short bursts of hype. Builders burn out and the real value gets lost.",
      solutionOrArchitectureTitle: "The approach: build around real work",
      solutionOrArchitectureText:
        "I shared what has worked for me: hands-on bootcamps, code review circles and mentoring that keeps developers involved for years.",
      reflectionOrTakeaway:
        "“Communities last when people solve problems together and grow their skills, not when they chase hype.”",
    },
  },
  {
    title: "The Multicall Plugin",
    event: "Web3.js African Tour",
    format: "Talk",
    brief: "A hands-on walkthrough of grouping many contract reads into one network call, cutting delay by 80%.",
    image: [
      {
        src: "/optimized/web3js-africa-tour-talk.jpg",
        alt: "Adefisayo Adejumo presenting the Multicall Plugin to developers at the Web3.js Africa Tour",
      },
    ],
    story: {
      mistakeOrContextTitle: "The problem: too many network calls",
      mistakeOrContextText:
        "Reading contract data one call at a time adds a lot of delay, hits provider rate limits and slows the app down.",
      solutionOrArchitectureTitle: "The fix: one call with Multicall",
      solutionOrArchitectureText:
        "I showed developers how to group dozens of reads into a single multicall, cutting network round trips by more than 80%.",
      reflectionOrTakeaway:
        "“The basics, like batching, caching and fewer round trips, work in every tech stack.”",
    },
  },
];
