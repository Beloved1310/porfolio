import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiAward } from "react-icons/fi";
import type { ImageSource } from "../data/projects";
import type { CardLink } from "../data/work";

// Used wherever an image has not been supplied yet, in every build, so the grid never has holes.
export const ImagePlaceholder = ({ label }: { label: string }) => (
  <div className="relative h-full w-full overflow-hidden bg-stone-100 dark:bg-stone-800/70">
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-60 dark:opacity-30 [background-image:linear-gradient(to_right,rgb(214_211_209/0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgb(214_211_209/0.6)_1px,transparent_1px)] [background-size:28px_28px]"
    />
    <div className="relative flex h-full flex-col justify-between p-5">
      <span className="self-start rounded-full border border-stone-300 dark:border-stone-600 bg-white/70 dark:bg-stone-900/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
        Image coming soon
      </span>
      <span aria-hidden="true" className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-stone-300 dark:text-stone-600 line-clamp-2">
        {label}
      </span>
    </div>
  </div>
);

// Tries each image in order and falls back to the placeholder if none load.
const CardMedia = ({ images, label }: { images: ImageSource[]; label: string }) => {
  const [index, setIndex] = useState(0);
  const current = images[index];
  if (!current) return <ImagePlaceholder label={label} />;
  return (
    <img
      key={current.src}
      src={current.src}
      alt={current.alt}
      loading="lazy"
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
      className="h-full w-full object-cover object-top motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.03]"
    />
  );
};

const pill =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors";

export const CardLinkButton = ({ link, primary = false }: { link: CardLink; primary?: boolean }) => {
  if (link.placeholder) {
    return (
      <span className={`${pill} border border-dashed border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400`}>
        {link.label}: link coming soon
      </span>
    );
  }
  const style = primary
    ? `${pill} bg-stone-900 text-white hover:bg-amber-700 dark:bg-white dark:text-stone-900 dark:hover:bg-amber-400`
    : `${pill} border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400`;
  if (link.internal) {
    return (
      <Link to={link.href} className={style}>
        {link.label} <FiArrowRight aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={style}>
      {link.label} <FiArrowUpRight aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
};

interface ShowcaseCardProps {
  images: ImageSource[];
  title: string;
  eyebrow?: string;
  meta?: string;
  children?: ReactNode;
  tags?: string[];
  links?: CardLink[];
  // Media shape; work cards use a wider frame than project cards.
  aspect?: string;
  // Award or grant badge; also gives the card an amber frame so it stands out in the grid.
  highlight?: string;
}

const ShowcaseCard = ({ images, title, eyebrow, meta, children, tags, links, aspect = "aspect-[16/10]", highlight }: ShowcaseCardProps) => (
  <article
    className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-stone-900 ${
      highlight
        ? "border-2 border-amber-500 shadow-[0_20px_50px_-12px_rgba(217,119,6,0.45)] md:-translate-y-2"
        : "border border-stone-200 dark:border-stone-800"
    }`}
  >
    <div className={`relative ${aspect} overflow-hidden border-b border-stone-200 dark:border-stone-800`}>
      <CardMedia images={images} label={title} />
      {highlight && (
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-amber-400 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-stone-900 shadow-lg">
          <FiAward aria-hidden="true" /> {highlight}
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col p-6 md:p-7">
      {eyebrow && (
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">{eyebrow}</p>
      )}
      <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug text-stone-900 dark:text-white">{title}</h3>
      {meta && (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-stone-500 dark:text-stone-400">{meta}</p>
      )}
      {children && <div className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{children}</div>}
      {tags && tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-amber-700 dark:text-amber-400"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      {links && links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          {links.map((l, i) => (
            <CardLinkButton key={l.label + l.href} link={l} primary={i === 0} />
          ))}
        </div>
      )}
    </div>
  </article>
);

export default ShowcaseCard;
