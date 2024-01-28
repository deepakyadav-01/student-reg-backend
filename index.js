import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";
import errorHandler from "./middleware/error.js";
import connectDB from "./db.js";
import routes from "./routes/index.js";
import morgan from "morgan";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Morgan middleware with 'dev' format
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/v1", routes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
