// require("dotenv").config();
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from './routes/userRoute.js'
import todoRouter from './routes/todoRoute.js'

config({
    path: "./.env",
});


//create a server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    // origin: [process.env.FRONTEND_URI],
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],

}));




mongoose
    .connect(process.env.MONGODB_URI
        , {
            dbName: "Ideabook",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        })
    .then(() => console.log("Db connected!"))
    .catch((error) => console.log("Failed to connect", error));


app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date(),
    });
});

//ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todo", todoRouter);



const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});