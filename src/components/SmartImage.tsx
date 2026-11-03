import { useState, type ReactNode } from "react";
import type { ImageSource } from "../data/projects";

interface SmartImageProps {
  // Tried in order; the first file that loads wins.
  sources: ImageSource[];
  className?: string;
  wrapperClassName?: string;
  eager?: boolean;
  // Overlays drawn on top of the image, inside the wrapper.
  children?: ReactNode;
}

// Shows the first available image. While a supplied file is missing, development builds show a
// placeholder card naming the expected file; production builds hide the slot entirely.
const SmartImage = ({ sources, className = "", wrapperClassName = "", eager = false, children }: SmartImageProps) => {
  const [index, setIndex] = useState(0);
  const current = sources[index];

  if (!current) {
    if (!import.meta.env.DEV || sources.length === 0) return null;
    return (
      <div
        className={`${wrapperClassName} flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800/60 text-center`}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
          Image coming soon
        </span>
        <span className="font-code text-xs text-stone-600 dark:text-stone-300 break-all">
          {sources[0].src.replace(/^\//, "")}
        </span>
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onError={() => setIndex((i) => i + 1)}
        className={className}
      />
      {children}
    </div>
  );
};

export default SmartImage;
