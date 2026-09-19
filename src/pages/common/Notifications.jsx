import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { loadNotifications, saveNotifications } from "../../data/notifications";

export function Notifications({ setPage, onBack, role = "Trainee" }) {
  const [notifications, setNotifications] = useState(() => loadNotifications(role));
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const handleToggleRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n));
      saveNotifications(updated, role);
      return updated;
    });
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      saveNotifications(updated, role);
      return updated;
    });
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveNotifications(updated, role);
      return updated;
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all notifications?")) {
      setNotifications([]);
      saveNotifications([], role);
    }
  };

  const handleActionClick = (e, targetPage) => {
    e.stopPropagation();
    if (targetPage && setPage) {
      setPage(targetPage);
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case "course":
        return { bg: "#dae2d3", color: "var(--green)" };
      case "milestone":
        return { bg: "#f7eadc", color: "var(--orange)" };
      case "certificate":
        return { bg: "#fae7e1", color: "var(--rust)" };
      case "assessment":
        return { bg: "#e2e9dd", color: "#3a6042" };
      default:
        return { bg: "#eeeee6", color: "var(--ink)" };
    }
  };

  return (
    <>
      {onBack && (
        <button className="back-link" onClick={onBack}>
          <Icon name="ArrowLeft" size={15} /> Back
        </button>
      )}

      <PageHead kicker="ACTIVITY & ALERTS" title="Notifications">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {unreadCount > 0 && (
            <button className="button dark" onClick={handleMarkAllRead} style={{ fontSize: 13, gap: 6 }}>
              <Icon name="CheckCheck" size={16} /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="button outline" onClick={handleClearAll} style={{ fontSize: 13, gap: 6 }}>
              <Icon name="Trash2" size={15} /> Clear all
            </button>
          )}
        </div>
      </PageHead>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          className={`button ${filter === "all" ? "dark" : "outline"}`}
          onClick={() => setFilter("all")}
        >
          All ({notifications.length})
        </button>
        <button
          className={`button ${filter === "unread" ? "dark" : "outline"}`}
          onClick={() => setFilter("unread")}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {filtered.length > 0 ? (
        <div style={{ display: "grid", gap: 12, maxWidth: 840 }}>
          {filtered.map((n) => {
            const style = getTypeStyle(n.type);
            return (
              <article
                key={n.id}
                onClick={() => handleToggleRead(n.id)}
                style={{
                  background: n.read ? "var(--paper)" : "#fcfbf7",
                  border: "1px solid var(--line)",
                  borderLeft: n.read ? "1px solid var(--line)" : "4px solid var(--orange)",
                  padding: "18px 20px",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  cursor: "pointer",
                  transition: "background .15s",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: style.bg,
                    color: style.color,
                    display: "grid",
                    placeItems: "center",
                    flex: "none",
                  }}
                >
                  <Icon name={n.icon || "Bell"} size={19} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: n.read ? 500 : 600 }}>
                      {n.title}
                    </h3>
                    {!n.read && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--orange)",
                          display: "inline-block",
                        }}
                        title="Unread"
                      />
                    )}
                    <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }}>
                      {n.time}
                    </span>
                  </div>

                  <p style={{ color: "var(--muted)", fontSize: 13, margin: "4px 0 10px", lineHeight: 1.5 }}>
                    {n.description}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {n.targetPage ? (
                      <button
                        className="text-button"
                        onClick={(e) => handleActionClick(e, n.targetPage)}
                        style={{ fontSize: 12 }}
                      >
                        View {n.targetPage} →
                      </button>
                    ) : (
                      <span />
                    )}

                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>
                        {n.read ? "Click to mark unread" : "Click to mark read"}
                      </span>
                      <button
                        onClick={(e) => handleDelete(e, n.id)}
                        title="Dismiss notification"
                        style={{ color: "var(--muted)", padding: 4, cursor: "pointer" }}
                      >
                        <Icon name="X" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-courses" style={{ maxWidth: 840 }}>
          <div style={{ marginBottom: 12 }}>
            <Icon name="BellOff" size={32} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", margin: "0 0 6px" }}>
            {filter === "unread" ? "No unread notifications" : "No notifications yet"}
          </p>
          <small style={{ color: "var(--muted)" }}>
            You're completely up to date with your coursework and assessments!
          </small>
        </div>
      )}
    </>
  );
}
