import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { Brand } from "../../components/Brand";
import { api } from "../../api";

export function AuthForm({ page, setPage, role = "Trainee", onAuthenticated }) {
  const isLogin = page === "Login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = isLogin ? await api.login({ email, password }) : await api.signup({ name, email, password, role: role.toLowerCase() });
      onAuthenticated(result);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="auth">
      <div className="brand" onClick={() => setPage("Landing")} style={{ cursor: "pointer" }}>
        <Brand />
      </div>
      <button className="back text-button" onClick={() => setPage("Landing")}>
        <Icon name="ArrowLeft" size={16} /> Back to home
      </button>

      <div className="auth-card">
        <p className="eyebrow">CAPACITY CONNECT ACCESS</p>
        <h1>{isLogin ? "Welcome back" : "Create account"}</h1>
        <p>
          {isLogin
            ? "Enter your credentials to access your organization's learning workspace."
            : "Get started with automated competency assessments and role pathways."}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Full Name
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}

          <label>
            Work Email Address
            <input
              type="email"
              required
              placeholder="alex@organization.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="button dark wide" style={{ marginTop: 24 }}>
            {loading ? "Please wait…" : isLogin ? "Sign In" : "Create Account"} <Icon name="ArrowRight" size={16} />
          </button>
          {error && <p style={{ color: "var(--rust)", fontSize: 13, marginTop: 14 }}>{error}</p>}
        </form>

        <div className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setPage(isLogin ? "Signup" : "Login")}>
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
