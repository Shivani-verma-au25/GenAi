import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import {googleAIModel} from './Ai/googleModel.js'
import {careerMentorPrompt} from "./mentorinstructions/instruction.js"

const app = express();


app.use(express.json())
app.use(express.urlencoded({limit : "50mb", extended: true}));
app.use(express.static("public"));


// routes

app.post("/ai-chat", async (req, res) => {
    try{
        const {messages} = req.body;

        if(!messages || messages.length === 0){
            return res.status(400).json({
                success: false,
                message: "Messages are required"
            })
        };

        const respoonse = await googleAIModel.invoke([
            careerMentorPrompt,
            ...messages,
        ]);
        console.log("Ai Response : -", respoonse.content);

        if(!respoonse){
            return res.status(400).json({
                success: false,
                message: "No response from AI"
            })
        }

        return res.status(200).json({
            success: true,
            message: "AI response received",
            data: respoonse.content
        })

    }catch(error){
        console.error("Ai Error : -", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        }); 
    }
})



app.listen(3000 ,() =>{
    console.log("Server is running on port 3000");
});
