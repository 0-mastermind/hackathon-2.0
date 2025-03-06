import { configDotenv } from 'dotenv';
import connectDB from './connections/db.js';

import express, { json } from "express";

configDotenv("./.env");

const app = express();


app.use(express.static("public"));

app.use(json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const PORT = process.env.PORT || 3030;

connectDB().then(() => {
   app.listen(PORT, () => {
        console.log("App started successfully!! AT:", PORT);
   }); 
});