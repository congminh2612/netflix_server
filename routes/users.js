import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";
import { getAllUser, deleteUser } from "../controllers/user/userController.js";

const router = express.Router();

//GET ALL USER
router.get("/all_user", verifyToken, getAllUser);

//UPDATE

//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

//GET ALL

//GET USER STATS
export default router;
