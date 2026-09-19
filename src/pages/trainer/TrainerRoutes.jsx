import { useState, useMemo } from "react";
import { GenericPage } from "../../components/GenericPage";
import { Courses } from "./Courses";
import { CourseForm } from "./CreateCourse";
import { TrainerDashboard } from "./TrainerDashboard";
import { Assessments } from "./Assessments";
import { Trainees } from "./Trainees";
import { Performance } from "./Performance";
import { Resources } from "./Resources";
import { LiveSessions } from "./LiveSessions";
import { TrainerProfile } from "./TrainerProfile";
import { CourseDetails } from "../trainee/CourseDetails";
import { Learning } from "../trainee/Learning";
import { Notifications } from "../common/Notifications";
import { Settings } from "../common/Settings";
import { INITIAL_COURSES } from "../../data/courses";

export function TrainerRoutes({ page, setPage, user, setUser }) {
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    return localStorage.getItem("capacity_selected_course") || "leadership-essentials";
  });

  const allCourses = useMemo(() => {
    try {
      const custom = JSON.parse(localStorage.getItem("capacity_custom_courses") || "[]");
      return [...INITIAL_COURSES, ...custom];
    } catch {
      return INITIAL_COURSES;
    }
  }, []);

  const selectedCourse = useMemo(() => {
    return (
      allCourses.find((c) => c.id === selectedCourseId) ||
      allCourses.find((c) => c.title === selectedCourseId) ||
      allCourses[0]
    );
  }, [allCourses, selectedCourseId]);

  const handleSelectCourse = (courseId, targetPage = "Course Details") => {
    setSelectedCourseId(courseId);
    try {
      localStorage.setItem("capacity_selected_course", courseId);
    } catch (e) {
      console.error(e);
    }
    setPage(targetPage);
  };

  if (page === "Dashboard") return <TrainerDashboard setPage={setPage} />;
  if (page === "Courses") return <Courses setPage={setPage} onSelectCourse={handleSelectCourse} />;
  if (page === "Create Course") return <CourseForm setPage={setPage} />;
  if (page === "Trainees") return <Trainees setPage={setPage} />;
  if (page === "Assessments") return <Assessments setPage={setPage} />;
  if (page === "Performance") return <Performance setPage={setPage} />;
  if (page === "Resources") return <Resources setPage={setPage} />;
  if (page === "Live Sessions") return <LiveSessions setPage={setPage} />;
  if (page === "My Profile")
    return <TrainerProfile user={user} setUser={setUser} setPage={setPage} onSelectCourse={handleSelectCourse} />;

  if (page === "Course Details")
    return (
      <CourseDetails
        course={selectedCourse}
        onStartLearning={(id) => handleSelectCourse(id || selectedCourse.id, "Learning")}
        onEnroll={() => {}}
        onBack={() => setPage("Courses")}
        onGoToAssessment={() => setPage("Assessments")}
      />
    );

  if (page === "Learning")
    return (
      <Learning
        course={selectedCourse}
        onToggleModuleComplete={() => {}}
        onSaveNote={() => {}}
        onBack={() => setPage("Courses")}
      />
    );

  if (page === "Notifications")
    return <Notifications setPage={setPage} onBack={() => setPage("Dashboard")} role="Trainer" />;
  if (page === "Settings") return <Settings onBack={() => setPage("Dashboard")} />;

  return (
    <GenericPage
      page={page}
      title={page}
      text="Manage the learning experience for your trainees from this workspace."
    />
  );
}
