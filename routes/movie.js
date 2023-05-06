import {
  createEpisode,
  getAllEpisode,
} from "../controllers/movies/episodeController.js";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  getMovieIsSeries,
  randomMovies,
} from "../controllers/movies/movieController.js";
import express from "express";

const router = express.Router();

//POST

router.post("/create", createMovie);
router.post("/episode/:movieId/create", createEpisode);

//GET
router.get("/random", randomMovies);
router.get("/get-all", getAllMovies);
router.get("/series", getMovieIsSeries);
router.get("/episode/:movieId/get-all", getAllEpisode);
router.get("/:id", getMovieById);

export default router;
