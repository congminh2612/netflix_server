import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY,
    { expiresIn: "300s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "365d" }
  );
};

export { generateAccessToken, generateRefreshToken };
