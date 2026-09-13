import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
export function Reports() {
  return (
    <>
      <PageHead
        kicker="ORGANIZATION REPORTS"
        title="Evidence for your development plan"
      >
        <button className="button dark">
          <Icon name="Download" size={16} /> Export report
        </button>
      </PageHead>
      <div className="report-grid">
        {[
          [
            "Employee development",
            "Competency has improved by 4% across active learners.",
            "TrendingUp",
          ],
          [
            "Training completion",
            "68% of assigned learning is complete this quarter.",
            "CircleCheck",
          ],
          [
            "Assessment performance",
            "Average assessment score is 74% across all programs.",
            "ClipboardCheck",
          ],
          [
            "Capability readiness",
            "386 employees are active in a development pathway.",
            "Users",
          ],
        ].map(([x, y, i]) => (
          <article key={x}>
            <Icon name={i} />
            <h2>{x}</h2>
            <p>{y}</p>
            <button className="text-button">View report →</button>
          </article>
        ))}
      </div>
    </>
  );
}
