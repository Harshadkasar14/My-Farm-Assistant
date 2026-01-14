import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: "User",required: true,index: true}, 
  name: { type: String, required: true },
  size: Number,
  sizeUnit: { type: String, default: 'm2' },
  notes: String,
  createdAt: { type: Date, default: Date.now },

}, { timestamps: true });

export default mongoose.model("Field", FieldSchema);
