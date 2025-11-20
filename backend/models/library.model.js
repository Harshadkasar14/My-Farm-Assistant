const LibraryCropSchema = new mongoose.Schema({
  nameEn: String,
  nameTa: String,
  category: String,
  daysToMaturity: Number,
  spacingReference: String,
  typicalPests: String,
  typicalNutrients: String,
  stageDefinitions: [
    {
      stageNameEn: String,
      stageNameTa: String,
      minDays: Number,
      maxDays: Number
    }
  ],
  defaultCareTemplateId: String
}, { timestamps: true });

export default mongoose.model("LibraryCrop", LibraryCropSchema);
