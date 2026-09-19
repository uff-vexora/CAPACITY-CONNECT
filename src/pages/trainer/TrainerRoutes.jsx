import { GenericPage } from "../../components/GenericPage";
import { Courses } from "./Courses";
import { CourseForm } from "./CreateCourse";
import { TrainerDashboard } from "./TrainerDashboard";
import { Assessments } from "./Assessments";
import { Trainees } from "./Trainees";
import { Performance } from "./Performance";
import { Resources } from "./Resources";
import { Notifications } from "../common/Notifications";
import { Settings } from "../common/Settings";

export function TrainerRoutes({ page, setPage, user }) {
  if (page === "Dashboard") return <TrainerDashboard setPage={setPage} />;
  if (page === "Courses") return <Courses setPage={setPage} />;
  if (page === "Create Course") return <CourseForm setPage={setPage} />;
  if (page === "Trainees") return <Trainees setPage={setPage} />;
  if (page === "Assessments") return <Assessments setPage={setPage} />;
  if (page === "Performance") return <Performance setPage={setPage} />;
  if (page === "Resources") return <Resources setPage={setPage} />;
  if (page === "Notifications") return <Notifications setPage={setPage} onBack={() => setPage("Dashboard")} />;
  if (page === "Settings") return <Settings onBack={() => setPage("Dashboard")} />;

  return (
    <GenericPage
      page={page}
      title={page}
      text="Manage the learning experience for your trainees from this workspace."
    />
  );
}
