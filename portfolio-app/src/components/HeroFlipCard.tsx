import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { AlbumCover } from "./album/AlbumPages";

const FLIP_EVERY_MS = 4000;

// The hero illustration keeps turning over to show the Life Album cover, then back again.
// Clicking either side opens the album. It holds still only for visitors who prefer reduced motion.
const HeroFlipCard = () => {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setFlipped(false);
      return;
    }
    const timer = setInterval(() => setFlipped((f) => !f), FLIP_EVERY_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const face = "absolute inset-0 overflow-hidden rounded-3xl";
  const pill =
    "absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest shadow-lg";

  return (
    <Link
      to="/album"
      aria-label="Open my story book"
      className="group block relative w-full max-w-md aspect-[4/5] rounded-3xl"
      style={{ perspective: "1600px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [0.45, 0.05, 0.3, 1] }}
      >
        {/* Front: the illustration */}
        <div className={`${face} shadow-2xl`} style={{ backfaceVisibility: "hidden" }}>
          <img
            src="/optimized/animie.jpg"
            alt="Illustration of a software engineer working at a laptop"
            fetchPriority="high"
            className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 group-hover:scale-[1.03]"
          />
          <span className={`${pill} bottom-4 bg-white/90 dark:bg-stone-950/85 backdrop-blur text-stone-900 dark:text-white`}>
            Read my story
            <FiArrowRight aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        {/* Back: the story book cover */}
        <div className={face} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <AlbumCover />
          <span className={`${pill} bottom-6 bg-amber-400 text-stone-900 group-hover:bg-amber-300`}>
            Open my story book
            <FiArrowRight aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default HeroFlipCard;
