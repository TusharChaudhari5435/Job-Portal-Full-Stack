import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/user.route.js';
import companyRouter from './routes/company.route.js';
import jobRouter from './routes/job.route.js';
import applicationRouter from './routes/application.route.js';
dotenv.config({});

const app = express();
const Port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
// Routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);

app.listen(Port,()=>{
    connectDB();
    console.log(`Server is running on port ${Port}`);
})