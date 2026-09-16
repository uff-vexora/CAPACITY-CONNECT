import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["trainee", "trainer", "admin"], default: "trainee" },
  department: { type: String, default: "" },
  designation: { type: String, default: "" },
  skills: [{ name: String, current: { type: Number, default: 0 }, target: { type: Number, default: 80 } }],
  experience: { type: String, default: "" },
  qualifications: { type: String, default: "" },
  interests: { type: String, default: "" },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
}, { timestamps: true });

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchesPassword = function matchesPassword(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
