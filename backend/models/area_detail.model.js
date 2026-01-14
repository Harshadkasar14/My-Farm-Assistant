import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: "User",required: true,index: true},
  fieldId: { type: Schema.Types.ObjectId, ref: 'Field', required: true },
  name: { type: String, required: true },
  typeId: String,
  size: Number,
  sizeUnit: { type: String, default: 'm2' },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

 export default mongoose.model('Area', AreaSchema);