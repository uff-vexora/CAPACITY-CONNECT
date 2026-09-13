import { AppIcon as Icon } from "../../components/AppIcon";
import { CourseRow } from "../../components/CourseRow";
import { PageHead } from "../../components/PageHead";
import { courses } from "../../data/courses";

export function Recommended({ setPage }) {
  return (
    <>
      <PageHead
        kicker="PERSONALIZED LEARNING"
        title="Recommended courses"
      />

      <div className="recommend-note">
        <Icon name="Sparkles" size={18} />
        <span>
          These courses have been prioritized based on your recent benchmark evaluation in <b>Leadership</b> and <b>Communication</b>.
        </span>
      </div>

      <div className="course-stack">
        {courses.map((course) => (
          <CourseRow key={course.title} course={course} setPage={setPage} />
        ))}
      </div>
    </>
  );
}
