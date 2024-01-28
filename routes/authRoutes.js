import express from "express";
import { login, signup } from "../controllers/authController.js";

const authRouter = express.Router();

// Route for user login
authRouter.post("/login", login);

// Route for user signup
authRouter.post("/signup", signup);

export default authRouter;
