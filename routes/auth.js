import express from "express";
import {
  register,
  login,
  reqRefreshToken,
  logout,
} from "../controllers/auth/authController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.post("/refresh", reqRefreshToken);

//LOGIN with GOOGLE

export default router;
