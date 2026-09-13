import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { ScoreBar } from "../../components/ScoreBar";
import { skills } from "../../data/skills";
export function Profile() {
  return (
    <>
      <PageHead kicker="PROFESSIONAL PROFILE" title="Rahul Sharma">
        <button className="button dark">
          Edit profile <Icon name="Pencil" size={15} />
        </button>
      </PageHead>
      <div className="profile-grid">
        <section>
          <div className="profile-top">
            <span className="avatar big">RS</span>
            <div>
              <h2>Rahul Sharma</h2>
              <p>Operations Associate · Regional Operations</p>
              <small>4 years experience · B.Tech, Industrial Engineering</small>
            </div>
          </div>
          <hr />
          <dl>
            <dt>Skills</dt>
            <dd>
              <span className="pill">Operations</span>
              <span className="pill">Safety</span>
              <span className="pill">Process improvement</span>
            </dd>
            <dt>Interests</dt>
            <dd>People leadership, team coordination</dd>
            <dt>Certificates</dt>
            <dd>Operational Safety · Process Excellence</dd>
          </dl>
        </section>
        <section className="feature">
          <p className="eyebrow">COMPETENCY SUMMARY</p>
          <h2>
            72<sup>%</sup>
          </h2>
          {skills.map((s) => (
            <ScoreBar key={s.name} {...s} />
          ))}
        </section>
      </div>
    </>
  );
}
