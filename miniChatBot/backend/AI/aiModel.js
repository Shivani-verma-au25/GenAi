import {ChatGoogle} from "@langchain/google"
import {
  HumanMessage,
  AIMessage,
} from "langchain";
import dotenv from "dotenv";
dotenv.config();

const googleModel = new ChatGoogle({
    model : "gemini-3.6-flash",
    apiKey : process.env.GEMINI_API_KEY
});


export const aiChatBot = async(message) =>{
    try {
        const response = await googleModel.invoke(message);
        console.log("contend res" , response);
        return response.content
        

    } catch (error) {
        console.log("Error : -" , error);
    }
}