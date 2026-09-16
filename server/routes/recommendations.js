import express from "express";
import Course from "../models/Course.js";
import Result from "../models/Result.js";
import { protect, authorize } from "../middleware/auth.js";
const router = express.Router();
router.get("/", protect, authorize("trainee"), async (req, res, next) => { try { const result = await Result.findOne({ trainee: req.user._id }).sort({ createdAt: -1 }); if (!result) return res.json({ skillGaps: [], courses: [] }); const skillGaps = result.skillScores.filter((item) => item.gap > 0); const courses = await Course.find({ skill: { $in: skillGaps.map((item) => item.skill) } }).populate("trainer", "name"); res.json({ skillGaps, courses }); } catch (e) { next(e); } });
export default router;
