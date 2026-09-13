import { AppIcon as Icon } from "./AppIcon";

export function CourseRow({ course, setPage }) {
  return (
    <article className="course-row">
      <div className="course-symbol">
        <Icon name="UsersRound" />
      </div>
      <div className="course-main">
        <div className="course-title">
          <h3>{course.title}</h3>
          <span className="pill">{course.area}</span>
        </div>
        <p>{course.reason}</p>
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
        </div>
      </div>
      <button
        className="button outline"
        onClick={() => setPage(course.progress ? "Learning" : "Course Details")}
      >
        {course.progress ? "Continue" : "View course"}{" "}
        <Icon name="ArrowRight" size={15} />
      </button>
    </article>
  );
}
