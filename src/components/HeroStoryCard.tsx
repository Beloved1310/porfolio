import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

// A still illustration makes the home page feel personal without competing with the story.
const HeroStoryCard = () => (
  <Link
    to="/album"
    aria-label="Read Ayo's story, from teaching in Nigeria to engineering in London"
    className="group relative block w-full max-w-md aspect-[4/5] overflow-hidden rounded-[2rem] border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 shadow-xl shadow-stone-900/10"
  >
    <img
      src="/optimized/animie.jpg"
      alt="Anime-style illustration of a software engineer working at a desk in a sunlit room"
      fetchPriority="high"
      decoding="async"
      width={960}
      height={1200}
      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none"
    />
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/5 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
      <p className="text-xs font-semibold tracking-wide text-amber-200">A personal story</p>
      <p className="mt-2 max-w-xs text-2xl sm:text-3xl font-semibold leading-tight tracking-tight">
        From the classroom to the world of software.
      </p>
      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-sm font-semibold text-stone-900 transition-colors group-hover:bg-amber-200">
        Read the story <FiArrowUpRight aria-hidden="true" />
      </span>
    </div>
  </Link>
);

export default HeroStoryCard;
