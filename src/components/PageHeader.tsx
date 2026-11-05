import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
}

// The shared page header (Work, Research, Credentials, My Story), so every page opens the same way.
const PageHeader = ({ eyebrow, title, intro }: PageHeaderProps) => (
  <header className="relative max-w-4xl mb-12 md:mb-16">
    {eyebrow && (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 text-sm font-medium mb-5 border border-amber-200/80 dark:border-amber-800/70"
    >
      {eyebrow}
    </motion.p>
    )}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-5 tracking-tight text-stone-900 dark:text-white"
    >
      {title}
      <span className="text-amber-600">.</span>
    </motion.h1>
    {intro && (
      <div className="text-stone-600 dark:text-stone-300 max-w-2xl font-normal text-base md:text-lg leading-relaxed">
        {intro}
      </div>
    )}
  </header>
);

export default PageHeader;
