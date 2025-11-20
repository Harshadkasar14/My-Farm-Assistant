import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameTa: { type: String },
  category: { type: String, required: true },
  daysToMaturity: { type: Number, default: null },
  defaultCareTemplateId: { type: String, default: null },
  description: { type: String, default: "User-created crop" }
}, { timestamps: true });

export default mongoose.model("Crop", CropSchema);
