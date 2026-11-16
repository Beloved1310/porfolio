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
      "Full-stack work on Prayer Bud (prayerbud.co.uk). I built admin dashboards, linked the PostgreSQL database to the app with tRPC and Prisma, and added Firebase reminders for scheduled prayer sessions.",
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
        "Prayer Bud brings people together through prayer requests and group devotionals. Leaders wanted to see activity without asking an engineer to check the database. Members needed reminders. The app and the database also needed to agree on the shape of their data.",
      challenges: [
        {
          title: "Admins could not see activity",
          problem:
            "Admins had no view of live prayer rooms or member activity inside the product. They had to ask engineers to look it up.",
          engineeringSolution:
            "I built admin dashboards in Next.js and Tailwind CSS, with charts showing live sessions, prayer rooms and member activity.",
          impact:
            "Leaders now see active members and prayer activity for themselves, with no need to ask an engineer.",
        },
        {
          title: "The app and database drifted apart",
          problem:
            "Fast changes to the Next.js app and the PostgreSQL database often caused data bugs and broken requests. Checking them by hand was slow.",
          engineeringSolution:
            "I set up typed tRPC routes built on Prisma models, so TypeScript checks the client and server together.",
          impact:
            "If a change breaks the link between client and server, it shows up while coding, not in production.",
        },
        {
          title: "Members missed sessions",
          problem:
            "Without reminders, members often forgot group devotionals and prayer sessions, and fewer people joined.",
          engineeringSolution:
            "I added Firebase Cloud Messaging to send push reminders on web and mobile, timed to the prayer schedule.",
          impact:
            "Members get a reminder before each group session.",
        },
        {
          title: "Busy evening sessions",
          problem:
            "Evening prayer sessions start at the same time, so lots of people use the app at once. It still needs to feel fast.",
          engineeringSolution:
            "I improved PostgreSQL indexes, set up connection pooling and used React Query to cache data and update the screen straight away.",
          impact:
            "The database copes with the rush, and the app stays quick during busy sessions.",
        },
      ],
      impact:
        "Admins have an activity dashboard, the app and database share one set of types through tRPC and Prisma, and members get reminders through Firebase.",
    },
  },
  {
    id: "bujeti",
    slug: "bujeti",
    company: "Bujeti",
    role: "Software Engineer",
    period: "February 2023 to March 2024",
    summary:
      "Fintech for African businesses. I built the QuickBooks sync and redesigned company sign-up, with clearer error messages and saved progress.",
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
        "Bujeti makes finance tools for African businesses. Finance teams needed their transactions to match QuickBooks. Company customers found the KYC sign-up hard: errors were unclear and their progress was lost.",
      challenges: [
        {
          title: "Keeping the books in sync",
          problem:
            "Lots of transactions, tax details and vendor categories had to sync with QuickBooks Online with no mismatches or duplicates.",
          engineeringSolution:
            "I built a two-way sync with AWS SQS queues and Node.js workers. Each job is safe to run twice, failed jobs retry with growing gaps, and jobs that keep failing go to a separate queue.",
          impact:
            "Failed updates are not lost. The team can look at them and run them again safely.",
        },
        {
          title: "Companies gave up during sign-up",
          problem:
            "The old KYC flow spread uploads and checks over many steps. Errors were unclear and progress was lost, so it was hard to pick up where you left off.",
          engineeringSolution:
            "I rebuilt the sign-up flow in React and TypeScript. Each step is checked as you go, file formats are checked on upload, and drafts save automatically.",
          impact:
            "Customers can see what each step needs and can come back to finish later.",
        },
      ],
      impact:
        "Sign-up is clearer and saves progress, and the accounting sync handles failures without losing or doubling records.",
    },
  },
  {
    id: "lextego",
    slug: "lextego",
    company: "Lextego",
    role: "Software Engineer",
    period: "January 2022 to February 2023",
    summary:
      "Regtech that watches payments for financial crime. I built transaction checking services in TypeScript and NestJS, and worked on their Docker deployment and tests.",
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
        "Lextego checks payments for money laundering, terrorist financing and sanctions risks. The rule checks needed to run on their own, and a failure in one place could not stop the rest of the screening.",
      challenges: [
        {
          title: "Keeping screening separate",
          problem:
            "Compliance rules had to check payments as they happened without slowing them down.",
          engineeringSolution:
            "I built separate rule services in TypeScript and NestJS, with connection pooling and in-memory routing.",
          impact:
            "Rule checks run in their own services, apart from payment processing.",
        },
        {
          title: "Stopping one failure from spreading",
          problem:
            "If one sanctions rule failed, it could break the whole checking pipeline.",
          engineeringSolution:
            "I put each service in Docker and ran them on Kubernetes on AWS, with health checks, safe fallbacks and Jest tests.",
          impact:
            "When a service fails, the team knows how it will recover.",
        },
      ],
      impact:
        "Screening became easier to change and run, thanks to separate services, health checks and automated tests.",
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
    title: "Clarity, SheBuilds International Women’s Day Hackathon",
    role: "Competed",
    text: "At the SheBuilds hackathon, I used Lovable to build Clarity. It is for women and first-time builders facing self-doubt or a hard goal. You describe your challenge, and AI turns it into small steps you can tick off. I wanted the first step to feel easy, not to build another complicated productivity app.",
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
    text: "I built QuickAid for the Westminster Business School LLM hackathon. It uses Gemini to turn a description of an emergency into first-aid steps in order. Each answer starts with what to do, then gives warnings, and always reminds you to call emergency services.",
    images: [
      { src: "/optimized/first-aid.jpg", alt: "QuickAid first-aid guidance form" },
    ],
    link: { label: "View project story", href: "/projects/first-aid-app-generator", internal: true },
  },
  {
    title: "SwitchPoint at EAT_HACK (Really Good Culture)",
    role: "Competed",
    text: "Built for the Human Truth track: what really makes shoppers switch products, compared with what they say would.",
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
