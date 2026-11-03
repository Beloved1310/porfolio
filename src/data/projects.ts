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

export interface CaseStudy {
  // Story format: Context, Challenges, Solution, Result
  context: string;
  challenges: string[];
  solution: string[];
  result: string;
  role: string;
  metrics?: MetricHighlight[];
  takeaways?: string[];
  // Interactive simulations or slide decks
  simulation?: { label: string; to: string };
  liveSimulation?: "lar";
  story?: { label: string; to: string };
  // Backward compatibility
  problem?: string;
  approach?: string[];
  outcome?: string;
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
      context:
        "Modern digital teams need to research market trends, write authoritative articles, and distribute tailored copy across disparate channels (newsletters, blogs, social platforms). Unsupervised autonomous agents can move quickly, but deploying them without boundaries risks publishing unverified statements, hallucinatory metrics, or off-brand copy to all channels simultaneously. Content Creation Studio was built to combine agentic speed with deterministic safety.",
      challenges: [
        "Unsupervised Agent Risk: Agents that research, draft, and publish on their own can spread erroneous or hallucinated content to all public channels in a single unchecked run.",
        "Cross-Channel Synthesis: Coordinating specialized research agents with parallel channel writers (blog, LinkedIn, X) requires resilient asynchronous orchestration.",
        "Runtime Auditability: Tracking which agent generated a claim, which model validated it, and which human approved it requires granular cryptographic traceability.",
      ],
      solution: [
        "Multi-Agent Graph on Google ADK: Architected a multi-agent team utilizing Google ADK and Vertex AI Agent Engine. Dedicated research agents parse primary sources, channel-specialist agents write tailored copy, and an adversarial editor agent conducts quality and factual checks.",
        "Hard Approval Gates & Scoped Tokens: Enforced short-lived, task-bound credentials per agent execution. High-risk publishing steps stop dead at approval gates until a designated human explicitly signs off.",
        "Real-Time React & FastAPI Control Plane: Built an interactive control plane streaming agent thoughts, tool invocations, and draft diffs live via WebSockets, giving the operator complete steering control.",
      ],
      result:
        "Eliminated unvetted public publishing errors while reducing the time from initial research to multi-channel draft generation by 65%. Serves as the premier live operational testbed for the LAR agent governance framework.",
      metrics: [
        { label: "Turnaround Time", value: "65% Faster", description: "From raw research to reviewable drafts" },
        { label: "Publishing Errors", value: "0 Incidents", description: "Mandatory human sign-off on public pushes" },
        { label: "Architecture", value: "Google ADK", description: "Vertex AI Agent Engine + FastAPI & React" },
      ],
      takeaways: [
        "Human-in-the-loop gates do not slow autonomous pipelines down; they provide the safety boundary required to run agents in production.",
        "Streaming internal agent thoughts in real-time builds user confidence and turns opaque AI into an intuitive steering tool.",
      ],
      simulation: { label: "Try the LAR governance simulation", to: "/projects/lar-framework#lar-framework-simulation" },
      problem:
        "Agents that research, write and publish on their own are fast. They can also post the wrong thing to every channel in one go. I wanted the speed without the risk.",
      approach: [
        "One agent researches. Review loops check quality. Writers for each channel work in parallel. It runs on Google ADK and Vertex AI Agent Engine.",
        "Every session gets its own short-lived credentials. Every action is recorded against the person it was done for. High-risk actions stop at an approval gate until a human says yes.",
        "A FastAPI and React control plane streams each step live, so a person can watch and steer.",
      ],
      outcome:
        "It is also my LAR test bed. I run two copies side by side, one governed by LAR and one not, and the difference speaks for itself.",
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
      context:
        "Most production agent architectures borrow the full ambient credentials of whichever developer or service account initiated them. When an agent misinterprets instructions or suffers prompt injection, it can execute irreversible actions across databases, billing APIs, or communications channels. In post-mortems, audit logs only show a machine service account, leaving organizations unable to determine who authorized what.",
      challenges: [
        "Ambient Privilege Escalation: Agents routinely run with wide, long-lived tokens, giving them unwarranted access across internal APIs.",
        "Obscured Auditability: Enterprise logging systems record bot actions under generic credentials, destroying compliance and chain-of-custody tracking.",
        "Lack of Out-of-Band Verification: High-risk operational or financial mutations execute without secondary channel verification from the responsible human.",
      ],
      solution: [
        "Lock: Implemented OAuth 2.0 Token Exchange (RFC 8693) to downscope ambient user tokens into single-purpose, ephemeral credentials restricted strictly to the agent's immediate task.",
        "Attribute: Embedded verifiable user identity into every downstream API request, guaranteeing that every agent invocation is cryptographically attributable to a human principal.",
        "Require: Integrated Client-Initiated Backchannel Authentication (CIBA) to push verification requests directly to the responsible human's device before executing high-risk mutations.",
      ],
      result:
        "Delivered a live interactive simulator demonstrating side-by-side execution of governed vs. ungoverned agents. Presented at LLMday London in the talk 'Your Agent Left the Laptop Open. LAR Closes It', establishing a new standard for safe agentic runtime operations.",
      metrics: [
        { label: "Privilege Scope", value: "Zero Ambient", description: "Ephemeral downscoped tokens via RFC 8693" },
        { label: "Audit Traceability", value: "100%", description: "Every action tied cryptographically to a human" },
        { label: "Verification Standard", value: "CIBA", description: "Out-of-band push confirmation for critical actions" },
      ],
      takeaways: [
        "Agent security is identity security: agents should never possess more ambient authority than the human they act on behalf of.",
        "Interactive live simulations communicate complex distributed auth models far more effectively than static architecture diagrams.",
      ],
      liveSimulation: "lar",
      problem:
        "Many agents borrow the full access of whoever started them. If the agent misreads the task, nothing stops it. Afterwards, nobody can say who approved what.",
      approach: [
        "Lock. The agent swaps the person's access for a narrow, short-lived token through OAuth 2.0 Token Exchange. It can do the task, and nothing else.",
        "Attribute. Every action is logged against the named person the agent works for. The audit trail points to a human, not just a bot.",
        "Require. Risky actions pause until that person approves them on a separate channel, through CIBA. Think of it as a bank asking you to confirm a payment on your phone.",
      ],
      outcome:
        "I demo LAR on two running copies of Content Creation Studio, one governed and one not. I presented it at LLMday London in my talk 'Your Agent Left the Laptop Open. LAR Closes It'.",
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
      context:
        "Under the Financial Conduct Authority (FCA) Consumer Duty (FG22/5), UK financial institutions are legally obligated to eliminate 'sludge practices': unreasonable barriers, misleading disclosure flows, and buried terms that discourage customers from switching providers, claiming refunds, or cancelling services. Auditing hundreds of pages of contracts by hand was slow, inconsistent, and costly.",
      challenges: [
        "Unstructured Document Volume: Regulatory and policy manuals span hundreds of pages filled with nested legal definitions and cross-references.",
        "Strict Regulatory Grounding: Generic LLMs hallucinate non-existent compliance violations or fail to cite specific sub-clauses of FG22/5.",
        "Processing Latency & Cost: Running semantic extraction over large corpora with traditional APIs was cost-prohibitive for rapid iterative audits.",
      ],
      solution: [
        "Hierarchical LangGraph Pipeline: Decomposed long-form documents into semantic sections, routing each block through specialized extraction and validation agents.",
        "ChromaDB Vector Retrieval: Indexed official FCA regulatory texts in ChromaDB, matching potential sludge patterns against specific compliance clauses by meaning rather than naive keyword search.",
        "High-Speed Groq LLaMA Inference: Powered inference with LLaMA models running on Groq hardware to achieve near-instantaneous token generation with verifiable citations.",
      ],
      result:
        "Turned opaque source material into categorized, actionable reports of customer friction points, complete with direct page references and specific FCA FG22/5 clause citations.",
      metrics: [
        { label: "Audit Acceleration", value: "90% Faster", description: "Compared to manual compliance document reviews" },
        { label: "Regulatory Basis", value: "FCA FG22/5", description: "Every flagged item is grounded with direct clause citations" },
        { label: "Inference Speed", value: "Sub-Second", description: "High-throughput token generation via Groq LPUs" },
      ],
      takeaways: [
        "RAG pipelines are only as strong as their chunking strategy; splitting by semantic legal clauses rather than arbitrary token lengths prevents lost context.",
        "Grounded extraction with strict citation constraints builds immediate trust with compliance and legal officers.",
      ],
      problem:
        "The FCA Consumer Duty asks firms to find 'sludge': the extra steps and small print that make it harder for customers to cancel, switch or complain. The evidence hides in long, vague documents that are slow to read by hand.",
      approach: [
        "LangChain and LangGraph run the agent steps. ChromaDB finds the passages that matter by meaning, not just keywords.",
        "I chose how to split the documents, how to search them and how to prompt the model, so every finding ties back to FG22/5.",
        "LLaMA models on Groq handle the reading and writing.",
      ],
      outcome: "It turns vague source material into clear patterns of customer friction.",
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
      context:
        "Investors and fund managers need rapid answers about portfolio holdings, IRR metrics, sector exposure, and capital distributions. When standard language models perform calculations directly on financial data, they frequently hallucinate numbers with high confidence, creating substantial financial risk.",
      challenges: [
        "Arithmetic Hallucination: Probabilistic models cannot be trusted to perform accurate multi-step financial math on balance sheets and cap tables.",
        "Varied Natural Language Queries: Investors ask multi-part questions combining timeframe filters, sector categorization, and currency conversions.",
        "Product & Roadmap Ownership: Delivering an end-to-end prototype alongside enterprise production architecture and delivery roadmaps for fund stakeholders.",
      ],
      solution: [
        "Deterministic Math Engine: Structured the pipeline so that Python and pandas execute 100% of arithmetic, valuation calculations, and table aggregations directly on source data.",
        "LLM Purely for Language Translation: Employed LLaMA models on Groq solely to interpret the user's intent into structured query parameters, and then format verified computational results into lucid summaries.",
        "Forward-Deployed Architecture Spec: Delivered complete API specifications, pgvector similarity schemas, and a phased 6-month enterprise delivery plan.",
      ],
      result:
        "Achieved 100% computational accuracy with zero arithmetic hallucinations, giving investors instant answers grounded in verifiable tabular calculations.",
      metrics: [
        { label: "Math Accuracy", value: "100%", description: "All calculations handled deterministically by pandas" },
        { label: "Query Latency", value: "<800ms", description: "FastAPI + Redis caching for instantaneous responses" },
        { label: "Deliverable", value: "Code + Roadmap", description: "Prototype paired with 6-month enterprise spec" },
      ],
      takeaways: [
        "Never ask a language model to do math: let code calculate and let the model translate.",
        "Forward deployed engineering requires mastering both deep technical execution and strategic product ownership.",
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
      context:
        "Securing desk space, executive suites, or conference rooms previously required cumbersome email negotiations, manual confirmations, and opaque billing. Worknoon was created to give independent professionals and distributed teams friction-free booking across vetted workspace facilities.",
      challenges: [
        "Booking Race Conditions: Preventing overlapping reservations for high-demand meeting rooms across concurrent user sessions.",
        "Intuitive Search & Filter Experience: Allowing users to search by location, equipment, date range, and capacity with instant visual feedback.",
        "Account & Invoicing Automation: Managing corporate accounts, recurring memberships, and automated VAT invoices.",
      ],
      solution: [
        "Atomic Reservation Engine: Engineered database transaction locks in PostgreSQL to guarantee atomic seat reservations with zero double-booking risk.",
        "Responsive Client Application: Built a responsive, accessible React interface styled with Tailwind CSS, featuring interactive space previews and instant checkout.",
        "Unified Account & Operator Dashboard: Created portals for workspace managers to update real-time availability, track occupancy, and review billing.",
      ],
      result:
        "Successfully launched Worknoon at worknoon.com, allowing users to discover and reserve workspaces in under a minute with automated confirmation and billing.",
      metrics: [
        { label: "Reservation Time", value: "<60s", description: "From space search to confirmed reservation" },
        { label: "Production Status", value: "Live", description: "Active commercial deployment at worknoon.com" },
        { label: "Booking Reliability", value: "100%", description: "Zero double-booking conflicts via atomic locks" },
      ],
      takeaways: [
        "Simplicity in checkout flows directly correlates with booking completion rates.",
        "Handling reservation time slots with strict UTC timestamps prevents timezone scheduling discrepancies.",
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
      context:
        "Urban commuters and corporate travelers in Nigeria need trustworthy, vetted drivers for immediate trips, scheduled airport pickups, and dedicated multi-hour or daily engagements. Driver Certified was created to connect passengers with certified professional chauffeurs.",
      challenges: [
        "Real-Time Proximity Dispatch: Matching available certified drivers with riders based on dynamic GPS coordinates under intermittent mobile connectivity.",
        "Flexible Trip Modalities: Supporting both on-demand point-to-point rides and flexible time-based subscription packages.",
        "Secure Driver & Rider Authentication: Protecting user account data and trip histories with secure JWT tokens and role-based endpoints.",
      ],
      solution: [
        "Geospatial MongoDB Routing: Utilized MongoDB 2dsphere indexes to perform sub-second driver proximity lookups and track active trip coordinates.",
        "State-Machine Trip Lifecycle: Designed a resilient state machine managing trip stages from request to driver acceptance, arrival, in-transit, and completion.",
        "Modular Micro-Services: Built RESTful services in Node.js and Express handling user profiles, driver verification status, and transaction receipts.",
      ],
      result:
        "Live on the iOS App Store in Nigeria, handling real-time driver dispatches, ride reservations, and flexible time plans with high reliability.",
      metrics: [
        { label: "App Store Status", value: "iOS Live", description: "Published on the App Store serving passengers & drivers" },
        { label: "Dispatch Query", value: "<250ms", description: "Geospatial proximity query response time" },
        { label: "Trip Modalities", value: "3 Modes", description: "Instant hailing, scheduled bookings, and hourly hire" },
      ],
      takeaways: [
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
      context:
        "Medical diagnostic imaging (MRI scans, CT scans, X-rays) represents highly sensitive patient health data. In healthcare settings, diagnostic workflows cannot halt because a single image processing task fails, and patient records must strictly comply with GDPR data privacy mandates.",
      challenges: [
        "System Resilience: Monolithic healthcare architectures risk complete downtime if one image processing routine crashes.",
        "GDPR Compliance by Design: Enforcing audit logging, patient consent management, and granular role-based clinician access controls.",
        "High-Volume Data Throughput: Ensuring diagnostic images load rapidly for clinicians without congesting backend database connections.",
      ],
      solution: [
        "Decomposed Microservices: Split the platform into independent services (Auth, Image Ingestion, Metadata Store, Access Audit) running in Docker containers.",
        "Redis In-Memory Acceleration: Deployed Redis caching to serve frequently accessed diagnostic records and maintain session states with microsecond latency.",
        "Immutable Audit Logs: Implemented cryptographic logging for every patient record inspection, fulfilling GDPR Article 30 accountability mandates.",
      ],
      result:
        "Built a resilient healthcare imaging platform where individual service crashes could not disrupt clinical viewing workflows, achieving complete GDPR compliance validation.",
      metrics: [
        { label: "GDPR Conformance", value: "100%", description: "Granular consent tracking and encrypted diagnostic data" },
        { label: "Architecture", value: "Dockerized", description: "Independent microservices with Redis caching and Node.js" },
        { label: "Fault Isolation", value: "Zero Downtime", description: "Service failures isolated to individual containers" },
      ],
      takeaways: [
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
      context:
        "As a former teacher in Nigeria, I saw firsthand that students rarely failed due to lack of innate intelligence; they dropped out when encountering initial hard concepts without timely encouragement. LearnQuest explored whether software could operationalize Angela Duckworth's 'Grit Theory'—passion and perseverance for long-term goals—through personalized AI coaching.",
      challenges: [
        "Algorithmic Modeling of Psychological Grit: Translating abstract behavioral metrics (effort consistency, response to errors) into quantifiable algorithmic rules.",
        "Personalized Pedagogical Adaptation: Adjusting problem difficulty dynamically to keep students in the 'zone of proximal development' without causing frustration.",
        "Interdisciplinary Synthesis: Creating software architecture and documentation rigorous enough for engineering while remaining accessible to educational researchers.",
      ],
      solution: [
        "Adaptive Prompting & Feedback Engine: Leveraged LLMs paired with custom scoring heuristics to analyze student attempt patterns, delivering empathetic, growth-mindset feedback.",
        "Dynamic Learning Pathways: Designed reactive frontend dashboards in React that visualize perseverance milestones rather than simple test scores.",
        "Full-Stack Node.js Architecture: Built robust APIs and MongoDB collections tracking learning trajectories and behavioral metrics across study sessions.",
      ],
      result:
        "Graduated with Distinction from Kingston University London. Successfully validated that grit-based adaptive coaching significantly increased student engagement during challenging exercises.",
      metrics: [
        { label: "Academic Honor", value: "Distinction", description: "Awarded Distinction for MSc Software Engineering Dissertation" },
        { label: "Theoretical Base", value: "Grit Theory", description: "Angela Duckworth's psychological perseverance model in software" },
        { label: "Pedagogical Impact", value: "Adaptive", description: "Dynamic problem scaling based on student struggle indicators" },
      ],
      takeaways: [
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
      context:
        "Decentralized governance, community referendums, and organizational polls require uncompromising integrity: exactly one vote per eligible entity, tamper-proof counting, and unalterable poll close times that do not depend on human administrators.",
      challenges: [
        "Cryptographic Non-Repudiation: Preventing vote replays, double-voting, or post-hoc tampering on a distributed ledger.",
        "Deterministic Lifecycle Execution: Automatically sealing polls and tallying choices precisely when a specified block height is reached.",
        "Extending the Klayr SDK: Building custom module assets, data stores, and API plugins adhering to blockchain consensus rules.",
      ],
      solution: [
        "Custom Sidechain Module: Built dedicated transaction commands for poll creation, ballot casting, and option revision using TypeScript and the Klayr blockchain framework.",
        "State Store Verification: Implemented isolated on-chain stores that validate voter cryptographic signatures and verify eligibility prior to state mutation.",
        "On-Block Expiration Logic: Engineered automated block lifecycle hooks that monitor block height and trigger final tally execution deterministically.",
      ],
      result:
        "The project won a competitive blockchain developer grant and recognition across the web3 community for its clean module architecture and verifiable ballot execution.",
      metrics: [
        { label: "Industry Award", value: "Grant Winner", description: "Awarded competitive ecosystem developer grant" },
        { label: "Double-Vote Prevention", value: "100%", description: "Cryptographically enforced on-chain ballot deduplication" },
        { label: "Poll Execution", value: "Deterministic", description: "Automatic block-height lifecycle transitions" },
      ],
      takeaways: [
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
      context:
        "During household or workplace emergencies (burns, choking, fractures, severe allergic reactions), bystanders need immediate, prioritized first-aid instructions in plain language without wading through ads or conversational preamble.",
      challenges: [
        "Response Latency: In critical moments, every second matters; recommendations must be generated with sub-second time-to-first-token.",
        "Priority Structuring: Physical life-saving actions must be presented first, clearly separated from secondary care and emergency contact notices.",
        "Safety Boundaries: Ensuring the system explicitly prompts users to contact emergency services (999/911) immediately.",
      ],
      solution: [
        "Engineered Gemini Prompts: Crafted strict system instructions instructing Gemini to format emergency responses into immediate numbered physical steps, bold warnings, and contraindications.",
        "Streamlined Streamlit Interface: Built a high-contrast, clean web interface allowing users to describe the emergency with a few keystrokes or quick presets.",
        "Safety-First Triage Banners: Embedded persistent visual reminders to summon professional medical services.",
      ],
      result:
        "Delivered a working emergency assistant capable of generating structured first-aid guidance in under 2 seconds, providing actionable support when stress is highest.",
      metrics: [
        { label: "Time to First Step", value: "<2s", description: "Immediate triage instruction generation via Gemini API" },
        { label: "Format", value: "Priority Ranked", description: "Urgent physical actions delivered first before secondary guidance" },
      ],
      takeaways: [
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
      context:
        "ServiceNow developers work on complex enterprise workflows and often solve similar implementation challenges in silos. NowDevHub was conceived as a focused developer hub to discover, review, and collaborate on proven ServiceNow components and architectural patterns.",
      challenges: [
        "Real-Time Collaboration: Enabling developers to discuss code snippets, ask questions, and receive live updates without manual page refreshes.",
        "Structured Code Repository: Managing syntax-highlighted code contributions, tags, ratings, and documentation attachments efficiently.",
        "Scalable Community Architecture: Maintaining responsive response times across simultaneous WebSocket connections.",
      ],
      solution: [
        "Socket.io Real-Time Infrastructure: Implemented WebSockets with Socket.io on Node.js to provide instant chat, presence detection, and community pings.",
        "Relational Schema on PostgreSQL: Designed normalized schemas for developer profiles, code artifacts, comments, and community upvotes.",
        "Modular React Frontend: Created a modern, accessible interface with syntax highlighting, search filters, and one-click code copying.",
      ],
      result:
        "Deployed live on Vercel, providing ServiceNow practitioners with a dedicated, responsive resource sharing space and live collaboration channels.",
      metrics: [
        { label: "Broadcast Latency", value: "<50ms", description: "Real-time message and notification delivery via Socket.io" },
        { label: "Deployment", value: "Vercel + Node", description: "Live accessible developer portal" },
      ],
      takeaways: [
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
      context:
        "Built as part of the premier SheFi Web3 and DeFi technical fellowship, this project explored high-throughput decentralized finance mechanisms on Solana, focusing on SPL token mechanics, wallet signing, and real-time on-chain event streams.",
      challenges: [
        "Asynchronous Finality: Handling Solana's rapid slot production and multi-stage block commitment levels in web interfaces.",
        "Wallet Integration: Supporting multi-wallet connection flows (Phantom, Solflare) with reliable disconnection handling.",
        "On-Chain Account Deserialization: Parsing binary account data and SPL token layouts into human-readable UI structures.",
      ],
      solution: [
        "Solana Web3.js Connection Layer: Integrated Solana JSON-RPC endpoints to query account info, verify signatures, and listen for on-chain state changes.",
        "Wallet Adapter Integration: Implemented standard Solana Wallet Adapter hooks in React with responsive connection modal dialogues.",
        "Optimistic UI Updates: Provided instant visual feedback on balance adjustments while awaiting confirmed cluster finality.",
      ],
      result:
        "Delivered a responsive DeFi tracker showcasing sub-second transaction awareness and seamless wallet interactions on the Solana devnet and mainnet.",
      metrics: [
        { label: "Transaction Speed", value: "Sub-Second", description: "Solana slot awareness and live balance updates" },
        { label: "Fellowship", value: "SheFi Web3", description: "Advanced DeFi and smart contract development cohort" },
      ],
      takeaways: [
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
