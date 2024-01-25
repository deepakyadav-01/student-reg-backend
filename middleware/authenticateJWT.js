import jwt from "jsonwebtoken";
import authStudent from "../model/authStudent.js";
import dotenv from "dotenv"; // Load environment variables from .env file
dotenv.config();
const authenticateJWT = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await authStudent.findById(decoded.userId);

    if (!student) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    // Attach the authenticated user to the request object
    req.user = {
      _id: student._id,
      email: student.email,
    };

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid Token" });
  }
};

export default authenticateJWT;
