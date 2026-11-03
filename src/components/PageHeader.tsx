import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}

// The shared page header (Work, Research, Credentials, My Story), so every page opens the same way.
const PageHeader = ({ eyebrow, title, intro }: PageHeaderProps) => (
  <header className="relative text-center mb-16 md:mb-20">
    {eyebrow && (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-widest mb-6 border border-amber-500/20"
    >
      {eyebrow}
    </motion.p>
    )}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-stone-900 dark:text-white"
    >
      {title}
      <span className="text-amber-600">.</span>
    </motion.h1>
    {intro && (
      <div className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto font-medium text-base md:text-lg leading-relaxed">
        {intro}
      </div>
    )}
  </header>
);

export default PageHeader;
