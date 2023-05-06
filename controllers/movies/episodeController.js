import Episode from "../../models/Episode.js";
import Movie from "../../models/Movie.js";

const createEpisode = async (req, res) => {
  try {
    const { movieId } = req.params;
    const episodeData = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    } else {
      const newEpisode = new Episode({ ...episodeData, movie: movieId });
      const saveEpisode = await newEpisode.save();
      return res.status(201).json(saveEpisode);
    }
  } catch (error) {
    console.error("Error creating episode:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEpisode = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movies = await Episode.find({ movie: movieId });
    return res.status(201).json(movies);
  } catch (error) {
    return res.status(404).json("movie not found");
  }
};

export { createEpisode, getAllEpisode };
