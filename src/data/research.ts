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
    brief: "Presented the LAR framework (Lock, Attribute, Require) for enterprise autonomous AI agents that are safe to trust, with an out-of-band live mobile CIBA demo.",
    image: [
      {
        src: "/ayo-speaking-llmday.jpg",
        alt: "Adefisayo Adejumo speaking about the LAR framework at LLMday London",
      },
    ],
    link: "https://lnkd.in/p/eJCFCXHh",
    story: {
      mistakeOrContextTitle: "The Mistake: Handing Ambient Privileges to Bots",
      mistakeOrContextText:
        "When we initially integrated autonomous LLM coding and workflow agents into internal repositories, we made the classic engineer mistake: handing the agent our own broad, ambient user credentials. The bot could edit code, but it also possessed the unchecked power to drop databases and access confidential files. It was the digital equivalent of leaving an unlocked laptop open in a busy cafe.",
      solutionOrArchitectureTitle: "The Solution: The LAR Governance Framework",
      solutionOrArchitectureText:
        "Instead of keeping that close call behind closed doors, I stood in front of hundreds of AI practitioners in London and openly walked through how we fixed it: the LAR framework (Lock, Attribute, Require). I broke down how to swap ambient privileges for downscoped, single-purpose RFC 8693 tokens, tie every action to an accountable human, and require out-of-band CIBA mobile approvals before any high-stakes operation executes.",
      reflectionOrTakeaway:
        "“The best part of any talk isn't the 30 minutes on stage—it's the hour afterward standing in the hallway, listening to other engineers share the exact same pain points they thought only they were facing. That candid human exchange is why I speak.”",
      caseStudyUrl: "/projects/lar-framework",
      caseStudyLabel: "Explore LAR Case Study & Simulator",
    },
  },
  {
    title: "Bitwise in the Browser: The Superpower You've Been Ignoring",
    event: "JSMonthly",
    format: "Talk",
    brief: "Working directly with bits, a superpower most web developers ignore.",
    image: [
      { src: "/optimized/bitwise-talk.jpg", alt: "Adefisayo Adejumo presenting Bitwise in the Browser at JSMonthly" },
      { src: "/bitwise-talk.jpg", alt: "Adefisayo Adejumo presenting Bitwise in the Browser at JSMonthly" },
    ],
    story: {
      mistakeOrContextTitle: "The Blindspot: Neglecting Low-Level Bit Operations",
      mistakeOrContextText:
        "Modern web developers frequently treat JavaScript as an abstract high-level script, reaching for bulky state libraries and nested object hashes for operations that could execute orders of magnitude faster using native 32-bit integers and bit masks.",
      solutionOrArchitectureTitle: "The Implementation: Binary Flags & Performance Patterns",
      solutionOrArchitectureText:
        "Walked the London JS community through practical, production-ready bitwise patterns: packed permission bitmasks, blazing-fast state flags, memory management in heavy canvas simulations, and bit-level cryptography checks in Web Workers.",
      reflectionOrTakeaway:
        "“Mastering low-level fundamentals doesn't mean writing assembly—it means understanding what the V8 engine is doing beneath the hood so you make smarter architectural trade-offs.”",
    },
  },
  {
    title: "Moderator: From vibe to value: Engineering in an agent-driven world",
    event: "DTX London 2026",
    date: "14 October 2026",
    format: "Panel",
    brief: "Moderated a high-stakes panel of principal engineers from Barclays, Switch2, and building societies on transitioning AI from novelty prototypes into hardened enterprise value.",
    image: [{ src: "/ayo-dtx-panel.jpg", alt: "Adefisayo Adejumo moderating the DTX London 2026 panel" }],
    story: {
      mistakeOrContextTitle: "The Problem: The Chasm Between AI Demos and Regulated Production",
      mistakeOrContextText:
        "Enterprises are flooded with impressive internal AI prototypes, but when it comes to shipping them in regulated industries (banking, healthcare, housing), teams stall because of unquantified security risks and absent audit trails.",
      solutionOrArchitectureTitle: "The Discussion: Hardening Autonomous Agents",
      solutionOrArchitectureText:
        "Moderated lead engineers from Barclays, Switch2, and building societies, debating deterministic guardrails, zero-trust token exchange, automated compliance gating, and how to scale engineer adoption safely.",
      reflectionOrTakeaway:
        "“The bottleneck in enterprise AI adoption is never model intelligence; it is runtime governance, verifiable provenance, and organizational confidence.”",
    },
  },
  {
    title: "Why traditional debugging fails",
    event: "DevFest (Google Developer Group)",
    format: "Speaking",
    brief: "Deconstructing why legacy breakpoint debugging breaks down in asynchronous, distributed, and event-driven architectures.",
    image: [
      { src: "/optimized/devfest.jpg", alt: "Adefisayo Adejumo speaking on stage at DevFest" },
      { src: "/devfest.JPG", alt: "Adefisayo Adejumo speaking on stage at DevFest" },
    ],
    story: {
      mistakeOrContextTitle: "The Friction: Breakpoint Debugging in Distributed Systems",
      mistakeOrContextText:
        "Stepping line-by-line with standard IDE breakpoints completely falls apart when diagnosing microtask timing bugs, event loop starvation, network race conditions, or distributed pub/sub pipelines.",
      solutionOrArchitectureTitle: "The Technique: Observability-Driven Engineering",
      solutionOrArchitectureText:
        "Presented a mental model shift: modeling states as finite automata, capturing structured telemetry traces, and writing reproducible contract property tests instead of relying on post-mortem ad-hoc console logs.",
      reflectionOrTakeaway:
        "“If you cannot reproduce a failure deterministically with an isolated test case, you are guessing rather than engineering.”",
    },
  },
  {
    title: "From Web2 to Web3: Onboarding a Million Developers Using web3.js",
    event: "Web3 Lagos Conference 2024",
    format: "Talk",
    brief: "Presenting to a packed auditorium in Lagos on bridging traditional full-stack web developers into decentralized architecture using familiar TypeScript patterns.",
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
      mistakeOrContextTitle: "The Barrier: Steep Learning Curves in Decentralized Tech",
      mistakeOrContextText:
        "Decentralized architecture often repels talented full-stack engineers with convoluted tooling, unintuitive hex addresses, and poorly documented RPC client libraries.",
      solutionOrArchitectureTitle: "The Bridge: Pragmatic TypeScript Architectures",
      solutionOrArchitectureText:
        "Walked a packed auditorium of over 300 Nigerian engineers through building reliable decentralized applications with web3.js, using standard TypeScript abstractions, strongly-typed contract wrappers, and predictable error handling.",
      reflectionOrTakeaway:
        "“Great developer tooling succeeds when it meets engineers within their existing mental models rather than forcing them to start from scratch.”",
    },
  },
  {
    title: "Engagement in Web3: How Marketing and Community Building Intersect",
    event: "Web3 Global Conference, Africa Edition 2024",
    format: "Panel",
    brief: "Panel discussion on authentic developer community building versus superficial token hype cycles in emerging tech ecosystems.",
    image: [
      {
        src: "/optimized/web3global-panel.jpg",
        alt: "Adefisayo Adejumo speaking on the Engagement in Web3 panel at the Web3 Global Conference Africa Edition",
      },
    ],
    story: {
      mistakeOrContextTitle: "The Pitfall: Prioritizing Hype Over Technical Substance",
      mistakeOrContextText:
        "Tech ecosystems often fall victim to short-term speculative hype cycles that burn out builders and obscure real engineering utility.",
      solutionOrArchitectureTitle: "The Strategy: Grounded Technical Community Building",
      solutionOrArchitectureText:
        "Shared proven lessons on organizing hands-on builder bootcamps, code-review study circles, and mentorship pipelines that retain developers for years.",
      reflectionOrTakeaway:
        "“Communities endure when they are founded on mutual problem-solving and shared technical mastery, not speculative hype.”",
    },
  },
  {
    title: "The Multicall Plugin",
    event: "Web3.js African Tour",
    format: "Talk",
    brief: "Hands-on walkthrough of batching multiple RPC contract reads into a single network call, reducing latency by 80%.",
    image: [
      {
        src: "/optimized/web3js-africa-tour-talk.jpg",
        alt: "Adefisayo Adejumo presenting the Multicall Plugin to developers at the Web3.js Africa Tour",
      },
    ],
    story: {
      mistakeOrContextTitle: "The Bottleneck: Network Latency from Cascading RPC Queries",
      mistakeOrContextText:
        "Querying contract states one-by-one introduces crippling network overhead, exhausts rate limits on RPC providers, and slows down client interfaces.",
      solutionOrArchitectureTitle: "The Fix: Aggregated Batch Queries with Multicall",
      solutionOrArchitectureText:
        "Taught developers how to bundle dozens of disparate RPC reads into a single byte-packed multicall execution, reducing network round-trips by over 80%.",
      reflectionOrTakeaway:
        "“Fundamental engineering principles—batching, caching, reducing round trips—are timeless and universal across every technology stack.”",
    },
  },
];
