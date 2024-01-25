import express from "express";
import authenticateJWT from "../middleware/authenticateJWT.js";
import { registerStudent,loginStudent,currentStudent } from "../controllers/student-controller/studentController.js";
const studentRouter = express.Router();

studentRouter.post("/register",registerStudent);
studentRouter.post("/login",loginStudent)
studentRouter.get("/current",authenticateJWT,currentStudent)

export default studentRouter;