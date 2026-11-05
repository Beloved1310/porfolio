import type { ImageSource } from "./projects";

// A real photo, plus an optional hand-made or AI-drawn anime version of the same moment
// (e.g. illustrated: "/album-anime/oau.jpg"). The "Show illustrated" switch appears once any exist.
export interface AlbumImage extends ImageSource {
  illustrated?: string;
}

export interface AlbumChapter {
  number: number;
  title: string;
  years?: string;
  // Which part of the book the chapter belongs to; see `parts` below.
  part: number;
  // Tried in order: the named slot first, then an existing photo that fits.
  images: AlbumImage[];
  // The first line the reader sees: short, and it should make them want the rest.
  hook: string;
  story: string[];
  // Speech bubble on the photo.
  caption: string;
  // A one-line teaser for the next chapter, shown at the foot of the page.
  next?: string;
}

export const parts = [
  { number: 1, title: "The teacher" },
  { number: 2, title: "The engineer" },
  { number: 3, title: "The bigger room" },
  { number: 4, title: "Epilogue" },
];

export const prologue = {
  hook: "Before I wrote a line of code, I stood in front of 200 children a week.",
  body: [
    "That is where I learned the hardest skill in engineering: making someone else understand.",
    "This is the story of how a teacher in Nigeria became a software engineer in London, building AI agents that are safe to trust. Every photo is real.",
  ],
};

