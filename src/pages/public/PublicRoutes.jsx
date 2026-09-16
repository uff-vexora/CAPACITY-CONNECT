import { Landing } from "./Landing";
import { Login } from "./Login";
import { RoleSelection } from "./RoleSelection";
import { Signup } from "./Signup";

export function PublicRoutes({ page, role, setPage, setRole, onAuthenticated }) {
  if (page === "Landing") return <Landing setPage={setPage} />;
  if (page === "Login") return <Login setPage={setPage} onAuthenticated={onAuthenticated} />;
  if (page === "Signup") return <Signup setPage={setPage} role={role} onAuthenticated={onAuthenticated} />;
  return <RoleSelection role={role} setPage={setPage} setRole={setRole} />;
}
