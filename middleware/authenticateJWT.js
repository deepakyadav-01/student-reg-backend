import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

import authStudent from "../model/authStudent.js";
import User from "../model/User.js";

export const authenticateJWT = async (req, res, next) => {
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

export const authenticateRole = (role) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw createHttpError(401, "Token not found");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) throw createHttpError(404, "User not found");

    if (user.role !== role) throw createHttpError(403, "Access forbidden");

    req.userData = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
