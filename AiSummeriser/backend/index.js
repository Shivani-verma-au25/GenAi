import express from "express"
import cors from 'cors'
const app = express();
import { configDotenv } from "dotenv";
configDotenv();


app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({limit : "50mb", extended: true}));

// iport routes

import summerrizerRouter from './routers/summerizer.router.js'

app.use("/api/ai/" , summerrizerRouter)

app.listen(3000 ,() =>{
    console.log("Server is Running on port 3000");
})