export type ProjectCategory = "AI" | "Backend" | "Frontend";

export interface ImageSource {
  src: string;
  alt: string;
}

export interface ChallengeStory {
  title: string;
  problem: string;
  engineeringSolution?: string;
  engineeringDecision?: string;
  impact: string;
}

export interface CaseStudy {
  role: string;
  problem: string;
  impact: string;

  // Structured breakdown for each challenge story:
  challenges: ChallengeStory[];

  context?: string;
  simulation?: { label: string; to: string };
  liveSimulation?: "lar";
  story?: { label: string; to: string };
  // Backward compatibility fields
  approach?: string[];
  outcome?: string;
  result?: string;
  solution?: string[];
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
  company?: string;
  highlight?: { label: string; postUrl?: string };
  slides?: SlideLink[];
  categories: ProjectCategory[];
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "content-creation-studio",
    title: "Content Creation Studio",
    period: "May 2026 to present",
    summary:
      "A collaborative team of AI agents that researches, drafts, cross-reviews, and publishes multi-channel content, with mandatory human-in-the-loop approval gates before any public post.",
    images: [{ src: "/project-content-studio.png", alt: "Content Creation Studio control plane" }],
    technologies: ["Python", "Google ADK", "Vertex AI Agent Engine", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Beloved1310/Content-Creation-Studio",
    categories: ["AI", "Frontend", "Backend"],
    caseStudy: {
      role: "Lead Architect & Full-Stack Engineer — designed the multi-agent pipeline, safety tooling, and real-time streaming control plane.",
      problem:
        "Modern digital teams need to research market trends, write authoritative articles, and distribute tailored copy across disparate channels like newsletters, blogs, and social platforms. Unsupervised autonomous agents can generate text quickly, but when deployed without boundaries, they hallucinate facts, invent fake numbers, and can publish unvetted statements to every public channel in seconds. We needed the speed of AI agents without the catastrophic risk of unchecked automated publishing.",
      challenges: [
        {
          title: "Uncontrolled Autonomous Publishing",
          problem:
            "Agents that draft and post autonomously can push hallucinated data or leaked company info to social platforms without any human catching it in time.",
          engineeringDecision:
            "Implemented strict, hard approval gates and ephemeral credential isolation. The agent pipeline halts immediately before any outbound API call until a human operator clicks 'Approve'.",
          impact:
            "The publish step stays blocked until an operator approves the reviewed draft.",
        },
        {
          title: "Multi-Agent Coordination & Tone Consistency",
          problem:
            "Different channels demand radically different tones: an in-depth technical blog post requires rigorous citations, while an X thread needs concise brevity. Monolithic prompts failed to balance both.",
          engineeringDecision:
            "Built a modular multi-agent graph on Google ADK and Vertex AI Agent Engine. Dedicated research agents collect raw facts, channel-specialist agents craft custom copy, and an editor agent checks facts against source citations.",
          impact:
            "Channel-specific agents produce distinct drafts, while an editor checks claims against research sources.",
        },
        {
          title: "Opaque Agent Reasoning & Lack of Operator Trust",
          problem:
            "If an operator cannot see what an agent is doing while it runs, they are forced to either blindly trust the output or spend double the time auditing every sentence.",
          engineeringDecision:
            "Built a real-time reactive control plane in FastAPI and React that streams step-by-step thoughts, tool invocations, and live draft diffs over WebSockets.",
          impact:
            "Operators can watch reasoning live and steer or cancel runs before errors cascade.",
        },
      ],
      impact:
        "The result is a reviewable content workflow with source checks, a human approval boundary, and a live operator view. The project also provides a working testbed for LAR governance.",
      simulation: { label: "Try the LAR governance simulation", to: "/projects/lar-framework#lar-framework-simulation" },
    },
  },
  {
    slug: "lar-framework",
    title: "LAR framework (Lock, Attribute, Require)",
    summary:
      "A principled governance framework for autonomous AI agents in enterprise production: Lock privilege scopes, Attribute every action to an accountable human, and Require out-of-band confirmation for high-stakes mutations.",
    images: [
      {
        src: "/ayo-speaking-llmday.jpg",
        alt: "Adefisayo Adejumo presenting the LAR framework at LLMday London",
      },
    ],
    technologies: ["OAuth 2.0 Token Exchange", "CIBA", "Agent Governance", "TypeScript", "Python", "FastAPI"],
    slides: [],
    categories: ["AI", "Backend"],
    caseStudy: {
      role: "Creator & Lead Researcher — authored the framework architecture, RFC implementations, and interactive live demonstration.",
      problem:
        "When an AI agent runs in an enterprise, it usually borrows the developer's full login credentials. If the model misunderstands a task or gets tricked by prompt injection, nothing stops it from reading confidential files or transferring money. Worst of all, enterprise audit logs only record a generic bot account, making it impossible to prove which human authorized the action.",
      challenges: [
        {
          title: "Excessive Ambient Authority (The Open Laptop Problem)",
          problem:
            "Agents inherit wide, long-lived access tokens, meaning a coding bot often has permission to delete production databases or read HR payroll.",
          engineeringDecision:
            "Applied Lock: utilized OAuth 2.0 Token Exchange (RFC 8693) to downscope tokens into single-purpose, ephemeral credentials valid only for the specific micro-task.",
          impact:
            "Agent credentials are downscoped for the task, limiting what a run can request under the configured policy.",
        },
        {
          title: "Human accountability at sensitive actions",
          problem:
            "Service-account logs can obscure which person initiated an agent run, while high-risk actions may need a separate approval step.",
          engineeringDecision:
            "Applied Attribute by attaching verifiable user attestation to downstream requests, and Require by using CIBA to request approval before configured high-risk actions proceed.",
          impact:
            "Requests carry an inspectable human attribution, and the simulator demonstrates the approval boundary before a configured action continues.",
        },
      ],
      impact:
        "Published as a governance framework, presented at LLMday London, and made inspectable through an interactive simulator. The demo shows how scoped credentials, human attribution, and out-of-band approval fit into an agent workflow.",
      liveSimulation: "lar",
    },
  },
  {
    slug: "consumer-duty-sludge-audit",
    title: "Consumer Duty Sludge Audit Tool",
    period: "March 2026 to April 2026",
    summary:
      "An automated AI pipeline that audits complex financial and legal disclosures for 'sludge'—friction points, hidden cancel paths, and confusing terms—strictly grounded in FCA guidance FG22/5.",
    images: [{ src: "/project-sludge-audit.png", alt: "Consumer Duty Sludge Audit Tool interface" }],
    technologies: ["Python", "LangChain", "LangGraph", "ChromaDB", "Groq (LLaMA)", "FastAPI"],
    githubUrl: "https://github.com/Beloved1310/cd-audit-tool",
    categories: ["AI", "Backend"],
    caseStudy: {
      role: "Pipeline Architect & Engineer — designed the document segmentation, vector indexing, and grounded extraction agents.",
      problem:
        "Under the UK Financial Conduct Authority's Consumer Duty (FG22/5), firms need to identify cancellation friction, confusing terms, and barriers to switching or claiming refunds. This project turns policy disclosures into reviewable findings tied back to source text and FCA guidance.",
      challenges: [
        {
          title: "Overwhelming Unstructured Legal Text",
          problem:
            "Long disclosures combine dense definitions, cross-references, and cancellation conditions that are difficult to review together.",
          engineeringDecision:
            "Decomposed documents hierarchically using LangGraph, segmenting text into semantic regulatory units rather than arbitrary token chunks.",
          impact:
            "The report retains source passages and page references so reviewers can inspect each finding in context.",
        },
        {
          title: "Generic AI Hallucinations & Lack of Grounding",
          problem:
            "Off-the-shelf LLMs produce generic commentary that compliance officers cannot use because they fail to cite the exact legal sub-clause.",
          engineeringDecision:
            "Indexed the official FCA FG22/5 rules into ChromaDB vector stores and constrained LLaMA prompts to require paragraph-level citations for every finding.",
          impact:
            "Findings include source passages and relevant FCA clause references for analyst review.",
        },
        {
          title: "Slow Inference Speed Across Large Document Sets",
          problem:
            "Repeatedly sending whole documents to a general-purpose model makes the audit difficult to review and expensive to operate.",
          engineeringDecision:
            "Integrated high-speed Groq LPU inference running open-weight LLaMA models, enabling ultra-fast token generation at fraction of the cost.",
          impact:
            "The pipeline returns categorized findings with source passages and FCA clause references for an analyst to review.",
        },
      ],
      impact:
        "Turned opaque source material into categorized, actionable reports of customer friction points, complete with direct page references and specific FCA FG22/5 clause citations.",
    },
  },
  {
    slug: "equitie-portfolio-assistant",
    title: "EquiTie Investor Portfolio Assistant",
    period: "January 2026 to February 2026",
    summary:
      "A forward-deployed engineer prototype that answers private equity and angel investors' questions in plain English, with all financial calculations executed deterministically by code.",
    images: [{ src: "/project-equitie.png", alt: "EquiTie investor portfolio assistant prototype" }],
    technologies: ["Python", "FastAPI", "pandas", "pgvector", "Redis", "Groq (LLaMA)", "React"],
    categories: ["AI", "Backend", "Frontend"],
    caseStudy: {
      role: "Forward Deployed Engineer — built the prototype, authored the requirements specification, and developed the six-month production roadmap.",
      problem:
        "Private equity investors and angel syndicates need fast, clear answers about their fund portfolios: total capital called, internal rate of return (IRR), and sector exposure. When standard AI chat bots are asked to calculate returns from financial tables, they frequently invent plausible-sounding numbers with absolute confidence, leading to dangerous financial misinformation.",
      challenges: [
        {
          title: "Language Models Doing Math (Probabilistic Hallucination)",
          problem:
            "Large language models are word predictors, not calculators; asking them to compute IRR or currency exchanges on balance sheets results in confident errors.",
          engineeringDecision:
            "Decoupled calculation completely from language generation. Structured Python and pandas to execute arithmetic and table aggregations deterministically.",
          impact:
            "Calculation outputs come from source data and deterministic code, so the language model does not invent arithmetic results.",
        },
        {
          title: "Translating Vague Human Questions into Queries",
          problem:
            "Investors ask varied questions like 'Which European fintechs in Fund II are outperforming?' requiring complex table filters.",
          engineeringDecision:
            "Used fast Groq LLaMA models solely as a semantic parser to translate user intent into structured pandas query parameters, and then format verified computational results into natural English.",
          impact:
            "The interface pairs plain-language answers with calculation results that can be traced to the underlying portfolio data.",
        },
        {
          title: "Bridging Prototype to Enterprise Roadmaps",
          problem:
            "A prototype is difficult to evaluate without a clear path for integrating it with a fund's existing accounting systems.",
          engineeringDecision:
            "Authored system architecture and data pipeline specifications alongside a phased enterprise delivery plan.",
          impact:
            "Gave executive stakeholders a clear path from prototype to production roll-out.",
        },
      ],
      impact:
        "The prototype keeps financial calculations in deterministic code and grounds conversational responses in query output.",
    },
  },
  {
    slug: "worknoon",
    title: "Worknoon",
    period: "2024 to 2025",
    summary:
      "A live platform for finding, booking, and managing coworking desks, private office suites, and meeting spaces with instant real-time reservations.",
    images: [{ src: "/project-worknoon.png", alt: "Worknoon coworking booking platform" }],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://worknoon.com",
    liveLabel: "Visit worknoon.com",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      role: "Full-Stack Engineer — owned the booking engine, user account management, and payment checkout from initial architecture to live launch.",
      problem:
        "Booking a desk or meeting room required back-and-forth with office managers and manual payment confirmation. Worknoon brings availability, reservation, and checkout into one booking flow.",
      challenges: [
        {
          title: "Double-Booking Race Conditions",
          problem:
            "When multiple remote workers attempted to book the same prime meeting room simultaneously, legacy systems created double bookings.",
          engineeringDecision:
            "Engineered atomic row-level locking in PostgreSQL during checkout transactions to guarantee that once a room is reserved, it is locked immediately.",
          impact:
            "The database transaction makes availability checking and reservation a single operation, so competing requests cannot both claim the same slot.",
        },
        {
          title: "Complex Multi-Seat Team Billing",
          problem:
            "Companies needed their employees to book desks individually while billing the expenses automatically to a centralized corporate account.",
          engineeringDecision:
            "Architected hierarchical team account structures with role-based budget limits and automated monthly invoicing.",
          impact:
            "Enabled seamless corporate team onboarding without manual finance manager approvals for every desk.",
        },
      ],
      impact:
        "Worknoon brings workspace discovery, reservation, confirmation, and team billing into one live booking flow.",
    },
  },
  {
    slug: "driver-certified",
    title: "Driver Certified",
    period: "2023 to 2024",
    summary:
      "A commercial ride-hailing and verified driver platform on the iOS App Store in Nigeria, supporting instant bookings, pre-scheduled rides, hourly hire plans, and real-time GPS tracking.",
    images: [
      { src: "/project-driver-certified.png", alt: "Driver Certified ride booking app" },
      { src: "/driver-certified.jpg", alt: "Driver Certified listing on the App Store" },
    ],
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Geospatial Indexing", "REST APIs"],
    githubUrl: "https://github.com/Beloved1310/Driver-Certified-Project",
    categories: ["Backend"],
    caseStudy: {
      role: "Backend Engineer — architected accounts, trip lifecycle management, geospatial driver matching, and payment plan APIs.",
      problem:
        "Commuters and corporate travelers in Nigeria need vetted, professional chauffeurs they can trust. However, existing ride apps only offered instant on-demand rides, leaving travelers stranded when they needed to reserve drivers days in advance or book a chauffeur for a full day of meetings.",
      challenges: [
        {
          title: "Matching Drivers Across Fluctuating Cellular Networks",
          problem:
            "Spotty mobile data in dense urban areas caused driver coordinate pings to drop, leading to inaccurate ETAs and lost dispatches.",
          engineeringDecision:
            "Optimized MongoDB geospatial 2dsphere indexing and designed reconnect-tolerant polling endpoints that smooth driver positions over intermittent connections.",
          impact:
            "The dispatch flow matches requests against location-indexed driver data and displays location updates as connections recover.",
        },
        {
          title: "Handling Varied Booking Modalities in One State Machine",
          problem:
            "Supporting instant trips, future reservations, and multi-hour hire plans required radically different billing and driver availability rules.",
          engineeringDecision:
            "Designed a strict finite state machine managing trip lifecycles (requested, accepted, arriving, in-transit, completed) with mode-specific pricing rules.",
          impact:
            "The state machine defines valid trip transitions and keeps pricing rules attached to the selected booking mode.",
        },
      ],
      impact:
        "Live on the iOS App Store in Nigeria, handling real-time driver dispatches, ride reservations, and flexible time plans with high reliability.",
    },
  },
  {
    slug: "image-management-system",
    title: "Medical Image Management System",
    period: "MSc project, Kingston University",
    summary:
      "A GDPR-compliant, fault-tolerant microservices system for storing, processing, and accessing clinical diagnostic medical images with strict access controls.",
    images: [{ src: "/optimized/ims.jpg", alt: "Image Management System dashboard" }],
    technologies: ["React", "Node.js", "Redis", "MongoDB", "Docker", "Express", "Microservices"],
    githubUrl: "https://github.com/Beloved1310/ABC-Healthcare-Image-Management-System",
    liveUrl: "https://drive.google.com/file/d/1thOixwBknIPQhU3e68eW-ypTYcil6MES/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      role: "System Architect & Developer — designed and implemented the containerized microservices architecture and GDPR compliance layer.",
      problem:
        "In healthcare, medical scans (CT, MRI, X-rays) are vital for patient diagnoses. When hospital systems run as monolithic software, a crash in an image conversion worker can bring down the entire hospital viewing platform. Furthermore, patient scan archives must strictly follow GDPR patient privacy laws.",
      challenges: [
        {
          title: "Monolithic Cascading Outages",
          problem:
            "If heavy image conversion tasks hung or ran out of memory, clinician viewing portals crashed.",
          engineeringDecision:
            "Decomposed the system into independent microservices (Auth, Image Ingestion, Metadata Store, Audit Log) packaged in Docker containers.",
          impact:
            "Separating background processing from image viewing keeps conversion failures within the service that owns that work.",
        },
        {
          title: "GDPR Consent & Immutable Audit Logs",
          problem:
            "Hospital data audits must account for every clinician who viewed or exported a patient record.",
          engineeringDecision:
            "Implemented an immutable cryptographic audit ledger recording every record access with timestamps and physician IDs.",
          impact:
            "Access records and consent state are represented in the application for inspection during a privacy review.",
        },
      ],
      impact:
        "Built a healthcare imaging prototype with isolated image-processing services and an access audit trail, making the privacy and failure boundaries explicit for review.",
    },
  },
  {
    slug: "learnquest",
    title: "LearnQuest",
    period: "MSc dissertation, Kingston University",
    summary:
      "A behavioral learning platform grounded in Duckworth's Grit Theory that leverages generative AI to analyze student struggle cues and dynamically adapt curriculum to sustain learner perseverance.",
    images: [{ src: "/optimized/learnquest.jpg", alt: "Learn Quest account sign-up screen" }],
    technologies: ["JavaScript", "LLMs", "React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    githubUrl: "https://github.com/Beloved1310/Behavioural-learning-platformBE/tree/feat/core-grit-therory",
    liveUrl: "https://drive.google.com/file/d/1-oHydyrSeqxvyHfaIuuFCd1OGb4vmB2i/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["AI", "Frontend", "Backend"],
    caseStudy: {
      role: "Researcher & Lead Engineer — authored the theoretical pedagogy, implemented the AI adaptive engine, and developed the full-stack web application.",
      problem:
        "As a former high school teacher in Nigeria, I saw students give up not because they lacked intelligence, but because they lost confidence the first time a concept became hard. Online learning platforms typically give binary right/wrong scores that demotivate struggling learners. LearnQuest asked: can software operationalize Angela Duckworth's 'Grit Theory' to help students keep going?",
      challenges: [
        {
          title: "Translating Psychological Grit into Software Algorithms",
          problem:
            "Psychological concepts like 'perseverance' and 'growth mindset' are subjective and hard to quantify in code.",
          engineeringDecision:
            "Modeled attempt patterns, time spent on difficult sub-steps, and retry resilience into a dynamic student state machine.",
          impact:
            "Transformed abstract behavioral science into responsive software heuristics.",
        },
        {
          title: "Preventing Student Frustration Spikes",
          problem:
            "When students hit a wall, generic hints feel patronizing and students close the tab.",
          engineeringDecision:
            "Used LLMs to generate empathetic, growth-mindset feedback tailored to where the learner specifically struggled, scaling challenge difficulty dynamically.",
          impact:
            "The adaptive flow changes the hint and next exercise in response to the learner's attempt pattern.",
        },
      ],
      impact:
        "Completed as an MSc dissertation at Kingston University London and awarded a Distinction. The prototype demonstrates how feedback and exercise difficulty can respond to learner behavior.",
    },
  },
  {
    slug: "voting-module-sidechain",
    title: "Voting Module Sidechain",
    period: "October 2024 to December 2024",
    summary:
      "A high-integrity blockchain voting module built on the Klayr SDK that cryptographically verifies every vote and deterministically closes polls at block expiration. Awarded an ecosystem grant.",
    images: [{ src: "/optimized/voting-module.jpg", alt: "Voting Module code and terminal output in a code editor" }],
    technologies: ["TypeScript", "Klayr SDK", "Blockchain", "Cryptography", "Node.js"],
    githubUrl: "https://github.com/Beloved1310/voting-module",
    highlight: { label: "Grant winner", postUrl: "https://lnkd.in/p/eZfhQaGj" },
    liveUrl: "https://drive.google.com/file/d/1UP7HZGOc6euso3gTK4pi9z3_r7RyrTuN/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["Backend"],
    caseStudy: {
      role: "Solo Blockchain Engineer — architected custom sidechain stores, transactions, and on-block verification commands.",
      problem:
        "Online voting in community organizations and decentralized groups often suffers from low trust: administrators can secretly alter poll close times, voters worry ballots might be double-counted, and audit logs are easy to manipulate. We needed a verifiable system where voting rules and deadlines are set in code and mathematically impossible to tamper with.",
      challenges: [
        {
          title: "Double-Voting and Ballot Tampering",
          problem:
            "Preventing voters from casting multiple ballots across decentralized nodes without leaking individual voter anonymity.",
          engineeringDecision:
            "Designed dedicated transaction assets on the Klayr SDK that cryptographically verify cryptographic signatures and record votes into immutable Merkle state stores.",
          impact:
            "The transaction handler checks voter signatures and ballot state before recording a vote.",
        },
        {
          title: "Deterministic Poll Closure Without Human Intervention",
          problem:
            "Human administrators often forget or intentionally delay poll closure to let favorable votes slip in.",
          engineeringDecision:
            "Implemented on-block lifecycle hooks that monitor blockchain block height and automatically seal tallies at the exact expiration block.",
          impact:
            "The poll closes from block-height state, so the closing rule is inspectable and does not depend on a manual administrator action.",
        },
      ],
      impact:
        "The project won a competitive blockchain developer grant and recognition across the web3 community for its clean module architecture and verifiable ballot execution.",
    },
  },
  {
    slug: "first-aid-app-generator",
    title: "QuickAid Emergency First-Aid Assistant",
    summary:
      "A rapid-response emergency guidance generator powered by the Gemini API that provides immediate, prioritized first-aid protocols during critical medical incidents.",
    images: [{ src: "/optimized/first-aid.jpg", alt: "QuickAid first-aid guidance form" }],
    technologies: ["Python", "Gemini API", "Streamlit", "Prompt Engineering"],
    githubUrl: "https://github.com/Beloved1310/First-Aid-App-Generator",
    liveUrl: "https://drive.google.com/file/d/17iG_j87JgZhA7VfMZp9zczOsYART1VYj/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["AI", "Frontend"],
    caseStudy: {
      role: "Creator & AI Engineer — developed the specialized emergency prompts, safety checks, and Streamlit user experience.",
      problem:
        "In a medical emergency (choking, severe burn, fracture, allergic reaction), bystanders panic. Searching Google brings up pages of ads and walls of text, while standard AI chatbots waste precious seconds greeting the user. People need life-saving physical steps immediately.",
      challenges: [
        {
          title: "Conversational Lag During Life-Threatening Seconds",
          problem:
            "Standard conversational models output polite preamble like 'I am sorry to hear you are having an emergency,' wasting time.",
          engineeringDecision:
            "Used instruction-constrained prompts to prioritize a concrete safety action before explanatory text.",
          impact:
            "The response starts with an ordered first-aid action and follows with relevant cautions and guidance.",
        },
      ],
      impact:
        "Built an emergency assistant that structures guidance as prioritized actions and keeps a reminder to contact emergency services visible in the interface.",
    },
  },
  {
    slug: "nowdevhub",
    title: "NowDevHub Developer Community",
    summary:
      "A dedicated community platform and resource hub for ServiceNow developers to exchange reusable components, Script Includes, and architectural insights with real-time live discussions.",
    images: [{ src: "/optimized/nowdevhub.jpg", alt: "NowDevHub login screen" }],
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Express", "Tailwind CSS"],
    githubUrl: "https://github.com/Beloved1310",
    liveUrl: "https://nowdevhub-frontend-webapp.vercel.app/login",
    liveLabel: "Visit NowDevHub",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      role: "Full-Stack Engineer — architected the real-time messaging layer, relational PostgreSQL database, and React client application.",
      problem:
        "ServiceNow developers work on complex enterprise workflows and often solve similar implementation challenges in silos. There was no real-time hub where practitioners could share snippets, get code reviewed, and discuss best practices live.",
      challenges: [
        {
          title: "Stale Forum Discussions",
          problem:
            "Traditional developer forums require constant manual page reloads, causing discussions to drag on for hours.",
          engineeringDecision:
            "Implemented real-time WebSockets with Socket.io on Node.js to provide instant chat, presence detection, and community pings.",
          impact:
            "Developers can share code snippets and exchange messages through a live Socket.io connection.",
        },
      ],
      impact:
        "Deployed a ServiceNow resource hub with code sharing, discussion, and live collaboration, available at the linked site.",
    },
  },
  {
    slug: "shefi-solana",
    title: "Solana Smart Contract & DeFi Tracker",
    summary:
      "A decentralized finance and SPL token tracking interface built during the SheFi technical fellowship, with wallet connectivity and live Solana cluster subscriptions.",
    images: [],
    technologies: ["Solana", "Web3.js", "Rust", "React", "TypeScript", "Tailwind CSS"],
    categories: ["Backend", "Frontend"],
    caseStudy: {
      role: "Web3 Engineer — built the Solana wallet integration, SPL token balance tracker, and real-time transaction event listeners.",
      problem:
        "On Solana, a frontend needs to reflect wallet and account changes from the cluster without relying on repeated manual refreshes.",
      challenges: [
        {
          title: "Handling Sub-Second Finality in UI",
          problem:
            "Repeated HTTP polling can leave displayed balances stale while account state changes on the cluster.",
          engineeringDecision:
            "Subscribed directly to Solana cluster WebSocket RPC streams, listening for slot commitment updates and balance changes live.",
          impact:
            "Delivered instant visual feedback as soon as transactions were confirmed on-chain.",
        },
      ],
      impact:
        "Delivered a DeFi tracker that connects a wallet and reflects account and transaction updates from Solana subscriptions.",
    },
  },
];

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);

export interface OpenSourceContribution {
  repo: string;
  title: string;
  description: string;
  url: string;
  status?: string;
}

export const openSource: OpenSourceContribution[] = [
  {
    repo: "Tracer-Cloud/opensre",
    title: "Issue #4650",
    description: "Contribution to opensre, an AI SRE agent toolkit.",
    url: "https://github.com/Tracer-Cloud/opensre/issues/4650",
  },
  {
    repo: "CodeYourFuture/curriculum",
    title: "PR #1752",
    description: "Moved professional development content out of a CMS that was being retired.",
    url: "https://github.com/CodeYourFuture/curriculum/pull/1752",
    status: "Contributed",
  },
];
