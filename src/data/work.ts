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
      "Full-stack engineering on Prayer Bud (prayerbud.co.uk): built admin activity dashboards, connected the PostgreSQL data layer to the client with tRPC and Prisma, and added Firebase notifications for scheduled community activity.",
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
        "Prayer Bud brings people together through prayer requests and group devotionals. Community leaders needed a way to see activity without asking engineers to query the database; members also needed timely reminders, while the frontend and database needed a clearer contract.",
      challenges: [
        {
          title: "Admin Activity Blindspot & Real-Time Monitoring",
          problem:
            "Administrators had no in-product view of active prayer rooms or member activity and relied on engineers to query the database.",
          engineeringSolution:
            "Architected and implemented interactive administrative dashboards in Next.js and Tailwind CSS with custom data visualization charts tracking active sessions, prayer rooms, and member engagement in real time.",
          impact:
            "The dashboard exposes active members and prayer activity directly to community leaders, replacing manual queries for routine checks.",
        },
        {
          title: "API Schema Drift & Type Contract Integrity",
          problem:
            "Rapid feature iterations between the Next.js frontend interfaces and the relational PostgreSQL database frequently led to runtime payload bugs, broken client requests, and slow manual contract verification.",
          engineeringSolution:
            "Established end-to-end type-safe tRPC routers backed directly by Prisma ORM models, enforcing compile-time validation across client and server with automatic TypeScript autocompletion.",
          impact:
            "Typed tRPC procedures derive their contracts from Prisma models, so client and server changes are checked together during development.",
        },
        {
          title: "Member Retention & Disconnected Prayer Devotionals",
          problem:
            "Without timely push reminders, members frequently forgot scheduled group devotionals and communal prayer sessions, leading to drop-offs in active community sessions.",
          engineeringSolution:
            "Integrated Firebase Cloud Messaging (FCM) to trigger automated, real-time push notifications across web and mobile browsers, synchronized with prayer schedule events.",
          impact:
            "Scheduled Firebase notifications give members a direct reminder for communal devotional sessions.",
        },
        {
          title: "Peak Concurrency & Synchronized Query Performance",
          problem:
            "Synchronized evening prayer sessions create bursts of database and client activity that need to remain responsive.",
          engineeringSolution:
            "Optimized relational indexing in PostgreSQL, configured connection pooling, and paired client state with React Query for optimistic updates and intelligent cache invalidation.",
          impact:
            "PostgreSQL indexes and connection pooling handle database access, while React Query caching supports optimistic client updates during busy sessions.",
        },
      ],
      impact:
        "The shipped work gives administrators an activity dashboard, connects client and database types through tRPC and Prisma, and delivers scheduled reminders through Firebase Cloud Messaging.",
    },
  },
  {
    id: "bujeti",
    slug: "bujeti",
    company: "Bujeti",
    role: "Software Engineer",
    period: "February 2023 to March 2024",
    summary:
      "Fintech for African businesses: built the QuickBooks accounting sync and redesigned corporate onboarding with clearer validation and saved form progress.",
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
        "Bujeti provides financial tools for African businesses. Finance teams needed transaction data to stay in sync with QuickBooks, while corporate customers faced a demanding KYC onboarding flow with unclear validation and lost form state.",
      challenges: [
        {
          title: "Two-Way Accounting Reconciliation & Ledger Mismatches",
          problem:
            "Syncing high-volume transactional data, tax breakdowns, and vendor categories with QuickBooks Online without reconciliation mismatches or duplicate entries.",
          engineeringSolution:
            "Engineered an idempotent two-way accounting sync pipeline using AWS SQS message queues and Node.js worker pools with exponential retry backoff and dead-letter queue isolation.",
          impact:
            "The sync uses idempotent jobs, retry handling, and a dead-letter queue so failed accounting updates can be inspected and replayed safely.",
        },
        {
          title: "High Drop-Off in Corporate Onboarding Flow",
          problem:
            "The legacy KYC flow split document uploads and verification across steps, with unclear failures and lost form state making it difficult to resume onboarding.",
          engineeringSolution:
            "Completely redesigned and rebuilt the enterprise onboarding experience in React and TypeScript with step validation, real-time format verification, and draft auto-saving.",
          impact:
            "Step validation, format checks, and draft saving make KYC requirements and recovery paths visible as customers complete onboarding.",
        },
      ],
      impact:
        "The new onboarding flow makes validation and saved progress visible, while the accounting sync processes ledger updates through retryable, idempotent jobs.",
    },
  },
  {
    id: "lextego",
    slug: "lextego",
    company: "Lextego",
    role: "Software Engineer",
    period: "January 2022 to February 2023",
    summary:
      "Regtech platform monitoring payments for financial crime. Built transaction-monitoring services in TypeScript and NestJS and worked on their containerized deployment and test infrastructure.",
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
        "Lextego screens payment activity for money laundering, terrorist financing, and sanctions risks. The service architecture needed to isolate rule evaluation and recover from failures without interrupting the broader screening workflow.",
      challenges: [
        {
          title: "Keeping transaction screening isolated",
          problem:
            "Compliance evaluation rules had to screen payment streams in real time without creating transaction lag at bank checkout points.",
          engineeringSolution:
            "Built isolated rule-evaluation services in TypeScript and NestJS, using connection pooling and in-memory routing to keep screening work modular.",
          impact:
            "Rule evaluation runs inside dedicated services, keeping screening logic separate from payment processing concerns.",
        },
        {
          title: "Preventing Distributed Cascading Outages",
          problem:
            "A failure in one AML sanctions screening rule could destabilize the entire transaction verification pipeline.",
          engineeringSolution:
            "Containerized every service with Docker and deployed them to Kubernetes clusters on AWS with automated health probes, graceful degradation, and comprehensive Jest test suites.",
          impact:
            "Container health checks and graceful-degradation paths give operators a defined recovery behavior when a service fails.",
        },
      ],
      impact:
        "The work made transaction screening easier to evolve and operate through service boundaries, container health checks, and automated tests.",
    },
  },
];

