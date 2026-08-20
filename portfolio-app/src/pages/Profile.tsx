import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCode,
  FiCpu,
  FiChevronDown,
  FiLayers,
  FiTerminal,
  FiDatabase,
  FiAward,
  FiMapPin,
  FiBook,
  FiZap,
} from "react-icons/fi";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiAmazon,
  SiPython,
  SiStripe,
  SiTailwindcss,
  SiRedux,
  SiGit,
  SiJira,
  SiJest,
  SiLinux,
} from "react-icons/si";
import CommunityLeadership from "./Community";

const Profile = () => {
  const [expandedExp, setExpandedExp] = useState(0);
  const [viewMode, setViewMode] = useState<"ui" | "json">("ui");
  
  const experiences = [
    {
      company: "DTI",
      position: "Software Developer",
      period: "2024 - 2025",
      location: "London, UK",
      description:
        "Leading technical strategy and architecting enterprise-scale microservices within a Regulated SDLC environment.",
      achievements: [
        "Architected Node.js microservices handling 100K+ daily requests with 99.9% uptime",
        "Optimized AWS infrastructure (EC2, SQS, SNS) reducing operational overhead",
        "Enforced Unit & Integration testing (Jest) achieving 85% code coverage",
        "Managed complex deployments via BitBucket CI/CD and Docker containerization",
      ],
      tech: [
        {
          name: "Node.js Expert",
          icon: <SiNodedotjs />,
          color: "text-green-500",
        },
        { name: "AWS (SQS/SNS)", icon: <SiAmazon />, color: "text-orange-400" },
        { name: "NestJS", icon: <SiNestjs />, color: "text-red-500" },
        { name: "Docker", icon: <SiDocker />, color: "text-blue-400" },
        { name: "Typescript", icon: <SiTypescript />, color: "text-blue-300" },
        { name: "CI/CD", icon: <FiTerminal />, color: "text-gray-400" },
        { name: "Jest", icon: <SiJest />, color: "text-red-700" },
      ],
      color: "from-blue-600 to-cyan-500",
    },
    {
      company: "Bujeti",
      position: "Software Engineer",
      period: "2023 - 2024",
      location: "Remote",
      description:
        "Engineered fintech infrastructure focusing on high-integrity data and modern frontend state management.",
      achievements: [
        "Built real-time payment processing for $1M+ transactions using Stripe API",
        "Implemented complex state management using Zustand/Redux for financial dashboards",
        "Migrated legacy data to PostgreSQL/MySQL for improved query performance",
        "Designed responsive UIs with React and Tailwind CSS for 500+ businesses",
      ],
      tech: [
        { name: "React", icon: <SiReact />, color: "text-cyan-400" },
        { name: "Zustand/Redux", icon: <SiRedux />, color: "text-purple-500" },
        {
          name: "PostgreSQL/MySQL",
          icon: <SiPostgresql />,
          color: "text-blue-300",
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss />,
          color: "text-sky-400",
        },
        { name: "Stripe", icon: <SiStripe />, color: "text-indigo-400" },
        { name: "Git", icon: <SiGit />, color: "text-orange-600" },
      ],
      color: "from-green-600 to-emerald-500",
    },
    {
      company: "Lextego",
      position: "Software Engineer",
      period: "2022 - 2023",
      location: "Remote",
      description:
        "Developed secure backend architectures and data-driven applications on Linux-based environments.",
      achievements: [
        "Built secure Python/Node.js backends for document management systems",
        "Leveraged MongoDB for flexible schema handling of 10K+ monthly documents",
        "Streamlined project tracking using Jira and agile methodologies",
        "Maintained Linux-based production servers and handled database refactoring",
      ],
      tech: [
        { name: "Python", icon: <SiPython />, color: "text-yellow-400" },
        {
          name: "JavaScript",
          icon: <SiJavascript />,
          color: "text-yellow-300",
        },
        { name: "MongoDB", icon: <SiMongodb />, color: "text-green-400" },
        { name: "Linux", icon: <SiLinux />, color: "text-white" },
        { name: "Jira", icon: <SiJira />, color: "text-blue-500" },
      ],
      color: "from-purple-600 to-pink-500",
    },
  ];
  
  const renderJsonView = () => (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 font-mono text-[10px] md:text-xs text-blue-300 overflow-x-auto">
      <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
        <span className="text-zinc-500 uppercase text-[10px] font-black tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />{" "}
          career_history.json
        </span>
      </div>
      <pre className="leading-relaxed">
        <code>
          <span className="text-pink-400">const</span> careerData = {"{"}
          {"\n  "}experience: [
          {experiences.map((exp, i) => (
            <div key={i} className="pl-4">
              {"{"}
              {"\n    "}company:{" "}
              <span className="text-yellow-200">"{exp.company}"</span>,
              {"\n    "}position:{" "}
              <span className="text-yellow-200">"{exp.position}"</span>,
              {"\n    "}period:{" "}
              <span className="text-yellow-200">"{exp.period}"</span>,{"\n    "}
              location:{" "}
              <span className="text-yellow-200">"{exp.location}"</span>,
              {"\n    "}description:{" "}
              <span className="text-yellow-200">"{exp.description}"</span>,
              {"\n    "}tech_stack: [
              <div className="pl-6">
                {exp.tech.map((t, idx) => (
                  <span key={idx}>
                    <span className="text-emerald-400">"{t.name}"</span>
                    {idx < exp.tech.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              {"    "}],
              {"\n    "}achievements: [
              <div className="pl-6">
                {exp.achievements.map((ach, idx) => (
                  <div key={idx}>
                    <span className="text-zinc-400">"{ach}"</span>
                    {idx < exp.achievements.length - 1 ? "," : ""}
                  </div>
                ))}
              </div>
              {"    "}]{"\n  "}
              {"}"}
              {i < experiences.length - 1 ? "," : ""}
            </div>
          ))}
          {"  "}]{"\n"}
          {"}"};
        </code>
      </pre>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative inline-block group mb-8">
              {/* Glow effect that reacts to hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity duration-500"></div>

              <img
                src="/aboutMe.JPG"
                alt="Adefisayo O. Adejumo"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 
                   grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Adefisayo O. Adejumo
            </h1>
            <p className="text-2xl font-semibold text-blue-600">
              Software Engineer && Tech Educator
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            I am a problem-driven software engineer passionate about building seamless, efficient systems and empowering others through clear, practical technical education.
             I have a strong grasp of object-oriented and asynchronous programming, web development, REST APIs, microservices, and data structures and algorithms.
              I bring excellent communication, collaboration, and team-building skills, with a proven ability to break down complex concepts and support learner growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pt-8 border-t border-gray-200 dark:border-gray-800">
              {/* Location */}
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <FiMapPin size={18} className="text-blue-500 shrink-0" />
                <span className="text-sm font-medium tracking-tight">
                  London, United Kingdom
                </span>
              </div>

              {/* Education */}
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <FiBook size={18} className="text-purple-500 shrink-0" />
                <span className="text-sm font-medium tracking-tight">
                  MSc Software Engineering
                </span>
              </div>

              {/* Award */}
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <FiAward size={18} className="text-yellow-500 shrink-0" />
                <span className="text-sm font-medium tracking-tight">
                  Kingston Gold Award
                </span>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <FiZap size={18} className="text-emerald-500 shrink-0" />
                <span className="text-sm font-medium tracking-tight">
                  3+ Years Experience
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PILLARS */}
        <div className="grid md:grid-cols-4 gap-6 mb-32">
          {[
            {
              icon: <FiCode />,
              title: "Full Stack",
              desc: "Expert Node.js, React & Tailwind.",
            },
            {
              icon: <FiCpu />,
              title: "Cloud Native",
              desc: "AWS, Docker & CI/CD Pipelines.",
            },
            {
              icon: <FiDatabase />,
              title: "Data Integrity",
              desc: "SQL/NoSQL & Scalable Schemas.",
            },
            {
              icon: <FiLayers />,
              title: "Regulated SDLC",
              desc: "Proven Testing & Jira Processes.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 text-2xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-1 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CAREER JOURNEY */}
        <section className="mb-40">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <h2 className="text-3xl font-bold tracking-tighter">
              Career <span className="text-blue-600">Journey</span>
            </h2>
            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
              <button
                onClick={() => setViewMode("ui")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "ui"
                    ? "bg-white dark:bg-zinc-800 shadow-sm text-blue-600 dark:text-white"
                    : "opacity-50 text-zinc-500"
                }`}
              >
                <FiLayers /> UI View
              </button>
              <button
                onClick={() => setViewMode("json")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  viewMode === "json"
                    ? "bg-white dark:bg-zinc-800 text-blue-500 shadow-sm"
                    : "opacity-50 text-zinc-500"
                }`}
              >
                <FiCode /> JSON
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "ui" ? (
              <motion.div
                key="ui"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 max-w-4xl mx-auto"
              >
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setExpandedExp(expandedExp === i ? -1 : i)}
                      className="w-full p-8 flex justify-between items-center text-left hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">
                          {exp.company}
                        </h3>
                        <p className="text-blue-600 font-bold text-sm uppercase tracking-wide">
                          {exp.position} • {exp.period}
                        </p>
                      </div>
                      <FiChevronDown
                        className={`text-2xl transition-transform duration-300 ${
                          expandedExp === i
                            ? "rotate-180 text-blue-600"
                            : "text-zinc-400"
                        }`}
                      />
                    </button>
                    {expandedExp === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="p-8 pt-0 border-t border-zinc-100 dark:border-zinc-800 space-y-6"
                      >
                        <p className="italic opacity-70 pt-6">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((skill, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 text-xs font-bold uppercase"
                            >
                              <span className={skill.color}>{skill.icon}</span>{" "}
                              <span className="text-zinc-500">
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {exp.achievements.map((ach, j) => (
                            <div
                              key={j}
                              className="flex items-start gap-3 p-3 bg-blue-50/30 dark:bg-blue-900/10 rounded-xl border border-blue-100/20"
                            >
                              <span className="text-blue-500 font-bold">✓</span>
                              <span className="text-sm opacity-80">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="json"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto"
              >
                {renderJsonView()}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* COMMUNITY SECTION */}

        <CommunityLeadership />
      </div>
    </div>
  );
};

export default Profile;
