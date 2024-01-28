import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../model/User.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userData.userId).select("-password");
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const { username, password, role } = req.body;
  const adminId = req.userData.userId; // Extract adminId from req.userData.userId

  try {
    if (role !== "ADMIN" && role !== "USER") {
      throw createHttpError(400, "Bad Request, role can be ADMIN or USER");
    }
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      throw createHttpError(400, "User already exists");
    }

    // Create new user with adminId
    user = new User({ username, password, role, adminId });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  const adminId = req.userData.userId;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const sortField = req.query.sortField || "createdAt"; // Default to createdAt
  const sortOrder = req.query.sortOrder || "desc"; // Default to descending order

  try {
    const sortOptions = {};
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

    const usersQuery = User.find({ adminId })
      .select("-password")
      .sort(sortOptions);

    const totalUsers = await User.countDocuments({ adminId });
    const totalPages = Math.ceil(totalUsers / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    if (limit !== -1) {
      usersQuery.limit(limit).skip(offset);
    }

    const users = await usersQuery.exec();

    res.status(200).json({
      users,
      totalUsers,
      totalPages,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
};

export const createFirstUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne();
    if (!existingUser) {
      const username = "admin"; // You can change this username
      const password = "admin123"; // You can change this password

      // Create new user with role ADMIN
      const user = new User({ username, password, role: "ADMIN" });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await User.deleteMany({}); // Clean existing table

      await user.save();
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(201).json({ message: "User already exists" });
    }
  } catch (error) {
    next(error);
  }
};
