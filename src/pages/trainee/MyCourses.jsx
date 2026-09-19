import { useState } from "react";
import { CourseRow } from "../../components/CourseRow";
import { PageHead } from "../../components/PageHead";
import { AppIcon as Icon } from "../../components/AppIcon";

export function CoursesList({ courses = [], setPage, onSelectCourse }) {
  const [filter, setFilter] = useState("all");

  // My Courses shows courses the trainee is enrolled in
  const enrolled = courses.filter((c) => c.enrolled !== false);

  const inProgressList = enrolled.filter((c) => c.progress > 0 && c.progress < 100);
  const notStartedList = enrolled.filter((c) => c.progress === 0);
  const completedList = enrolled.filter((c) => c.progress === 100);

  const filtered = enrolled.filter((c) => {
    if (filter === "in-progress") return c.progress > 0 && c.progress < 100;
    if (filter === "not-started") return c.progress === 0;
    if (filter === "completed") return c.progress === 100;
    return true;
  });

  return (
    <>
      <PageHead kicker="MY ENROLLMENTS" title="Active learning pathways">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className={`button ${filter === "all" ? "dark" : "outline"}`}
            onClick={() => setFilter("all")}
          >
            All ({enrolled.length})
          </button>
          <button
            className={`button ${filter === "in-progress" ? "dark" : "outline"}`}
            onClick={() => setFilter("in-progress")}
          >
            In progress ({inProgressList.length})
          </button>
          <button
            className={`button ${filter === "not-started" ? "dark" : "outline"}`}
            onClick={() => setFilter("not-started")}
          >
            Not started ({notStartedList.length})
          </button>
          <button
            className={`button ${filter === "completed" ? "dark" : "outline"}`}
            onClick={() => setFilter("completed")}
          >
            Completed ({completedList.length})
          </button>
        </div>
      </PageHead>

      {filtered.length > 0 ? (
        <div className="course-stack">
          {filtered.map((course) => (
            <CourseRow
              key={course.id || course.title}
              course={course}
              setPage={setPage}
              onSelectCourse={onSelectCourse}
            />
          ))}
        </div>
      ) : (
        <div className="empty-courses">
          <p>No courses found in this category.</p>
          <button className="button dark" onClick={() => setPage("Recommended")}>
            Explore Course Catalog <Icon name="ArrowRight" size={15} />
          </button>
        </div>
      )}
    </>
  );
}
