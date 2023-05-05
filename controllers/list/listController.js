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
    const lits = await List.find();
    return res.status(200).json(lits);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getMoviesOfList = async (req, res) => {
  try {
    const slug = req.params.slug;
    const list = await List.findOne({ title: slug });
    if (!list) {
      return res.status(404).json("list not found");
    } else {
      const content = list.content; //lay danh sach id cac bo phim
      const movies = await Movie.find({ _id: { $in: content } });
      return res.status(200).json(movies);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { createListMovie, getAllList, getMoviesOfList };
