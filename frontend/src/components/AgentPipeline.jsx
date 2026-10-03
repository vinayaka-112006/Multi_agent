import {
  Check,
  Circle,
  FileSearch,
  PenLine,
  ScanText,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    name: "Search Agent",
    desc: "Finding recent and reliable sources",
    Icon: FileSearch,
  },
  {
    name: "Reader Agent",
    desc: "Reading the most relevant source",
    Icon: ScanText,
  },
  {
    name: "Writer Agent",
    desc: "Drafting a structured research report",
    Icon: PenLine,
  },
  {
    name: "Critic Agent",
    desc: "Reviewing clarity and evidence",
    Icon: Sparkles,
  },
];

export default function AgentPipeline({ active, complete, error }) {
  return (
    <section className="pipeline-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE WORKFLOW</span>
          <h2>Four agents, one clear answer</h2>
        </div>
        <span className="step-count">
          {complete
            ? "4 / 4 COMPLETE"
            : active >= 0
              ? `${active + 1} / 4 IN PROGRESS`
              : "READY WHEN YOU ARE"}
        </span>
      </div>
      <div className="agent-grid">
        {steps.map(({ name, desc, Icon }, i) => {
          const status =
            error && i === active
              ? "error"
              : complete || i < active
                ? "complete"
                : i === active
                  ? "running"
                  : "pending";
          return (
            <article key={name} className={`agent-card ${status}`}>
              <div className="agent-top">
                <div className="agent-icon">
                  <Icon size={18} />
                </div>
                <span className="agent-number">0{i + 1}</span>
              </div>
              <h3>{name}</h3>
              <p>{desc}</p>
              <div className="agent-status">
                {status === "complete" ? (
                  <Check size={14} />
                ) : status === "running" ? (
                  <span className="pulse" />
                ) : status === "error" ? (
                  <Circle size={13} />
                ) : (
                  <Circle size={13} />
                )}
                <span>
                  {status === "complete"
                    ? "Completed"
                    : status === "running"
                      ? "Working..."
                      : status === "error"
                        ? "Error"
                        : "Pending"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
