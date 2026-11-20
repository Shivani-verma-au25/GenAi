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
import chatRouters from "./src/routes/chats.routes.js"
import authRouters from  "./src/routes/auth.routes.js"

app.use("/api", chatRouters)
app.use("/api" , authRouters)



dbConnecton().then(()=>{
    app.listen(8000, () => {
    console.log("Server is running on port 8000");
    });
}).catch((err) =>{
    console.log("Getting error while connecting to  the database :-", err);
    
})


