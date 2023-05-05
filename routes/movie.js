import {
  createMovie,
  getAllMovies,
  getMovieById,
  randomMovies,
} from "../controllers/movies/movieController.js";
import Movie from "../models/Movie.js";
import express from "express";

const router = express.Router();

//CREATE

router.post("/create", createMovie);

// RANDOM

router.get("/random", randomMovies);

// GET_ALL MOVIES

router.get("/get-all", getAllMovies);

//Get movie by id

router.get("/:id", getMovieById);

export default router;
