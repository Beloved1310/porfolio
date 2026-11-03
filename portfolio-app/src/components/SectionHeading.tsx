interface SectionHeadingProps {
  id?: string;
  label: string;
  title: string;
  dark?: boolean;
}

// The small ruled label plus large statement used by every section on the Home page.
const SectionHeading = ({ id, label, title, dark = false }: SectionHeadingProps) => (
  <>
    <h2
      id={id}
      className={`text-[10px] uppercase tracking-[0.3em] mb-6 font-bold flex items-center gap-3 ${
        dark ? "text-amber-400" : "text-stone-500 dark:text-stone-400"
      }`}
    >
      <span className={`w-8 h-px ${dark ? "bg-amber-400/40" : "bg-stone-300 dark:bg-stone-700"}`} />- {label}
    </h2>
    <p
      className={`text-2xl md:text-4xl leading-tight tracking-tight font-bold mb-8 max-w-3xl ${
        dark ? "text-white" : "text-stone-900 dark:text-white"
      }`}
    >
      {title}
    </p>
  </>
);

export default SectionHeading;
