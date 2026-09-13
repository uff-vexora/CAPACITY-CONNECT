import { GenericPage } from "../../components/GenericPage";
import { AdminDashboard } from "./AdminDashboard";
import { Competency } from "./Competency";
import { Reports } from "./Reports";
import { TrainingNeeds } from "./TrainingNeeds";
import { Users } from "./Users";

export function AdminRoutes({ page }) {
  if (page === "Dashboard") return <AdminDashboard />;
  if (page === "Users") return <Users />;
  if (page === "Competency") return <Competency />;
  if (page === "Training Needs") return <TrainingNeeds />;
  if (page === "Reports") return <Reports />;
  return <GenericPage page={page} title={page} text="Manage organization-wide learning activity and capacity planning." />;
}
