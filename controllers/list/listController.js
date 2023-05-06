import List from "../../models/List.js";
import Movie from "../../models/Movie.js";

const createListMovie = async (req, res) => {
  const newList = new List(req.body);
  try {
    const list = await newList.save();
    return res.status(201).json(list);
  } catch (error) {
    return res.status(401).json(error);
  }
};

const getAllList = async (req, res) => {
  try {
    const lits = await List.find().populate("movies");
    return res.status(200).json(lits);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getMoviesOfList = async (req, res) => {
  const slug = req.params.slug;

  const list = await List.find({ title: slug }).populate("movies");
  if (!list) {
    return res.status(404).json("list not found");
  } else {
    return res.status(200).json(list);
  }
};

const addMovieToList = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json("list not found");
    } else {
      const movieId = req.body.movieId;

      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json("error");
      } else {
        list.movies.push(movie._id);
        await list.save();
        return res.status(201).json(list);
      }
    }
  } catch (error) {
    return res.status(500).json("error");
  }
};

export { createListMovie, getAllList, getMoviesOfList, addMovieToList };
