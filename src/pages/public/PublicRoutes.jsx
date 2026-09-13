import { Landing } from "./Landing";
import { Login } from "./Login";
import { RoleSelection } from "./RoleSelection";
import { Signup } from "./Signup";

export function PublicRoutes({ page, role, setPage, setRole }) {
  if (page === "Landing") return <Landing setPage={setPage} />;
  if (page === "Login") return <Login setPage={setPage} />;
  if (page === "Signup") return <Signup setPage={setPage} />;
  return <RoleSelection role={role} setPage={setPage} setRole={setRole} />;
}
