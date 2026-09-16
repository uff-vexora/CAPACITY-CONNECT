import express from "express";
import Assessment from "../models/Assessment.js";
import Question from "../models/Question.js";
import Result from "../models/Result.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();
router.get("/", protect, async (req, res, next) => { try { res.json({ assessments: await Assessment.find() }); } catch (e) { next(e); } });
router.post("/", protect, authorize("trainer", "admin"), async (req, res, next) => { try { const assessment = await Assessment.create({ ...req.body, trainer: req.user._id }); res.status(201).json({ assessment }); } catch (e) { next(e); } });
router.post("/:id/questions", protect, authorize("trainer", "admin"), async (req, res, next) => { try { const question = await Question.create({ ...req.body, assessment: req.params.id }); res.status(201).json({ question }); } catch (e) { next(e); } });
router.get("/:id", protect, async (req, res, next) => { try { const assessment = await Assessment.findById(req.params.id); if (!assessment) return res.status(404).json({ message: "Assessment not found" }); const questions = await Question.find({ assessment: assessment._id }).select("question options skill"); res.json({ assessment, questions }); } catch (e) { next(e); } });
router.post("/:id/submit", protect, authorize("trainee"), async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id); const questions = await Question.find({ assessment: req.params.id });
    if (!assessment || !questions.length) return res.status(404).json({ message: "Assessment has no questions" });
    const submitted = new Map((req.body.answers || []).map((item) => [String(item.questionId), Number(item.answer)]));
    const scores = {};
    questions.forEach((question) => { const item = scores[question.skill] || { correct: 0, total: 0 }; item.total += 1; if (submitted.get(String(question._id)) === question.correctAnswer) item.correct += 1; scores[question.skill] = item; });
    const skillScores = Object.entries(scores).map(([skill, value]) => { const score = Math.round((value.correct / value.total) * 100); return { skill, score, requiredScore: assessment.requiredScore, gap: Math.max(0, assessment.requiredScore - score) }; });
    const score = Math.round((questions.filter((q) => submitted.get(String(q._id)) === q.correctAnswer).length / questions.length) * 100);
    const result = await Result.create({ trainee: req.user._id, assessment: assessment._id, score, skillScores, isFinal: Boolean(req.body.isFinal), answers: questions.map((q) => ({ question: q._id, answer: submitted.get(String(q._id)) })) });
    res.status(201).json({ result });
  } catch (e) { next(e); }
});
router.get("/results/latest", protect, authorize("trainee"), async (req, res, next) => { try { const result = await Result.findOne({ trainee: req.user._id }).sort({ createdAt: -1 }); res.json({ result }); } catch (e) { next(e); } });
export default router;
