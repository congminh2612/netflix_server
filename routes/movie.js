import express from "express";
import dotenv from "dotenv";
import { uploadFile } from "../controllers/movies/uploadMovie.js";

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
import verifyToken from "../middleware/verifyToken.js";

dotenv.config();

const router = express.Router();

//POST

router.post("/create", createMovie);
router.post("/episode/:movieId/create", verifyToken, createEpisode);

//upload file to google driver and take link driver to save db
router.post("/upload", uploadFile);

//GET
router.get("/random", randomMovies);
router.get("/get-all", getAllMovies);
router.get("/series", getMovieIsSeries);
router.get("/episode/:movieId/get-all", getAllEpisode);
router.get("/:id", getMovieById);

export default router;
