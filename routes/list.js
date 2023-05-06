import express from "express";
import {
  addMovieToList,
  createListMovie,
  getAllList,
  getMoviesOfList,
} from "../controllers/list/listController.js";

const router = express.Router();

//POST

router.post("/create", createListMovie);
router.post("/:listId/add", addMovieToList);

//GET

router.get("/get-all", getAllList);

router.get("/movies/:slug", getMoviesOfList);

export default router;
