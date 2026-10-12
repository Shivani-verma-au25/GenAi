import express, { json } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { aiChatBot } from "./AI/aiModel.js";
configDotenv();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/api/chat", async (req, res) => {
    try {
        const { messages } = req.body;
        const response = await aiChatBot(messages);
        console.log("Ai Response: ", response);

        return res.status(200).json({
            success: true,
            result: response
        })
    } catch (error) {
        console.error("Ai Error : -", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });

    }
})




app.listen(3000, () => {
    console.log("Server is running port 3000");
})
