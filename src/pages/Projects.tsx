import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import ShowcaseCard from "../components/ShowcaseCard";
import RelatedLinks from "../components/RelatedLinks";
import PageHeader from "../components/PageHeader";
import { openSource, projects, type Project, type ProjectCategory } from "../data/projects";
import { hackathons, workRoles } from "../data/work";
import { publications, researchInterests } from "../data/research";
import { usePageTitle } from "../utils/usePageTitle";

type TabId = "work" | "ai" | "backend" | "frontend" | "research" | "hackathons" | "open-source";

const tabs: { id: TabId; label: string; heading: string; intro?: string }[] = [
  { id: "work", label: "Work", heading: "Where I have worked, and what I built there." },
  { id: "ai", label: "AI", heading: "Agents and pipelines that keep a person in charge." },
  { id: "backend", label: "Backend", heading: "APIs, services and data that has to be right." },
  { id: "frontend", label: "Frontend", heading: "Interfaces people use, wired to real systems." },
  { id: "research", label: "Research", heading: "Papers I have written or co-written, and what I brought to them." },
  {
    id: "hackathons",
    label: "Hackathons",
    heading: "Give me a deadline, a team and a problem nobody has framed yet.",
    intro:
      "Hackathons are the job in fast-forward. Frame the problem, split the work, ship something real before the clock runs out. I have been on every side of the table.",
  },
  { id: "open-source", label: "Open source", heading: "Contributions in public." },
];

const categoryTabs: Partial<Record<TabId, ProjectCategory>> = { ai: "AI", backend: "Backend", frontend: "Frontend" };

// Old anchors (#impact, #projects, story ids) all land on the Work tab.
const resolveTab = (hash: string): TabId => {
  const key = hash.replace(/^#/, "");
  return tabs.some((t) => t.id === key) ? (key as TabId) : "work";
};

const ProjectCard = ({ project }: { project: Project }) => (
  <ShowcaseCard
    images={project.images}
    title={project.title}
    eyebrow={project.categories.join(" · ")}
    meta={project.period}
    highlight={project.highlight?.label}
    detailUrl={`/projects/${project.slug}`}
    links={[
      { label: "View story & details", href: `/projects/${project.slug}`, internal: true },
      ...(project.highlight?.postUrl ? [{ label: "Read post", href: project.highlight.postUrl }] : []),
      ...(project.liveUrl ? [{ label: project.liveLabel ?? "Live site", href: project.liveUrl }] : []),
      ...(project.githubUrl ? [{ label: "Source", href: project.githubUrl }] : []),
    ]}
  >
    <p>{project.summary}</p>
  </ShowcaseCard>
);

const grid = "grid gap-6 md:grid-cols-2 lg:grid-cols-3";

const TabPanel = ({ tab }: { tab: TabId }) => {
  if (tab === "work") {
    return (
      <div className={grid}>
        {workRoles.map((role) => (
          <ShowcaseCard
            key={role.id}
            images={role.images}
            title={role.company}
            eyebrow={role.role}
            meta={role.period}
            detailUrl={`/work/${role.slug}`}
            links={[
              { label: "View work details", href: `/work/${role.slug}`, internal: true },
              ...(role.liveUrl ? [{ label: role.liveLabel ?? "Visit site", href: role.liveUrl }] : []),
            ]}
          >
            <p>{role.summary}</p>
          </ShowcaseCard>
        ))}
      </div>
    );
  }

  const category = categoryTabs[tab];
  if (category) {
    return (
      <div className={grid}>
        {projects
          .filter((p) => p.categories.includes(category))
          // Award winners lead their tab.
          .sort((a, b) => Number(!!b.highlight) - Number(!!a.highlight))
          .map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
      </div>
    );
  }

  if (tab === "research") {
    return (
      <>
        <div className={grid}>
          {publications.map((p) => (
            <ShowcaseCard key={p.title} images={[]} title={p.title} eyebrow={p.status} meta={p.venue} links={[p.link]}>
              {p.authors && <p className="mb-2">{p.authors}</p>}
              {p.contribution && <p className="text-stone-800 dark:text-stone-200">{p.contribution}</p>}
            </ShowcaseCard>
          ))}
        </div>
        <div className="mt-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-3">
            Research interests
          </p>
          <ul className="flex flex-wrap gap-2">
            {researchInterests.map((r) => (
              <li
                key={r}
                className="px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800 text-xs font-mono uppercase tracking-widest text-stone-700 dark:text-stone-300"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/speaking"
          className="group mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400"
        >
          Speaking
          <FiArrowRight aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </>
    );
  }

  if (tab === "hackathons") {
    return (
      <div className={grid}>
        {hackathons.map((h) => (
          <ShowcaseCard key={h.title} images={h.images} title={h.title} eyebrow={h.role} links={[h.link]}>
            <p>{h.text}</p>
          </ShowcaseCard>
        ))}
      </div>
    );
  }

  return (
    <div className={grid}>
      {openSource.map((o) => (
        <ShowcaseCard
          key={o.url}
          images={[]}
          title={o.title}
          eyebrow={o.repo}
          meta={o.status}
          links={[{ label: "View on GitHub", href: o.url }]}
        >
          <p>{o.description}</p>
        </ShowcaseCard>
      ))}
    </div>
  );
};

const Projects = () => {
  const { hash } = useLocation();
  const active = resolveTab(hash);
  const activeTab = tabs.find((t) => t.id === active)!;

  usePageTitle(`Work: ${activeTab.label}`);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

        <PageHeader
          title="Projects"
          intro={<p>What I built, why it mattered, and what changed because of it.</p>}
        />

        {/* Tabs: only the active one is rendered below */}
        <nav aria-label="Work sections" className="mb-14 -mx-4 px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max mx-auto gap-1 p-1.5 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-stone-200/70 dark:border-white/10 shadow-xl shadow-black/5">
            {tabs.map((tab) => {
              const isActive = tab.id === active;
              return (
                <li key={tab.id}>
                  <Link
                    to={{ hash: tab.id }}
                    replace
                    aria-current={isActive ? "page" : undefined}
                    className={`block whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${
                      isActive
                        ? "bg-amber-700 text-white shadow-[0_8px_20px_rgba(217,119,6,0.35)]"
                        : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                    }`}
                  >
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <AnimatePresence mode="wait">
          <motion.section
            key={active}
            aria-labelledby={`${active}-heading`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h2
              id={`${active}-heading`}
              className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-4 font-bold flex items-center gap-3"
            >
              <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />- {activeTab.label.toUpperCase()}
            </h2>
            <p className="text-balance text-2xl md:text-4xl leading-tight tracking-tight font-bold text-stone-900 dark:text-white max-w-3xl mb-4">
              {activeTab.heading}
            </p>
            {activeTab.intro && (
              <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">{activeTab.intro}</p>
            )}
            <div className="mt-10">
              <TabPanel tab={active} />
            </div>
          </motion.section>
        </AnimatePresence>

        <RelatedLinks
          title="KEEP EXPLORING"
          links={[
            {
              label: "My story",
              description: "From the classroom to AI agents, in pictures.",
              to: "/album",
            },
            {
              label: "Speaking",
              description: "Talks, keynotes, and conference panels.",
              to: "/speaking",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Projects;
