import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import assessmentRoutes from "./routes/assessments.js";
import recommendationRoutes from "./routes/recommendations.js";
import adminRoutes from "./routes/admin.js";

const requiredEnvironment = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];
const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]?.trim());

if (missingEnvironment.length) {
  console.error(`Missing required environment variable(s): ${missingEnvironment.join(", ")}`);
  process.exit(1);
}

const allowedOrigins = process.env.CLIENT_URL.split(",")
  .map((url) => url.trim().replace(/\/$/, ""))
  .filter(Boolean);

const app = express();
app.use(cors({
  origin(origin, callback) {
    // Requests without an Origin header include local tools such as curl and Render health checks.
    if (!origin || allowedOrigins.includes(origin.replace(/\/$/, "")) || origin === "http://localhost:5173") {
      return callback(null, true);
    }
    return callback(new Error("CORS origin is not allowed"));
  },
}));
app.use(express.json());
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", (req, res) => res.status(404).json({ message: "API route not found" }));
app.use((error, req, res, next) => {
  console.error(error.message);
  if (res.headersSent) return next(error);

  const status = error.status || (error.name === "ValidationError" || error.name === "CastError" ? 400 : 500);
  const message = status === 500 ? "Something went wrong" : error.message;
  res.status(status).json({ message });
});
connectDatabase().then(() => app.listen(process.env.PORT || 5000, () => console.log(`API listening on ${process.env.PORT || 5000}`))).catch((error) => { console.error(error.message); process.exit(1); });
