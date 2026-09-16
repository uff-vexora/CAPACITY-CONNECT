const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://capacity-connect-1-qmzj.onrender.com/api"
).replace(/\/$/, "");

async function request(path, options = {}) {
  const token = localStorage.getItem("capacity_token");
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Unable to reach Capacity Connect. Please check your connection and try again.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const body = response.status === 204 ? null : isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(body?.message || `Request failed (${response.status}). Please try again.`);
  }

  if (response.status !== 204 && !isJson) {
    throw new Error("The server returned an unexpected response. Please try again.");
  }
  return body;
}
export const api = {
  signup: (data) => request("/auth/signup", { method: "POST", body: JSON.stringify(data) }), login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }), me: () => request("/auth/me"), updateMe: (data) => request("/auth/me", { method: "PUT", body: JSON.stringify(data) }), assessments: () => request("/assessments"), assessment: (id) => request(`/assessments/${id}`), submitAssessment: (id, data) => request(`/assessments/${id}/submit`, { method: "POST", body: JSON.stringify(data) }), latestResult: () => request("/assessments/results/latest"), recommendations: () => request("/recommendations"), courses: () => request("/courses"), myCourses: () => request("/courses/mine"), enroll: (id) => request(`/courses/${id}/enroll`, { method: "POST" }), markModuleComplete: (id, moduleIndex) => request(`/courses/${id}/progress`, { method: "PATCH", body: JSON.stringify({ moduleIndex }) }), createCourse: (data) => request("/courses", { method: "POST", body: JSON.stringify(data) }), analytics: () => request("/admin/analytics"), users: () => request("/admin/users")
};
