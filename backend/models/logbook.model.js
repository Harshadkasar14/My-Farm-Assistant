const LogSchema = new mongoose.Schema({
  userId: String,
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
