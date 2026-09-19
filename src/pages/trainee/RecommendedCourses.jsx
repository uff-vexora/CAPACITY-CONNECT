import { AppIcon as Icon } from "../../components/AppIcon";
import { CourseRow } from "../../components/CourseRow";
import { PageHead } from "../../components/PageHead";
import { courses as defaultCourses } from "../../data/courses";

export function Recommended({ setPage, courses = defaultCourses, onSelectCourse }) {
  const displayCourses = courses && courses.length > 0 ? courses : defaultCourses;

  return (
    <>
      <PageHead
        kicker="PERSONALIZED LEARNING"
        title="Recommended courses"
      />

      <div className="recommend-note">
        <Icon name="Sparkles" size={18} />
        <span>
          These courses have been prioritized based on your recent benchmark evaluation across technical, leadership, and operational readiness.
        </span>
      </div>

      <div className="course-stack">
        {displayCourses.map((course) => (
          <CourseRow
            key={course.id || course.title}
            course={course}
            setPage={setPage}
            onSelectCourse={onSelectCourse}
          />
        ))}
      </div>
    </>
  );
}
