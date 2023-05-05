import express from "express";
import {
  createListMovie,
  getAllList,
  getMoviesOfList,
} from "../controllers/list/listController.js";

const router = express.Router();

router.post("/create", createListMovie);

router.get("/get-all", getAllList);

router.get("/movies/:slug", getMoviesOfList);

export default router;
