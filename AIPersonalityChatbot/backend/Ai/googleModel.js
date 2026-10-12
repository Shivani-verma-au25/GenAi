import {ChatGoogle} from "@langchain/google"
import dotenv from "dotenv"
dotenv.config();


export const googleAIModel = new ChatGoogle({
    model : "gemini-3.6-flash",
    apiKey : process.env.GEMINI_API_KEY
});


