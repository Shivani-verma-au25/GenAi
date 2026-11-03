import {ChatGoogle ,} from "@langchain/google"
import {HumanMessage , SystemMessage} from "langchain"
import dotenv from "dotenv"
dotenv.config();

const geminiGoogleModel = new ChatGoogle({
    model: "gemini-3.6-flash",
    apiKey: process.env.GEMINI_API_KEY
});

// response to user message from google model
export const googleModelResponse = async (message) =>{
    if(!message){
        throw new Error("Message is required");
    }
    const response = await geminiGoogleModel.invoke(message);

    // console.log("Google Model Response: ", response.text);

    return response.text;
};



// generate title for the chat from google model

export const generateTitleFromGoogleModel = async (message) =>{
    if(!message){
        throw new Error("Message is required");
    };

    const response = await geminiGoogleModel.invoke([
        new SystemMessage("You are a helpful assistant that generates a title for the chat based on the user's message."),
        new HumanMessage(`Generate a title for the following message: "${message}"`)
    ]);
    return response.text;
}