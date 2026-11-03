import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiBookmark, FiCamera, FiChevronLeft, FiChevronRight, FiFeather, FiVolume2, FiVolumeX } from "react-icons/fi";
import { chapters } from "../../data/album";
import { AlbumCover, BackCover, ContentsPage, FinalPage, PhotoPage, ProloguePage, StoryPage } from "./AlbumPages";
import { AlbumContext, chapterPhotoPage, hasIllustrations } from "./albumContext";

interface Spread {
  name: string;
  left: ReactNode;
  right: ReactNode;
}

// Spread 0 is the closed front cover, spread 1 the prologue and contents, then one spread per
// chapter; the last spread is the final page and the inside back cover.
const spreads: Spread[] = [
  { name: "Cover", left: null, right: <AlbumCover /> },
  { name: "Prologue and contents", left: <ProloguePage />, right: <ContentsPage /> },
  ...chapters.map((c, i) => ({
    name: `Chapter ${c.number}: ${c.title}`,
    left: <PhotoPage chapter={c} pageNumber={chapterPhotoPage(i)} />,
    right: <StoryPage chapter={c} pageNumber={chapterPhotoPage(i) + 1} />,
  })),
  { name: "The next chapter", left: <FinalPage />, right: <BackCover /> },
];

const LAST = spreads.length - 1;

