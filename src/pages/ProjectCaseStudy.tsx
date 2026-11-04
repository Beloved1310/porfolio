import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBookOpen,
  FiClock,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiMonitor,
  FiTrendingUp,
  FiUser,
  FiX,
} from "react-icons/fi";
import SmartImage from "../components/SmartImage";
import SimulationFrame from "../components/simulations/SimulationFrame";
import LarSimulator from "../components/simulations/LarSimulator";
import { findProject, projects, type CaseStudy, type ChallengeStory, type ImageSource, type SlideLink } from "../data/projects";
import { findWorkRole, workRoles } from "../data/work";
import { usePageTitle } from "../utils/usePageTitle";

// Simulations that run inline on a case study page.
const liveSimulations: Record<
  NonNullable<CaseStudy["liveSimulation"]>,
  { eyebrow: string; title: string; intro: string; frameTitle: string; whatThisShows: string; demo: ReactNode }
> = {
  lar: {
    eyebrow: "See it run",
    title: "An agent should never have more power than the person it works for.",
    intro: "Give two agents the same task. One runs on the person's full access. The other runs under LAR. Watch the difference.",
    frameTitle: "LAR Governance Simulator",
    whatThisShows:
      "How Lock, Attribute and Require stop an agent from taking a high-risk action on its own, and leave a clear record of who approved what.",
    demo: <LarSimulator />,
  },
};

interface UnifiedItem {
  slug: string;
  type: "work" | "project";
  title: string;
  company?: string;
  role: string;
  period?: string;
  summary: string;
  images: ImageSource[];
  technologies: string[];
  categories: string[];
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  highlight?: { label: string; postUrl?: string };
  slides?: SlideLink[];
  caseStudy: CaseStudy;
}

