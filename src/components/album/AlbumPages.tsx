import { useEffect, useState } from "react";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import type { AlbumChapter, AlbumImage } from "../../data/album";
import { chapters, parts, prologue } from "../../data/album";
import { site } from "../../data/site";
import { FINAL_PAGE, chapterPhotoPage, chapterSpread, useAlbum } from "./albumContext";

const paper =
  "h-full w-full bg-paper-light dark:bg-paper-dark text-stone-800 dark:text-stone-200 shadow-[inset_0_0_40px_rgba(120,90,40,0.12)]";

const pad = (n: number) => String(n).padStart(2, "0");

const PageNumber = ({ n, side }: { n: number; side: "left" | "right" }) => (
  <p
    className={`absolute bottom-4 ${side === "left" ? "left-6" : "right-6"} font-code text-[11px] text-stone-500 dark:text-stone-400`}
  >
    {n}
  </p>
);

const RunningHead = ({ children, side }: { children: string; side: "left" | "right" }) => (
  <p
    className={`absolute top-4 ${side === "left" ? "left-6" : "right-6"} font-mono text-[9px] uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500`}
  >
    {children}
  </p>
);

export const AlbumCover = ({ compact = false }: { compact?: boolean }) => (
  <div className="relative h-full w-full rounded-r-xl bg-stone-900 text-center flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden">
    <div aria-hidden="true" className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/50 to-transparent" />
    <div aria-hidden="true" className="absolute inset-4 border border-amber-500/30 rounded-lg" />
    {/* Screentone corner, a nod to manga covers */}
    <div
      aria-hidden="true"
      className="absolute -top-10 -right-10 h-48 w-48 opacity-20 [background-image:radial-gradient(circle,#fbbf24_1.2px,transparent_1.5px)] [background-size:9px_9px] [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]"
    />
    <p className="text-[10px] uppercase tracking-[0.4em] text-amber-400/80 mb-6">A life in {chapters.length} chapters</p>
    <p
      className={`font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 ${
        compact ? "text-3xl" : "text-4xl lg:text-5xl"
      }`}
    >
      Adefisayo
      <br />
      Adejumo
    </p>
    <span aria-hidden="true" className="mt-6 w-12 h-px bg-amber-500/60" />
    {!compact && (
      <p className="mt-6 max-w-[16rem] font-hand text-xl text-amber-100/80">
        From a classroom in Nigeria to AI agents in London.
      </p>
    )}
  </div>
);

export const ProloguePage = () => (
  <div className={`${paper} relative flex flex-col justify-center p-8 md:p-12`}>
    <RunningHead side="left">Prologue</RunningHead>
    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800 dark:text-amber-400 mb-5">Prologue</p>
    <p className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-stone-900 dark:text-white">
      {prologue.hook}
    </p>
    <div className="mt-6 space-y-3 text-sm md:text-base leading-relaxed">
      {prologue.body.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
    <PageNumber n={1} side="left" />
  </div>
);

export const ContentsPage = () => {
  const { goTo } = useAlbum();
  return (
    <div className={`${paper} relative flex flex-col p-8 md:p-10`}>
      <RunningHead side="right">Contents</RunningHead>
      <p className="mt-4 text-2xl md:text-3xl font-black tracking-tight text-stone-900 dark:text-white mb-4">Contents</p>
      <div className="space-y-3 overflow-y-auto">
        {parts.map((part) => (
          <div key={part.number}>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-amber-800 dark:text-amber-400 mb-1">
              {part.number < parts.length ? `Part ${part.number}` : ""} {part.title}
            </p>
            <ol>
              {chapters.map((c, i) =>
                c.part !== part.number ? null : (
                  <li key={c.number}>
                    <button
                      type="button"
                      onClick={() => goTo(chapterSpread(i))}
                      className="group flex w-full items-baseline gap-3 py-0.5 text-left text-sm"
                    >
                      <span className="font-code text-xs text-stone-500 dark:text-stone-400">{pad(c.number)}</span>
                      <span className="font-semibold text-stone-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300">
                        {c.title}
                      </span>
                      <span aria-hidden="true" className="flex-1 border-b border-dotted border-stone-300 dark:border-stone-600" />
                      <span className="font-code text-xs text-stone-500 dark:text-stone-400">{chapterPhotoPage(i)}</span>
                    </button>
                  </li>
                ),
              )}
            </ol>
          </div>
        ))}
      </div>
      <PageNumber n={2} side="right" />
    </div>
  );
};

const loads = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });

