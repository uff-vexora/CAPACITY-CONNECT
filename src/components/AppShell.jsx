import { AppIcon as Icon } from "./AppIcon";
import { Brand } from "./Brand";
import { adminNav, traineeNav, trainerNav } from "../data/navigation";

export function AppShell({
  role,
  page,
  setPage,
  sidebar,
  setSidebar,
  children,
}) {
  const nav =
    role === "Trainee"
      ? traineeNav
      : role === "Trainer"
        ? trainerNav
        : adminNav;
  return (
    <div className="app-shell">
      <aside className={sidebar ? "open" : ""}>
        <Brand />
        <div className="role-tag">{role.toUpperCase()} WORKSPACE</div>
        <nav>
          {nav.map(([icon, name]) => (
            <button
              key={name}
              className={page === name ? "active" : ""}
              onClick={() => {
                setPage(name);
                setSidebar(false);
              }}
            >
              <Icon name={icon} />
              {name}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <button onClick={() => setPage("Landing")}>
            <Icon name="LogOut" />
            Exit workspace
          </button>
          <div className="person">
            <span>RS</span>
            <div>
              <b>Rahul Sharma</b>
              <small>Operations Associate</small>
            </div>
            <Icon name="ChevronsUpDown" size={15} />
          </div>
        </div>
      </aside>
      <div className="page-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebar(!sidebar)}>
            <Icon name="Menu" />
          </button>
          <div className="crumb">
            <span>{role}</span>
            <b>/</b>
            <strong>{page}</strong>
          </div>
          <div className="top-actions">
            <button className="icon-button">
              <Icon name="Search" />
            </button>
            <button className="icon-button notice">
              <Icon name="Bell" />
            </button>
            <div className="avatar">RS</div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
