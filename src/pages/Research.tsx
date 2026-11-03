import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../utils/usePageTitle";
import SectionHeading from "../components/SectionHeading";
import SmartImage from "../components/SmartImage";
import RelatedLinks from "../components/RelatedLinks";
import { talks } from "../data/research";

const Research = () => {
  usePageTitle("Speaking");

  return (
    <div className="min-h-screen pt-24 pb-24 bg-white dark:bg-stone-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Conferences, Panels & Keynotes"
          title="Speaking"
        />

        <section aria-labelledby="speaking" className="mb-24">
          <SectionHeading id="speaking" label="SPEAKING" title="Conferences, panels, and technical talks." />
          <ul className="grid gap-4 sm:grid-cols-2">
            {talks.map((t) => (
              <li
                key={`${t.event}-${t.title}`}
                className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden flex flex-col"
              >
                {t.image && (
                  <SmartImage
                    sources={t.image}
                    wrapperClassName="aspect-[4/3] bg-stone-100 dark:bg-stone-800"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400 mb-2">
                    {t.format}
                    {t.date ? ` · ${t.date}` : ""}
                  </p>
                  <h3 className="font-bold text-stone-900 dark:text-white">{t.event}</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{t.title}</p>
                  {t.brief && <p className="mt-3 text-sm text-stone-800 dark:text-stone-200">{t.brief}</p>}
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      See the post
                      <span className="sr-only"> (opens LinkedIn in a new tab)</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <RelatedLinks
          title="KEEP EXPLORING"
          links={[
            { label: "Life Album", description: "The whole story, as a photo book.", to: "/album" },
            { label: "Credentials", description: "Degrees, certifications and memberships.", to: "/credentials" },
          ]}
        />
      </div>
    </div>
  );
};

export default Research;