export const findWorkRole = (idOrSlug: string) =>
  workRoles.find((w) => w.id === idOrSlug || w.slug === idOrSlug);

export interface Hackathon {
  title: string;
  role: string;
  text: string;
  images: ImageSource[];
  link: CardLink;
  aspect?: string;
}

export const hackathons: Hackathon[] = [
  {
    title: "Clarity — SheBuilds International Women’s Day Hackathon",
    role: "Competed",
    text: "At the SheBuilds hackathon, I used Lovable to build Clarity, a prototype for women and first-time builders facing self-doubt or a difficult goal. Its core flow turns a challenge into an AI-generated plan of manageable actions people can check off and track. I focused the experience on making the first step feel approachable, rather than adding another complicated productivity tool.",
    images: [
      {
        src: "/clarity-shebuilds-hackathon.jpg",
        alt: "Adefisayo sharing her Clarity project with participants at the SheBuilds hackathon",
      },
    ],
    link: { label: "Try Clarity", href: "https://glow-clarity-app.lovable.app" },
  },
  {
    title: "QuickAid Emergency First-Aid Assistant",
    role: "Winner · Large Language Models Hackathon, Westminster Business School",
    text: "Built for the Westminster Business School LLM hackathon, QuickAid uses Gemini to turn an emergency description into prioritized first-aid guidance. I designed the response to lead with an actionable step, follow with relevant cautions, and keep the reminder to contact emergency services visible.",
    images: [
      { src: "/optimized/first-aid.jpg", alt: "QuickAid first-aid guidance form" },
    ],
    link: { label: "View project story", href: "/projects/first-aid-app-generator", internal: true },
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
    images: [
      {
        src: "/women-techsters-fellowship-judging.png",
        alt: "Women Techsters Fellowship Class of 2026 introducing Adefisayo Adejumo as a judge during an online session",
      },
    ],
    link: { label: "Read about it", href: "#", placeholder: true },
    aspect: "aspect-[16/10]",
  },
];
