import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({ trainee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, assessment: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true }, score: Number, skillScores: [{ skill: String, score: Number, requiredScore: Number, gap: Number }], answers: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }, answer: Number }], isFinal: { type: Boolean, default: false } }, { timestamps: true });
export default mongoose.model("Result", resultSchema);
