import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    duration: { type: String },
    thumbnailUrl: { type: String },
    videoUrl: { type: String },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  },
  { timestamps: true }
);

export default mongoose.model("Episode", EpisodeSchema);
