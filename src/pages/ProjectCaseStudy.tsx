import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiAward, FiExternalLink, FiGithub, FiMonitor } from "react-icons/fi";
import SmartImage from "../components/SmartImage";
import SimulationFrame from "../components/simulations/SimulationFrame";
import LarSimulator from "../components/simulations/LarSimulator";
import { findProject, type CaseStudy } from "../data/projects";

// Simulations that can run inline on a case study page.
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
import { usePageTitle } from "../utils/usePageTitle";

const ProjectCaseStudy = () => {
  const { slug = "" } = useParams();
  const project = findProject(slug);
  usePageTitle(project ? project.title : "Project not found");

  if (!project || !project.caseStudy) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 text-center bg-white dark:bg-stone-950">
        <h1 className="text-4xl font-black tracking-tighter text-stone-900 dark:text-white mb-4">Project not found.</h1>
        <Link to="/projects" className="text-amber-700 dark:text-amber-400 font-bold underline underline-offset-4">
          Back to all projects
        </Link>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <article className="min-h-screen pt-24 pb-24 bg-white dark:bg-stone-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mb-10 text-[11px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400"
        >
          <FiArrowLeft aria-hidden="true" /> All projects
        </Link>

        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400 mb-4">
          Case study · {project.categories.join(" · ")}
        </p>
        {project.highlight && (
          <a
            href={project.highlight.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-stone-900 hover:bg-amber-300"
          >
            <FiAward aria-hidden="true" /> {project.highlight.label}
            {project.highlight.postUrl && (
              <>
                <span className="font-bold normal-case tracking-normal">· Read the post</span>
                <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only"> (opens LinkedIn in a new tab)</span>
              </>
            )}
          </a>
        )}
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.05] text-stone-900 dark:text-white mb-6">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-10">{project.summary}</p>

        <dl className="grid gap-4 sm:grid-cols-3 mb-12 text-sm">
          {project.period && (
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">When</dt>
              <dd className="text-stone-900 dark:text-white">{project.period}</dd>
            </div>
          )}
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">My role</dt>
            <dd className="text-stone-900 dark:text-white">{caseStudy.role}</dd>
          </div>
          {project.technologies.length > 0 && (
            <div className="sm:col-span-3">
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-2">Stack</dt>
              <dd className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-amber-500/5 text-amber-700 dark:text-amber-400 rounded-lg text-[10px] font-black uppercase tracking-tight border border-amber-500/20"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <SmartImage
          key={project.slug}
          sources={project.images}
          eager
          wrapperClassName="mb-16 aspect-video rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
          className="w-full h-full object-cover object-top"
        />

        <section className="mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-4 font-bold">The problem</h2>
          <p className="text-lg leading-relaxed text-stone-800 dark:text-stone-200">{caseStudy.problem}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-4 font-bold">The approach</h2>
          <ol className="space-y-4">
            {caseStudy.approach.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-code text-sm font-bold text-amber-700 dark:text-amber-400 pt-0.5">0{i + 1}</span>
                <p className="text-base md:text-lg leading-relaxed text-stone-800 dark:text-stone-200">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {caseStudy.outcome && (
          <section className="mb-12 rounded-3xl bg-stone-900 text-white p-6 md:p-8">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-4 font-bold">The outcome</h2>
            <p className="text-lg leading-relaxed">{caseStudy.outcome}</p>
          </section>
        )}

        {caseStudy.liveSimulation && (() => {
          const sim = liveSimulations[caseStudy.liveSimulation];
          return (
            <section aria-labelledby="see-it-run" className="mb-12">
              <h2 id="see-it-run" className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-4 font-bold">
                {sim.eyebrow}
              </h2>
              <p className="text-2xl md:text-3xl leading-tight tracking-tight font-bold text-stone-900 dark:text-white mb-4">
                {sim.title}
              </p>
              <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">{sim.intro}</p>
              <SimulationFrame id={`${project.slug}-simulation`} title={sim.frameTitle} whatThisShows={sim.whatThisShows}>
                {sim.demo}
              </SimulationFrame>
            </section>
          );
        })()}

        <div className="flex flex-wrap gap-3">
          {project.slides?.map((deck) => (
            <a
              key={deck.url}
              href={deck.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 dark:border-stone-700 rounded-full font-bold uppercase tracking-widest text-[11px] text-stone-800 dark:text-stone-200 hover:border-amber-500"
            >
              <FiMonitor aria-hidden="true" /> {deck.label}
            </a>
          ))}
          {caseStudy.simulation && (
            <Link
              to={caseStudy.simulation.to}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-amber-600 transition-colors"
            >
              {caseStudy.simulation.label} <FiArrowRight aria-hidden="true" />
            </Link>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-[11px]"
            >
              <FiGithub aria-hidden="true" /> Source code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 dark:border-stone-700 rounded-full font-bold uppercase tracking-widest text-[11px] text-stone-800 dark:text-stone-200"
            >
              <FiExternalLink aria-hidden="true" /> {project.liveLabel ?? "Live site"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCaseStudy;
