import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

interface RelatedLink {
  label: string;
  description: string;
  to: string;
}

// Pages that are not in the main navigation are reached through these cards instead.
const RelatedLinks = ({ title, links }: { title: string; links: RelatedLink[] }) => (
  <section aria-label={title} className="mt-24">
    <h2 className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-6 font-bold flex items-center gap-3">
      <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />- {title}
    </h2>
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            className="group flex h-full flex-col rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 hover:border-amber-500 transition-colors"
          >
            <span className="flex items-center justify-between text-lg font-black tracking-tight text-stone-900 dark:text-white">
              {link.label}
              <FiArrowRight
                aria-hidden="true"
                className="text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform"
              />
            </span>
            <span className="mt-2 text-sm text-stone-600 dark:text-stone-400">{link.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default RelatedLinks;