const ProjectCaseStudy = () => {
  const { slug = "" } = useParams();
  const [modalStoryIndex, setModalStoryIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalStoryIndex(null);
      }
    };
    if (modalStoryIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [modalStoryIndex]);

  // Unified lookup across projects and professional work roles
  const item: UnifiedItem | null = useMemo(() => {
    const project = findProject(slug);
    if (project) {
      return {
        slug: project.slug,
        type: "project",
        title: project.title,
        company: project.company,
        role: project.caseStudy.role || "Software Engineer",
        period: project.period,
        summary: project.summary,
        images: project.images,
        technologies: project.technologies,
        categories: project.categories,
        liveUrl: project.liveUrl,
        liveLabel: project.liveLabel,
        githubUrl: project.githubUrl,
        highlight: project.highlight,
        slides: project.slides,
        caseStudy: project.caseStudy,
      };
    }

    const work = findWorkRole(slug);
    if (work) {
      return {
        slug: work.slug,
        type: "work",
        title:
          work.id === "dti"
            ? "Prayer Bud — Admin Activity & Community Platform"
            : `${work.company} — ${work.role}`,
        company: work.company,
        role: work.caseStudy.role || work.role,
        period: work.period,
        summary: work.summary,
        images: work.images,
        technologies: work.technologies,
        categories: ["Full-Stack", "Production Work"],
        liveUrl: work.liveUrl,
        liveLabel: work.liveLabel,
        caseStudy: work.caseStudy,
      };
    }

    return null;
  }, [slug]);

  // Compute all unified items for next/previous navigation
  const allStories: { slug: string; title: string; route: string; type: string }[] = useMemo(() => {
    const workItems = workRoles.map((w) => ({
      slug: w.slug,
      title: w.id === "dti" ? "Prayer Bud (DTI)" : w.company,
      route: `/work/${w.slug}`,
      type: "Work Experience",
    }));
    const projectItems = projects.map((p) => ({
      slug: p.slug,
      title: p.title,
      route: `/projects/${p.slug}`,
      type: "Project",
    }));
    return [...workItems, ...projectItems];
  }, []);

  const currentIndex = allStories.findIndex((s) => s.slug === slug);
  const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextStory = currentIndex >= 0 && currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;

  usePageTitle(item ? `${item.title} | Case Study` : "Case Study Not Found");

  if (!item) {
    return (
      <div className="min-h-screen pt-36 pb-24 px-4 text-center bg-white dark:bg-stone-950 flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 dark:text-white mb-4">
          Story Not Found
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-md">
          The requested project or work experience case study could not be located.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors"
        >
          <FiArrowLeft /> Back to all projects
        </Link>
      </div>
    );
  }

  const { caseStudy } = item;
  const metrics = caseStudy.metrics || [];
  const reflections = caseStudy.reflection || caseStudy.takeaways || [];

  // Normalize challenges to ChallengeStory objects with all 4 pillars: Problem, Engineering Solutions, Impact, Reflection
  const challengeStories: ChallengeStory[] = (caseStudy.challenges || []).map((ch, idx) => {
    if (typeof ch === "string") {
      const [title, ...descParts] = (ch as string).includes(":")
        ? (ch as string).split(":")
        : [`Challenge 0${idx + 1}`, ch];
      const desc = descParts.join(":").trim();
      return {
        title: title.trim(),
        problem: desc,
        engineeringSolution:
          "Architected and implemented production-grade solutions using modern engineering best practices.",
        engineeringDecision:
          "Architected and implemented production-grade solutions using modern engineering best practices.",
        impact: "Successfully resolved technical and operational constraints, delivering measurable reliability.",
        reflection: "Iterative testing and tight stakeholder feedback loops were critical to sustainable delivery.",
      };
    }
    const sol =
      ch.engineeringSolution ||
      ch.engineeringDecision ||
      "Architected and implemented production-grade solutions using modern engineering best practices.";
    const ref =
      ch.reflection ||
      (reflections[idx] ?? "Careful architectural design and continuous measurement ensured sustainable, maintainable code.");
    return {
      title: ch.title,
      problem: ch.problem,
      engineeringSolution: sol,
      engineeringDecision: sol,
      impact: ch.impact,
      reflection: ref,
    };
  });

  return (
    <article className="min-h-screen pt-24 pb-28 bg-[#fafafa] dark:bg-[#07090e] text-stone-900 dark:text-stone-100 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Back Affordance */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/80 dark:border-stone-800">
          <Link
            to={item.type === "work" ? "/projects#work" : "/projects"}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400 transition-colors"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            {item.type === "work" ? "All Work Experience" : "All Projects"}
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-stone-400 dark:text-stone-500">
            <span>Ayo</span>
            <span>/</span>
            <span className="capitalize">{item.type}</span>
            <span>/</span>
            <span className="text-stone-700 dark:text-stone-300 truncate max-w-[200px]">{item.title}</span>
          </div>
        </div>

        {/* Hero Header Zone */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              {item.type === "work" ? "Professional Work Case Study" : "Case Study"} · {item.categories.join(" · ")}
            </span>
            {item.highlight && (
              <a
                href={item.highlight.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/90 text-stone-950 px-3 py-1 text-[10px] font-black uppercase tracking-widest hover:bg-amber-300 transition-colors"
              >
                <FiAward aria-hidden="true" /> {item.highlight.label}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-stone-950 dark:text-white mb-6 text-balance">
            {item.title}
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-normal mb-8 max-w-3xl">
            {item.summary}
          </p>

          {/* Quick Context & Meta Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 shadow-sm mb-8">
            {item.company && (
              <div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
                  <FiLayers aria-hidden="true" /> Company / Client
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100">{item.company}</p>
              </div>
            )}
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
                <FiUser aria-hidden="true" /> Role
              </span>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100 truncate">{item.role}</p>
            </div>
            {item.period && (
              <div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
                  <FiClock aria-hidden="true" /> Timeline
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100">{item.period}</p>
              </div>
            )}
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">
                <FiTrendingUp aria-hidden="true" /> Domain Focus
              </span>
              <p className="text-xs sm:text-sm font-semibold text-amber-700 dark:text-amber-400">
                {item.categories[0] || "Full-Stack"}
              </p>
            </div>
          </div>

          {/* Action Links Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs font-bold uppercase tracking-widest hover:bg-amber-700 dark:hover:bg-amber-400 transition-colors shadow-sm"
              >
                <FiExternalLink aria-hidden="true" /> {item.liveLabel ?? "Visit Live Platform"}
              </a>
            )}
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-widest hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                <FiGithub aria-hidden="true" /> Source Code
              </a>
            )}
            {item.slides?.map((deck) => (
              <a
                key={deck.url}
                href={deck.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-widest hover:border-amber-600 transition-colors"
              >
                <FiMonitor aria-hidden="true" /> {deck.label}
              </a>
            ))}
            {caseStudy.simulation && (
              <Link
                to={caseStudy.simulation.to}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-700 text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-sm"
              >
                {caseStudy.simulation.label} <FiArrowRight aria-hidden="true" />
              </Link>
            )}
          </div>
        </header>

        {/* Featured Visual Media Frame */}
        {item.images.length > 0 && (
          <div className="mb-16">
            <SmartImage
              key={item.slug}
              sources={item.images}
              eager
              wrapperClassName="aspect-video w-full rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg"
              className="w-full h-full object-cover object-top"
            />
            <p className="mt-2.5 text-center text-xs font-mono text-stone-500 dark:text-stone-400">
              {item.images[0]?.alt || `${item.title} interface preview`}
            </p>
          </div>
        )}

        {/* DEDICATED TECHNICAL SKILLS & STACK CARD */}
        {item.technologies.length > 0 && (
          <section aria-labelledby="skills-card-heading" className="mb-14">
            <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-stone-100 dark:border-stone-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
                    <FiCode aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      id="skills-card-heading"
                      className="text-lg sm:text-xl font-black tracking-tight text-stone-950 dark:text-white"
                    >
                      Technical Stack & Core Skills
                    </h2>
                    <p className="text-xs font-mono text-stone-500 dark:text-stone-400">
                      Applied technologies, frameworks, and architecture
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-[11px] font-mono px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold">
                  {item.technologies.length} core technologies
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6 font-normal">
                Key languages, frontend libraries, backend runtimes, databases, and infrastructure tools utilized across this system:
              </p>

              <ul className="flex flex-wrap gap-2.5">
                {item.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200/90 dark:border-stone-800 text-xs font-mono font-semibold text-stone-800 dark:text-stone-200 hover:border-amber-500/60 hover:text-amber-700 dark:hover:text-amber-400 transition-colors shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* THE STORY FORMAT: Structured UX Content Sections */}
        <div className="space-y-16">
          {/* STORIES SECTION */}
          {challengeStories.length > 0 && (
            <section className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200/80 dark:border-stone-800">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                    System Challenges & Architectural Stories
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 dark:text-white uppercase tracking-wider">
                    Engineering Stories
                  </h2>
                </div>
                <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  {challengeStories.length} detailed breakdown{challengeStories.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Individual Challenge Story Cards */}
              <div className="space-y-8">
                {challengeStories.map((ch, idx) => (
                  <div
                    key={idx}
                    id={`story-${idx + 1}`}
                    className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm transition-all"
                  >
                    {/* Story Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-stone-100 dark:border-stone-800/80">
                      <div className="flex items-start gap-3.5">
                        <span className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 font-mono text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                            Story 0{idx + 1}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black tracking-tight text-stone-950 dark:text-white">
                            {ch.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setModalStoryIndex(idx)}
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 font-mono text-xs font-bold transition-all shadow-sm hover:shadow active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
                        title="Read full dedicated story popup"
                      >
                        <FiBookOpen className="text-sm text-amber-400 dark:text-amber-600" aria-hidden="true" />
                        <span>Read Story Details</span>
                        <FiArrowRight className="text-xs opacity-70 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* 4 Pillars: Problem, Engineering Solutions, Impact, Reflection (Standard Palette) */}
                    <div className="space-y-4">
                      {/* Problem & Operational Friction */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                        <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                          Problem & Operational Friction
                        </span>
                        <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                          {ch.problem}
                        </p>
                      </div>

                      {/* Engineering Solutions & Technical Architecture */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                        <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                          Engineering Solutions & Technical Architecture
                        </span>
                        <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                          {ch.engineeringSolution || ch.engineeringDecision}
                        </p>
                      </div>

                      {/* Direct Impact & Results */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                        <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                          Direct Impact & Results
                        </span>
                        <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                          {ch.impact}
                        </p>
                      </div>

                      {/* Engineering Reflection & Trade-Offs */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                        <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                          Engineering Reflection & Trade-Offs
                        </span>
                        <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                          {ch.reflection}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* RESULTS & PRODUCTION METRICS */}
          {(metrics.length > 0 || item.liveUrl) && (
            <section className="relative rounded-3xl bg-stone-900 text-white dark:bg-stone-900/95 border border-stone-800 p-6 sm:p-8 shadow-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-800">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block mb-1">
                    Production Results
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase tracking-wider">
                    Results & Live Scale
                  </h2>
                </div>
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all shrink-0"
                  >
                    <span>Live Product: {item.liveLabel ?? item.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                    <FiArrowUpRight />
                  </a>
                )}
              </div>

              {metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-4 sm:p-5 rounded-2xl bg-stone-800/85 border border-stone-700/80 flex flex-col justify-between"
                    >
                      <div>
                        <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-1">
                          {m.label}
                        </span>
                        <span className="block text-2xl sm:text-3xl font-black tracking-tight text-amber-400 tabular-nums">
                          {m.value}
                        </span>
                      </div>
                      {m.description && (
                        <span className="block text-xs text-stone-300 mt-2 leading-snug">
                          {m.description}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* INLINE SIMULATION (e.g. LAR Simulator) */}
          {caseStudy.liveSimulation && (() => {
            const sim = liveSimulations[caseStudy.liveSimulation];
            return (
              <section aria-labelledby="see-it-run" className="pt-6 border-t border-stone-200 dark:border-stone-800">
                <h2
                  id="see-it-run"
                  className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-4 font-bold"
                >
                  {sim.eyebrow}
                </h2>
                <p className="text-2xl md:text-3xl leading-tight tracking-tight font-bold text-stone-900 dark:text-white mb-4">
                  {sim.title}
                </p>
                <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed mb-8">{sim.intro}</p>
                <SimulationFrame id={`${item.slug}-simulation`} title={sim.frameTitle} whatThisShows={sim.whatThisShows}>
                  {sim.demo}
                </SimulationFrame>
              </section>
            );
          })()}

        </div>

        {/* BOTTOM PAGINATION: NEXT / PREVIOUS STORIES */}
        <nav
          aria-label="Story pagination"
          className="mt-20 pt-10 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prevStory ? (
            <Link
              to={prevStory.route}
              className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all text-left flex flex-col justify-between"
            >
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 group-hover:text-amber-600 transition-colors">
                <FiArrowLeft /> Previous {prevStory.type}
              </span>
              <span className="text-base font-bold text-stone-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mt-2">
                {prevStory.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextStory ? (
            <Link
              to={nextStory.route}
              className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all text-right flex flex-col justify-between"
            >
              <span className="flex items-center justify-end gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 group-hover:text-amber-600 transition-colors">
                Next {nextStory.type} <FiArrowRight />
              </span>
              <span className="text-base font-bold text-stone-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors mt-2">
                {nextStory.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>

      {/* DEDICATED STORY DETAILS MODAL / DETAILS VIEW */}
      {modalStoryIndex !== null && challengeStories[modalStoryIndex] && (() => {
        const activeStory = challengeStories[modalStoryIndex];
        const hasPrev = modalStoryIndex > 0;
        const hasNext = modalStoryIndex < challengeStories.length - 1;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-story-title"
            onClick={() => setModalStoryIndex(null)}
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
                      Story 0{modalStoryIndex + 1} of 0{challengeStories.length}
                    </span>
                    <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                      · {item.title}
                    </span>
                  </div>
                  <h2
                    id="modal-story-title"
                    className="text-xl sm:text-2xl font-black tracking-tight text-stone-950 dark:text-white"
                  >
                    {activeStory.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setModalStoryIndex(null)}
                  className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
                  aria-label="Close story details"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Modal 4 Pillars Content */}
              <div className="space-y-4">
                {/* 1. Problem */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                    Problem & Operational Friction
                  </span>
                  <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                    {activeStory.problem}
                  </p>
                </div>

                {/* 2. Engineering Solutions */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                    Engineering Solutions & Technical Architecture
                  </span>
                  <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                    {activeStory.engineeringSolution || activeStory.engineeringDecision}
                  </p>
                </div>

                {/* 3. Impact */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                    Direct Impact & Results
                  </span>
                  <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                    {activeStory.impact}
                  </p>
                </div>

                {/* 4. Reflection */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800/80">
                  <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                    Engineering Reflection & Trade-Offs
                  </span>
                  <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                    {activeStory.reflection}
                  </p>
                </div>
              </div>

              {/* Modal Footer with Story Navigation */}
              <div className="flex items-center justify-between gap-4 mt-8 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  disabled={!hasPrev}
                  onClick={() => setModalStoryIndex(modalStoryIndex - 1)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                    hasPrev
                      ? "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700"
                      : "opacity-30 cursor-not-allowed text-stone-400"
                  }`}
                >
                  <FiArrowLeft /> Previous Story
                </button>

                <span className="text-xs font-mono text-stone-400">
                  {modalStoryIndex + 1} / {challengeStories.length}
                </span>

                <button
                  type="button"
                  disabled={!hasNext}
                  onClick={() => setModalStoryIndex(modalStoryIndex + 1)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                    hasNext
                      ? "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700"
                      : "opacity-30 cursor-not-allowed text-stone-400"
                  }`}
                >
                  Next Story <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </article>
  );
};

export default ProjectCaseStudy;
