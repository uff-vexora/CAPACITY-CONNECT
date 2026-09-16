import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({ assessment: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true }, question: { type: String, required: true }, options: [{ type: String }], correctAnswer: { type: Number, required: true }, skill: { type: String, required: true } });
export default mongoose.model("Question", questionSchema);
