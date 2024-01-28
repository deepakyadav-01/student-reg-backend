import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../model/User.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) throw createHttpError(404, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createHttpError(401, "Invalid credentials");

    const token = createToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
