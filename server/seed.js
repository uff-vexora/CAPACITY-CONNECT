import "dotenv/config";
import { connectDatabase } from "./config/db.js";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Assessment from "./models/Assessment.js";
import Question from "./models/Question.js";

const seedTrainerPassword = process.env.SEED_TRAINER_PASSWORD;
if (!seedTrainerPassword) throw new Error("SEED_TRAINER_PASSWORD is required to create demo data");

await connectDatabase();
const trainerEmail = "trainer@capacityconnect.demo";
let trainer = await User.findOne({ email: trainerEmail });
if (!trainer) trainer = await User.create({ name: "Anita Verma", email: trainerEmail, password: seedTrainerPassword, role: "trainer", department: "Learning", designation: "Senior Trainer" });
if (!(await Course.countDocuments())) await Course.insertMany([
  { title: "Leadership Essentials", description: "Build decision-making, feedback, and team coordination habits.", skill: "Leadership", requiredScore: 80, level: "Foundation", duration: "4 weeks", trainer: trainer._id, modules: [{ title: "Understanding your leadership style", duration: "35 min" }, { title: "Making decisions with your team", duration: "35 min" }, { title: "Giving clear, useful feedback", duration: "35 min" }, { title: "Leading through change", duration: "35 min" }] },
  { title: "Communication at Work", description: "Practice clear, productive workplace communication.", skill: "Communication", requiredScore: 75, level: "Intermediate", duration: "3 weeks", trainer: trainer._id, modules: [{ title: "Clarity in communication", duration: "30 min" }, { title: "Handling conflict", duration: "30 min" }] },
  { title: "Database Fundamentals", description: "Build foundational database understanding and decision skills.", skill: "Database", requiredScore: 80, level: "Foundation", duration: "3 weeks", trainer: trainer._id, modules: [{ title: "Data structures", duration: "30 min" }, { title: "Query fundamentals", duration: "30 min" }] }
]);
let assessment = await Assessment.findOne({ title: "Role Competency Evaluation" });
if (!assessment) { assessment = await Assessment.create({ title: "Role Competency Evaluation", requiredScore: 80, trainer: trainer._id }); await Question.insertMany([
  { assessment: assessment._id, skill: "Leadership", question: "When a project milestone is at risk due to competing cross-team priorities, what is your primary course of action?", options: ["Escalate without consulting leads.", "Convene leads, realign dependencies and negotiate deliverables.", "Absorb the work alone.", "Defer tasks without notifying stakeholders."], correctAnswer: 1 },
  { assessment: assessment._id, skill: "Communication", question: "How do you address conflicting technical opinions during an architecture review?", options: ["Evaluate options against explicit criteria.", "Choose the highest-ranking person's idea.", "Wait indefinitely for consensus.", "Implement every proposal."], correctAnswer: 0 },
  { assessment: assessment._id, skill: "Database", question: "What is a sound first step when a data query becomes slow?", options: ["Delete the database.", "Inspect query execution and indexing.", "Disable monitoring.", "Ignore the alert."], correctAnswer: 1 },
  { assessment: assessment._id, skill: "Leadership", question: "What makes feedback most useful?", options: ["It is vague and delayed.", "It is specific, timely, and actionable.", "It is given only annually.", "It focuses on personality."], correctAnswer: 1 }
]); }
console.log("Demo data ready.");
process.exit(0);
