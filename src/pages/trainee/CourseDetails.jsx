import { AppIcon } from "../../components/AppIcon";

export function CourseDetails({ course, onStartLearning, onEnroll, onBack, onGoToAssessment }) {
  if (!course) {
    return (
      <div className="empty-courses">
        <p>Course details not found.</p>
        <button className="button dark" onClick={onBack}>
          ← Return to Courses
        </button>
      </div>
    );
  }

  const isEnrolled = course.enrolled;
  const modules = course.modules || [];
  const completedModules = course.completedModules || [];

  const handleStart = () => {
    if (!isEnrolled && onEnroll) {
      onEnroll(course.id);
    }
    if (onStartLearning) {
      onStartLearning(course.id);
    }
  };

  return (
    <>
      {onBack && (
        <button className="back-link" onClick={onBack}>
          <AppIcon name="ArrowLeft" size={15} /> Back to My Courses
        </button>
      )}

      <div className="page-head">
        <div>
          <p className="eyebrow">
            {isEnrolled ? (course.progress === 100 ? "COMPLETED PATHWAY" : "CURRENT ENROLLMENT") : "COURSE PREVIEW"}
          </p>
          <h1>{course.title}</h1>
        </div>
        <button className="button dark" onClick={handleStart}>
          {isEnrolled
            ? course.progress > 0
              ? `Continue Learning (${course.progress}%)`
              : "Start Learning"
            : "Enroll and Start"}{" "}
          <AppIcon name="ArrowRight" size={16} />
        </button>
      </div>

      <div className="course-detail-meta">
        <span>
          <AppIcon name="UserRound" size={15} /> {course.trainer}
        </span>
        <span>
          <AppIcon name="Clock3" size={15} /> {course.duration}
        </span>
        <span>
          <AppIcon name="Signal" size={15} /> {course.level}
        </span>
        <span>
          <AppIcon name="UsersRound" size={15} /> {course.area}
        </span>
        <span>
          <AppIcon name="Layers" size={15} /> {modules.length} Modules
        </span>
      </div>

      <div className="course-detail-grid">
        <section>
          <p className="eyebrow">COURSE OVERVIEW</p>
          <h2>{course.title}</h2>
          <p>{course.overview || course.description}</p>
          <hr />
          <p className="eyebrow">LEARNING OUTCOMES</p>
          <ul>
            {(course.learningOutcomes || [
              "Master core competencies aligned with enterprise capability benchmarks.",
              "Apply practical frameworks directly to day-to-day deliverables.",
              "Complete hands-on video modules with structured assessments.",
            ]).map((outcome, idx) => (
              <li key={idx}>{outcome}</li>
            ))}
          </ul>
        </section>

        <aside style={{ background: "#e8dfca", border: "1px solid #d5c9ae", padding: 28, color: "var(--ink)" }}>
          <p className="eyebrow">WHY THIS COURSE</p>
          <b style={{ display: "block", fontSize: "1.25rem", lineHeight: 1.35, color: "#1a1c18", fontWeight: 600, marginBottom: 10 }}>
            {course.reason || "Recommended based on your organizational capability roadmap."}
          </b>
          <p style={{ color: "#45483f", lineHeight: 1.6 }}>
            Curated specifically for your role progression with verified video instruction and actionable takeaways.
          </p>
          <button className="button warm" onClick={handleStart} style={{ marginTop: 18, width: "100%", justifyContent: "center" }}>
            {isEnrolled && course.progress > 0 ? "Resume Lessons" : "Start Learning"}{" "}
            <AppIcon name="Play" size={15} />
          </button>
          <button
            type="button"
            className="button dark"
            onClick={() => onGoToAssessment && onGoToAssessment(course.id)}
            style={{ marginTop: 10, width: "100%", justifyContent: "center", gap: 8 }}
          >
            Go to Assessment <AppIcon name="ClipboardCheck" size={16} />
          </button>
        </aside>
      </div>

      <section className="module-outline">
        <p className="eyebrow">COURSE MODULES & SYLLABUS ({modules.length})</p>
        {modules.map((module, index) => {
          const isDone = completedModules.includes(index);
          return (
            <div key={module.id || index}>
              <span>{isDone ? "✓" : String(index + 1).padStart(2, "0")}</span>
              <div>
                <b>{module.title}</b>
                {module.summary && <small style={{ display: "block", color: "var(--muted)", marginTop: 4 }}>{module.summary}</small>}
              </div>
              <small>{module.duration || "Approx. 15 min"}</small>
            </div>
          );
        })}
      </section>
    </>
  );
}
