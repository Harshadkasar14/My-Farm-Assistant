import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
  name: { type: String, required: true },
  size: Number,
  sizeUnit: { type: String, default: 'm2' },
  notes: String,
  userId: { type: String }, // simple user id string
  createdAt: { type: Date, default: Date.now },

}, { timestamps: true });

export default mongoose.model("Field", FieldSchema);
