const PhotoSchema = new mongoose.Schema({
  ownerId: String,
  url: String,
  preset: String,
  width: Number,
  height: Number,
  sizeBytes: Number
}, { timestamps: true });

export default mongoose.model("Photo", PhotoSchema);
