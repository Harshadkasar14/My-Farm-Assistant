const TaskTemplateSchema = new mongoose.Schema({
  name: String,
  icon: String,
  taskType: String,             // watering / fertilizer / harvest
  defaultUnit: String,
  intervalDays: Number,
  requiresQuantity: Boolean,
  recommendedQuantity: Number,
}, { timestamps: true });

export default mongoose.model("TaskTemplate", TaskTemplateSchema);
