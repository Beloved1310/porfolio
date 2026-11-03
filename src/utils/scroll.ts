// Smooth-scroll to a section, jumping instantly for visitors who prefer reduced motion.
export const scrollToId = (id: string) => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
};
