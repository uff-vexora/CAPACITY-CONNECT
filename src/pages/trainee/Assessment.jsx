import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";

const questions = [
  {
    id: 1,
    category: "Leadership & Delegation",
    prompt:
      "When a project milestone is at risk due to competing cross-team priorities, what is your primary course of action?",
    options: [
      { id: "A", text: "Escalate immediately to senior executive leadership without consulting leads." },
      { id: "B", text: "Convene team leads, realign dependencies, and negotiate realistic revised deliverables." },
      { id: "C", text: "Absorb additional workload personally to bridge timeline deficits." },
      { id: "D", text: "Defer non-urgent project tasks unilaterally without notifying stakeholders." },
    ],
  },
  {
    id: 2,
    category: "Communication & Conflict",
    prompt:
      "How do you address conflicting technical opinions between senior contributors during architecture reviews?",
    options: [
      { id: "A", text: "Mandate evaluation against explicit criteria: cost, scalability, maintainability, and delivery risk." },
      { id: "B", text: "Choose the solution presented by the highest-ranking engineer by default." },
      { id: "C", text: "Table the discussion permanently until complete consensus occurs naturally." },
      { id: "D", text: "Implement both proposals concurrently in separate branches." },
    ],
  },
  {
    id: 3,
    category: "Technical & Problem Solving",
    prompt:
      "A production alert triggers an intermittent degradation in response times. What is your diagnostic approach?",
    options: [
      { id: "A", text: "Restart all cluster nodes immediately without inspecting log telemetry." },
      { id: "B", text: "Analyze APM traces, inspect query latency distributions, and isolate bottleneck boundaries." },
      { id: "C", text: "Disable alerting thresholds to prevent false positives while monitoring continues." },
      { id: "D", text: "Immediately rollback the latest release regardless of change impact." },
    ],
  },
  {
    id: 4,
    category: "Operational Safety & Compliance",
    prompt:
      "You observe a security compliance policy shortcut taken to meet a sprint deadline. What is required?",
    options: [
      { id: "A", text: "Log the deviation as technical debt and schedule resolution in the next quarter." },
      { id: "B", text: "Overlook the violation if unit test suites pass completely." },
      { id: "C", text: "Flag the policy deviation, halt promotion, and document mitigation before authorization." },
      { id: "D", text: "Discuss informally off-record without entering formal audit logs." },
    ],
  },
];

export function Assessment({ setPage }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const q = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;

  const handleSelect = (optionId) => {
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
  };

  const handleNext = () => {
    if (isLast) {
      setPage("Assessment Result");
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
  };

  return (
    <>
      <PageHead
        kicker="BENCHMARK ASSESSMENT"
        title="Role Competency Evaluation"
      />

      <div className="assessment-card">
        <div className="assessment-meta">
          <span>
            QUESTION <b>{currentIdx + 1} OF {questions.length}</b>
          </span>
          <span>
            DOMAIN: <strong>{q.category}</strong>
          </span>
          <b>Time remaining: ~12 mins</b>
        </div>

        <div className="bar" style={{ margin: "16px 0 28px" }}>
          <i
            style={{
              width: `${((currentIdx + 1) / questions.length) * 100}%`,
              background: "var(--green)",
            }}
          />
        </div>

        <h2>{q.prompt}</h2>

        <div className="options">
          {q.options.map((opt) => {
            const isSelected = answers[q.id] === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={isSelected ? "selected" : ""}
                onClick={() => handleSelect(opt.id)}
              >
                <span>{opt.id}</span>
                <div>{opt.text}</div>
              </button>
            );
          })}
        </div>

        <div className="assessment-footer">
          <button
            type="button"
            className="button outline"
            disabled={currentIdx === 0}
            onClick={handlePrev}
            style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <button type="button" className="button dark" onClick={handleNext}>
            {isLast ? "Submit assessment" : "Next question"}{" "}
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
