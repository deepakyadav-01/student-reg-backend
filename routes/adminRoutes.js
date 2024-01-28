import express from "express";
import {
  getProfile,
  createUser,
  getAllUsers,
  createFirstUser, // Import the createFirstUser function
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// Admin profile route
adminRouter.get("/profile", getProfile);

// Admin create user route
adminRouter.post("/create-user", createUser);

// Admin get all users route
adminRouter.get("/users", getAllUsers);

// Route to create the first user
adminRouter.post("/create-first-user", createFirstUser);

export default adminRouter;
