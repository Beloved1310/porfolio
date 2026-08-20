import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiExternalLink,
  FiTwitter,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const techStack = [
  { name: "React", color: "text-blue-400" },
  { name: "Javascript", color: "text-blue-600" },
  { name: "TypeScript", color: "text-blue-600" },
  { name: "Node.js", color: "text-green-500" },
  { name: "Python", color: "text-yellow-500" },
  { name: "MongoDB", color: "text-emerald-500" },
  { name: "AWS", color: "text-orange-400" },
  { name: "PostgreSQL", color: "text-indigo-400" },
];

const Home = () => {
  const stats = [
    { label: "Years Experience", value: "3+", path: "/profile" },
    { label: "Projects Completed", value: "10+", path: "/projects" },
    { label: "Tech Stack", value: "15+", path: "/profile" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Subtle Background Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Available for Software Engineering Role
              </div>

              <div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
                  Engineering <br />
                  <span className="text-blue-600">Impactful Code</span>
                </h1>
                <div className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400 min-h-[40px]">
                  <TypeAnimation
                    sequence={[
                      "Software Engineer",
                      2000,
                      "Tech Educator & Mentor",
                      2000,
                      "Full-Stack Architect",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                I am{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Ayo
                </span>
                , a Software Engineer based in London. I specialize in building
                scalable web systems with{" "}
                <span className="text-blue-600 font-semibold">Python</span> and{" "}
                <span className="text-blue-600 font-semibold">
                  TypeScript/Javascript
                </span>
                .
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link to="/projects">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold flex items-center gap-2 shadow-xl"
                  >
                    Explore Work <FiArrowRight />
                  </motion.button>
                </Link>
                <div className="flex gap-2">
                  {[
                    {
                      icon: <FiGithub />,
                      href: "https://github.com/Beloved1310",
                      label: "Github",
                    },
                    {
                      icon: <FiLinkedin />,
                      href: "https://www.linkedin.com/in/adefisayo-adejumo/",
                      label: "LinkedIn",
                    },
                    {
                      icon: <FiTwitter />,
                      href: "https://x.com/deoluwafisayomi",
                      label: "Twitter",
                    },
                    {
                      icon: <FiMail />,
                      href: "mailto:adeoluwafisayomi@gmail.com",
                      label: "Email",
                    },
                    {
                      icon: <FiDownload />,
                      href: "https://drive.google.com/file/d/18rTO99xrV7NJa75hiTEPimJhvvC6cPq_/view?usp=sharing",
                      label: "Download CV",
                      download: true,
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      whileHover={{ y: -3, scale: 1.05 }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:text-blue-600 hover:border-blue-500 transition-all shadow-sm"
                      title={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content - Modern Tech Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-2xl group-hover:opacity-50 transition duration-1000"></div>

                <img
                  src="/head-shot.jpeg"
                  alt="Ayo"
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-[9.5rem] object-cover z-10 
                  grayscale hover:grayscale-0 transition-all duration-700 ease-in-out
                  cursor-pointer border-4 border-white/50 dark:border-white/10 shadow-inner"
                />

                {/* Orbiting Glass Tech Badges */}
                {techStack.slice(0, 6).map((tech, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute z-20 hidden md:block px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 text-sm font-bold"
                    style={{
                      top: `${i * 60 - 10}px`, // Adjusted spacing for more icons
                      right: i % 2 === 0 ? "-50px" : "auto",
                      left: i % 2 !== 0 ? "-50px" : "auto",
                    }}
                  >
                    <span className={tech.color}>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Linked Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
            {stats.map((stat, index) => (
              <Link to={stat.path} key={index} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-8 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-all shadow-sm group-hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-gray-500 font-medium">
                        {stat.label}
                      </div>
                    </div>
                    <FiExternalLink className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
