import { AppIcon as Icon } from "../../components/AppIcon";
import { CourseRow } from "../../components/CourseRow";
import { PageHead } from "../../components/PageHead";
import { ScoreBar } from "../../components/ScoreBar";
import { courses } from "../../data/courses";
import { skills } from "../../data/skills";
import { Journey } from "./Journey";

export function TraineeDashboard({ setPage }) {
  return (
    <>
      <PageHead kicker="TRAINEE WORKSPACE" title="Welcome back, Alex">
        <button className="button dark" onClick={() => setPage("Assessment")}>
          Take competency assessment <Icon name="ArrowRight" size={15} />
        </button>
      </PageHead>

      <Journey />

      <div className="dashboard-grid">
        <section className="feature competency">
          <div className="section-top">
            <div>
              <p className="eyebrow">ASSESSED READINESS</p>
              <h2>
                72<sup>%</sup>
              </h2>
              <span>+8% from previous baseline</span>
            </div>
            <div className="ring">
              <span>
                72<small>%</small>
              </span>
            </div>
          </div>
          <hr />
          <p className="eyebrow">COMPETENCY TARGETS</p>
          {skills.map((s) => (
            <ScoreBar
              key={s.name}
              name={s.name}
              current={s.current}
              target={s.target}
              tone={s.tone}
            />
          ))}
        </section>

        <section className="feature improvement">
          <p className="eyebrow">LARGEST SKILL GAP</p>
          <h2>Leadership</h2>
          <div className="gap-number">
            -26<sup>%</sup>
            <span>below target</span>
          </div>
          <p>
            Your leadership readiness is currently 54% against a target of 80%.
            Completing Leadership Essentials will close this priority gap.
          </p>
          <button className="button dark" onClick={() => setPage("Skill Gap")}>
            View skill gap analysis <Icon name="ArrowRight" size={15} />
          </button>
        </section>
      </div>

      <div className="section-block">
        <div className="section-title">
          <div>
            <p className="eyebrow">TARGETED LEARNING</p>
            <h2>Recommended courses for you</h2>
          </div>
          <button
            className="text-button"
            onClick={() => setPage("Recommended")}
          >
            View all recommendations →
          </button>
        </div>
        {courses.slice(0, 2).map((c) => (
          <CourseRow key={c.title} course={c} setPage={setPage} />
        ))}
      </div>
    </>
  );
}
