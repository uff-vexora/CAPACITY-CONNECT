import { GenericPage } from "../../components/GenericPage";
import { Courses } from "./Courses";
import { CourseForm } from "./CreateCourse";
import { TrainerDashboard } from "./TrainerDashboard";

export function TrainerRoutes({ page, setPage }) {
  if (page === "Dashboard") return <TrainerDashboard setPage={setPage} />;
  if (page === "Create Course") return <CourseForm />;
  if (page === "Courses") return <Courses setPage={setPage} />;
  return <GenericPage page={page} title={page} text="Manage the learning experience for your trainees from this workspace." />;
}
