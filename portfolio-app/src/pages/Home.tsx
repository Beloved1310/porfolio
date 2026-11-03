import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiExternalLink,
  FiTwitter,
} from "react-icons/fi";
import CommunityLeadership from "./Community";
import HeroFlipCard from "../components/HeroFlipCard";
import { AlbumCover } from "../components/album/AlbumPages";
import { site } from "../data/site";
import { usePageTitle } from "../utils/usePageTitle";

const now = [
  { label: "Building", text: "Content Creation Studio. A team of AI agents that asks a human before it does anything risky." },
  { label: "Researching", text: "How to keep AI agents in check while they run, and how to share work between them." },
  {
    label: "Looking for",
    text: "Software, AI, solutions or forward deployed engineering roles in London. I can start now.",
  },
];

const socials = [
  { icon: <FiGithub />, href: site.github, label: "GitHub" },
  { icon: <FiLinkedin />, href: site.linkedin, label: "LinkedIn" },
  { icon: <FiTwitter />, href: site.twitter, label: "Twitter" },
  { icon: <FiMail />, href: `mailto:${site.email}`, label: "Email" },
  { icon: <FiDownload />, href: site.cvUrl, label: "Download CV" },
];

const Home = () => {
  const reduceMotion = useReducedMotion();
  usePageTitle();

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-50 dark:bg-stone-900 pt-20 md:pt-0"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  Open to software and AI engineering roles · London
                </div>
                <h1 className="relative block w-fit mx-auto lg:mx-0 overflow-hidden text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] mb-6 text-stone-900 dark:text-white">
                  AYO<span className="text-amber-600">.</span>
                  {!reduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-25deg] pointer-events-none"
                      initial={{ left: "-40%" }}
                      animate={{ left: "140%" }}
                      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                    />
                  )}
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm font-mono font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-8 sm:mb-12">
                  Software engineer. AI and agentic systems. Former teacher.
                </p>
              </div>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight max-w-2xl mx-auto lg:mx-0 text-stone-600 dark:text-stone-400 font-medium mb-8 sm:mb-12">
                {site.intro}
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch w-full mx-auto lg:mx-0">
                  <a href="#how-i-got-here" className="group flex flex-col items-center lg:items-start sm:flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-3 w-full px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-all"
                    >
                      Explore My Story
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                    <span className="mt-3 text-[9px] sm:text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
                      From the classroom to AI agents, in order
                    </span>
                  </a>
                  <Link to="/projects" className="group flex flex-col items-center lg:items-start sm:flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-3 w-full px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-700 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-all"
                    >
                      View Projects <FiExternalLink />
                    </motion.div>
                    <span className="mt-3 text-[9px] sm:text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
                      Straight to the work
                    </span>
                  </Link>
                </div>

                <div className="flex items-center justify-center lg:justify-start flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400">
                  <span>Start with:</span>
                  <Link
                    to="/projects/lar-framework"
                    className="text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors underline decoration-stone-300 dark:decoration-stone-700 hover:decoration-amber-500 underline-offset-2"
                  >
                    LAR framework
                  </Link>
                  <Link
                    to="/projects/content-creation-studio"
                    className="text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 transition-colors underline decoration-stone-300 dark:decoration-stone-700 hover:decoration-amber-500 underline-offset-2"
                  >
                    Content Creation Studio
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center"
            >
              <HeroFlipCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOW */}
      <section id="now" aria-labelledby="now-heading" className="border-b border-stone-100 dark:border-stone-800 px-4 sm:px-6 md:px-16 py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h2 id="now-heading" className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-6 font-bold flex items-center gap-3">
            <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />- NOW
          </h2>
          <dl className="grid gap-6 md:grid-cols-3">
            {now.map((item) => (
              <div key={item.label}>
                <dt className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                  {item.label}
                </dt>
                <dd className="text-sm md:text-base text-stone-700 dark:text-stone-300 leading-relaxed">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* HOW I GOT HERE */}
      <section
        id="how-i-got-here"
        className="relative py-20 md:py-32 px-4 sm:px-6 md:px-16 border-b border-stone-100 dark:border-stone-800 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex justify-center items-center order-1">
            <div className="relative w-full max-w-md aspect-[3/4]">
              <img
                src="/graduation.jpg"
                alt="Ayo graduating with an MSc in Software Engineering and Management, Distinction, from Kingston University London"
                loading="lazy"
                decoding="async"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
          <div className="order-2">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-6 font-bold flex items-center gap-3">
              <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />- HOW I GOT HERE
            </h2>
            <p className="text-2xl md:text-4xl leading-tight tracking-tight font-bold text-stone-900 dark:text-white mb-8">
              I learned how people learn before I learned how computers work.
            </p>
            <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-2xl mb-6">
              I was a teacher in Nigeria first. Curiosity pulled me into code, then into
              fintech and regtech, then to London for a master's. The classroom never left.
              It is why I explain things the way I do.
            </p>
            <Link
              to="/album"
              className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400"
            >
              The full story, in pictures
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="border-t border-stone-100 dark:border-stone-800">
        <CommunityLeadership />
      </section>

      {/* LIFE ALBUM TEASER */}
      <section
        id="life-album"
        className="relative py-20 md:py-32 px-4 sm:px-6 md:px-16 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40"
      >
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-6 font-bold flex items-center gap-3">
              <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />- LIFE ALBUM
            </h2>
            <p className="text-2xl md:text-4xl leading-tight tracking-tight font-bold text-stone-900 dark:text-white mb-6">
              From a classroom in Nigeria to AI agents in London.
            </p>
            <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 leading-relaxed max-w-xl mb-8">
              The same story, told in pictures. Nine chapters: the teaching years, the
              switch to code, the jobs, the degree, the stage, and what comes next.
            </p>
            <Link
              to="/album"
              className="group inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-xs"
            >
              Open the album
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <Link
            to="/album"
            aria-label="Open the Life Album"
            className="block mx-auto w-56 sm:w-64 aspect-[3/4] -rotate-3 hover:rotate-0 transition-transform duration-500 motion-reduce:transition-none"
          >
            <AlbumCover compact />
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative min-h-screen py-24 md:py-32 px-4 sm:px-6 md:px-16 bg-stone-900 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-10 group">
            <div className="absolute inset-0 rounded-full border border-white/10 scale-110 group-hover:scale-125 transition-transform duration-700" />
            <img
              src="/optimized/animie.jpg"
              alt="Illustration of a software engineer working at a laptop"
              loading="lazy"
              decoding="async"
              className="relative w-full h-full rounded-full object-cover border-2 border-white/10 shadow-2xl transition-all duration-700"
            />
          </div>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter mb-6 text-white">
            Ready when you are.
          </h2>
          <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
            A CV lists roles. It does not show how I think. If you are hiring, or want
            to talk about agents, teaching or anything in between, my inbox is open.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {socials.map((social, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -3, scale: 1.05 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-white hover:text-amber-400 hover:border-amber-400/40 transition-all"
                title={social.label}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
