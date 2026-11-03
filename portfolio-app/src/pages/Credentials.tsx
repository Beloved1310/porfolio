import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import PageHeader from "../components/PageHeader";
import { usePageTitle } from "../utils/usePageTitle";
import SectionHeading from "../components/SectionHeading";
import SmartImage from "../components/SmartImage";
import { credentials, type Credential } from "../data/credentials";
import { site } from "../data/site";

const groups: { label: string; title: string; kinds: Credential["kind"][] }[] = [
  { label: "EDUCATION", title: "Where I studied.", kinds: ["Education", "Award"] },
  {
    label: "CERTIFICATIONS AND MEMBERSHIPS",
    title: "Certifications, programmes and memberships.",
    kinds: ["Certification", "Programme", "Membership", "Training"],
  },
];

const contactLinks = [
  { label: "Email", href: `mailto:${site.email}`, icon: <FiMail />, text: site.email },
  { label: "LinkedIn", href: site.linkedin, icon: <FiLinkedin />, text: "linkedin.com/in/adefisayo-adejumo" },
  { label: "GitHub", href: site.github, icon: <FiGithub />, text: "github.com/Beloved1310" },
];

const Credentials = () => {
  usePageTitle("Credentials and Contact");

  return (
    <div className="min-h-screen pt-24 pb-24 bg-white dark:bg-stone-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Credentials and contact"
          title="Credentials"
          intro={<p>The paperwork behind the story, and how to reach me.</p>}
        />

        {groups.map((group) => (
          <section key={group.label} aria-label={group.label.toLowerCase()} className="mb-20">
            <SectionHeading label={group.label} title={group.title} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {credentials
                .filter((c) => group.kinds.includes(c.kind))
                .map((c) => (
                  <li
                    key={c.title}
                    className="flex flex-col rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden"
                  >
                    {c.images && (
                      <SmartImage
                        sources={c.images}
                        wrapperClassName="aspect-[4/3] bg-stone-100 dark:bg-stone-800"
                        className="w-full h-full object-contain p-3"
                      />
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400 mb-2">
                        {c.kind}
                      </p>
                      <h3 className="font-bold text-stone-900 dark:text-white leading-snug">{c.title}</h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400">{c.issuer}</p>
                      {c.period && (
                        <p className="mt-1 text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
                          {c.period}
                        </p>
                      )}
                      {c.points && (
                        <ul className="mt-4 space-y-1 text-sm text-stone-700 dark:text-stone-300">
                          {c.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="rounded-3xl bg-stone-900 text-white p-8 md:p-12"
        >
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Get in touch.
          </h2>
          <p className="text-stone-300 max-w-xl mb-8">
            I am open to software, AI, solutions and forward deployed engineering roles in London, and I can
            start now. Speaking invitations and research collaborations are welcome too.
          </p>
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-white text-stone-900 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-amber-400 transition-colors"
          >
            <FiDownload aria-hidden="true" /> Download CV
          </a>
          <ul className="grid gap-3 sm:grid-cols-3">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 transition-colors"
                >
                  <span className="text-amber-400" aria-hidden="true">{link.icon}</span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">{link.label}</span>
                    <span className="block text-sm break-all">{link.text}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Credentials;