// Shows the first photo that loads, or its illustrated version when that is switched on.
const AlbumPhoto = ({ sources }: { sources: AlbumImage[] }) => {
  const { anime } = useAlbum();
  const [found, setFound] = useState<AlbumImage | "missing" | null>(null);

  useEffect(() => {
    let live = true;
    setFound(null);
    (async () => {
      for (const image of sources) {
        try {
          await loads(image.src);
          if (live) setFound(image);
          return;
        } catch {
          // Try the next photo.
        }
      }
      if (live) setFound("missing");
    })();
    return () => {
      live = false;
    };
  }, [sources]);

  if (found === "missing") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-stone-100 p-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
        Photo coming soon
      </div>
    );
  }
  if (!found) return <div className="h-full w-full animate-pulse motion-reduce:animate-none bg-stone-200" />;

  const illustrated = anime && found.illustrated;
  return (
    <img
      src={illustrated ? found.illustrated : found.src}
      alt={illustrated ? `Illustration of ${found.alt}` : found.alt}
      className="h-full w-full object-cover"
    />
  );
};

export const PhotoPage = ({ chapter, pageNumber }: { chapter: AlbumChapter; pageNumber: number }) => (
  <div className={`${paper} relative flex flex-col items-center justify-center px-8 pt-12 pb-16 md:p-10`}>
    <RunningHead side="left">{`Chapter ${pad(chapter.number)}${chapter.years ? ` · ${chapter.years}` : ""}`}</RunningHead>
    <div className="relative w-full max-w-[17rem] lg:max-w-xs">
      {/* Manga panel: inked border, hard shadow and a screentone corner */}
      <div className="relative aspect-[4/5] -rotate-1 overflow-hidden border-[3px] border-stone-900 bg-white shadow-[6px_6px_0_0_#1c1917] dark:shadow-[6px_6px_0_0_#000]">
        <AlbumPhoto sources={chapter.images} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-40 [background-image:radial-gradient(circle,#1c1917_0.9px,transparent_1.2px)] [background-size:6px_6px] [mask-image:linear-gradient(to_top_left,black,transparent_45%)]"
        />
        <span className="absolute left-0 top-0 bg-stone-900 px-2.5 py-1 font-code text-xs font-bold text-amber-400">
          {pad(chapter.number)}
        </span>
      </div>
      {/* Speech bubble caption */}
      <p className="absolute -bottom-7 -right-3 max-w-[85%] rounded-[1.75rem] border-2 border-stone-900 bg-white px-4 py-2 text-center font-hand text-lg md:text-xl leading-tight text-stone-900 shadow-[3px_3px_0_0_#1c1917]">
        {chapter.caption}
        <span
          aria-hidden="true"
          className="absolute -top-[9px] left-6 h-4 w-4 rotate-45 border-l-2 border-t-2 border-stone-900 bg-white"
        />
      </p>
    </div>
    <PageNumber n={pageNumber} side="left" />
  </div>
);

export const StoryPage = ({ chapter, pageNumber }: { chapter: AlbumChapter; pageNumber: number }) => (
  <div className={`${paper} relative flex flex-col p-8 md:p-10`}>
    <RunningHead side="right">{chapter.title}</RunningHead>
    <div className="mt-3 flex items-end gap-4">
      <span
        aria-hidden="true"
        className="font-black text-6xl md:text-7xl leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_#b45309] dark:[-webkit-text-stroke:1.5px_#fbbf24]"
      >
        {pad(chapter.number)}
      </span>
      <div className="pb-1">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-amber-800 dark:text-amber-400">
          Chapter {chapter.number}{chapter.years ? ` · ${chapter.years}` : ""}
        </p>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-stone-900 dark:text-white">{chapter.title}</h2>
      </div>
    </div>
    <p className="mt-5 border-l-4 border-amber-500 pl-4 text-lg md:text-xl font-bold leading-snug text-stone-900 dark:text-white">
      {chapter.hook}
    </p>
    <div className="mt-4 space-y-3 text-sm leading-relaxed">
      {chapter.story.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
    {chapter.next && (
      <p className="mt-auto pt-4 pr-10 flex items-baseline gap-2 font-hand text-lg md:text-xl text-amber-900 dark:text-amber-300">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] not-italic">Next</span>
        {chapter.next}
        <FiArrowRight aria-hidden="true" className="self-center flex-shrink-0" />
      </p>
    )}
    <PageNumber n={pageNumber} side="right" />
  </div>
);

export const FinalPage = () => (
  <div className={`${paper} relative flex flex-col items-center justify-center text-center gap-6 p-8 md:p-10`}>
    <p className="font-hand text-2xl text-stone-600 dark:text-stone-400">To be continued...</p>
    <p className="text-3xl md:text-4xl font-black tracking-tight text-stone-900 dark:text-white">
      Chapter {chapters.length + 1} is with your team.
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <a
        href={`mailto:${site.email}`}
        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-[11px]"
      >
        <FiMail aria-hidden="true" /> Contact me
      </a>
      <a
        href={site.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 border border-stone-400 dark:border-stone-600 rounded-full font-bold uppercase tracking-widest text-[11px]"
      >
        <FiDownload aria-hidden="true" /> Download CV
      </a>
    </div>
    <PageNumber n={FINAL_PAGE} side="left" />
  </div>
);

export const BackCover = () => (
  <div className="h-full w-full rounded-l-xl bg-stone-900 flex items-center justify-center p-8">
    <p className="font-hand text-2xl text-amber-400/80">Thank you for reading.</p>
  </div>
);
