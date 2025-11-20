const TaskOccurrenceSchema = new mongoose.Schema({
  userId: String,
  cropInstanceId: String,
  templateId: String,

  dueDate: Date,
  scheduledDate: Date,
  status: String,       // planned, due, overdue, completed
  snoozeUntil: Date,
  lastCompletedAt: Date,
}, { timestamps: true });

export default mongoose.model("TaskOccurrence", TaskOccurrenceSchema);
