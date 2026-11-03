import type { CaseStudy, ImageSource } from "./projects";

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
  slug: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  technologies: string[];
  images: ImageSource[];
  link: CardLink;
  liveUrl?: string;
  liveLabel?: string;
  caseStudy: CaseStudy;
}

export const workRoles: WorkRole[] = [
  {
    id: "dti",
    slug: "dti",
    company: "Digital Transformation & Integration Services (DTI)",
    role: "Full-Stack Engineer",
    period: "March 2024 to January 2025",
    summary:
      "Full-stack engineering on Prayer Bud (prayerbud.co.uk): developed intuitive admin user activity and data visualization dashboards, established end-to-end type-safe tRPC APIs with Prisma and PostgreSQL, and integrated Firebase notifications, lifting user engagement by 20%.",
    technologies: [
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Prisma",
      "PostgreSQL",
      "tRPC",
      "Firebase",
      "Tailwind CSS",
      "React Query",
    ],
    images: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-03_at_21.48.20_69b09f07.png",
        alt: "PrayerBud community platform and mobile application interface",
      },
    ],
    liveUrl: "https://prayerbud.co.uk/",
    liveLabel: "Visit prayerbud.co.uk",
    link: { label: "Visit prayerbud.co.uk", href: "https://prayerbud.co.uk/" },
    caseStudy: {
      role: "Full-Stack Engineer at Digital Transformation & Integration Services (DTI)",
      problem:
        "Prayer Bud was created to bring people together in faith, helping community members share prayer requests and participate in daily group devotionals. But as active membership scaled past 1,000 concurrent users, community leaders and platform administrators faced a major operational blindspot: they had zero visibility into member activity. They couldn't tell which prayer groups were thriving or which sessions were abandoned without asking software engineers to write slow, manual SQL queries. In addition, members frequently missed scheduled prayer sessions because the app lacked reliable push reminders, and rapid UI development kept introducing runtime bugs due to loose API contracts between the frontend and database.",
      challenges: [
        {
          title: "Admin Activity Blindspot & Real-Time Monitoring",
          problem:
            "Platform administrators had zero real-time insight into live member interactions, active prayer room sessions, or daily retention, forcing them to operate in the dark.",
          engineeringSolution:
            "Architected and implemented interactive administrative dashboards in Next.js and Tailwind CSS with custom data visualization charts tracking active sessions, prayer rooms, and member engagement in real time.",
          impact:
            "Gave community leaders live operational visibility into active members and prayer trends, completely eliminating reliance on manual SQL lookups.",
          reflection:
            "Admin visibility is foundational to community growth; empowering operational leaders with clear visual dashboards allows them to take proactive care of members.",
        },
        {
          title: "API Schema Drift & Type Contract Integrity",
          problem:
            "Rapid feature iterations between the Next.js frontend interfaces and the relational PostgreSQL database frequently led to runtime payload bugs, broken client requests, and slow manual contract verification.",
          engineeringSolution:
            "Established end-to-end type-safe tRPC routers backed directly by Prisma ORM models, enforcing compile-time validation across client and server with automatic TypeScript autocompletion.",
          impact:
            "Achieved 100% type safety from database to UI, completely eliminating runtime API contract drift and boosting development speed by 35%.",
          reflection:
            "End-to-end type safety between database schema and client code dramatically accelerates feature velocity by turning potential runtime crashes into immediate compiler feedback.",
        },
        {
          title: "Member Retention & Disconnected Prayer Devotionals",
          problem:
            "Without timely push reminders, members frequently forgot scheduled group devotionals and communal prayer sessions, leading to drop-offs in active community sessions.",
          engineeringSolution:
            "Integrated Firebase Cloud Messaging (FCM) to trigger automated, real-time push notifications across web and mobile browsers, synchronized with prayer schedule events.",
          impact:
            "Drove a 20% increase in daily active member engagement and ensured members showed up on time for communal devotionals.",
          reflection:
            "Push notifications are most powerful when anchored to shared, communal rituals; delivering them reliably re-engages users without feeling intrusive.",
        },
        {
          title: "Peak Concurrency & Synchronized Query Performance",
          problem:
            "During synchronized evening prayer times, over 1,000 concurrent users logging in simultaneously threatened to slow down database responses and exhaust connection pools.",
          engineeringSolution:
            "Optimized relational indexing in PostgreSQL, configured connection pooling, and paired client state with React Query for optimistic updates and intelligent cache invalidation.",
          impact:
            "Maintained sub-second query latency and smooth UI performance under peak 1,000+ concurrent user loads with zero downtime.",
          reflection:
            "Synchronized community surges require both backend connection discipline and frontend optimistic caching to preserve a snappy, responsive feel.",
        },
      ],
      engineeringSolutions: [
        "Admin Data Visualization: Built high-performance Next.js and Tailwind CSS administrative dashboards to monitor live user activity, prayer groups, and retention trends.",
        "End-to-End Type Safety with tRPC & Prisma: Connected the PostgreSQL database to client components via strongly-typed RPC procedures, eliminating runtime bugs.",
        "Firebase Real-Time Notifications: Implemented Firebase Cloud Messaging to re-engage users with scheduled prayer reminders and communal updates.",
        "Optimistic State Management: Handled client state with React Query for instant page transitions and caching.",
      ],
      impact:
        "Lifted overall member engagement by 20% through real-time notifications, gave administrators live operational clarity without manual database lookups, and achieved 100% type safety across the entire stack for 1,000+ concurrent users.",
      metrics: [
        {
          label: "Member Engagement",
          value: "+20%",
          description: "Increase in daily active check-ins driven by real-time Firebase notifications",
        },
        {
          label: "Concurrent Scale",
          value: "1,000+",
          description: "Active community users supported concurrently with sub-second page performance",
        },
        {
          label: "Type Safety",
          value: "100%",
          description: "End-to-end type coverage from PostgreSQL schema to Next.js UI via tRPC & Prisma",
        },
        {
          label: "Live Product",
          value: "prayerbud.co.uk",
          description: "Production community application and real-time admin monitoring platform",
        },
      ],
      reflection: [
        "Admin UX is just as important as customer UX; giving community leaders visual clarity directly improves how they support their members.",
        "tRPC paired with Prisma provides a superpower for full-stack engineering, making API contract bugs practically impossible.",
        "Push notifications work best when they connect people to shared, communal moments rather than generic marketing blasts.",
      ],
    },
  },
  {
    id: "bujeti",
    slug: "bujeti",
    company: "Bujeti",
    role: "Software Engineer",
    period: "February 2023 to March 2024",
    summary:
      "Fintech for African businesses: led the enterprise QuickBooks accounting sync and overhauled corporate customer onboarding, slashing registration drop-off and errors by 50%.",
    technologies: ["TypeScript", "Node.js", "React", "MySQL", "MongoDB", "AWS SQS", "Express", "Tailwind CSS"],
    images: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-03_at_21.51.20_27ca8041.png",
        alt: "Bujeti - Control your business finances, all in one place",
      },
    ],
    liveUrl: "https://www.bujeti.com",
    liveLabel: "Visit bujeti.com",
    link: { label: "Visit bujeti.com", href: "https://www.bujeti.com" },
    caseStudy: {
      role: "Software Engineer at Bujeti",
      problem:
        "Bujeti provides corporate financial management, expense cards, and treasury tools for modern African enterprises and startups. As businesses scaled their spend on Bujeti, finance managers had to spend days manually reconciling CSV files with their accounting software. Furthermore, new business customers faced an overwhelming corporate onboarding process with complex KYC compliance steps, resulting in a frustrating 40%+ drop-off rate before companies ever activated their accounts.",
      challenges: [
        {
          title: "Two-Way Accounting Reconciliation & Ledger Mismatches",
          problem:
            "Syncing high-volume transactional data, tax breakdowns, and vendor categories with QuickBooks Online without reconciliation mismatches or duplicate entries.",
          engineeringSolution:
            "Engineered an idempotent two-way accounting sync pipeline using AWS SQS message queues and Node.js worker pools with exponential retry backoff and dead-letter queue isolation.",
          impact:
            "Delivered automated, real-time book reconciliation for millions in processed corporate spend with zero duplicate ledger entries.",
          reflection:
            "In financial integrations, idempotency and explicit retry dead-letter queues are non-negotiable safeguards against silent ledger corruption.",
        },
        {
          title: "High Drop-Off in Corporate Onboarding Flow",
          problem:
            "The legacy registration flow had a 40%+ drop-off rate due to multi-step corporate KYC document uploads, opaque verification failures, and lost form states.",
          engineeringSolution:
            "Completely redesigned and rebuilt the enterprise onboarding experience in React and TypeScript with step validation, real-time format verification, and draft auto-saving.",
          impact:
            "Cut corporate onboarding registration errors and drop-off by 50%, enabling enterprise clients to onboard in under 10 minutes.",
          reflection:
            "Treating complex corporate KYC forms with the empathy and progressive disclosure of consumer apps dramatically improves completion rates.",
        },
      ],
      engineeringSolutions: [
        "Idempotent QuickBooks Sync Engine: Engineered a fault-tolerant two-way accounting sync pipeline using AWS SQS message queues and Node.js worker pools.",
        "Streamlined Onboarding Flow: Completely redesigned and rebuilt the enterprise onboarding experience in React and TypeScript.",
        "Hybrid Data Architecture: Optimized queries across MySQL for transactional ledgers and MongoDB for document-heavy audit trails.",
      ],
      impact:
        "Cut corporate onboarding registration errors by 50%, reducing time-to-onboard from days to under 10 minutes, while automating accounting reconciliation for enterprise corporate spend.",
      metrics: [
        {
          label: "Registration Errors",
          value: "-50%",
          description: "Reduction in onboarding drop-off and form validation failures",
        },
        {
          label: "Accounting Sync",
          value: "QuickBooks",
          description: "Two-way automated corporate financial reconciliation via AWS SQS",
        },
        {
          label: "Onboarding Time",
          value: "<10 Mins",
          description: "Streamlined corporate KYC and entity verification flow",
        },
      ],
      reflection: [
        "In financial integrations, idempotency and explicit retry dead-letter queues are non-negotiable.",
        "Guiding enterprise users through complex compliance forms with clear progress indicators dramatically reduces customer frustration.",
        "A fast onboarding experience sets the tone for user trust across the entire financial relationship.",
      ],
    },
  },
  {
    id: "lextego",
    slug: "lextego",
    company: "Lextego",
    role: "Software Engineer",
    period: "January 2022 to February 2023",
    summary:
      "Regtech platform monitoring payment streams for anti-money laundering and financial crime. Architected, deployed, and tested 50+ transaction monitoring microservices with 99.99% uptime.",
    technologies: ["TypeScript", "Node.js", "NestJS", "Docker", "Kubernetes", "Jest", "AWS", "PostgreSQL"],
    images: [
      {
        src: "/assets/aistudio/Screenshot_2026-11-03_at_21.54.15_05a9d7a9.png",
        alt: "LexTego - Fight financial crime. Prove every step of it.",
      },
    ],
    liveUrl: "https://www.lextego.com",
    liveLabel: "Visit lextego.com",
    link: { label: "Visit lextego.com", href: "https://www.lextego.com" },
    caseStudy: {
      role: "Software Engineer at Lextego",
      problem:
        "Global financial institutions handle millions of payment transactions every hour and must detect money laundering, terrorist financing, and sanctions violations in real time. If a compliance system slows down payment settlement or crashes, banks face severe regulatory fines. Lextego needed a resilient, high-speed microservices architecture capable of evaluating complex financial crime rules under strict sub-100 millisecond SLAs.",
      challenges: [
        {
          title: "Strict Latency SLAs (<100ms) Under Massive Transaction Spikes",
          problem:
            "Compliance evaluation rules had to screen payment streams in real time without creating transaction lag at bank checkout points.",
          engineeringSolution:
            "Architected 50+ isolated microservices in TypeScript and NestJS, each running dedicated rule evaluation heuristics with connection pooling and in-memory routing.",
          impact:
            "Screened live transaction streams in under 100 milliseconds with zero payment delays.",
          reflection:
            "Microservices excel when isolated rule heuristics need independent scaling and deployment, provided inter-service latency is tightly bound.",
        },
        {
          title: "Preventing Distributed Cascading Outages",
          problem:
            "A failure in one AML sanctions screening rule could destabilize the entire transaction verification pipeline.",
          engineeringSolution:
            "Containerized every service with Docker and deployed them to Kubernetes clusters on AWS with automated health probes, graceful degradation, and comprehensive Jest test suites.",
          impact:
            "Achieved 99.99% system availability across continuous financial crime monitoring operations.",
          reflection:
            "True fault tolerance requires architecting for failure at every tier—circuit breakers, automated container restarts, and isolated failure domains.",
        },
      ],
      engineeringSolutions: [
        "Modular NestJS Microservices: Architected and deployed 50+ independent transaction monitoring microservices in TypeScript and NestJS.",
        "Containerized Kubernetes Orchestration: Packaged every microservice with Docker and automated deployment manifests on Kubernetes clusters across AWS.",
        "Automated Test Infrastructure: Implemented exhaustive unit, integration, and contract tests using Jest, achieving over 90% code coverage.",
      ],
      impact:
        "Successfully deployed and maintained 50+ production microservices operating with 99.99% availability, screening high-volume payment streams with sub-100ms anomaly detection.",
      metrics: [
        {
          label: "Microservices",
          value: "50+ Services",
          description: "Independently deployed and monitored compliance microservices",
        },
        {
          label: "System Uptime",
          value: "99.99%",
          description: "High-availability financial crime monitoring on AWS Kubernetes",
        },
        {
          label: "Evaluation Latency",
          value: "<100ms",
          description: "Real-time payment stream inspection and AML risk scoring",
        },
      ],
      reflection: [
        "Microservices require strict API contracts, robust telemetry, and comprehensive end-to-end testing to prevent distributed failure cascades.",
        "NestJS provides exceptional architectural structure and dependency injection for enterprise-grade backend systems.",
        "Reliability in regtech isn't just a metric; it is what keeps businesses operating within the law.",
      ],
    },
  },
];

export const findWorkRole = (idOrSlug: string) =>
  workRoles.find((w) => w.id === idOrSlug || w.slug === idOrSlug);

export interface Hackathon {
  title: string;
  role: "Competed" | "Mentored" | "Judged";
  text: string;
  images: ImageSource[];
  link: CardLink;
}

export const hackathons: Hackathon[] = [
  {
    title: "Large Language Models hackathon, Westminster Business School",
    role: "Competed",
    text: "I won it.",
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
