import { useState } from "react";
import { CourseRow } from "../../components/CourseRow";
import { PageHead } from "../../components/PageHead";
import { courses } from "../../data/courses";

export function CoursesList({ setPage }) {
  const [filter, setFilter] = useState("all");

  const filtered = courses.filter((c) => {
    if (filter === "in-progress") return c.progress > 0;
    if (filter === "not-started") return c.progress === 0;
    return true;
  });

  return (
    <>
      <PageHead kicker="MY ENROLLMENTS" title="Active learning pathways">
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className={`button ${filter === "all" ? "dark" : "outline"}`}
            onClick={() => setFilter("all")}
          >
            All ({courses.length})
          </button>
          <button
            className={`button ${filter === "in-progress" ? "dark" : "outline"}`}
            onClick={() => setFilter("in-progress")}
          >
            In progress ({courses.filter((c) => c.progress > 0).length})
          </button>
          <button
            className={`button ${filter === "not-started" ? "dark" : "outline"}`}
            onClick={() => setFilter("not-started")}
          >
            Not started ({courses.filter((c) => c.progress === 0).length})
          </button>
        </div>
      </PageHead>

      <div className="course-stack">
        {filtered.map((course) => (
          <CourseRow key={course.title} course={course} setPage={setPage} />
        ))}
      </div>
    </>
  );
}
