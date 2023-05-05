import Movie from "../../models/Movie.js";

//create-movie
const createMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

// random-movies

const randomMovies = async (req, res) => {
  const MovieCount = await Movie.count();
  const randomIndex = Math.floor(Math.random() * MovieCount);
  try {
    const randomMovie = await Movie.findOne().skip(randomIndex);

    return res.json(randomMovie);
  } catch (error) {
    return res.status(401).json(error);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(401).json("movie not found");
  }
};

export { createMovie, randomMovies, getAllMovies, getMovieById };
