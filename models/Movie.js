import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    thumbnailUrl: { type: String },
    trailer: { type: String },
    videoUrl: { type: String },
    year: { type: String },
    limit: { type: Number, default: 16 },
    genre: { type: String },
    isShown: { type: String, default: "2023" },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", MovieSchema);
