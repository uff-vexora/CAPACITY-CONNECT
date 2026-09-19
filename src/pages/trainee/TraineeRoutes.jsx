import { useState, useMemo } from "react";
import { GenericPage } from "../../components/GenericPage";
import { Assessment } from "./Assessment";
import { AssessmentResult } from "./AssessmentResult";
import { Certificates } from "./Certificates";
import { CourseDetails } from "./CourseDetails";
import { Learning } from "./Learning";
import { CoursesList } from "./MyCourses";
import { Profile } from "./Profile";
import { Progress } from "./Progress";
import { Recommended } from "./RecommendedCourses";
import { SkillGap } from "./SkillGap";
import { TraineeDashboard } from "./TraineeDashboard";
import { Notifications } from "../common/Notifications";
import { Settings } from "../common/Settings";
import { loadUserProgress, saveUserProgress, getCourses, INITIAL_COURSES } from "../../data/courses";

export function TraineeRoutes({ page, setPage, user, setUser }) {
  const [userProgress, setUserProgress] = useState(() => loadUserProgress());
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    return localStorage.getItem("capacity_selected_course") || "leadership-essentials";
  });

  // Calculate dynamic courses list with trainee progress
  const courseList = useMemo(() => getCourses(userProgress), [userProgress]);

  // Active selected course
  const selectedCourse = useMemo(() => {
    return (
      courseList.find((c) => c.id === selectedCourseId) ||
      courseList.find((c) => c.title === selectedCourseId) ||
      courseList[0]
    );
  }, [courseList, selectedCourseId]);

  // Navigate to course details or learning
  const handleSelectCourse = (courseId, targetPage = "Course Details") => {
    const course =
      courseList.find((c) => c.id === courseId) ||
      courseList.find((c) => c.title === courseId) ||
      courseList[0];

    const validId = course ? course.id : courseId;
    setSelectedCourseId(validId);
    try {
      localStorage.setItem("capacity_selected_course", validId);
    } catch (e) {
      console.error(e);
    }
    setPage(targetPage);
  };

  // Enroll in a course
  const handleEnrollCourse = (courseId) => {
    setUserProgress((prev) => {
      const current = prev[courseId] || {
        enrolled: true,
        completedModules: [],
        percent: 0,
        notes: {},
      };
      const updated = {
        ...prev,
        [courseId]: {
          ...current,
          enrolled: true,
        },
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  // Toggle module completion state
  const handleToggleModuleComplete = (courseId, moduleIndex) => {
    setUserProgress((prev) => {
      const baseCourse = INITIAL_COURSES.find((c) => c.id === courseId) || INITIAL_COURSES[0];
      const current = prev[courseId] || {
        enrolled: true,
        completedModules: baseCourse.defaultCompleted || [],
        percent: 0,
        notes: {},
      };

      const existingCompleted = current.completedModules || [];
      const isAlreadyCompleted = existingCompleted.includes(moduleIndex);

      let newCompleted;
      if (isAlreadyCompleted) {
        newCompleted = existingCompleted.filter((i) => i !== moduleIndex);
      } else {
        newCompleted = [...existingCompleted, moduleIndex];
      }

      const totalModules = baseCourse.modules.length;
      const newPercent = totalModules > 0 ? Math.round((newCompleted.length / totalModules) * 100) : 0;

      const updated = {
        ...prev,
        [courseId]: {
          ...current,
          enrolled: true,
          completedModules: newCompleted,
          percent: newPercent,
        },
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  // Save trainee note
  const handleSaveNote = (courseId, moduleIndex, noteText) => {
    setUserProgress((prev) => {
      const current = prev[courseId] || {
        enrolled: true,
        completedModules: [],
        percent: 0,
        notes: {},
      };
      const updatedNotes = { ...(current.notes || {}), [moduleIndex]: noteText };
      const updated = {
        ...prev,
        [courseId]: {
          ...current,
          notes: updatedNotes,
        },
      };
      saveUserProgress(updated);
      return updated;
    });
  };

  if (page === "Dashboard")
    return <TraineeDashboard setPage={setPage} courses={courseList} onSelectCourse={handleSelectCourse} />;

  if (page === "Assessment") return <Assessment setPage={setPage} />;

  if (page === "Assessment Result") return <AssessmentResult onViewGap={() => setPage("Skill Gap")} />;

  if (page === "Skill Gap") return <SkillGap setPage={setPage} />;

  if (page === "Recommended")
    return <Recommended setPage={setPage} courses={courseList} onSelectCourse={handleSelectCourse} />;

  if (page === "Course Details")
    return (
      <CourseDetails
        course={selectedCourse}
        onStartLearning={(id) => handleSelectCourse(id || selectedCourse.id, "Learning")}
        onEnroll={handleEnrollCourse}
        onBack={() => setPage("My Courses")}
      />
    );

  if (page === "Learning")
    return (
      <Learning
        course={selectedCourse}
        onToggleModuleComplete={handleToggleModuleComplete}
        onSaveNote={handleSaveNote}
        onBack={() => setPage("My Courses")}
      />
    );

  if (page === "My Profile") return <Profile user={user} setUser={setUser} />;

  if (page === "Progress") return <Progress courses={courseList} />;

  if (page === "Certificates")
    return <Certificates courses={courseList} user={user} setPage={setPage} />;

  if (page === "My Courses")
    return <CoursesList courses={courseList} setPage={setPage} onSelectCourse={handleSelectCourse} />;

  if (page === "Notifications")
    return <Notifications setPage={setPage} onBack={() => setPage("Dashboard")} />;

  if (page === "Settings")
    return <Settings onBack={() => setPage("Dashboard")} />;

  return <GenericPage page={page} title={page} text="This workspace is ready for your organization’s learning activity." />;
}
