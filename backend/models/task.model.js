import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
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

  cropName: String,
  areaId: String,
  fieldId: String,

  title: String,
  taskType: String, // watering, fertilizer, etc
  stage: String,

  dueDate: Date,
  status: {
    type: String,
    enum: ["pending", "done", "skipped"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
