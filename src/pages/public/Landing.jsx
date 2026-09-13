import { AppIcon as Icon } from "../../components/AppIcon";
import { Brand } from "../../components/Brand";

export function Landing({ setPage }) {
  return (
    <div className="public">
      <header>
        <Brand />
        <nav>
          <button className="text-button" onClick={() => setPage("Login")}>
            Sign in
          </button>
          <button className="button dark" onClick={() => setPage("Role Selection")}>
            Get Started <Icon name="ArrowRight" size={15} />
          </button>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">INTELLIGENT CAPACITY BUILDING</p>
          <h1>Connect potential to <em>capability</em>.</h1>
          <p className="intro">
            Evaluate competencies, identify skill gaps, and deliver targeted training pathways across your workforce in one unified platform.
          </p>
          <div className="actions">
            <button className="button dark" onClick={() => setPage("Role Selection")}>
              Start Assessment <Icon name="ArrowRight" size={15} />
            </button>
            <button className="text-button" onClick={() => setPage("Login")}>
              Explore Platform <Icon name="ChevronRight" size={15} />
            </button>
          </div>
        </div>

        <div className="journey">
          <div className="journey-label">THE CAPACITY JOURNEY</div>
          <div className="journey-step">
            <span>01</span>
            <div>
              <b>BENCHMARK COMPETENCY</b>
              <small>Evaluate technical, leadership, and operational readiness.</small>
            </div>
            <i>↓</i>
          </div>
          <div className="journey-step">
            <span>02</span>
            <div>
              <b>MAP SKILL GAPS</b>
              <small>Identify precise deficits against role requirements.</small>
            </div>
            <i>↓</i>
          </div>
          <div className="journey-step">
            <span>03</span>
            <div>
              <b>TARGETED LEARNING</b>
              <small>Deliver curated modular courses tailored to gaps.</small>
            </div>
            <i>↓</i>
          </div>
          <div className="journey-step">
            <span>04</span>
            <div>
              <b>MEASURE IMPACT</b>
              <small>Track organizational uplift and certify mastery.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="statement">
        <p>
          “Transform organizational talent through measurable skill benchmarking and continuous training delivery.”
        </p>
        <div className="audiences">
          <article>
            <Icon name="GraduationCap" size={32} />
            <h3>For Trainees</h3>
            <p>
              Understand your career baseline, discover role-specific gaps, and access structured learning pathways with verifiable certificates.
            </p>
          </article>
          <article>
            <Icon name="Users" size={32} />
            <h3>For Trainers</h3>
            <p>
              Author impactful modular curricula, monitor learner cohort progress in real-time, and administer targeted skill assessments.
            </p>
          </article>
          <article>
            <Icon name="BarChart3" size={32} />
            <h3>For Administrators</h3>
            <p>
              Gain full visibility into enterprise-wide capability metrics, prioritize learning investments, and export compliance reports.
            </p>
          </article>
        </div>
      </section>

      <section className="cta">
        <p className="eyebrow">READY TO BEGIN</p>
        <h2>Close the gap between today and <em>tomorrow</em>.</h2>
        <button className="button light" onClick={() => setPage("Role Selection")}>
          Select Your Workspace <Icon name="ArrowRight" size={16} />
        </button>
      </section>

      <footer>
        <span>© 2026 Capacity Connect. All rights reserved.</span>
        <span>Empowering workforce development</span>
      </footer>
    </div>
  );
}
