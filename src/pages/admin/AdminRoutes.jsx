import { useState, useMemo } from "react";
import { GenericPage } from "../../components/GenericPage";
import { AdminDashboard } from "./AdminDashboard";
import { Users } from "./Users";
import { Trainers } from "./Trainers";
import { AdminCourses } from "./AdminCourses";
import { Competency } from "./Competency";
import { TrainingNeeds } from "./TrainingNeeds";
import { Reports } from "./Reports";
import { AdminProfile } from "./AdminProfile";
import { LiveSessions } from "../trainer/LiveSessions";
import { CourseDetails } from "../trainee/CourseDetails";
import { Learning } from "../trainee/Learning";
import { Notifications } from "../common/Notifications";
import { Settings } from "../common/Settings";
import { INITIAL_COURSES } from "../../data/courses";

export function AdminRoutes({ page, setPage, user, setUser }) {
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
    if (setPage) setPage(targetPage);
  };

  if (page === "Dashboard") return <AdminDashboard />;
  if (page === "Users") return <Users />;
  if (page === "Trainers") return <Trainers setPage={setPage} />;
  if (page === "Courses") return <AdminCourses setPage={setPage} onSelectCourse={handleSelectCourse} />;
  if (page === "Competency") return <Competency />;
  if (page === "Training Needs") return <TrainingNeeds setPage={setPage} />;
  if (page === "Reports") return <Reports />;
  if (page === "Live Sessions") return <LiveSessions setPage={setPage} />;
  if (page === "My Profile") return <AdminProfile user={user} setUser={setUser} setPage={setPage} />;

  if (page === "Course Details")
    return (
      <CourseDetails
        course={selectedCourse}
        onStartLearning={(id) => handleSelectCourse(id || selectedCourse.id, "Learning")}
        onEnroll={() => {}}
        onBack={() => setPage && setPage("Courses")}
        onGoToAssessment={() => setPage && setPage("Courses")}
      />
    );

  if (page === "Learning")
    return (
      <Learning
        course={selectedCourse}
        onToggleModuleComplete={() => {}}
        onSaveNote={() => {}}
        onBack={() => setPage && setPage("Courses")}
      />
    );

  if (page === "Notifications")
    return <Notifications setPage={setPage} onBack={() => setPage && setPage("Dashboard")} role="Admin" />;
  if (page === "Settings")
    return <Settings onBack={() => setPage && setPage("Dashboard")} />;

  return (
    <GenericPage
      page={page}
      title={page}
      text="Manage organization-wide learning activity and capacity planning."
    />
  );
}
