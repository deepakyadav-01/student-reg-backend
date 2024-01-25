// libs/utils/helpers/authHelpers.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authStudent from "../model/authStudent.js";
import dotenv from "dotenv";
dotenv.config();

// Function to generate JWT token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Function to hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Function to check if a student with the given email already exists
export const isStudentRegistered = async (email) => {
  return await authStudent.findOne({ email });
};