export const chapters: AlbumChapter[] = [
  {
    number: 1,
    title: "Where it started",
    years: "2015 to 2019",
    part: 1,
    images: [{ src: "/ayo-oau-graduation.jpg", alt: "Adefisayo Adejumo in graduation gown at Obafemi Awolowo University" }],
    hook: "I did not start with computers. I started with people.",
    story: [
      "Obafemi Awolowo University, Nigeria. I studied Education and Language Arts.",
      "I learned how people learn before I learned how computers work. That order shaped everything that came after.",
    ],
    caption: "Where I learned how people learn.",
    next: "A classroom, and hundreds of learners who all learned differently.",
  },
  {
    number: 2,
    title: "The classroom years",
    years: "2019 to 2025",
    part: 1,
    images: [
      { src: "/ayo-teaching-nigeria.jpg", alt: "Adefisayo Adejumo speaking to pupils with a microphone at a school in Nigeria" },
      { src: "/ayo-jamb-recording.jpg", alt: "Adefisayo Adejumo recording a lesson for JAMB candidates" },
    ],
    hook: "Two hundred children a week. Every one of them different.",
    story: [
      "At Sammadara Memorial, I taught more than 200 children every week.",
      "At the Federal Government College of Education, I kept records for more than 500 students and recorded video lessons for more than 1,000 JAMB candidates.",
      "The classroom taught me to explain one idea in more than one way, until it lands.",
    ],
    caption: "Explain it again. Differently.",
    next: "The day curiosity won.",
  },
  {
    number: 3,
    title: "The switch",
    part: 2,
    images: [{ src: "/ayo-bootcamp.jpg", alt: "Adefisayo Adejumo receiving an AboCoders training certificate" }],
    hook: "Curiosity pulled me towards code, and I let it.",
    story: [
      "I joined a bootcamp and finished top of my class.",
      "Not the typical route into engineering. But it is mine, and the teacher came with me.",
    ],
    caption: "Top of the class.",
    next: "Real users, real money, and a bug that hid upstream.",
  },
  {
    number: 4,
    title: "Building for real users",
    years: "2022 to 2025",
    part: 2,
    images: [
      { src: "/ayo-at-work.jpg", alt: "Adefisayo Adejumo working as a software engineer" },
      { src: "/optimized/laptop.jpg", alt: "Adefisayo Adejumo working at a laptop" },
    ],
    hook: "In fintech, a wrong number is someone's money.",
    story: [
      "Three jobs, three kinds of pressure. At Lextego, software that watches payments for financial crime. At Bujeti, fintech for African businesses. At DTI, a community app serving 1,000+ concurrent users.",
      "On the side, I built booking and accounts for Worknoon, and the backend for Driver Certified, a ride booking app in Nigeria.",
      "Then a customer could not pay their vendors. The error showed in one place. The cause sat further upstream. That bug gave me the line I still work by.",
    ],
    caption: "Follow the data, not the symptoms.",
    next: "Going back to open the door for someone else.",
  },
  {
    number: 5,
    title: "Opening doors",
    years: "2024",
    part: 3,
    images: [
      {
        src: "/ayo-stem-bridge.jpg",
        alt: "Adefisayo Adejumo with STEM Bridge volunteers and teenage girls exploring careers in tech",
      },
    ],
    hook: "It is easier to choose a path when you have met someone already on it.",
    story: [
      "In Nigeria, I volunteered with STEM Bridge, a community that helps teenage girls find their careers in tech.",
      "For an afternoon, the someone already on the path was me.",
    ],
    caption: "Empower her. Support her. Encourage her.",
    next: "A new country, and a new classroom.",
  },
  {
    number: 6,
    title: "London",
    years: "2025 to 2026",
    part: 3,
    images: [
      {
        src: "/ayo-kingston-graduation.jpg",
        alt: "Adefisayo Adejumo at Kingston University MSc graduation",
      },
      {
        src: "/graduation.jpg",
        alt: "Ayo graduating with an MSc in Software Engineering and Management, Distinction, from Kingston University London",
      },
    ],
    hook: "I moved to London to study a problem I had watched for years.",
    story: [
      "An MSc in Software Engineering and Management at Kingston University, London.",
      "My dissertation, LearnQuest, came from the classroom: learners giving up at the first hard moment. I graduated with a Distinction.",
      "Outside the lectures, I threw myself into university life, and earned the Kingston Award at Bronze, Silver and Gold.",
    ],
    caption: "Distinction.",
    next: "The teacher comes back.",
  },
  {
    number: 7,
    title: "Giving back",
    years: "2024 to present",
    part: 3,
    images: [
      { src: "/ayo-cyf-classroom.jpg", alt: "Adefisayo Adejumo teaching at Code Your Future London" },
      { src: "/optimized/cyf.jpg", alt: "Adefisayo Adejumo in front of a Code Your Future banner" },
    ],
    hook: "The teacher never left.",
    story: [
      "I coach at Codebar London, where I am one of the chapter organisers. At Code Your Future, I went from Teaching Assistant to Lead Teacher.",
      "Many of my learners are refugees or come from low-income backgrounds. I know what one patient explanation can change.",
    ],
    caption: "Flowcharts before code.",
    next: "The rooms get bigger.",
  },
  {
    number: 8,
    title: "On stage",
    part: 3,
    images: [
      {
        src: "/ayo-speaking-llmday.jpg",
        alt: "Adefisayo Adejumo speaking about the LAR framework at LLMday London",
      },
      {
        src: "/ayo-dtx-panel.jpg",
        alt: "Adefisayo Adejumo moderating the From Vibe to Value panel at DTX London",
      },
      { src: "/optimized/bitwise-talk.jpg", alt: "Adefisayo Adejumo presenting a talk titled Bitwise in the Browser" },
      { src: "/optimized/devfest.jpg", alt: "Adefisayo Adejumo speaking on stage at DevFest" },
    ],
    hook: "Teaching a room and speaking to one are the same skill.",
    story: [
      "I have spoken at DevFest, JSMonthly, Web3 Lagos and DTX, and presented my LAR framework at LLMday London.",
      "Different stage, same job: find the one picture that makes a hard idea click.",
    ],
    caption: "Same skill, bigger room.",
    next: "Where every chapter was heading.",
  },
  {
    number: 9,
    title: "Now",
    years: "2026",
    part: 4,
    images: [
      { src: "/ayo-headshot.jpg", alt: "Adefisayo Adejumo, software engineer, portrait" },
      { src: "/head-shot.jpeg", alt: "Adefisayo Adejumo, software engineer, portrait" },
    ],
    hook: "An agent should never have more power than the person it works for.",
    story: [
      "I build AI agents that are safe to trust, with a framework I call LAR: Lock, Attribute, Require.",
      "Data that had to be right. Ideas that had to be clear. Now both, in one job. I am looking for my next team in London, and I can start now.",
    ],
    caption: "Still teaching. Still building.",
  },
];
