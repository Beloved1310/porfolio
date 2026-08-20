import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLayers,
  FiZap,
  FiCheckCircle,
  FiAward,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const CommunityLeadership = () => {
  const [commMode, setCommMode] = useState<"ui" | "json">("ui");
  const [selectedEvent, setSelectedEvent] = useState<null | {
    label: string;
    img: string;
  }>(null);
  const [isBioOpen, setIsBioOpen] = useState(false); 
  const eventData = [
    { label: "Avalanche", img: "/laptop.jpg" },
    { label: "Devfest", img: "/devfest.JPG" },
    { label: "Web3 Lagos", img: "/web3lagos.jpg" },
    { label: "CYF", img: "/cyf.png" },
  ];

  const leadershipRoles = [
    {
      r: "Mentor",
      o: "Avalanche",
      icon: <FiZap />,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      r: "TA",
      o: "Code Your Future",
      icon: <FiCheckCircle />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      r: "Coach",
      o: "Codebar",
      icon: <FiAward />,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="py-20 px-4">
      <motion.section className="relative max-w-7xl mx-auto bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 md:p-12 text-white shadow-2xl overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* LIGHTBOX OVERLAY */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.8, borderRadius: "100px" }}
                animate={{ scale: 1, borderRadius: "40px" }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full aspect-square md:aspect-video overflow-hidden border border-zinc-800"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedEvent.img}
                  className="w-full h-full object-cover"
                  alt={selectedEvent.label}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                  <h4 className="text-2xl font-bold">{selectedEvent.label}</h4>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {/* Header & Style Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center md:text-left">
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                Not Coding?
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Community <span className="text-zinc-600 italic">&</span> Lead.
              </h2>
            </div>

            <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              {["ui", "json"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setCommMode(mode as any)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    commMode === mode
                      ? "bg-blue-600 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {commMode === "ui" ? (
              <motion.div
                key="ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* BIO SECTION (MINIMIZABLE) */}
                <div className="bg-zinc-800/20 border border-zinc-800 rounded-3xl overflow-hidden">
                  <button
                    onClick={() => setIsBioOpen(!isBioOpen)}
                    className="w-full p-6 flex items-center justify-between hover:bg-zinc-800/40 transition-colors"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-zinc-200 flex items-center gap-3">
                      <FiLayers className="text-blue-500" />
                      Theory to Production
                    </h3>
                    {isBioOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {isBioOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
                          Speaking at{" "}
                          <span className="text-white font-medium">
                            GDG Devfest, JS Monthly, and Web3 Lagos.
                          </span>{" "}
                          I focus on translating high-level engineering concepts
                          into production-ready knowledge for diverse
                          communities.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ROLES & GALLERY GRID */}
                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Roles (Minified View) */}
                  <div className="lg:col-span-4 grid gap-3">
                    {leadershipRoles.map((item, i) => (
                      <div
                        key={i}
                        className="bg-zinc-800/40 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4"
                      >
                        <div
                          className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center text-lg ${item.color}`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p
                            className={`text-[9px] font-black uppercase tracking-tighter ${item.color}`}
                          >
                            {item.r}
                          </p>
                          <p className="text-sm font-bold">{item.o}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gallery (Minimal Circular/Rounded Style) */}
                  <div className="lg:col-span-8 grid grid-cols-4 gap-3">
                    {eventData.map((event, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedEvent(event)}
                        className="relative aspect-square rounded-2xl md:rounded-full overflow-hidden border-2 border-zinc-800 cursor-pointer group"
                      >
                        <img
                          src={event.img}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          alt={event.label}
                        />
                        <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <FiExternalLink className="text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* JSON View (Minified Style) */
              <motion.div
                key="json"
                className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 font-mono text-[10px] md:text-xs text-blue-400"
              >
                <pre className="opacity-80">
                  <code>
                    {JSON.stringify(
                      {
                        leadership: {
                          speaking: ["GDG Devfest", "Web3 Lagos"],
                          roles: leadershipRoles.map((r) => ({
                            role: r.r,
                            org: r.o,
                          })),
                          metrics: { mentees: 15, reach: "Global" },
                        },
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
};

export default CommunityLeadership;
