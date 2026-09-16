import mongoose from "mongoose";
const progressSchema = new mongoose.Schema({ trainee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, completedModules: [{ type: Number }], percent: { type: Number, default: 0 } }, { timestamps: true });
progressSchema.index({ trainee: 1, course: 1 }, { unique: true });
export default mongoose.model("Progress", progressSchema);
