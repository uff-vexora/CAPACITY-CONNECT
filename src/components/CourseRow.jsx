import { AppIcon as Icon } from "./AppIcon";

export function CourseRow({ course, setPage, onSelectCourse }) {
  const isCompleted = course.progress === 100;
  const isInProgress = course.progress > 0 && !isCompleted;

  const handleClick = (e) => {
    e.stopPropagation();
    const targetPage = course.progress > 0 ? "Learning" : "Course Details";
    if (onSelectCourse) {
      onSelectCourse(course.id || course.title, targetPage);
    } else if (setPage) {
      setPage(targetPage);
    }
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    if (onSelectCourse) {
      onSelectCourse(course.id || course.title, "Course Details");
    } else if (setPage) {
      setPage("Course Details");
    }
  };

  return (
    <article className="course-row" style={{ cursor: "pointer" }} onClick={handleDetailsClick}>
      <div className="course-symbol">
        <Icon name={isCompleted ? "CheckCircle2" : "UsersRound"} />
      </div>
      <div className="course-main">
        <div className="course-title">
          <h3>{course.title}</h3>
          <span className="pill">{course.area}</span>
          {isCompleted && <span className="pill-completed">Completed 100%</span>}
          {isInProgress && (
            <span className="pill" style={{ background: "#f5e8d9", color: "var(--orange)", fontWeight: 500 }}>
              {course.progress}% done
            </span>
          )}
        </div>
        <p>{course.reason || course.overview}</p>
        <div className="course-meta">
          <span>
            <Icon name="Clock3" size={15} />
            {course.duration}
          </span>
          <span>
            <Icon name="Signal" size={15} />
            {course.level}
          </span>
          <span>
            <Icon name="UserRound" size={15} />
            {course.trainer}
          </span>
          {course.modules && (
            <span>
              <Icon name="Layers" size={15} />
              {course.modules.length} lessons
            </span>
          )}
        </div>
      </div>
      <button
        className={`button ${isInProgress ? "dark" : "outline"}`}
        onClick={handleClick}
        title={isInProgress ? "Continue lesson" : isCompleted ? "Review course" : "View course overview"}
      >
        {isCompleted ? "Review" : isInProgress ? "Continue" : "View course"}{" "}
        <Icon name="ArrowRight" size={15} />
      </button>
    </article>
  );
}
