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
        Preview
      </span>
      <span
        aria-hidden="true"
        className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-stone-300 dark:text-stone-600 line-clamp-2"
      >
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

export const CardLinkButton = ({ link, primary = false }: { link: CardLink; primary?: boolean }) => {
  if (link.placeholder) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400">
        {link.label} · in progress
      </span>
    );
  }

  if (link.internal) {
    return (
      <Link
        to={link.href}
        className={`group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 select-none ${
          primary
            ? "bg-amber-700 text-white dark:bg-amber-500 dark:text-stone-950 hover:bg-amber-800 dark:hover:bg-amber-400"
            : "border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:border-amber-600 hover:text-amber-800 dark:hover:text-amber-300"
        }`}
      >
        <span>{link.label}</span>
        <FiArrowRight
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/btn:translate-x-1"
        />
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/btn inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 select-none ${
        primary
          ? "bg-amber-700 text-white dark:bg-amber-500 dark:text-stone-950 hover:bg-amber-800 dark:hover:bg-amber-400"
          : "border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-amber-600 hover:text-amber-800 dark:hover:text-amber-300"
      }`}
    >
      <span>{link.label}</span>
      <FiArrowUpRight
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
      />
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
  aspect?: string;
  highlight?: string;
  detailUrl?: string;
}

const ShowcaseCard = ({
  images,
  title,
  eyebrow,
  meta,
  children,
  links,
  aspect = "aspect-[4/3] sm:aspect-[16/10]",
  highlight,
  detailUrl,
}: ShowcaseCardProps) => {
  // Keep the card itself non-interactive; its image, title and actions are links.
  const effectiveDetailUrl = detailUrl || links?.find((l) => l.internal)?.href;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-stone-900 transition-all duration-300 ${
        effectiveDetailUrl
          ? "hover:shadow-lg hover:shadow-stone-900/10 dark:hover:shadow-black/30"
          : ""
      } ${
        highlight
          ? "border-2 border-amber-600 shadow-[0_16px_40px_-16px_rgba(135,69,40,0.4)] md:-translate-y-1"
          : "border border-stone-200 dark:border-stone-800 hover:border-amber-500/70 dark:hover:border-amber-500/50"
      }`}
    >
      <div
        className={`relative ${aspect} overflow-hidden border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950`}
      >
        {effectiveDetailUrl ? (
          <Link to={effectiveDetailUrl} tabIndex={-1} aria-hidden="true" className="block h-full w-full">
            <CardMedia images={images} label={title} />
          </Link>
        ) : (
          <CardMedia images={images} label={title} />
        )}
        {highlight && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-amber-400 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-stone-900 shadow-lg">
            <FiAward aria-hidden="true" /> {highlight}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold tracking-wide text-amber-800 dark:text-amber-300">
            {eyebrow}
          </p>
        )}

        <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-snug text-stone-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
          {effectiveDetailUrl ? (
            <Link to={effectiveDetailUrl} className="focus:outline-none">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        {meta && (
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            {meta}
          </p>
        )}

        {children && (
          <div className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {children}
          </div>
        )}

        {/* Clean, high-UI/UX button toolbar (skills removed from card and moved to details page) */}
        {links && links.length > 0 && (
          <div className="mt-auto pt-5 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center gap-2.5">
            {links.map((l, i) => (
              <CardLinkButton key={l.label + l.href} link={l} primary={i === 0} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ShowcaseCard;
