import { useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";
import { AdminRoutes } from "./admin/AdminRoutes";
import { PublicRoutes } from "./public/PublicRoutes";
import { TraineeRoutes } from "./trainee/TraineeRoutes";
import { TrainerRoutes } from "./trainer/TrainerRoutes";
import "../styles.css";
import { api } from "../api";

export default function Application() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("Trainee");
  const [page, setPage] = useState("Landing");
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => { if (localStorage.getItem("capacity_token")) api.me().then(({ user: currentUser }) => { setUser(currentUser); setRole(currentUser.role[0].toUpperCase() + currentUser.role.slice(1)); setPage("Dashboard"); }).catch(() => localStorage.removeItem("capacity_token")); }, []);
  const completeAuth = ({ token, user: currentUser }) => { localStorage.setItem("capacity_token", token); setUser(currentUser); setRole(currentUser.role[0].toUpperCase() + currentUser.role.slice(1)); setPage("Dashboard"); };
  const logout = () => { localStorage.removeItem("capacity_token"); setUser(null); setPage("Landing"); };
  if (!user || ["Landing", "Login", "Signup", "Role Selection"].includes(page)) return <PublicRoutes page={page} role={role} setPage={setPage} setRole={setRole} onAuthenticated={completeAuth} />;
  return <AppShell role={role} page={page} setPage={setPage} sidebar={sidebar} setSidebar={setSidebar} user={user} onLogout={logout}><Workspace role={role} page={page} setPage={setPage} user={user} setUser={setUser} /></AppShell>;
}

function Workspace({ role, page, setPage, user, setUser }) {
  if (role === "Trainee") return <TraineeRoutes page={page} setPage={setPage} user={user} setUser={setUser} />;
  if (role === "Trainer") return <TrainerRoutes page={page} setPage={setPage} user={user} />;
  return <AdminRoutes page={page} />;
}
