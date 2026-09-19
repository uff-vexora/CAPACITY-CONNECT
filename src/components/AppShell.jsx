import { useState, useEffect } from "react";
import { AppIcon as Icon } from "./AppIcon";
import { Brand } from "./Brand";
import { SearchModal } from "./SearchModal";
import { adminNav, traineeNav, trainerNav } from "../data/navigation";
import { loadNotifications } from "../data/notifications";

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

  const [unreadCount, setUnreadCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const notifs = loadNotifications();
    setUnreadCount(notifs.filter((n) => !n.read).length);
  }, [page]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const userInitials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AM";

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
          {nav.map(([icon, name]) => {
            const isNotif = name === "Notifications";
            return (
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
                {isNotif && unreadCount > 0 && (
                  <span className="nav-badge">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="side-bottom">
          <button onClick={onLogout} title="Exit workspace">
            <Icon name="LogOut" />
            <span className="nav-label">Exit workspace</span>
          </button>
          <div
            className="person"
            title="View profile"
            onClick={() => setPage("My Profile")}
            style={{ cursor: "pointer" }}
          >
            <span>{userInitials}</span>
            <div>
              <b>{user?.name || "Alex Morgan"}</b>
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
            <button
              className="icon-button"
              title="Search (Ctrl+K)"
              onClick={() => setIsSearchOpen(true)}
            >
              <Icon name="Search" />
            </button>
            <button
              className={`icon-button ${unreadCount > 0 ? "notice" : ""}`}
              title={`Notifications (${unreadCount} unread)`}
              onClick={() => setPage("Notifications")}
              style={{ position: "relative" }}
            >
              <Icon name="Bell" />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--rust)",
                  }}
                />
              )}
            </button>
            <div
              className="avatar"
              title="View profile"
              onClick={() => setPage("My Profile")}
              style={{ cursor: "pointer" }}
            >
              {userInitials}
            </div>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setPage={setPage}
      />
    </div>
  );
}
