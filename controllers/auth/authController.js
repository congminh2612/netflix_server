import User from "../../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "./jwtService.js";
import clientRedis from "../../db/connectRedis.js";

const register = async (req, res) => {
  const userCheckEmail = await User.findOne({
    email: req.body.email,
  });
  if (userCheckEmail) {
    return res.status(401).json("Email đã tồn tại trong hệ thống");
  }
  const userCheckName = await User.findOne({
    username: req.body.username,
  });
  if (!userCheckEmail && userCheckName) {
    return res.status(401).json("Tên này đã được sử dụng");
  }
  if (!userCheckName && !userCheckEmail) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    try {
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json("Wrong password or email");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong password or email");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    await clientRedis.set(user._id.toString(), refreshToken);

    const { password, ...info } = user._doc;
    return res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  res.clearCookie("refreshToken");
  await clientRedis.del(token);
  return res.status(201).json("logout!");
};

const reqRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json("you are not authenticated");
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY,
    async (err, user) => {
      if (err) {
        console.log(err);
      } else {
        const refreshTokenRedis = await clientRedis.get(user._id);

        if (!refreshTokenRedis || refreshTokenRedis !== refreshToken) {
          return res.status(401).json("refresh token is not valid");
        } else {
          await clientRedis.del(user._id);

          const newAccessToken = generateAccessToken(user);
          const newRefreshToken = generateRefreshToken(user);

          await clientRedis.set(user._id, newRefreshToken);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });

          res.status(201).json({ newAccessToken, newRefreshToken });
        }
      }
    }
  );
};

export { reqRefreshToken, register, login, logout };
