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
      "A team of AI agents that researches, writes, reviews and publishes content. Nothing goes public until a person approves it.",
    images: [{ src: "/project-content-studio.png", alt: "Content Creation Studio control plane" }],
    technologies: ["Python", "Google ADK", "Vertex AI Agent Engine", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Beloved1310/Content-Creation-Studio",
    categories: ["AI", "Frontend", "Backend"],
    caseStudy: {
      role: "Lead engineer. I designed the agent pipeline, the safety checks and the live control panel.",
      problem:
        "Teams want to research a topic, write about it and share it on blogs, newsletters and social media. AI agents can do this fast. Left alone, they also make up facts and numbers, and they can post them everywhere in seconds. I wanted the speed of agents without that risk.",
      challenges: [
        {
          title: "Agents that publish on their own",
          problem:
            "An agent that writes and posts by itself can share wrong facts or private company details before anyone sees them.",
          engineeringDecision:
            "I added a hard approval step. The pipeline stops before any outside call and waits until a person clicks Approve. Each run also gets its own short-lived credentials.",
          impact:
            "Nothing is published until a person has read and approved the draft.",
        },
        {
          title: "One tone does not fit every channel",
          problem:
            "A technical blog post needs sources. A post on X needs to be short. A single large prompt could not do both well.",
          engineeringDecision:
            "I split the work across several agents on Google ADK and Vertex AI Agent Engine. Research agents gather facts. Channel agents write for each platform. An editor agent checks each claim against the sources.",
          impact:
            "Each channel gets its own draft, and every claim is checked against the research.",
        },
        {
          title: "People could not see what the agents were doing",
          problem:
            "If you cannot watch an agent work, you either trust it blindly or spend twice as long checking every line.",
          engineeringDecision:
            "I built a live control panel in FastAPI and React. It streams each step, each tool call and each change to the draft over WebSockets.",
          impact:
            "People can follow a run as it happens, and steer or stop it before a mistake spreads.",
        },
      ],
      impact:
        "The result is a content workflow you can review. Claims are checked against sources, a person approves every post, and you can watch each run live. It is also where I test the LAR framework.",
      simulation: { label: "Try the LAR governance simulation", to: "/projects/lar-framework#lar-framework-simulation" },
    },
  },
  {
    slug: "lar-framework",
    title: "LAR framework (Lock, Attribute, Require)",
    summary:
      "A framework for keeping AI agents safe at work. Lock what an agent can access, Attribute every action to a real person, and Require approval before anything high risk.",
    images: [
      {
        src: "/ayo-speaking-llmday.jpg",
        alt: "Adefisayo Adejumo presenting the LAR framework at LLMday London",
      },
    ],
    technologies: ["OAuth 2.0 Token Exchange", "CIBA", "Agent Governance", "TypeScript", "Python", "FastAPI"],
    slides: [{ label: "View the LLMday London slides", url: "https://canva.link/5rtgq6go8cba1ha" }],
    categories: ["AI", "Backend"],
    caseStudy: {
      role: "Creator. I designed the framework, built it on open standards and made the live demo.",
      problem:
        "At work, an AI agent often runs with the developer's full login. If it misreads a task, or someone tricks it with a hidden instruction, nothing stops it from opening private files or moving money. The logs only show a bot account, so you cannot tell which person started it.",
      challenges: [
        {
          title: "Too much access (the open laptop problem)",
          problem:
            "Agents are given broad access that lasts a long time. A coding agent might be able to delete a live database or read payroll.",
          engineeringDecision:
            "Lock. I used OAuth 2.0 Token Exchange (RFC 8693) to swap broad access for a narrow token. It only covers the current task and expires quickly.",
          impact:
            "Each run can only reach what its task needs.",
        },
        {
          title: "Knowing who is responsible",
          problem:
            "Bot account logs hide which person started a run. Some actions also need a separate yes from a person.",
          engineeringDecision:
            "Attribute. Every request carries proof of the person it acts for. Require. High-risk actions use CIBA to ask that person for approval on their phone before they go ahead.",
          impact:
            "Every request shows who it was for, and the demo shows a risky action waiting for approval.",
        },
      ],
      impact:
        "I published LAR as a framework, presented it at LLMday London and built a live simulator. The demo shows how narrow access, a named person and phone approval fit into one agent workflow.",
      liveSimulation: "lar",
    },
  },
  {
    slug: "consumer-duty-sludge-audit",
    title: "Consumer Duty Sludge Audit Tool",
    period: "March 2026 to April 2026",
    summary:
      "An AI pipeline that reads financial and legal documents and finds \"sludge\": hidden cancel steps, confusing terms and other friction. Every finding is tied to FCA guidance FG22/5.",
    images: [
      {
        src: "/consumer-duty-sludge-audit.png",
        alt: "Consumer Duty Sludge Audit home screen, with a website URL field, a Run Audit button and a tab to compare two sites",
      },
    ],
    technologies: ["Python", "LangChain", "LangGraph", "ChromaDB", "Groq (LLaMA)", "FastAPI"],
    githubUrl: "https://github.com/Beloved1310/cd-audit-tool",
    categories: ["AI", "Backend"],
    caseStudy: {
      role: "Engineer. I designed how documents are split, indexed and checked against the rules.",
      problem:
        "Under the FCA Consumer Duty (FG22/5), UK firms must find anything that makes it hard for customers to cancel, switch or get a refund. This tool turns policy documents into findings that point back to the source text and the FCA guidance.",
      challenges: [
        {
          title: "Long, dense legal text",
          problem:
            "Policy documents mix definitions, cross-references and cancel conditions. They are hard to review as a whole.",
          engineeringDecision:
            "I used LangGraph to split each document by meaning, section by section, not by a fixed number of words.",
          impact:
            "Each finding keeps its source passage and page number, so a reviewer can read it in context.",
        },
        {
          title: "Vague AI answers with no sources",
          problem:
            "General AI models give general comments. Compliance teams cannot use them without the exact clause.",
          engineeringDecision:
            "I stored the FCA FG22/5 guidance in ChromaDB and told the model to cite a paragraph for every finding.",
          impact:
            "Every finding comes with its source passage and the FCA clause it relates to.",
        },
        {
          title: "Slow and costly runs",
          problem:
            "Sending whole documents to a large model again and again is slow and expensive.",
          engineeringDecision:
            "I ran open LLaMA models on Groq, which is fast and costs much less.",
          impact:
            "The pipeline returns sorted findings, each with its source passage and FCA clause, ready for an analyst.",
        },
      ],
      impact:
        "Hard-to-read documents become clear reports of customer friction, with page numbers and FCA FG22/5 clauses for each finding.",
    },
  },
  {
    slug: "equitie-portfolio-assistant",
    title: "EquiTie Investor Portfolio Assistant",
    period: "January 2026 to February 2026",
    summary:
      "A prototype that answers investors' questions about their portfolio in plain English. All the maths is done by code, not by the AI.",
    images: [{ src: "/project-equitie.png", alt: "EquiTie investor portfolio assistant prototype" }],
    technologies: ["Python", "FastAPI", "pandas", "pgvector", "Redis", "Groq (LLaMA)", "React"],
    categories: ["AI", "Backend", "Frontend"],
    caseStudy: {
      role: "Forward deployed engineer. I built the prototype, wrote the requirements and planned the six months to production.",
      problem:
        "Private equity and angel investors want quick answers about their funds: how much capital has been called, the rate of return (IRR) and which sectors they hold. When a normal AI chatbot works out returns from a table, it often makes up numbers that sound right. With money, that is dangerous.",
      challenges: [
        {
          title: "AI models are bad at maths",
          problem:
            "A language model predicts words. It is not a calculator. Ask it for an IRR and it may give a wrong answer with full confidence.",
          engineeringDecision:
            "I kept the maths out of the model. Python and pandas do every calculation.",
          impact:
            "Every number comes from the data and the code, so the model cannot make one up.",
        },
        {
          title: "Turning questions into queries",
          problem:
            "Investors ask things like \"Which European fintechs in Fund II are doing best?\" That needs careful filtering of the data.",
          engineeringDecision:
            "I used a fast LLaMA model on Groq only to understand the question and turn it into a query. Code runs the query, and the model writes the checked result in plain English.",
          impact:
            "Each plain-English answer can be traced back to the portfolio data.",
        },
        {
          title: "From prototype to production",
          problem:
            "A prototype is hard to judge without a plan for connecting it to the fund's accounting systems.",
          engineeringDecision:
            "I wrote the system design, the data pipeline spec and a delivery plan in phases.",
          impact:
            "The leadership team had a clear path from prototype to production.",
        },
      ],
      impact:
        "The prototype keeps the maths in code, and every answer is based on the query result.",
    },
  },
  {
    slug: "worknoon",
    title: "Worknoon",
    period: "2024 to 2025",
    summary:
      "A live platform for finding and booking coworking desks, private offices and meeting rooms.",
    images: [{ src: "/project-worknoon.png", alt: "Worknoon coworking booking platform" }],
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://worknoon.com",
    liveLabel: "Visit worknoon.com",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      role: "Full-stack engineer. I built the booking engine, user accounts and checkout, from the first design to launch.",
      problem:
        "Booking a desk or meeting room meant emailing an office manager and confirming payment by hand. Worknoon puts finding a space, booking it and paying into one flow.",
      challenges: [
        {
          title: "Two people booking the same room",
          problem:
            "When two people tried to book the same room at the same moment, older systems let both bookings through.",
          engineeringDecision:
            "I used row-level locks in PostgreSQL during checkout. Once a room is taken, it is locked straight away.",
          impact:
            "Checking and booking happen in one step, so two requests cannot both get the same slot.",
        },
        {
          title: "Team bookings on one bill",
          problem:
            "Companies wanted staff to book desks themselves, with the cost going to one company account.",
          engineeringDecision:
            "I built team accounts with roles, budget limits and monthly invoices.",
          impact:
            "Teams can book desks without a finance manager approving each one.",
        },
      ],
      impact:
        "Worknoon brings finding, booking, confirming and team billing into one live flow.",
    },
  },
  {
    slug: "driver-certified",
    title: "Driver Certified",
    period: "2023 to 2024",
    summary:
      "A ride booking app with verified drivers, live on the iOS App Store in Nigeria. You can book a ride now, book ahead or hire a driver by the hour, and track the car live.",
    images: [
      { src: "/project-driver-certified.png", alt: "Driver Certified ride booking app" },
      { src: "/driver-certified.jpg", alt: "Driver Certified listing on the App Store" },
    ],
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Geospatial Indexing", "REST APIs"],
    githubUrl: "https://github.com/Beloved1310/Driver-Certified-Project",
    categories: ["Backend"],
    caseStudy: {
      role: "Backend engineer. I built the accounts, trip flow, driver matching and payment plan APIs.",
      problem:
        "People in Nigeria want trusted, vetted drivers. Most ride apps only offered rides on demand. You could not book a driver days ahead, or hire one for a full day of meetings.",
      challenges: [
        {
          title: "Patchy mobile data",
          problem:
            "In busy city areas, weak signal meant driver locations dropped out. Arrival times were wrong and requests were lost.",
          engineeringDecision:
            "I tuned MongoDB location indexes and built endpoints that cope with dropped connections and smooth out driver positions.",
          impact:
            "Requests are matched to nearby drivers, and locations update again when the signal returns.",
        },
        {
          title: "Three kinds of booking in one system",
          problem:
            "Rides now, rides booked ahead and hourly hire each had different pricing and availability rules.",
          engineeringDecision:
            "I built one clear set of trip stages (requested, accepted, arriving, on trip, completed) with pricing rules for each booking type.",
          impact:
            "A trip can only move through valid stages, and the right pricing stays with each booking type.",
        },
      ],
      impact:
        "Live on the iOS App Store in Nigeria, handling ride requests, bookings ahead and hourly hire.",
    },
  },
  {
    slug: "image-management-system",
    title: "Medical Image Management System",
    period: "MSc project, Kingston University",
    summary:
      "A system for storing and viewing medical scans, built as separate services so one failure does not take down the rest. It follows GDPR and has strict access controls.",
    images: [{ src: "/optimized/ims.jpg", alt: "Image Management System dashboard" }],
    technologies: ["React", "Node.js", "Redis", "MongoDB", "Docker", "Express", "Microservices"],
    githubUrl: "https://github.com/Beloved1310/ABC-Healthcare-Image-Management-System",
    liveUrl: "https://drive.google.com/file/d/1thOixwBknIPQhU3e68eW-ypTYcil6MES/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      role: "Designer and developer. I built the services in Docker and the GDPR layer.",
      problem:
        "Doctors rely on scans like CT, MRI and X-rays. When a hospital system is one big program, a crash in image processing can take down the whole viewer. Patient scans must also follow GDPR.",
      challenges: [
        {
          title: "One failure brings down everything",
          problem:
            "If a heavy image job froze or ran out of memory, the doctors' viewer crashed too.",
          engineeringDecision:
            "I split the system into separate services (login, image upload, image details, audit log), each in its own Docker container.",
          impact:
            "If image processing fails, the failure stays in that service and the viewer keeps working.",
        },
        {
          title: "GDPR and a record of every access",
          problem:
            "Hospitals must be able to show every doctor who viewed or downloaded a patient record.",
          engineeringDecision:
            "I built an audit log that cannot be changed. It records every access with the time and the doctor's ID.",
          impact:
            "Access records and patient consent can be checked during a privacy review.",
        },
      ],
      impact:
        "A medical imaging prototype with separate processing services and a full access log. It makes the privacy rules and failure limits easy to review.",
    },
  },
  {
    slug: "learnquest",
    title: "LearnQuest",
    period: "MSc dissertation, Kingston University",
    summary:
      "A learning platform based on Angela Duckworth's Grit Theory. It uses AI to notice when a student is struggling and changes the lesson to help them keep going.",
    images: [{ src: "/optimized/learnquest.jpg", alt: "Learn Quest account sign-up screen" }],
    technologies: ["JavaScript", "LLMs", "React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    githubUrl: "https://github.com/Beloved1310/Behavioural-learning-platformBE/tree/feat/core-grit-therory",
    liveUrl: "https://drive.google.com/file/d/1-oHydyrSeqxvyHfaIuuFCd1OGb4vmB2i/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["AI", "Frontend", "Backend"],
    caseStudy: {
      role: "Researcher and engineer. I wrote the teaching approach, built the AI that adapts lessons and built the web app.",
      problem:
        "When I taught in Nigeria, I saw students give up. They were not less able. They lost confidence the first time something got hard. Most learning apps just mark answers right or wrong, which puts struggling students off. LearnQuest asked one question: can software use Grit Theory to help students keep going?",
      challenges: [
        {
          title: "Turning grit into code",
          problem:
            "Ideas like perseverance and growth mindset are hard to measure.",
          engineeringDecision:
            "I tracked how students try, how long they spend on hard steps and how often they try again. These feed a model of where each student is.",
          impact:
            "Ideas from behaviour science became rules the software can act on.",
        },
        {
          title: "Stopping students from giving up",
          problem:
            "When students get stuck, generic hints feel patronising and they close the tab.",
          engineeringDecision:
            "I used AI to write kind, encouraging feedback about the exact step where the student was stuck, and to adjust how hard the next task is.",
          impact:
            "The hint and the next exercise change based on how the student has been working.",
        },
      ],
      impact:
        "My MSc dissertation at Kingston University London, awarded a Distinction. The prototype shows how feedback and difficulty can respond to how a student learns.",
    },
  },
  {
    slug: "voting-module-sidechain",
    title: "Voting Module Sidechain",
    period: "October 2024 to December 2024",
    summary:
      "A blockchain voting module built on the Klayr SDK. It checks every vote and closes the poll at a set block, with no one able to change it. It won an ecosystem grant.",
    images: [{ src: "/optimized/voting-module.jpg", alt: "Voting Module code and terminal output in a code editor" }],
    technologies: ["TypeScript", "Klayr SDK", "Blockchain", "Cryptography", "Node.js"],
    githubUrl: "https://github.com/Beloved1310/voting-module",
    highlight: { label: "Grant winner", postUrl: "https://lnkd.in/p/eZfhQaGj" },
    liveUrl: "https://drive.google.com/file/d/1UP7HZGOc6euso3gTK4pi9z3_r7RyrTuN/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["Backend"],
    caseStudy: {
      role: "Sole engineer. I built the custom stores, transactions and on-chain checks.",
      problem:
        "Online voting in communities often has a trust problem. Admins can quietly change when a poll closes. Voters worry their vote is counted twice. Logs are easy to edit. I wanted a system where the rules and deadlines live in code and cannot be changed.",
      challenges: [
        {
          title: "Voting twice and changing votes",
          problem:
            "Voters must not be able to vote more than once across the network, and their votes must stay private.",
          engineeringDecision:
            "I built custom transactions on the Klayr SDK. They check each voter's signature and store the vote in a record that cannot be changed.",
          impact:
            "Every vote is checked for a valid signature and a previous vote before it is recorded.",
        },
        {
          title: "Closing the poll on time",
          problem:
            "Admins can forget to close a poll, or keep it open on purpose to let more votes in.",
          engineeringDecision:
            "I added checks that run on each new block. When the poll reaches its end block, the count is sealed automatically.",
          impact:
            "The poll closes at a set block, so anyone can check the rule and no admin is needed.",
        },
      ],
      impact:
        "The project won a blockchain developer grant for its clean design and votes that anyone can verify.",
    },
  },
  {
    slug: "first-aid-app-generator",
    title: "QuickAid Emergency First-Aid Assistant",
    summary:
      "An emergency helper built on the Gemini API. Describe what is happening and it gives you first-aid steps in order, starting with the most important one.",
    images: [{ src: "/optimized/first-aid.jpg", alt: "QuickAid first-aid guidance form" }],
    technologies: ["Python", "Gemini API", "Streamlit", "Prompt Engineering"],
    githubUrl: "https://github.com/Beloved1310/First-Aid-App-Generator",
    liveUrl: "https://drive.google.com/file/d/17iG_j87JgZhA7VfMZp9zczOsYART1VYj/view?usp=sharing",
    liveLabel: "Watch the demo",
    categories: ["AI", "Frontend"],
    caseStudy: {
      role: "Creator. I wrote the emergency prompts and safety checks and built the Streamlit app.",
      problem:
        "In an emergency, like choking, a bad burn, a broken bone or an allergic reaction, people panic. A web search shows ads and long pages. A normal chatbot wastes time being polite. People need clear steps straight away.",
      challenges: [
        {
          title: "Chatbots waste precious seconds",
          problem:
            "Chat models often start with lines like \"I am sorry to hear you are having an emergency\". That costs time.",
          engineeringDecision:
            "I wrote strict prompts that put the first safety action before any explanation.",
          impact:
            "Every answer starts with the first thing to do, then gives warnings and next steps.",
        },
      ],
      impact:
        "An emergency helper that gives first-aid steps in order and always shows a reminder to call emergency services.",
    },
  },
  {
    slug: "nowdevhub",
    title: "NowDevHub Developer Community",
    summary:
      "A community site for ServiceNow developers to share code, swap ideas and chat live.",
    images: [{ src: "/optimized/nowdevhub.jpg", alt: "NowDevHub login screen" }],
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Express", "Tailwind CSS"],
    githubUrl: "https://github.com/Beloved1310",
    liveUrl: "https://nowdevhub-frontend-webapp.vercel.app/login",
    liveLabel: "Visit NowDevHub",
    categories: ["Frontend", "Backend"],
    caseStudy: {
      role: "Full-stack engineer. I built the live chat, the PostgreSQL database and the React app.",
      problem:
        "ServiceNow developers often solve the same problems alone. There was no place where they could share code, get feedback and talk in real time.",
      challenges: [
        {
          title: "Slow forum threads",
          problem:
            "On old forums you have to keep refreshing the page, so conversations drag on for hours.",
          engineeringDecision:
            "I used Socket.io on Node.js for live chat, online status and alerts.",
          impact:
            "Developers can share code and chat over a live connection.",
        },
      ],
      impact:
        "A live ServiceNow community site for sharing code, discussion and working together.",
    },
  },
  {
    slug: "shefi-solana",
    title: "Solana Smart Contract & DeFi Tracker",
    summary:
      "A DeFi and token tracker for Solana, built during the SheFi fellowship. It connects to your wallet and updates live.",
    images: [],
    technologies: ["Solana", "Web3.js", "Rust", "React", "TypeScript", "Tailwind CSS"],
    categories: ["Backend", "Frontend"],
    caseStudy: {
      role: "Web3 engineer. I built the wallet connection, the token balance tracker and the live transaction updates.",
      problem:
        "On Solana, an app needs to show wallet and account changes as they happen, without the user refreshing.",
      challenges: [
        {
          title: "Keeping up with fast transactions",
          problem:
            "Checking for changes over and over can leave balances out of date.",
          engineeringDecision:
            "I subscribed directly to Solana's live WebSocket feed to hear about balance changes as they happen.",
          impact:
            "Users see the change as soon as a transaction is confirmed.",
        },
      ],
      impact:
        "A DeFi tracker that connects a wallet and shows account and transaction updates live.",
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
