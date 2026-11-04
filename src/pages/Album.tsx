import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../utils/usePageTitle";
import LifeAlbum from "../components/album/LifeAlbum";
import RelatedLinks from "../components/RelatedLinks";

const Album = () => {
  usePageTitle("Life Album");

  return (
    <div className="min-h-screen pt-24 pb-24 bg-stone-100 dark:bg-stone-950 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="A photo book"
          title="Life Album"
          intro={
            <p>
              Nine chapters, from a classroom in Nigeria to AI agents in London. Every photo is real.
              Open the book.
            </p>
          }
        />
        <LifeAlbum />
        <RelatedLinks
          title="THE REST OF THE STORY"
          links={[
            {
              label: "Work and impact",
              description: "What changed at each company, and the moments that taught me something.",
              to: "/projects#work",
            },
            {
              label: "Talks & Community Sharing",
              description: "Sharing learnings, mistakes, and solutions with engineering communities.",
              to: "/#speaking",
            },
            {
              label: "Credentials",
              description: "Degrees, certifications, memberships, and how to reach me.",
              to: "/credentials",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Album;
