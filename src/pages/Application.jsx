import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { AdminRoutes } from "./admin/AdminRoutes";
import { PublicRoutes } from "./public/PublicRoutes";
import { TraineeRoutes } from "./trainee/TraineeRoutes";
import { TrainerRoutes } from "./trainer/TrainerRoutes";
import "../styles.css";

export default function Application() {
  const [role, setRole] = useState("Trainee");
  const [page, setPage] = useState("Landing");
  const [sidebar, setSidebar] = useState(false);
  if (["Landing", "Login", "Signup", "Role Selection"].includes(page)) return <PublicRoutes page={page} role={role} setPage={setPage} setRole={setRole} />;
  return <AppShell role={role} page={page} setPage={setPage} sidebar={sidebar} setSidebar={setSidebar}><Workspace role={role} page={page} setPage={setPage} /></AppShell>;
}

function Workspace({ role, page, setPage }) {
  if (role === "Trainee") return <TraineeRoutes page={page} setPage={setPage} />;
  if (role === "Trainer") return <TrainerRoutes page={page} setPage={setPage} />;
  return <AdminRoutes page={page} />;
}
