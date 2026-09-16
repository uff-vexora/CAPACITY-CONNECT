import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role, department: user.department, designation: user.designation, skills: user.skills, experience: user.experience, qualifications: user.qualifications, interests: user.interests });
const tokenFor = (user) => {
  if (!process.env.JWT_SECRET) throw new Error("Server authentication is not configured");
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password, role = "trainee", department, designation } = req.body;
    if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: "Name, email and a password of at least 6 characters are required" });
    if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: "An account with this email already exists" });
    const user = await User.create({ name, email, password, role, department, designation });
    res.status(201).json({ token: tokenFor(user), user: safeUser(user) });
  } catch (error) { next(error); }
});
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase() }).select("+password");
    if (!user || !(await user.matchesPassword(req.body.password || ""))) return res.status(401).json({ message: "Invalid email or password" });
    res.json({ token: tokenFor(user), user: safeUser(user) });
  } catch (error) { next(error); }
});
router.get("/me", protect, (req, res) => res.json({ user: safeUser(req.user) }));
router.put("/me", protect, async (req, res, next) => {
  try { const allowed = ["name", "department", "designation", "skills", "experience", "qualifications", "interests"]; allowed.forEach((key) => { if (key in req.body) req.user[key] = req.body[key]; }); await req.user.save(); res.json({ user: safeUser(req.user) }); } catch (error) { next(error); }
});
export default router;
