import express from 'express';
import dotenv from "dotenv";
import connectDB from "./db.js"
import formRouter from "./routes/formRoutes.js"
import tableRouter from './routes/tableRoutes.js';
import studentRouter from './routes/studentRoutes.js'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1",formRouter);
app.use("/api/v2",tableRouter);
app.use("/api/v3",studentRouter)
connectDB();


// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// port
const port=process.env.PORT||5000;


app.listen(port,(req,res)=>{
    console.log(`server started on ${port}`)
})
