import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../model/User.js";

const createToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    // Update loggedInCount and lastLogin
    user.loggedInCount += 1;
    user.lastLogin = new Date();
    await user.save();

    const token = createToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      throw createHttpError(400, "User already exists");
    }

    // Create new user
    user = new User({ username, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
