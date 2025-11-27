import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
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
  defaultCareTemplateId: String,
  description: { type: String, default: "User-created crop" }
}, { timestamps: true });

export default mongoose.model("Crop", CropSchema);
