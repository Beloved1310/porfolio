import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FiCheck, FiPlay, FiRotateCcw, FiX } from "react-icons/fi";

type Phase = "idle" | "running" | "awaiting" | "approved" | "rejected";
type Tone = "info" | "lock" | "attribute" | "require" | "danger" | "success";

interface LogLine {
  id: number;
  time: string;
  tone: Tone;
  text: string;
}

const TASK = "Draft and publish this week's product update";
const USER = "demo-user";

const toneClass: Record<Tone, string> = {
  info: "text-stone-400",
  lock: "text-stone-100 font-bold",
  attribute: "text-amber-300",
  require: "text-amber-500 font-bold",
  danger: "text-red-400",
  success: "text-emerald-400",
};

const ungovernedScript: [Tone, string][] = [
  ["info", `task received: "${TASK}"`],
  ["info", "credentials: borrowed user session (full access)"],
  ["info", "research: 4 sources gathered"],
  ["info", "draft: written"],
  ["danger", "HIGH-RISK ACTION: publish_to_all_channels"],
  ["danger", "executed immediately, no approval asked"],
  ["danger", "published to LinkedIn, X, blog and newsletter"],
  ["danger", "audit: actor=agent, on_behalf_of=unknown"],
];

const governedScript: [Tone, string][] = [
  ["info", `task received: "${TASK}"`],
  ["lock", "LOCK token exchanged: scope=content:draft ttl=15m"],
  ["info", "research: 4 sources gathered"],
  ["info", "draft: written"],
  ["require", "HIGH-RISK ACTION requested: publish_to_all_channels"],
  ["lock", "LOCK scope check: content:publish is not in this token"],
  ["attribute", `ATTRIBUTE action recorded on_behalf_of=${USER} session=s-7f3a`],
  ["require", `REQUIRE approval requested from ${USER} via CIBA`],
  ["require", "paused: waiting for a human decision"],
];

const approvedScript: [Tone, string][] = [
  ["require", `REQUIRE approved by ${USER}`],
  ["lock", "LOCK step-up token issued: scope=content:publish ttl=2m"],
  ["success", "published to LinkedIn, X, blog and newsletter"],
  ["attribute", `ATTRIBUTE audit closed: approved_by=${USER}`],
];

const rejectedScript: [Tone, string][] = [
  ["require", `REQUIRE rejected by ${USER}`],
  ["success", "action cancelled: draft saved, nothing published"],
  ["attribute", `ATTRIBUTE audit closed: rejected_by=${USER}`],
];

const timestamp = () => new Date().toLocaleTimeString("en-GB", { hour12: false });

const LogPanel = ({ title, subtitle, lines, children }: {
  title: string;
  subtitle: string;
  lines: LogLine[];
  children?: React.ReactNode;
}) => (
  <div className="flex flex-col rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
    <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800">
      <p className="font-bold text-stone-900 dark:text-white">{title}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400">{subtitle}</p>
    </div>
    <ol
      aria-live="polite"
      aria-label={`${title} audit log`}
      className="font-code text-[11px] sm:text-xs leading-relaxed bg-stone-950 p-4 min-h-[16rem] space-y-1 overflow-x-auto"
    >
      {lines.length === 0 && <li className="text-stone-500">Waiting for a task.</li>}
      {lines.map((line) => (
        <li key={line.id} className={toneClass[line.tone]}>
          <span className="text-stone-500">{line.time} </span>
          {line.text}
        </li>
      ))}
    </ol>
    {children}
  </div>
);

const LarSimulator = () => {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [ungoverned, setUngoverned] = useState<LogLine[]>([]);
  const [governed, setGoverned] = useState<LogLine[]>([]);
  const timers = useRef<number[]>([]);
  const nextId = useRef(0);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const play = (
    script: [Tone, string][],
    setLines: React.Dispatch<React.SetStateAction<LogLine[]>>,
    onDone?: () => void,
  ) => {
    const step = reduceMotion ? 0 : 450;
    script.forEach(([tone, text], i) => {
      timers.current.push(
        window.setTimeout(() => {
          setLines((prev) => [...prev, { id: nextId.current++, time: timestamp(), tone, text }]);
          if (i === script.length - 1) onDone?.();
        }, step * (i + 1)),
      );
    });
  };

  const start = () => {
    clearTimers();
    setUngoverned([]);
    setGoverned([]);
    setPhase("running");
    play(ungovernedScript, setUngoverned);
    play(governedScript, setGoverned, () => setPhase("awaiting"));
  };

  const decide = (approve: boolean) => {
    setPhase(approve ? "approved" : "rejected");
    play(approve ? approvedScript : rejectedScript, setGoverned);
  };

  const reset = () => {
    clearTimers();
    setUngoverned([]);
    setGoverned([]);
    setPhase("idle");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          type="button"
          onClick={start}
          disabled={phase === "running"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-[11px] disabled:opacity-50"
        >
          <FiPlay aria-hidden="true" /> Give both agents a task
        </button>
        {phase !== "idle" && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-3 border border-stone-300 dark:border-stone-700 rounded-full font-bold uppercase tracking-widest text-[11px] text-stone-700 dark:text-stone-300"
          >
            <FiRotateCcw aria-hidden="true" /> Reset
          </button>
        )}
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Task: <span className="font-semibold text-stone-900 dark:text-white">{TASK}</span>
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <LogPanel title="Ungoverned" subtitle="Uses the person's full access and acts alone." lines={ungoverned} />
        <LogPanel title="Governed by LAR" subtitle="Lock, Attribute, Require." lines={governed}>
          {phase === "awaiting" && (
            <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-amber-50 dark:bg-amber-500/10">
              <p className="text-sm font-semibold text-stone-900 dark:text-white mb-3">
                You are {USER}. The agent wants to publish to all channels. Do you approve?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => decide(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full font-bold uppercase tracking-widest text-[11px]"
                >
                  <FiCheck aria-hidden="true" /> Approve
                </button>
                <button
                  type="button"
                  onClick={() => decide(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-400 dark:border-stone-600 rounded-full font-bold uppercase tracking-widest text-[11px] text-stone-800 dark:text-stone-200"
                >
                  <FiX aria-hidden="true" /> Reject
                </button>
              </div>
            </div>
          )}
        </LogPanel>
      </div>

      <dl className="grid gap-3 sm:grid-cols-3 mt-6 text-sm">
        {[
          ["Lock", "The agent only gets the narrow access this task needs."],
          ["Attribute", "Every action is recorded against a named person."],
          ["Require", "High-risk actions wait for a human to approve them."],
        ].map(([term, desc]) => (
          <div key={term} className="rounded-2xl border border-stone-200 dark:border-stone-800 p-4 bg-white dark:bg-stone-900">
            <dt className="font-black text-stone-900 dark:text-white">{term}</dt>
            <dd className="text-stone-600 dark:text-stone-400">{desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default LarSimulator;
