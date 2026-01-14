import mongoose from "mongoose";

const TaskOccurrenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  cropInstanceId: {
    type: mongoose.Schema.Types.ObjectId,   // ✅ FIX
    ref: "CropInstance",
    required: true
  },

  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskTemplate",
    required: true
  },

  dueDate: Date,
  scheduledDate: Date,
  status: {
    type: String,
    enum: ["planned", "due", "overdue", "completed"],
    default: "planned"
  },

  snoozeUntil: Date,
  lastCompletedAt: Date
}, { timestamps: true });

export default mongoose.model("TaskOccurrence", TaskOccurrenceSchema);
