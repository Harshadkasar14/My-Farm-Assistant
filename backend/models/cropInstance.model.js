import mongoose from "mongoose";

const cropInstanceSchema = new mongoose.Schema({
  areaId: { type: mongoose.Schema.Types.ObjectId, ref: "Area", required: true },
  name: String,
  custom: Boolean,
  libraryCropId: String,
  startDate: Date,
});

export default mongoose.model("CropInstance", cropInstanceSchema);
