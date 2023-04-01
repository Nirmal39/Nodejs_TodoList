import express from 'express';
import {config} from 'dotenv';
import { connectDB } from "./data/database.js";
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from "cookie-parser";
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';


config({
    path: "./data/config.env"
})

const app = express();

connectDB();

app.use(express.json())
app.use(cookieParser());

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// using routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)


app.get('/', (req,res)=>{
    res.send('Nice Working')
})

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});