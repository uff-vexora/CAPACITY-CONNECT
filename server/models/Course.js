import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  skill: { type: String, required: true },
  requiredScore: { type: Number, default: 80 },
  level: { type: String, default: "Foundation" },
  duration: { type: String, default: "" },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  modules: [{ title: String, duration: String }],
  resources: [{ title: String, url: String }]
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
