import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers, FiTerminal } from "react-icons/fi";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
}

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Full-Stack", "Backend"];

  const projects: Project[] = [
    {
      title: "Image Management System",
      description:
        "A production-ready medical image management platform built with 8 independent microservices, following SOA principles.",
      image: "/ims.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Microservices"],
      githubUrl:
        "https://github.com/Beloved1310/ABC-Healthcare-Image-Management-System",
      liveUrl:
        "https://drive.google.com/file/d/1thOixwBknIPQhU3e68eW-ypTYcil6MES/view?usp=sharing",
      featured: true,
      category: "Full-Stack",
    },
    {
      title: "Learn Quest",
      description:
        "A comprehensive educational platform designed for students aged 13-18, featuring AI-powered behavioral tracking, gamification, and real-time tutoring.",
      image: "/learnquest.png",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Redis"],
      githubUrl:
        "https://github.com/Beloved1310/Behavioural-learning-platformBE/tree/feat/core-grit-therory",
      liveUrl:
        "https://drive.google.com/file/d/1-oHydyrSeqxvyHfaIuuFCd1OGb4vmB2i/view?usp=sharing",
      featured: true,
      category: "Full-Stack",
    },
    {
      title: "First-Aid-App-Generator",
      description:
        "Built an emergency guidance platform using Gemini API to provide instant, actionable first-aid steps based on user input.",
      image: "/first-aid.png",
      technologies: ["Python", "Gemini API", "Streamlit"],
      liveUrl:
        "https://drive.google.com/file/d/17iG_j87JgZhA7VfMZp9zczOsYART1VYj/view?usp=sharing",
      githubUrl: "https://github.com/Beloved1310/First-Aid-App-Generator",
      featured: true,
      category: "Full-Stack",
    },
    {
      title: "NowDevHub",
      description:
        "A platform for ServiceNow developers, providing curated resources and collaborative tools to share components.",
      image: "/nowdevhub.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com/Beloved1310",
      liveUrl: "https://nowdevhub-frontend-webapp.vercel.app/login",
      featured: true,
      category: "Full-Stack",
    },
    {
      title: "Voting Module",
      description:
        "A robust backend implementation of a voting system utilizing blockchain concepts for integrity.",
      image: "/voting-module.png",
      technologies: ["Typescript", "Blockchain"],
      githubUrl: "https://github.com/Beloved1310/voting-module",
      liveUrl:
        "https://drive.google.com/file/d/1UP7HZGOc6euso3gTK4pi9z3_r7RyrTuN/view?usp=sharing",
      featured: false,
      category: "Backend",
    },
    {
      title: "Driver-Certified-Project",
      description:
        "A transportation platform architecture allowing drivers to receive and manage real-time user requests.",
      image: "/driver-certified.jpg",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      githubUrl: "https://github.com/Beloved1310/Driver-Certified-Project",
      featured: false,
      category: "Backend",
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <header className="relative text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-6 border border-blue-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new projects
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white"
          >
            Project{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700 dark:from-blue-300 dark:to-blue-600">
              Vault.
            </span>
          </motion.h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium text-lg">
            Engineering solutions that blend architectural precision with
            seamless user experiences.
          </p>
        </header>

        {/* Glass Filter Tabs */}
        <div className="flex justify-center gap-2 mb-16 p-2 bg-white/50 dark:bg-white/5 backdrop-blur-2xl rounded-2xl w-fit mx-auto border border-white/20 dark:border-white/10 shadow-2xl shadow-black/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-[0_8px_20px_rgba(37,99,235,0.4)] scale-105"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                className="group relative bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-xl flex flex-col overflow-hidden transition-all duration-500"
              >
                {/* Embedded Media Container (The "Dent") */}
                <div className="relative h-56 m-3 mb-0 overflow-hidden rounded-[2rem] bg-slate-200 dark:bg-slate-900 shadow-inner group">
                  <div className="absolute inset-0 shadow-[inset_0_2px_25px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_5px_30px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />

                  {/* Subtle Light Scan Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />

                  <div className="absolute top-4 left-4 z-30">
                    <span className="flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-white/20">
                      {project.category === "Full-Stack" ? (
                        <FiLayers size={12} />
                      ) : (
                        <FiTerminal size={12} />
                      )}
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 font-medium leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/5 dark:bg-blue-400/5 text-blue-600/70 dark:text-blue-400/70 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-blue-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.githubUrl}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl transition-all"
                      >
                        <FiGithub size={14} /> Source
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={project.liveUrl}
                        target="_blank"
                        className="px-5 flex items-center justify-center bg-blue-600 text-white rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all"
                      >
                        <FiExternalLink size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
