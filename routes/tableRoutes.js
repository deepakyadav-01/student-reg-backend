import express from "express";
import { deleteStudent } from "../controllers/table-controllers/deleteStudent.js";
import { editStudent } from "../controllers/table-controllers/editStudent.js";
import {
  getAllStudent,
  getSingleStudent,
} from "../controllers/table-controllers/allStudent.js";
const tableRouter = express.Router();

tableRouter.patch("/students/edit/:studentId", editStudent);
tableRouter.get("/students/:studentId", getSingleStudent);
tableRouter.get("/students", getAllStudent);
// Delete an student
tableRouter.delete("/students/:studentId", deleteStudent);

export default tableRouter;
