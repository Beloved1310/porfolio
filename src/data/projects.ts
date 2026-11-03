export type ProjectCategory = "AI" | "Backend" | "Frontend";

export interface ImageSource {
  src: string;
  alt: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
  description?: string;
}

export interface ChallengeStory {
  title: string;
  problem: string;
  engineeringSolution?: string;
  engineeringDecision?: string;
  impact: string;
  reflection?: string;
}

export interface CaseStudy {
  role: string;
  // The 4 Core Pillars requested by user:
  problem: string;
  engineeringSolutions: string[];
  impact: string;
  reflection: string[];

  // Structured breakdown for each challenge story:
  challenges: ChallengeStory[];

  metrics?: MetricHighlight[];
  context?: string;
  takeaways?: string[];
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
            "Zero unvetted or accidental posts reached public channels, delivering 100% human sign-off compliance.",
        },
        {
          title: "Multi-Agent Coordination & Tone Consistency",
          problem:
            "Different channels demand radically different tones: an in-depth technical blog post requires rigorous citations, while an X thread needs concise brevity. Monolithic prompts failed to balance both.",
          engineeringDecision:
            "Built a modular multi-agent graph on Google ADK and Vertex AI Agent Engine. Dedicated research agents collect raw facts, channel-specialist agents craft custom copy, and an editor agent checks facts against source citations.",
          impact:
            "Cut content research-to-draft turnaround time by 65% while keeping channel-specific voices consistent.",
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
      engineeringSolutions: [
        "Multi-Agent Graph on Google ADK: Architected a specialized agent team using Google ADK and Vertex AI Agent Engine, separating research, channel copywriting, and compliance review into distinct stages.",
        "Hard Approval Gates & Scoped Tokens: Enforced short-lived, task-bound credentials per agent execution. Publishing steps stop at approval gates until confirmed by a human.",
        "Real-Time React & FastAPI Control Plane: Built an interactive control plane streaming agent thoughts, tool invocations, and draft diffs live via WebSockets.",
      ],
      impact:
        "Reduced time from raw research to reviewable multi-channel drafts by 65%, with zero unvetted publishing errors. Now serves as the primary live operational testbed for LAR agentic governance.",
      metrics: [
        { label: "Turnaround Time", value: "65% Faster", description: "From raw research to reviewable drafts" },
        { label: "Publishing Errors", value: "0 Incidents", description: "Mandatory human sign-off on public pushes" },
        { label: "Architecture", value: "Google ADK", description: "Vertex AI Agent Engine + FastAPI & React" },
      ],
      reflection: [
        "Human-in-the-loop is not an impediment to AI speed; it is the fundamental prerequisite for deploying autonomous agents in production.",
        "Observability creates trust: streaming agent reasoning in real-time turns an opaque black box into an intuitive co-pilot.",
        "Building safety gates at the protocol level is vastly more reliable than relying on polite system prompts.",
      ],
      simulation: { label: "Try the LAR governance simulation", to: "/projects/lar-framework#lar-framework-simulation" },
    },
  },
  {
    slug: "lar-framework",
    title: "LAR framework (Lock, Attribute, Require)",
    summary:
      "A principled governance framework for autonomous AI agents in enterprise production: Lock privilege scopes, Attribute every action to an accountable human, and Require out-of-band confirmation for high-stakes mutations.",
    images: [],
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
            "Completely eliminated ambient authority; an agent compromised by prompt injection has zero power outside its narrow assigned task.",
        },
        {
          title: "Anonymous Bot Logs & Broken Audit Trails",
          problem:
            "When security teams inspect API logs, all bot actions appear under the same service account, breaking regulatory compliance and chain-of-custody.",
          engineeringDecision:
            "Applied Attribute: embedded verifiable cryptographic user attestation into every downstream request, guaranteeing that every agent invocation is tied to an accountable human principal.",
          impact:
            "Created 100% auditable logs where compliance officers can identify the exact human accountable for every automated API call.",
        },
        {
          title: "Unverified Irreversible Mutations",
          problem:
            "High-stakes actions (transferring funds, deleting customer data, sending mass emails) execute automatically without secondary verification.",
          engineeringDecision:
            "Applied Require: integrated Client-Initiated Backchannel Authentication (CIBA) to push verification requests directly to the responsible human's phone before executing critical actions.",
          impact:
            "Provided bank-grade security: the agent cannot execute an irreversible action without an explicit push approval from a human mobile device.",
        },
      ],
      engineeringSolutions: [
        "Lock: Implemented OAuth 2.0 Token Exchange (RFC 8693) to downscope ambient user tokens into single-purpose, ephemeral credentials restricted strictly to the agent's immediate task.",
        "Attribute: Embedded verifiable user identity into every downstream API request, guaranteeing that every agent invocation is cryptographically attributable to a human principal.",
        "Require: Integrated Client-Initiated Backchannel Authentication (CIBA) to push verification requests directly to the responsible human's device before executing high-risk mutations.",
      ],
      impact:
        "Established a foundational security standard for AI agent execution. Presented as a keynote talk at LLMday London ('Your Agent Left the Laptop Open. LAR Closes It') and demonstrated through an interactive live simulator.",
      metrics: [
        { label: "Privilege Scope", value: "Zero Ambient", description: "Ephemeral downscoped tokens via RFC 8693" },
        { label: "Audit Traceability", value: "100%", description: "Every action tied cryptographically to a human" },
        { label: "Verification Standard", value: "CIBA", description: "Out-of-band push confirmation for critical actions" },
      ],
      reflection: [
        "Agent security is identity security: agents should never possess more ambient authority than the human they act on behalf of.",
        "CIBA is the natural bridge between autonomous execution and human safety, mirroring modern multi-factor banking authorizations.",
        "Interactive live simulations communicate complex distributed auth models far more effectively than static architecture diagrams.",
      ],
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
        "Under the UK Financial Conduct Authority's Consumer Duty (FG22/5), banks and lenders are legally required to find and remove 'sludge': tricky cancellation journeys, misleading fine print, and unnecessary steps that stop customers from switching or claiming refunds. Compliance officers were spending hundreds of hours reading through massive 100+ page policy disclosures by hand, resulting in missed violations and inconsistent findings.",
      challenges: [
        {
          title: "Overwhelming Unstructured Legal Text",
          problem:
            "Disclosures span hundreds of pages filled with dense legal definitions, contradictory clauses, and buried conditions.",
          engineeringDecision:
            "Decomposed documents hierarchically using LangGraph, segmenting text into semantic regulatory units rather than arbitrary token chunks.",
          impact:
            "Preserved complete legal context across complex multi-page cancellation clauses.",
        },
        {
          title: "Generic AI Hallucinations & Lack of Grounding",
          problem:
            "Off-the-shelf LLMs produce generic commentary that compliance officers cannot use because they fail to cite the exact legal sub-clause.",
          engineeringDecision:
            "Indexed the official FCA FG22/5 rules into ChromaDB vector stores and constrained LLaMA prompts to require paragraph-level citations for every finding.",
          impact:
            "Every single flagged sludge practice directly cites the relevant FCA requirement.",
        },
        {
          title: "Slow Inference Speed Across Large Document Sets",
          problem:
            "Auditing enterprise document repositories with traditional cloud APIs took hours per run and racked up massive API bills.",
          engineeringDecision:
            "Integrated high-speed Groq LPU inference running open-weight LLaMA models, enabling ultra-fast token generation at fraction of the cost.",
          impact:
            "Accelerated full-document compliance audits by 90%, delivering actionable findings in under 3 minutes.",
        },
      ],
      engineeringSolutions: [
        "Hierarchical LangGraph Pipeline: Decomposed long-form documents into semantic sections, routing each block through specialized extraction and validation agents.",
        "ChromaDB Vector Retrieval: Indexed official FCA regulatory texts in ChromaDB, matching potential sludge patterns against specific compliance clauses.",
        "High-Speed Groq LLaMA Inference: Powered inference with LLaMA models running on Groq hardware for rapid token generation with verifiable citations.",
      ],
      impact:
        "Turned opaque source material into categorized, actionable reports of customer friction points, complete with direct page references and specific FCA FG22/5 clause citations.",
      metrics: [
        { label: "Audit Acceleration", value: "90% Faster", description: "Compared to manual compliance document reviews" },
        { label: "Regulatory Basis", value: "FCA FG22/5", description: "Every flagged item is grounded with direct clause citations" },
        { label: "Inference Speed", value: "Sub-Second", description: "High-throughput token generation via Groq LPUs" },
      ],
      reflection: [
        "RAG pipelines are only as strong as their chunking strategy; splitting by semantic legal clauses rather than arbitrary character lengths prevents lost context.",
        "Grounded extraction with strict citation constraints builds immediate trust with compliance and legal officers.",
        "Speed transforms compliance from a quarterly dread into a continuous, real-time audit capability.",
      ],
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
            "Decoupled calculation completely from language generation. Structured Python and pandas to execute 100% of arithmetic and table aggregations deterministically.",
          impact:
            "Achieved 100% calculation accuracy with zero math hallucinations.",
        },
        {
          title: "Translating Vague Human Questions into Queries",
          problem:
            "Investors ask varied questions like 'Which European fintechs in Fund II are outperforming?' requiring complex table filters.",
          engineeringDecision:
            "Used fast Groq LLaMA models solely as a semantic parser to translate user intent into structured pandas query parameters, and then format verified computational results into natural English.",
          impact:
            "Investors receive conversational, instant answers backed by verifiable math in under 800ms.",
        },
        {
          title: "Bridging Prototype to Enterprise Roadmaps",
          problem:
            "Great code is useless if enterprise fund stakeholders cannot see how it will integrate with legacy accounting ledgers over the next 6 months.",
          engineeringDecision:
            "Authored complete system architecture specifications, data pipeline designs, and a phased 6-month enterprise delivery plan alongside the working prototype.",
          impact:
            "Gave executive stakeholders a clear path from prototype to production roll-out.",
        },
      ],
      engineeringSolutions: [
        "Deterministic Math Engine: Python and pandas execute 100% of arithmetic and valuation calculations directly on source tabular data.",
        "LLM Purely for Language Translation: Employed LLaMA models on Groq solely to interpret user intent into structured query parameters and format verified results into clean summaries.",
        "Forward-Deployed Architecture Spec: Delivered complete API specifications, pgvector schemas, and a 6-month enterprise delivery plan.",
      ],
      impact:
        "Achieved 100% computational accuracy with zero arithmetic hallucinations, giving investors instant answers grounded in verifiable tabular calculations.",
      metrics: [
        { label: "Math Accuracy", value: "100%", description: "All calculations handled deterministically by pandas" },
        { label: "Query Latency", value: "<800ms", description: "FastAPI + Redis caching for instantaneous responses" },
        { label: "Deliverable", value: "Code + Roadmap", description: "Prototype paired with 6-month enterprise spec" },
      ],
      reflection: [
        "Never ask a language model to do math: let code calculate and let the model translate.",
        "Forward deployed engineering requires mastering both deep technical execution and strategic product ownership.",
        "Enterprise clients value deterministic guarantees far more than flashy probabilistic features.",
      ],
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
        "Finding and booking a desk or private meeting room was painful: users had to exchange multiple emails with office managers, wait for manual confirmation, and deal with clunky payment links. Worknoon was built to make reserving a workspace take less than 60 seconds with instant confirmation.",
      challenges: [
        {
          title: "Double-Booking Race Conditions",
          problem:
            "When multiple remote workers attempted to book the same prime meeting room simultaneously, legacy systems created double bookings.",
          engineeringDecision:
            "Engineered atomic row-level locking in PostgreSQL during checkout transactions to guarantee that once a room is reserved, it is locked immediately.",
          impact:
            "Zero double-booking conflicts across high-demand workspace inventory.",
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
      engineeringSolutions: [
        "Atomic Reservation Engine: Engineered database transaction locks in PostgreSQL to guarantee atomic seat reservations with zero double-booking risk.",
        "Responsive Client Application: Built a responsive, accessible React interface styled with Tailwind CSS, featuring interactive space previews and instant checkout.",
        "Unified Account & Operator Dashboard: Created portals for workspace managers to update real-time availability, track occupancy, and review billing.",
      ],
      impact:
        "Successfully launched Worknoon at worknoon.com, allowing users to discover and reserve workspaces in under a minute with automated confirmation and billing.",
      metrics: [
        { label: "Reservation Time", value: "<60s", description: "From space search to confirmed reservation" },
        { label: "Production Status", value: "Live", description: "Active commercial deployment at worknoon.com" },
        { label: "Booking Reliability", value: "100%", description: "Zero double-booking conflicts via atomic locks" },
      ],
      reflection: [
        "Simplicity in checkout flows directly correlates with booking completion rates.",
        "Handling reservation time slots with strict UTC timestamps prevents timezone scheduling discrepancies.",
        "Giving workspace operators automated management tools reduces human operational overhead by half.",
      ],
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
            "Reduced driver dispatch query latency to under 250ms with reliable GPS tracking.",
        },
        {
          title: "Handling Varied Booking Modalities in One State Machine",
          problem:
            "Supporting instant trips, future reservations, and multi-hour hire plans required radically different billing and driver availability rules.",
          engineeringDecision:
            "Designed a strict finite state machine managing trip lifecycles (requested, accepted, arriving, in-transit, completed) with mode-specific pricing rules.",
          impact:
            "Prevented illegal trip state transitions and eliminated rider billing disputes.",
        },
      ],
      engineeringSolutions: [
        "Geospatial MongoDB Routing: Utilized MongoDB 2dsphere indexes to perform sub-second driver proximity lookups and track active trip coordinates.",
        "State-Machine Trip Lifecycle: Designed a resilient state machine managing trip stages from request to completion.",
        "Modular Micro-Services: Built RESTful services in Node.js and Express handling user profiles, driver verification, and payment plans.",
      ],
      impact:
        "Live on the iOS App Store in Nigeria, handling real-time driver dispatches, ride reservations, and flexible time plans with high reliability.",
      metrics: [
        { label: "App Store Status", value: "iOS Live", description: "Published on the App Store serving passengers & drivers" },
        { label: "Dispatch Query", value: "<250ms", description: "Geospatial proximity query response time" },
        { label: "Trip Modalities", value: "3 Modes", description: "Instant hailing, scheduled bookings, and hourly hire" },
      ],
      reflection: [
        "Designing trip lifecycles as strict finite state machines prevents illegal state transitions during intermittent mobile reconnects.",
        "Geospatial indexing must be tuned alongside query limits to maintain sub-second performance at scale.",
      ],
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
            "A failure in one background service cannot disrupt clinical viewing workflows, achieving zero-downtime fault isolation.",
        },
        {
          title: "GDPR Consent & Immutable Audit Logs",
          problem:
            "Hospital data audits must account for every clinician who viewed or exported a patient record.",
          engineeringDecision:
            "Implemented an immutable cryptographic audit ledger recording every record access with timestamps and physician IDs.",
          impact:
            "Achieved 100% GDPR compliance audit readiness.",
        },
      ],
      engineeringSolutions: [
        "Decomposed Microservices: Split the platform into independent services running in Docker containers.",
        "Redis In-Memory Acceleration: Deployed Redis caching to serve frequently accessed diagnostic records with microsecond latency.",
        "Immutable Audit Logs: Implemented cryptographic logging for every patient record inspection.",
      ],
      impact:
        "Built a resilient healthcare imaging platform where individual service crashes could not disrupt clinical viewing workflows, achieving complete GDPR compliance validation.",
      metrics: [
        { label: "GDPR Conformance", value: "100%", description: "Granular consent tracking and encrypted diagnostic data" },
        { label: "Architecture", value: "Dockerized", description: "Independent microservices with Redis caching and Node.js" },
        { label: "Fault Isolation", value: "Zero Downtime", description: "Service failures isolated to individual containers" },
      ],
      reflection: [
        "Compliance is an architectural constraint, not an afterthought; baking consent and auditing into service boundaries eliminates compliance retrofits.",
        "Containerization guarantees that sensitive diagnostic pipelines execute identically across staging and clinical production.",
      ],
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
            "Increased student task completion rates and time spent persevering through hard exercises.",
        },
      ],
      engineeringSolutions: [
        "Adaptive Prompting & Feedback Engine: Leveraged LLMs paired with custom scoring heuristics to analyze student attempt patterns, delivering empathetic, growth-mindset feedback.",
        "Dynamic Learning Pathways: Designed reactive frontend dashboards in React that visualize perseverance milestones rather than simple test scores.",
        "Full-Stack Node.js Architecture: Built robust APIs and MongoDB collections tracking learning trajectories.",
      ],
      impact:
        "Completed as MSc dissertation project at Kingston University London, earning Distinction honors and demonstrating how software can foster learner resilience.",
      metrics: [
        { label: "Academic Honor", value: "Distinction", description: "Awarded Distinction for MSc Software Engineering Dissertation" },
        { label: "Theoretical Base", value: "Grit Theory", description: "Angela Duckworth's psychological perseverance model in software" },
        { label: "Pedagogical Impact", value: "Adaptive", description: "Dynamic problem scaling based on student struggle indicators" },
      ],
      reflection: [
        "The best software interfaces understand human psychology; aligning UI feedback with intrinsic motivation fundamentally improves learning outcomes.",
        "Bridging domain knowledge (teaching) with technical craftsmanship (full-stack engineering) creates unique, high-impact products.",
      ],
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
            "Guaranteed 100% on-chain ballot deduplication and tamper resistance.",
        },
        {
          title: "Deterministic Poll Closure Without Human Intervention",
          problem:
            "Human administrators often forget or intentionally delay poll closure to let favorable votes slip in.",
          engineeringDecision:
            "Implemented on-block lifecycle hooks that monitor blockchain block height and automatically seal tallies at the exact expiration block.",
          impact:
            "Zero dispute over poll closing deadlines; execution is 100% deterministic.",
        },
      ],
      engineeringSolutions: [
        "Custom Sidechain Module: Built dedicated transaction commands for poll creation, ballot casting, and option revision using TypeScript and the Klayr framework.",
        "State Store Verification: Implemented isolated on-chain stores that validate voter cryptographic signatures and verify eligibility prior to state mutation.",
        "On-Block Expiration Logic: Engineered automated block lifecycle hooks that monitor block height and trigger final tally execution deterministically.",
      ],
      impact:
        "The project won a competitive blockchain developer grant and recognition across the web3 community for its clean module architecture and verifiable ballot execution.",
      metrics: [
        { label: "Industry Award", value: "Grant Winner", description: "Awarded competitive ecosystem developer grant" },
        { label: "Double-Vote Prevention", value: "100%", description: "Cryptographically enforced on-chain ballot deduplication" },
        { label: "Poll Execution", value: "Deterministic", description: "Automatic block-height lifecycle transitions" },
      ],
      reflection: [
        "Blockchain development demands zero-assumption defensive programming: all inputs must be rigorously validated before committing state.",
        "Building on modular SDKs like Klayr demonstrates how domain-specific application chains can solve trust bottlenecks.",
      ],
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
            "Engineered zero-shot prompts with negative constraints forcing the model to generate the immediate numbered physical action as token #1.",
          impact:
            "Delivered clear, prioritized first-aid instructions in under 2 seconds.",
        },
      ],
      engineeringSolutions: [
        "Engineered Gemini Prompts: Crafted strict system instructions instructing Gemini to format emergency responses into immediate numbered physical steps, bold warnings, and contraindications.",
        "Streamlined Streamlit Interface: Built a high-contrast, clean web interface allowing users to describe the emergency with a few keystrokes.",
        "Safety-First Triage Banners: Embedded persistent visual reminders to summon professional medical services.",
      ],
      impact:
        "Delivered a working emergency assistant capable of generating structured first-aid guidance in under 2 seconds, providing actionable support when stress is highest.",
      metrics: [
        { label: "Time to First Step", value: "<2s", description: "Immediate triage instruction generation via Gemini API" },
        { label: "Format", value: "Priority Ranked", description: "Urgent physical actions delivered first before secondary guidance" },
      ],
      reflection: [
        "Emergency UX requires extreme minimalism: eliminate all non-essential clicks and conversational filler.",
        "Prompt engineering for critical contexts requires negative constraints to ban disclaimers from delaying primary instructions.",
      ],
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
            "Enabled sub-50ms live chat and code snippet sharing across developers.",
        },
      ],
      engineeringSolutions: [
        "Socket.io Real-Time Infrastructure: Implemented WebSockets with Socket.io on Node.js to provide instant chat, presence detection, and community pings.",
        "Relational Schema on PostgreSQL: Designed normalized schemas for developer profiles, code artifacts, comments, and community upvotes.",
        "Modular React Frontend: Created a modern, accessible interface with syntax highlighting, search filters, and one-click code copying.",
      ],
      impact:
        "Deployed live on Vercel, providing ServiceNow practitioners with a dedicated, responsive resource sharing space and live collaboration channels.",
      metrics: [
        { label: "Broadcast Latency", value: "<50ms", description: "Real-time message and notification delivery via Socket.io" },
        { label: "Deployment", value: "Vercel + Node", description: "Live accessible developer portal" },
      ],
      reflection: [
        "Developer tools must prioritize fast search and effortless copy-paste affordances.",
        "WebSockets provide immense value for technical communities where live discussion drives peer problem solving.",
      ],
    },
  },
  {
    slug: "shefi-solana",
    title: "Solana Smart Contract & DeFi Tracker",
    summary:
      "A high-throughput decentralized finance and SPL token tracking interface built during the SheFi technical fellowship, featuring sub-second Solana cluster event streams and wallet connectivity.",
    images: [],
    technologies: ["Solana", "Web3.js", "Rust", "React", "TypeScript", "Tailwind CSS"],
    categories: ["Backend", "Frontend"],
    caseStudy: {
      role: "Web3 Engineer — built the Solana wallet integration, SPL token balance tracker, and real-time transaction event listeners.",
      problem:
        "Decentralized finance on high-speed blockchains like Solana operates at sub-second speeds. Many web frontends fail to handle rapid block confirmations, leaving users uncertain whether their transactions succeeded or failed.",
      challenges: [
        {
          title: "Handling Sub-Second Finality in UI",
          problem:
            "Traditional HTTP polling causes UI lag and out-of-sync token balances on high-throughput chains.",
          engineeringDecision:
            "Subscribed directly to Solana cluster WebSocket RPC streams, listening for slot commitment updates and balance changes live.",
          impact:
            "Delivered instant visual feedback as soon as transactions were confirmed on-chain.",
        },
      ],
      engineeringSolutions: [
        "Solana Web3.js Connection Layer: Integrated Solana JSON-RPC endpoints to query account info, verify signatures, and listen for on-chain state changes.",
        "Wallet Adapter Integration: Implemented standard Solana Wallet Adapter hooks in React with responsive connection modal dialogues.",
        "Optimistic UI Updates: Provided instant visual feedback on balance adjustments while awaiting confirmed cluster finality.",
      ],
      impact:
        "Delivered a responsive DeFi tracker showcasing sub-second transaction awareness and seamless wallet interactions on the Solana devnet and mainnet.",
      metrics: [
        { label: "Transaction Speed", value: "Sub-Second", description: "Solana slot awareness and live balance updates" },
        { label: "Fellowship", value: "SheFi Web3", description: "Advanced DeFi and smart contract development cohort" },
      ],
      reflection: [
        "Solana's architecture requires deep familiarity with account rent, Program Derived Addresses, and transaction instruction formatting.",
        "Real-time RPC websocket subscriptions provide vastly superior UX compared to repetitive polling on high-speed chains.",
      ],
    },
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
