import express from "express";
import { submitForm } from "../controllers/form-controllers/addStudent.js";
import { updateForm } from "../controllers/form-controllers/updateStudent.js";
const formRouter = express.Router();
// Create a new form entry
formRouter.post("/students", submitForm);
formRouter.put("/students/update/:studentId", updateForm);

export default formRouter;
