import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiExternalLink,
  FiX,
} from "react-icons/fi";
import { talks, type Talk } from "../data/research";
import SmartImage from "../components/SmartImage";
import { usePageTitle } from "../utils/usePageTitle";
import RelatedLinks from "../components/RelatedLinks";

const storyButtonClass =
  "group inline-flex items-center gap-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200 transition-colors hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer";

const Research = () => {
  usePageTitle("Speaking & Community");

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalIndex(null);
      }
    };
    if (activeModalIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeModalIndex]);

  const activeTalk: Talk | null =
    activeModalIndex !== null && talks[activeModalIndex] ? talks[activeModalIndex] : null;

  return (
    <div className="min-h-screen pt-24 pb-28 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 pb-4 border-b border-stone-200/80 dark:border-stone-800">
          <Link
            to="/#speaking"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400 transition-colors"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Home
          </Link>
        </div>

        {/* Narrative Intro */}
        <header className="mb-14 max-w-3xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400 block mb-3">
            Sharing with communities
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-stone-950 dark:text-white mb-6">
            I speak to share what I have learned, the mistakes I made and how I fixed them. Every talk is personal.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
            I don&apos;t get on stage to deliver scripted product pitches or pretend everything was easy. I speak to open-source the real engineering hurdles: the systems that broke under unexpected scale, the architectural mistakes we made, and the hard-won solutions that actually worked in production. Every time I hold a microphone, it&apos;s an honest conversation with fellow builders.
          </p>
        </header>

        {/* PHOTO-FIRST TALKS GALLERY: HORIZONTALLY BIGGER WITH VARIED DIMENSIONS */}
        <section aria-label="Speaking Engagements" className="space-y-12 mb-24">
          {/* 1. HERO TALK: LLMday London - Wide Panoramic Showcase */}
          {talks[0] && (
            <div className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all">
              {/* Full LLMday Photo */}
              <div
                onClick={() => setActiveModalIndex(0)}
                className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer group"
                title="Click image to read full talk story"
              >
                {talks[0].image ? (
                  <SmartImage
                    sources={talks[0].image}
                    wrapperClassName="w-full"
                    className="block h-auto max-h-[75vh] w-full object-contain"
                  />
                ) : (
                  <img
                    src="/ayo-speaking-llmday.jpg"
                    alt={talks[0].title}
                    className="block h-auto max-h-[75vh] w-full object-contain"
                  />
                )}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-white/10 shadow-sm">
                    {talks[0].event}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/90 text-stone-950 shadow-md group-hover:bg-amber-400 transition-colors">
                    <FiBookOpen className="text-sm" /> Click image to read story
                  </span>
                </div>
              </div>

              {/* Concise Talk Details & CTA Button */}
              <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-3xl">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                    Talk · London
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950 dark:text-white mb-2">
                    &ldquo;{talks[0].title}&rdquo;
                  </h2>
                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {talks[0].brief}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalIndex(0)}
                  className={storyButtonClass}
                >
                  <FiBookOpen className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <span>Read Talk Story</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* 2. ASYMMETRICAL PAIR: Talk 1 (Bitwise - 7 Cols, 16:9) & Talk 2 (DTX Panel - 5 Cols, 4:3) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {talks[1] && (
              <div className="lg:col-span-7 rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div
                    onClick={() => setActiveModalIndex(1)}
                    className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer group"
                    title="Click image to read full talk story"
                  >
                    {talks[1].image && (
                      <SmartImage
                        sources={talks[1].image}
                        wrapperClassName="w-full"
                        className="block h-auto max-h-[70vh] w-full object-contain"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-white/10">
                        {talks[1].event}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                      {talks[1].format} · Technical Architecture
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-white mb-2 leading-snug">
                      {talks[1].title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal mb-6">
                      {talks[1].brief}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveModalIndex(1)}
                    className={storyButtonClass}
                  >
                    <FiBookOpen className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                    <span>Read Talk Story</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {talks[2] && (
              <div className="lg:col-span-5 rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div
                    onClick={() => setActiveModalIndex(2)}
                    className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer group"
                    title="Click image to read full talk story"
                  >
                    {talks[2].image && (
                      <SmartImage
                        sources={talks[2].image}
                        wrapperClassName="w-full"
                        className="block h-auto max-h-[70vh] w-full object-contain"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-white/10">
                        {talks[2].event}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                      {talks[2].format} {talks[2].date ? `· ${talks[2].date}` : ""}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-white mb-2 leading-snug">
                      {talks[2].title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal mb-6">
                      {talks[2].brief}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveModalIndex(2)}
                    className={storyButtonClass}
                  >
                    <FiBookOpen className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                    <span>Read Panel Story</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. WIDE CINEMATIC BANNER: Talk 3 (DevFest Google Developer Group - 16:7 panoramic) */}
          {talks[3] && (
            <div className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all">
              <div
                onClick={() => setActiveModalIndex(3)}
                className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer group"
                title="Click image to read full talk story"
              >
                {talks[3].image && (
                  <SmartImage
                    sources={talks[3].image}
                    wrapperClassName="w-full"
                    className="block h-auto max-h-[70vh] w-full object-contain"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-white/10">
                    {talks[3].event}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                    {talks[3].format} · Engineering Observability
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950 dark:text-white mb-2">
                    {talks[3].title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {talks[3].brief}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalIndex(3)}
                  className={storyButtonClass}
                >
                  <FiBookOpen className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <span>Read Talk Story</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* 4. ASYMMETRICAL PAIR: Talk 4 (Web3 Lagos - 5 Cols, 4:3) & Talk 5 (Web3 Global - 7 Cols, 16:9) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {talks[4] && (
              <div className="lg:col-span-5 rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div
                    onClick={() => setActiveModalIndex(4)}
                    className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer group"
                    title="Click image to read full talk story"
                  >
                    {talks[4].image && (
                      <SmartImage
                        sources={talks[4].image}
                        wrapperClassName="w-full"
                        className="block h-auto max-h-[70vh] w-full object-contain"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-white/10">
                        {talks[4].event}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                      {talks[4].format} · Developer Ecosystems
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-white mb-2 leading-snug">
                      {talks[4].title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal mb-6">
                      {talks[4].brief}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveModalIndex(4)}
                    className={storyButtonClass}
                  >
                    <FiBookOpen className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                    <span>Read Talk Story</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {talks[5] && (
              <div className="lg:col-span-7 rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div
                    onClick={() => setActiveModalIndex(5)}
                    className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer group"
                    title="Click image to read full talk story"
                  >
                    {talks[5].image && (
                      <SmartImage
                        sources={talks[5].image}
                        wrapperClassName="w-full"
                        className="block h-auto max-h-[70vh] w-full object-contain"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-white/10">
                        {talks[5].event}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                      {talks[5].format} · Community Panel
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-950 dark:text-white mb-2 leading-snug">
                      {talks[5].title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal mb-6">
                      {talks[5].brief}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveModalIndex(5)}
                    className={storyButtonClass}
                  >
                    <FiBookOpen className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                    <span>Read Panel Story</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. WIDE EXPANSIVE CARD: Talk 6 (The Multicall Plugin - 16:8) */}
          {talks[6] && (
            <div className="rounded-3xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-sm hover:border-amber-500/50 transition-all">
              <div
                onClick={() => setActiveModalIndex(6)}
                className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer group"
                title="Click image to read full talk story"
              >
                {talks[6].image && (
                  <SmartImage
                    sources={talks[6].image}
                    wrapperClassName="w-full"
                    className="block h-auto max-h-[70vh] w-full object-contain"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-white/10">
                    {talks[6].event}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                    {talks[6].format} · Protocol Optimization
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950 dark:text-white mb-2">
                    {talks[6].title}
                  </h3>
                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {talks[6].brief}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalIndex(6)}
                  className={storyButtonClass}
                >
                  <FiBookOpen className="text-amber-700 dark:text-amber-400" aria-hidden="true" />
                  <span>Read Talk Story</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* BOTTOM NAVIGATION AFFORDANCE */}
        <RelatedLinks
          title="KEEP EXPLORING"
          links={[
            {
              label: "Work & Production Systems",
              description: "Case studies, how things were built and research papers.",
              to: "/projects",
            },
            {
              label: "Life Album",
              description: "The full story from a classroom in Nigeria to engineering in London.",
              to: "/album",
            },
          ]}
        />
      </div>

      {/* DEDICATED POP-UP MODAL VIEW (OPENS ONLY WHEN AN IMAGE OR BUTTON IS CLICKED) */}
      {activeTalk && activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="talk-modal-title"
          onClick={() => setActiveModalIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-2xl text-stone-900 dark:text-stone-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    Talk 0{activeModalIndex + 1} of 0{talks.length}
                  </span>
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500 truncate max-w-xs">
                    · {activeTalk.event}
                  </span>
                </div>
                <h2
                  id="talk-modal-title"
                  className="text-2xl sm:text-3xl font-black tracking-tight text-stone-950 dark:text-white"
                >
                  &ldquo;{activeTalk.title}&rdquo;
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalIndex(null)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
                aria-label="Close talk details"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Modal Image View */}
            {activeTalk.image && activeTalk.image.length > 0 && (
              <div className="relative w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 mb-6 border border-stone-200 dark:border-stone-800">
                <SmartImage
                  sources={activeTalk.image}
                  wrapperClassName="w-full"
                  className="block h-auto max-h-[75vh] w-full object-contain"
                />
              </div>
            )}

            {/* Modal Story Content (Mistake, Solution, Takeaway) */}
            <div className="space-y-4">
              {activeTalk.story ? (
                <>
                  {/* Section 1: Mistake or Context */}
                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                    <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                      {activeTalk.story.mistakeOrContextTitle || "The problem"}
                    </span>
                    <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                      {activeTalk.story.mistakeOrContextText}
                    </p>
                  </div>

                  {/* Section 2: Solution or Architecture */}
                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                    <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                      {activeTalk.story.solutionOrArchitectureTitle || "The solution"}
                    </span>
                    <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                      {activeTalk.story.solutionOrArchitectureText}
                    </p>
                  </div>

                  {/* Section 3: Takeaway or Reflection */}
                  {activeTalk.story.reflectionOrTakeaway && (
                    <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                      <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                        What I took away
                      </span>
                      <p className="italic text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                        {activeTalk.story.reflectionOrTakeaway}
                      </p>
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {activeTalk.story.caseStudyUrl && (
                      <Link
                        to={activeTalk.story.caseStudyUrl}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-700 dark:hover:bg-amber-400 dark:hover:text-stone-950 transition-colors shadow-sm"
                      >
                        <span>{activeTalk.story.caseStudyLabel || "Read the case study"}</span>
                        <FiArrowRight />
                      </Link>
                    )}
                    {activeTalk.link && (
                      <a
                        href={activeTalk.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-widest hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                      >
                        <span>Read the post</span>
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                  <p className="text-base text-stone-800 dark:text-stone-200 leading-relaxed">
                    {activeTalk.brief}
                  </p>
                  {activeTalk.link && (
                    <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                      <a
                        href={activeTalk.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 hover:underline"
                      >
                        <span>View post & recording</span>
                        <FiExternalLink />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer with Story Navigation */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                disabled={activeModalIndex <= 0}
                onClick={() => setActiveModalIndex(activeModalIndex - 1)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  activeModalIndex > 0
                    ? "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
                    : "opacity-30 cursor-not-allowed text-stone-400"
                }`}
              >
                <FiArrowLeft /> Previous Talk
              </button>

              <span className="text-xs font-mono text-stone-400">
                {activeModalIndex + 1} / {talks.length}
              </span>

              <button
                type="button"
                disabled={activeModalIndex >= talks.length - 1}
                onClick={() => setActiveModalIndex(activeModalIndex + 1)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                  activeModalIndex < talks.length - 1
                    ? "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
                    : "opacity-30 cursor-not-allowed text-stone-400"
                }`}
              >
                Next Talk <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;
