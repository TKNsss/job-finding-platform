import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "decline", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      // model that we referencing
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);
// receive createdAt and updatedAt by default when using timestamps

export default mongoose.model("Job", JobSchema);