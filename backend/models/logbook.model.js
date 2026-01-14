import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true},
  taskOccurrenceId: String,
  cropInstanceId: String,
  action: String,      // completed / skipped / snoozed
  timestamp: Date,
  quantity: Number,
  unit: String,
  notes: String,
  photos: [String],    // store photo URLs or IDs
}, { timestamps: true });

export default mongoose.model("Log", LogSchema);
