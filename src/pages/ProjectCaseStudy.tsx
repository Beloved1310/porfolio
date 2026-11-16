import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiClock,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiMonitor,
  FiTrendingUp,
  FiUser,
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
            ? "Prayer Bud: Admin Activity and Community Platform"
            : `${work.company}: ${work.role}`,
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
          We could not find that project.
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
  const challengeStories: ChallengeStory[] = caseStudy.challenges.map((ch) => ({
    ...ch,
    engineeringSolution: ch.engineeringSolution || ch.engineeringDecision || "See the linked implementation for the engineering details.",
  }));

  return (
    <article className="min-h-screen pt-24 pb-28 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
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
              {item.type === "work" ? "Work case study" : "Case Study"} · {item.categories.join(" · ")}
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
              wrapperClassName="w-full flex justify-center rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm"
              className="block w-full max-h-[70vh] object-contain"
            />
            <p className="mt-2.5 text-sm text-stone-500 dark:text-stone-400">
              {item.images[0]?.alt || `${item.title} interface preview`}
            </p>
          </div>
        )}

        <div className="mb-14 space-y-10">
          <section aria-labelledby="context-heading" className="max-w-3xl">
            <p className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">Context</p>
            <h2 id="context-heading" className="sr-only">Project context</h2>
            <p className="text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300">{caseStudy.problem}</p>
          </section>

          {item.technologies.length > 0 && (
            <section aria-label="Tools used">
              <h2 className="mb-3 text-sm font-semibold text-stone-700 dark:text-stone-300">Tools used</h2>
              <ul className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900 px-3 py-1.5 text-sm text-stone-700 dark:text-stone-300">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {challengeStories.slice(0, 2).map((story) => (
            <article key={story.title} className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-7">
              <p className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">Engineering decision</p>
              <h2 className="mb-5 text-xl sm:text-2xl font-semibold tracking-tight text-stone-900 dark:text-white">{story.title}</h2>
              <dl className="grid gap-5 md:grid-cols-2">
                <div>
                  <dt className="mb-1 text-sm font-semibold text-stone-500 dark:text-stone-400">Constraint</dt>
                  <dd className="leading-relaxed text-stone-700 dark:text-stone-300">{story.problem}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm font-semibold text-stone-500 dark:text-stone-400">Decision</dt>
                  <dd className="leading-relaxed text-stone-700 dark:text-stone-300">{story.engineeringSolution || story.engineeringDecision}</dd>
                </div>
                <div className="md:col-span-2 border-t border-stone-200 dark:border-stone-800 pt-4">
                  <dt className="mb-1 text-sm font-semibold text-amber-800 dark:text-amber-300">What changed</dt>
                  <dd className="leading-relaxed text-stone-800 dark:text-stone-200">{story.impact}</dd>
                </div>
              </dl>
            </article>
          ))}

        </div>

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

    </article>
  );
};

export default ProjectCaseStudy;
