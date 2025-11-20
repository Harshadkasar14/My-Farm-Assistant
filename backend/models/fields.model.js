const FieldSchema = new mongoose.Schema({
  userId: String,
  name: String,
  size: Number,
  sizeUnit: String,
  notes: String,

  areas: [
    {
      name: String,
      type: String,     // bed, grove, row...
      size: Number,
      sizeUnit: String,
      notes: String,
    }
  ]
}, { timestamps: true });

export default mongoose.model("Field", FieldSchema);
