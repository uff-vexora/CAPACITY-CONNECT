import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { skills } from "../../data/skills";

export function SkillGap({ setPage }) {
  return (
    <>
      <PageHead
        kicker="GAP ANALYSIS"
        title="Identified skill gaps"
      >
        <button className="button outline" onClick={() => window.print()}>
          Export report <Icon name="Download" size={15} />
        </button>
      </PageHead>

      <p className="lead">
        Here is a granular comparison between your assessed competency baseline and the standard target benchmarks established for your role.
      </p>

      <section className="gap-hero">
        <div>
          <p>OVERALL GAP</p>
          <b>13%</b>
        </div>
        <div>
          <p>PRIMARY DEFICIT</p>
          <b style={{ color: "var(--rust)" }}>Leadership</b>
        </div>
        <div className="gap-callout">
          <span>4</span> competencies mapped against current organizational requirements
        </div>
      </section>

      <div className="gap-list">
        <div className="gap-head">
          <span>COMPETENCY AREA</span>
          <span>CURRENT</span>
          <span>TARGET</span>
          <span>GAP VISUALIZATION</span>
        </div>
        {skills.map((s) => {
          const gap = s.target - s.current;
          return (
            <div className="gap-line" key={s.name}>
              <b>{s.name}</b>
              <span>{s.current}%</span>
              <span>{s.target}%</span>
              <div>
                <strong>{gap > 0 ? `-${gap}%` : "0%"}</strong>
                <div className="bar">
                  <i
                    className={s.tone}
                    style={{ width: `${s.current}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="next-step">
        <Icon name="Sparkles" size={24} />
        <div>
          <p className="eyebrow">ACTIONABLE RECOMMENDATION</p>
          <h3>Close priority gaps with curated pathways</h3>
          <p>
            We have mapped courses specifically aligned to your largest developmental opportunity: <b>Leadership Essentials</b>.
          </p>
        </div>
        <button
          className="button dark"
          onClick={() => setPage("Recommended")}
        >
          View recommended courses <Icon name="ArrowRight" size={15} />
        </button>
      </section>
    </>
  );
}
