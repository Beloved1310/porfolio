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
  // Two-sentence overview on the card.
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
      context:
        "At Digital Transformation & Integration Services (DTI), I served as Full-Stack Engineer on Prayer Bud (https://prayerbud.co.uk/)—a multi-tenant faith and community application built to connect members, facilitate daily prayer sessions, and host collaborative group devotions for over 1,000+ concurrent active users. As the active member base expanded rapidly, platform administrators and community leaders experienced a critical operational blindspot: they had no unified way to monitor active member interactions, review prayer group participation, track user retention, or moderate community dynamics in real time.",
      challenges: [
        "Admin Activity Visibility: Platform administrators lacked real-time visibility into user activities, active prayer room sessions, and daily engagement trends, requiring manual and slow database investigations.",
        "End-to-End Type Safety & Data Integrity: Rapid feature development between dynamic Next.js frontend interfaces and a relational PostgreSQL database required airtight contracts to prevent runtime schema mismatch and invalid mutation payloads.",
        "Timely Member Communication & Re-Engagement: Members frequently missed scheduled daily prayers, devotional updates, and group discussions without reliable, cross-platform push notifications.",
        "High Concurrency & Query Performance: Delivering real-time analytics and data visualizations for 1,000+ concurrent users demanded optimized relational indexing and cached queries to prevent backend bottlenecks.",
      ],
      solution: [
        "Admin Data Visualization & Activity Dashboards: Developed and implemented interactive, high-fidelity administrative interfaces in Next.js and Tailwind CSS. Built custom activity timelines, member participation charts, and prayer engagement breakdowns that turned raw database events into actionable, real-time visual insights.",
        "Type-Safe tRPC & Prisma Architecture: Established end-to-end type-safe API connections using tRPC paired with Prisma ORM on PostgreSQL. Replaced fragile REST endpoints with strongly-typed RPC routers, streamlining backend query execution, eliminating API schema drift, and drastically improving site performance.",
        "Real-Time Firebase Push Notifications: Integrated Firebase Cloud Messaging (FCM) to deliver targeted, automated notifications for upcoming prayer schedules, communal prayer requests, and community announcements, keeping users informed and re-engaged across web and mobile browsers.",
        "Optimistic State Management with React Query: Structured frontend caching and client-side queries with React Query, providing instantaneous UI transitions, optimistic updates, and smooth data visualization rendering.",
      ],
      result:
        "The newly launched administrative analytics suite gave community managers complete operational clarity, while targeted Firebase notifications boosted overall member engagement by 20%. The tRPC and Prisma pipeline eradicated runtime API contract bugs and accelerated frontend feature delivery cycles, delivering a robust, performant experience for over 1,000 concurrent users.",
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
      takeaways: [
        "Combining tRPC with Prisma provides unparalleled developer velocity, eliminating an entire category of client-server contract bugs.",
        "High-fidelity data visualization for administrators directly drives faster community moderation and better product decisions.",
        "Push notifications are most effective when tied to scheduled communal moments that bring members together in real time.",
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
      context:
        "Bujeti provides comprehensive corporate financial management, expense cards, and treasury automation for modern African enterprises, startups, and SMBs. As businesses scaled their spend on Bujeti, finance leaders needed seamless synchronization with international accounting software (QuickBooks) to close monthly books without manual CSV reconciliation, while new companies faced high drop-off during complex regulatory onboarding.",
      challenges: [
        "Two-Way Accounting Synchronization: Syncing high-volume transactional data, tax breakdowns, and vendor categories with QuickBooks Online without reconciliation mismatches or duplicate entries.",
        "High Drop-Off in Corporate Onboarding: The legacy registration flow had a 40%+ drop-off rate due to multi-step corporate KYC document uploads and confusing validation states.",
        "Asynchronous Spike Handling: Processing bursts of financial transactions and accounting sync webhooks without exhausting database connections.",
      ],
      solution: [
        "Idempotent QuickBooks Sync Engine: Engineered a fault-tolerant two-way accounting sync pipeline using AWS SQS message queues and Node.js worker pools, guaranteeing exactly-once ledger delivery and automatic retry backoff.",
        "Streamlined Onboarding Flow: Completely redesigned and rebuilt the enterprise onboarding experience in React and TypeScript with step validation, real-time format verification, and draft auto-saving.",
        "Hybrid Data Architecture: Optimized queries across MySQL for transactional ledgers and MongoDB for document-heavy audit trails.",
      ],
      result:
        "Cut corporate onboarding registration errors and drop-off by 50%, enabling enterprise clients to onboard in under 10 minutes. Delivered the flagship QuickBooks integration, automating expense reconciliation for millions in processed corporate spend.",
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
      takeaways: [
        "In financial integrations, idempotency and explicit retry dead-letter queues are non-negotiable.",
        "Guiding enterprise users through complex compliance forms with clear progress indicators dramatically reduces support tickets.",
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
      context:
        "Lextego is an enterprise regulatory technology (RegTech) platform providing automated Anti-Money Laundering (AML) transaction monitoring, sanctions screening, and financial crime detection for tier-1 financial institutions and payment gateways.",
      challenges: [
        "Strict Latency Constraints: Compliance rules engines must evaluate high-velocity payment streams in under 100ms to flag suspicious transactions prior to settlement.",
        "Architectural Decoupling: Managing dozens of regulatory rulesets without allowing updates to one screening rule to destabilize other monitoring pipelines.",
        "Rigorous Quality Standards: Ensuring comprehensive test coverage and CI/CD automation where software bugs could trigger regulatory non-compliance penalties.",
      ],
      solution: [
        "Modular NestJS Microservices: Architected and deployed 50+ independent transaction monitoring microservices in TypeScript and NestJS, each encapsulating discrete compliance rules and risk scoring heuristics.",
        "Containerized Kubernetes Orchestration: Packaged every microservice with Docker and automated deployment manifests on Kubernetes clusters across AWS.",
        "Automated Test Infrastructure: Implemented exhaustive unit, integration, and contract tests using Jest, achieving over 90% code coverage across all financial evaluation pathways.",
      ],
      result:
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
      takeaways: [
        "Microservices require strict API contracts, robust telemetry, and comprehensive end-to-end testing to prevent distributed failure cascades.",
        "NestJS provides exceptional architectural structure and dependency injection for enterprise-grade backend systems.",
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
