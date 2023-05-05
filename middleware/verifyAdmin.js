import jwt from "jsonwebtoken";
import verifyToken from "./verifyToken.js";

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed to delete other");
    }
  });
};

export default verifyAdmin;
