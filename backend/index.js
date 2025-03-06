import { configDotenv } from 'dotenv';
import connectDB from './connections/db.js';

import express, { json } from "express";
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import eventsRouter from './routes/events.routes.js';
import opportunityRouter from './routes/opportunity.routes.js';
import discussionsRouter from './routes/discussions.routes.js';

configDotenv("./.env");

const app = express();


app.use(express.static("public"));

app.use(json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/events", eventsRouter);
app.use("/api/jobs", opportunityRouter);
app.use("/api/discussions", discussionsRouter);

const PORT = process.env.PORT || 3030;

connectDB().then(() => {
   app.listen(PORT, () => {
        console.log("App started successfully!! AT:", PORT);
   }); 
});