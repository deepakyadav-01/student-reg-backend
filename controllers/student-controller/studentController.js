import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authStudent from "../../model/authStudent.js";
import dotenv from "dotenv";
dotenv.config();
// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Controller for registering a new student
export const registerStudent = async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  try {
    const studentAvailable = await authStudent.findOne({ email });
    if (studentAvailable) {
      res.status(400).json({ error: "User already registered" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password", hashedPassword);

    const student = await authStudent.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`Student created ${student}`);

    // Generate and send JWT token upon successful registration
    const token = generateToken(student._id);
    res.status(201).json({
      _id: student.id,
      email: student.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for logging in a student
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await authStudent.findOne({ email });

    if (student && (await bcrypt.compare(password, student.password))) {
      // Generate and send JWT token upon successful login
      const token = generateToken(student._id);
      res.json({
        _id: student.id,
        email: student.email,
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const currentStudent = async (req, res) => {

  res.json({
    _id: req.user._id,
    email: req.user.email,
  });
};
