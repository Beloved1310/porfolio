import { Link } from "react-router-dom";
import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { site } from "../data/site";

const pages = [
  { name: "Projects", to: "/projects" },
  { name: "Life Album", to: "/album" },
  { name: "Credentials", to: "/credentials" },
];

const Footer = () => (
  <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-12 md:py-16 grid gap-10 md:grid-cols-3">
      <div>
        <p className="text-xl font-bold tracking-tighter text-white">
          Adefisayo (Ayo) Adejumo<span className="text-amber-500">.</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-stone-400 max-w-xs">
          Software engineer in London. Open to software, AI, solutions and forward deployed
          engineering roles. I can start now.
        </p>
      </div>

      <nav aria-label="Footer">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 mb-4">Pages</p>
        <ul className="space-y-2 text-sm">
          {pages.map((page) => (
            <li key={page.to}>
              <Link to={page.to} className="hover:text-amber-400 transition-colors">
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400 mb-4">Get in touch</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-stone-900 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors"
          >
            <FiDownload aria-hidden="true" /> Download CV
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-full text-[11px] font-bold uppercase tracking-widest text-white hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            <FiMail aria-hidden="true" /> Email me
          </a>
        </div>
        <div className="flex gap-3 mt-4">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:text-amber-400 transition-colors"
          >
            <FiLinkedin />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:text-amber-400 transition-colors"
          >
            <FiGithub />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
