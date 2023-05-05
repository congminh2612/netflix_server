import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const getAllUser = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

const updateUser = () => {};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllUser, updateUser, deleteUser };
