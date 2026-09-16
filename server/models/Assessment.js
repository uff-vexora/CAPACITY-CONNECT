import mongoose from "mongoose";
const assessmentSchema = new mongoose.Schema({ title: { type: String, required: true }, requiredScore: { type: Number, default: 80 }, trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }, { timestamps: true });
export default mongoose.model("Assessment", assessmentSchema);
