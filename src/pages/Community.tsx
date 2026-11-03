import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { site } from "../data/site";

interface Moment {
  title: string;
  caption: string;
  img: string;
  alt: string;
  // CSS object-position, so the crop keeps the person in frame.
  focus: string;
  link: { href: string; network: "LinkedIn" | "X" };
}

// TODO: swap each fallback link for the exact LinkedIn or X post about that moment.
const activityFeed = { href: `${site.linkedin}recent-activity/all/`, network: "LinkedIn" as const };

const featured: Moment = {
  title: "Lead Teacher, Code Your Future",
  caption:
    "Free coding training for refugees and people from low-income backgrounds. I started as a Teaching Assistant and now lead classes, like this workshop on Git merge conflicts.",
  img: "/ayo-cyf-classroom.jpg",
  alt: "Adefisayo Adejumo leading a Code Your Future workshop on DOM merge conflicts",
  focus: "center 40%",
  link: activityFeed,
};

const moments: Moment[] = [
  {
    title: "STEM Bridge",
    caption: "Volunteering with STEM Bridge, which helps teenage girls in Nigeria find their careers in tech.",
    img: "/ayo-stem-bridge.jpg",
    alt: "Adefisayo Adejumo with STEM Bridge volunteers and a group of teenage girls",
    focus: "center 45%",
    link: activityFeed,
  },
  {
    title: "STEM Bridge at Flutterwave",
    caption: "A visit to Flutterwave, so the girls could see the inside of a tech company for themselves.",
    img: "/optimized/stem-bridge-flutterwave.jpg",
    alt: "Adefisayo Adejumo with STEM Bridge volunteers and a student at the Flutterwave office",
    focus: "center 40%",
    link: activityFeed,
  },
  {
    title: "web3.js Africa Tour",
    caption: "The Lagos stop of the web3.js Africa Tour, with Web3bridge and ChainSafe. A day with new developers building on web3.js.",
    img: "/optimized/web3js-africa-tour.jpg",
    alt: "Adefisayo Adejumo with developers at the web3.js Africa Tour in Lagos",
    focus: "center 40%",
    link: { href: "https://lnkd.in/p/eZXiNUHX", network: "LinkedIn" },
  },
  {
    title: "Mentoring at Avalanche",
    caption: "I mentored teams at the Avalanche London Hackathon 2025.",
    img: "/optimized/avalanche-wide.jpg",
    alt: "Adefisayo Adejumo working at a laptop during an Avalanche event",
    focus: "35% center",
    link: activityFeed,
  },
];

// The fun side, closing the section after the photos.
const offTheClock = [
  { emoji: "🎤", text: "Catch me volunteering, mentoring, singing, or hosting tech chats at conferences." },
  { emoji: "🕺", text: "If there is music, I am probably dancing to it." },
];

// The whole card is one link: photo, title and caption. Nothing sits on top of the photo.
const MomentCard = ({ moment, aspect }: { moment: Moment; aspect: string }) => (
  <a href={moment.link.href} target="_blank" rel="noopener noreferrer" className="group block rounded-3xl">
    <div
      className={`relative overflow-hidden rounded-3xl bg-stone-200 dark:bg-stone-800 ring-1 ring-black/5 dark:ring-white/10 ${aspect}`}
    >
      <img
        src={moment.img}
        alt={moment.alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: moment.focus }}
        className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.03]"
      />
    </div>
    <span className="mt-4 inline-flex items-center gap-2 border-b border-stone-300 dark:border-stone-700 pb-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-stone-800 dark:text-stone-200 transition-colors group-hover:border-amber-500 group-hover:text-amber-700 dark:group-hover:text-amber-400">
      {moment.title}
      <FiArrowUpRight aria-hidden="true" className="motion-safe:transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
    <span className="mt-3 block text-sm leading-relaxed text-stone-600 dark:text-stone-400">{moment.caption}</span>
    <span className="sr-only"> (opens {moment.link.network} in a new tab)</span>
  </a>
);

const MomentsRow = () => {
  const rowRef = useRef<HTMLUListElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const [current, setCurrent] = useState(0);

  const update = () => {
    const row = rowRef.current;
    if (!row) return;
    const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
    const card = row.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : row.clientWidth;
    setCanScroll({ left: row.scrollLeft > 4, right: !atEnd });
    setCurrent(atEnd ? moments.length - 1 : Math.round(row.scrollLeft / step));
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scroll = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const card = row.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : row.clientWidth * 0.8;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 transition-colors hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 disabled:opacity-30 disabled:pointer-events-none";

  return (
    <div className="mt-20 md:mt-28">
      <div className="mb-8 flex items-center justify-between gap-4 border-t border-stone-200 dark:border-stone-800 pt-6">
        <p className="flex items-baseline gap-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          More moments
          <span aria-hidden="true" className="tabular-nums text-stone-900 dark:text-white">
            {String(current + 1).padStart(2, "0")}
            <span className="text-stone-400 dark:text-stone-600"> / {String(moments.length).padStart(2, "0")}</span>
          </span>
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => scroll(-1)} disabled={!canScroll.left} aria-label="Previous photos" className={arrow}>
            <FiArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={!canScroll.right} aria-label="More photos" className={arrow}>
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={rowRef}
        onScroll={update}
        // Bleeds into the side padding so cards slide in from the edge, while snapping in line with the text.
        className="-mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-16 md:px-16 scroll-px-4 sm:scroll-px-6 md:scroll-px-16 md:[mask-image:linear-gradient(to_right,transparent,black_4rem,black_calc(100%-4rem),transparent)] flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {moments.map((moment) => (
          // Cards are sized so the next one always peeks in, which signals there is more to see.
          <li key={moment.title} className="snap-start flex-shrink-0 w-[88%] sm:w-[70%] lg:w-[55%]">
            <MomentCard moment={moment} aspect="aspect-[4/3] lg:aspect-[3/2]" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CommunityLeadership = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 relative z-10">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-8 md:mb-10 font-bold flex items-center gap-3">
          <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />- NOT CODING?
        </h2>
        <div className="grid gap-6 lg:gap-16 lg:grid-cols-[1.2fr_1fr] items-end mb-12 md:mb-16">
          <p className="text-balance text-3xl md:text-[2.75rem] leading-[1.08] tracking-tight font-bold text-stone-900 dark:text-white">
            I am at my best when a room full of people finally gets it.
          </p>
          <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-lg">
            Teaching came first, and it never stopped. A talk, a workshop or a one-to-one, the job
            is the same: find the one picture that makes a hard idea click, then hand it over.
          </p>
        </div>

        <MomentCard moment={featured} aspect="aspect-[4/3] md:aspect-[16/9]" />

        <MomentsRow />

        <div className="mt-16 md:mt-20 rounded-3xl border border-amber-500/30 bg-amber-400/10 p-6 md:p-8">
          <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            Off the clock
          </p>
          <ul className="grid gap-5 md:grid-cols-2">
            {offTheClock.map((item) => (
              <li key={item.text} className="flex items-start gap-4">
                <span aria-hidden="true" className="text-3xl leading-none">{item.emoji}</span>
                <span className="text-base md:text-lg font-semibold leading-snug text-stone-900 dark:text-white">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CommunityLeadership;
