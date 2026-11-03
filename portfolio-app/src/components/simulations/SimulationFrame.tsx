import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

interface SimulationFrameProps {
  id: string;
  title: string;
  whatThisShows: string;
  source?: { label: string; to: string };
  children: ReactNode;
}

// Every simulation is wrapped in this frame so it is always labelled as illustrative.
const SimulationFrame = ({ id, title, whatThisShows, source, children }: SimulationFrameProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className="scroll-mt-24 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden"
  >
    <div className="p-6 md:p-8 border-b border-stone-200 dark:border-stone-800">
      <p className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-[10px] font-black uppercase tracking-widest">
        Illustrative simulation
      </p>
      <h3 id={`${id}-title`} className="text-2xl md:text-3xl font-black tracking-tight text-stone-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm md:text-base text-stone-600 dark:text-stone-400">
        <span className="font-bold text-stone-800 dark:text-stone-200">What this shows: </span>
        {whatThisShows}
      </p>
    </div>
    <div className="p-4 sm:p-6 md:p-8 bg-stone-50 dark:bg-stone-950/60">{children}</div>
    <div className="px-6 md:px-8 py-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <p className="text-xs text-stone-500 dark:text-stone-400">
        A simplified model for explanation. It is not the production system.
      </p>
      {source && (
      <Link
        to={source.to}
        className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 hover:underline underline-offset-4"
      >
        {source.label}
        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Link>
      )}
    </div>
  </section>
);

export default SimulationFrame;
