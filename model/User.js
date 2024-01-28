import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  loggedInCount: { type: Number, default: 0 }, // loggedInCount column
  lastLogin: { type: Date }, // lastLogin datetime column
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // adminId column
});

export default mongoose.model("User", userSchema);
