import { useState } from "react";
import { AppIcon as Icon } from "./AppIcon";
import { Brand } from "./Brand";
import { adminNav, traineeNav, trainerNav } from "../data/navigation";

export function AppShell({
  role,
  page,
  setPage,
  sidebar,
  setSidebar,
  user,
  onLogout,
  children,
}) {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("capacity_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("capacity_sidebar_collapsed", String(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const nav =
    role === "Trainee"
      ? traineeNav
      : role === "Trainer"
        ? trainerNav
        : adminNav;

  return (
    <div className="app-shell">
      <aside className={`${sidebar ? "open" : ""} ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <Brand />
          <button
            className="sidebar-toggle-btn"
            onClick={toggleCollapsed}
            title={collapsed ? "Expand sidebar" : "Minimize sidebar"}
            type="button"
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        </div>

        <div className="role-tag">{role.toUpperCase()} WORKSPACE</div>

        <nav>
          {nav.map(([icon, name]) => (
            <button
              key={name}
              className={page === name ? "active" : ""}
              title={name}
              onClick={() => {
                setPage(name);
                setSidebar(false);
              }}
            >
              <Icon name={icon} />
              <span className="nav-label">{name}</span>
            </button>
          ))}
        </nav>

        <div className="side-bottom">
          <button onClick={onLogout} title="Exit workspace">
            <Icon name="LogOut" />
            <span className="nav-label">Exit workspace</span>
          </button>
          <div className="person" title={user?.name || "Trainee"}>
            <span>{user?.name?.split(" ").map((part) => part[0]).join("").slice(0, 2) || "CC"}</span>
            <div>
              <b>{user?.name}</b>
              <small>{user?.designation || role}</small>
            </div>
            <Icon name="ChevronsUpDown" size={15} />
          </div>
        </div>
      </aside>

      <div className="page-area">
        <header className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="mobile-menu" onClick={() => setSidebar(!sidebar)} title="Toggle menu">
              <Icon name="Menu" />
            </button>
            <button
              className="desktop-sidebar-toggle"
              onClick={toggleCollapsed}
              title={collapsed ? "Expand sidebar" : "Minimize sidebar"}
              type="button"
            >
              <Icon name={collapsed ? "PanelLeftOpen" : "PanelLeftClose"} size={18} />
            </button>
            <div className="crumb">
              <span>{role}</span>
              <b>/</b>
              <strong>{page}</strong>
            </div>
          </div>

          <div className="top-actions">
            <button className="icon-button" title="Search">
              <Icon name="Search" />
            </button>
            <button className="icon-button notice" title="Notifications">
              <Icon name="Bell" />
            </button>
            <div className="avatar" title={user?.name}>
              {user?.name?.split(" ").map((part) => part[0]).join("").slice(0, 2) || "CC"}
            </div>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}
