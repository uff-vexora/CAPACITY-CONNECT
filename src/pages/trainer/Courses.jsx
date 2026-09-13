import { AppIcon as Icon } from "../../components/AppIcon";
import { CourseRow } from "../../components/CourseRow";
import { PageHead } from "../../components/PageHead";
import { courses } from "../../data/courses";

export function Courses({ setPage }) {
  return (
    <>
      <PageHead kicker="INSTRUCTOR CATALOG" title="Curriculum management">
        <button
          className="button dark"
          onClick={() => setPage("Create Course")}
        >
          <Icon name="Plus" size={16} /> Create new course
        </button>
      </PageHead>

      <div className="course-stack">
        {courses.map((course) => (
          <CourseRow key={course.title} course={course} setPage={setPage} />
        ))}
      </div>
    </>
  );
}
