import mongoose from "mongoose";
const certificateSchema = new mongoose.Schema({ trainee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, score: Number, status: { type: String, default: "earned" }, completionDate: { type: Date, default: Date.now } }, { timestamps: true });
certificateSchema.index({ trainee: 1, course: 1 }, { unique: true });
export default mongoose.model("Certificate", certificateSchema);
