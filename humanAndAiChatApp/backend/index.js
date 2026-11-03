import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import { dbConnecton } from "./src/db/databse.js";

dotenv.config();

const app = express();

// middlewares
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));



// routes


import chatRouter from "./src/routes/chats.routes.js";
app.use("/api", chatRouter);



dbConnecton().then(() =>{
    app.listen(3000 ,() =>{
    console.log("Server is running on port 3000");
    })
}).catch((error) =>{
    console.error("Error occurred while connecting to the database:", error);
})