const useIsWide = () => {
  const query = "(min-width: 768px)";
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setWide(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return wide;
};

// A short burst of filtered noise that sounds like paper; no audio file needed.
const usePageSound = (enabled: boolean) => {
  const ctxRef = useRef<AudioContext | null>(null);
  return () => {
    if (!enabled) return;
    try {
      const ctx = (ctxRef.current ??= new AudioContext());
      const length = Math.floor(ctx.sampleRate * 0.28);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 2200;
      const gain = ctx.createGain();
      gain.gain.value = 0.25;
      source.connect(filter).connect(gain).connect(ctx.destination);
      source.start();
    } catch {
      // Audio is a nice extra; ignore browsers that block it.
    }
  };
};

interface Flip {
  from: number;
  to: number;
}

interface BookSettings {
  soundOn: boolean;
  setSoundOn: (v: boolean) => void;
  anime: boolean;
  setAnime: (v: boolean) => void;
}

const BookControls = ({ index, go, soundOn, setSoundOn, anime, setAnime }: BookSettings & {
  index: number;
  go: (to: number) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
      <button
        type="button"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 dark:border-stone-700 rounded-full font-bold uppercase tracking-widest text-[11px] text-stone-700 dark:text-stone-300 disabled:opacity-40"
      >
        <FiChevronLeft aria-hidden="true" /> Previous
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        disabled={index === LAST}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-[11px] disabled:opacity-40"
      >
        {index === 0 ? "Open the book" : "Next"} <FiChevronRight aria-hidden="true" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="album-chapters"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-amber-500/40 rounded-full font-bold uppercase tracking-widest text-[11px] text-amber-800 dark:text-amber-400"
        >
          <FiBookmark aria-hidden="true" /> Chapters
        </button>
        {menuOpen && (
          <ul
            id="album-chapters"
            className="absolute z-30 bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl p-2"
          >
            {spreads.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    go(i);
                  }}
                  aria-current={i === index ? "page" : undefined}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm ${
                    i === index
                      ? "bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasIllustrations && (
      <button
        type="button"
        onClick={() => setAnime(!anime)}
        aria-pressed={!anime}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400"
      >
        {anime ? <FiCamera aria-hidden="true" /> : <FiFeather aria-hidden="true" />}
        {anime ? "Show real photos" : "Show illustrated"}
      </button>
      )}

      <button
        type="button"
        onClick={() => setSoundOn(!soundOn)}
        aria-pressed={soundOn}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-stone-600 dark:text-stone-400"
      >
        {soundOn ? <FiVolume2 aria-hidden="true" /> : <FiVolumeX aria-hidden="true" />}
        Page sound {soundOn ? "on" : "off"}
      </button>
    </div>
  );
};

const Face = ({ children, back = false }: { children: ReactNode; back?: boolean }) => (
  <div
    className="absolute inset-0 overflow-hidden"
    style={{ backfaceVisibility: "hidden", transform: back ? "rotateY(180deg)" : undefined }}
  >
    {children}
  </div>
);

const WideBook = (settings: BookSettings) => {
  const { soundOn } = settings;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const playSound = usePageSound(soundOn);

  const go = (to: number) => {
    if (flip || to < 0 || to > LAST || to === index) return;
    playSound();
    if (reduceMotion) setIndex(to);
    else setFlip({ from: index, to });
  };

  // Clicking a page turns it, unless the click was on a link or button inside the page.
  // Keyboard users turn pages with the arrow keys or the controls below the book.
  const turnOnPageClick = (e: React.MouseEvent, to: number) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    go(to);
  };

  const forward = flip ? flip.to > flip.from : false;
  const from = spreads[flip ? flip.from : index];
  const to = spreads[flip ? flip.to : index];

  // While turning forwards the new right page is revealed underneath; backwards, the new left page.
  const baseLeft = flip ? (forward ? from.left : to.left) : from.left;
  const baseRight = flip ? (forward ? to.right : from.right) : from.right;

  // Centre the closed book: only the cover (or the back) is visible at either end.
  const shownIndex = flip ? flip.to : index;
  const shift = shownIndex === 0 ? "-25%" : shownIndex === LAST ? "25%" : "0%";

  return (
    <AlbumContext.Provider value={{ anime: settings.anime, goTo: go }}>
    <div>
      <div
        tabIndex={0}
        role="group"
        aria-roledescription="book"
        aria-label="Life Album. Use the left and right arrow keys to turn pages."
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
        className="rounded-xl"
      >
        <motion.div
          animate={{ x: shift }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeInOut" }}
          className="relative mx-auto w-full max-w-5xl aspect-[3/2]"
          style={{ perspective: "2200px" }}
        >
          <div className="absolute inset-y-0 left-0 w-1/2">
            {baseLeft && (
              <div
                onClick={(e) => turnOnPageClick(e, index - 1)}
                className="h-full w-full rounded-l-xl overflow-hidden cursor-w-resize"
              >
                {baseLeft}
              </div>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 w-1/2">
            {baseRight && (
              <div
                onClick={(e) => turnOnPageClick(e, index + 1)}
                className="group relative h-full w-full rounded-r-xl overflow-hidden cursor-e-resize"
              >
                {baseRight}
                {index < LAST && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 h-0 w-0 group-hover:h-12 group-hover:w-12 transition-all duration-300 motion-reduce:transition-none"
                    style={{
                      background:
                        "linear-gradient(225deg, transparent 50%, rgba(0,0,0,0.18) 50%, #efe6d3 56%, #f7f2e8 100%)",
                      borderTopLeftRadius: "100%",
                    }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Spine shadow */}
          {shownIndex !== 0 && shownIndex !== LAST && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-black/15 to-transparent z-10" />
          )}

          {flip && (
            <motion.div
              key={`${flip.from}-${flip.to}`}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: forward ? -180 : 180 }}
              transition={{ duration: 0.9, ease: [0.45, 0.05, 0.3, 1] }}
              onAnimationComplete={() => {
                setIndex(flip.to);
                setFlip(null);
              }}
              className={`absolute inset-y-0 w-1/2 z-20 ${forward ? "right-0" : "left-0"}`}
              style={{ transformStyle: "preserve-3d", transformOrigin: forward ? "left center" : "right center" }}
            >
              <Face>{forward ? from.right : from.left}</Face>
              <Face back>{forward ? to.left : to.right}</Face>
            </motion.div>
          )}
        </motion.div>
      </div>

      <p className="sr-only" aria-live="polite">
        {spreads[index].name}
      </p>
      <BookControls index={index} go={go} {...settings} />
    </div>
    </AlbumContext.Provider>
  );
};

// On phones, each chapter is one swipeable page instead of a two-page spread.
const NarrowBook = (settings: BookSettings) => {
  const { soundOn } = settings;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const playSound = usePageSound(soundOn);

  const go = (to: number) => {
    if (to < 0 || to > LAST || to === index) return;
    playSound();
    setIndex(to);
  };

  const spread = spreads[index];
  const chapterIndex = index - 2;
  const chapter = index > 1 && index < LAST ? chapters[chapterIndex] : null;

  return (
    <AlbumContext.Provider value={{ anime: settings.anime, goTo: go }}>
    <div>
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : -40 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(index + 1);
              if (info.offset.x > 60) go(index - 1);
            }}
            className="touch-pan-y"
          >
            {index === 0 && (
              <div className="aspect-[3/4]">
                <AlbumCover />
              </div>
            )}
            {index === 1 && (
              <div className="rounded-xl overflow-hidden">
                <div className="[&>div]:min-h-[22rem]">
                  <ProloguePage />
                </div>
                <div className="[&>div]:min-h-[26rem]">
                  <ContentsPage />
                </div>
              </div>
            )}
            {chapter && (
              <div className="rounded-xl overflow-hidden">
                <div className="[&>div]:min-h-[30rem]">
                  <PhotoPage chapter={chapter} pageNumber={chapterPhotoPage(chapterIndex)} />
                </div>
                <div className="[&>div]:min-h-[24rem]">
                  <StoryPage chapter={chapter} pageNumber={chapterPhotoPage(chapterIndex) + 1} />
                </div>
              </div>
            )}
            {index === LAST && (
              <div className="rounded-xl overflow-hidden min-h-[24rem]">{spread.left}</div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-center text-xs text-stone-500 dark:text-stone-400" aria-live="polite">
        {spread.name}. Swipe or use the buttons to turn the page.
      </p>
      <BookControls index={index} go={go} {...settings} />
    </div>
    </AlbumContext.Provider>
  );
};

const LifeAlbum = () => {
  const wide = useIsWide();
  const [soundOn, setSoundOn] = useState(false);
  const [anime, setAnime] = useState(false);
  const settings = { soundOn, setSoundOn, anime, setAnime };
  return wide ? <WideBook {...settings} /> : <NarrowBook {...settings} />;
};

export default LifeAlbum;
