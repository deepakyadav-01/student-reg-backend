import express from "express";
import { authenticateRole } from "../middleware/authenticateJWT.js";

import userRoutes from "./userRoutes.js";
import adminRoutes from "./adminRoutes.js";
import authRouter from "./authRoutes.js";

// TODO: remove these, you can create these under user routes/controller
import formRouter from "./formRoutes.js";
import studentRouter from "./studentRoutes.js";
import tableRouter from "./tableRoutes.js";

const router = express.Router();

router.use("/user", authenticateRole("USER"), userRoutes);
router.use("/admin", authenticateRole("ADMIN"), adminRoutes);
router.use("/auth", authRouter);

router.use("/form", formRouter);
router.use("/table", tableRouter);
router.use("/student", studentRouter);

export default router;
