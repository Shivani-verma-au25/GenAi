import {ChatGoogle ,} from "@langchain/google"
import {ChatMistralAI} from "@langchain/mistralai"
import {HumanMessage , SystemMessage} from "langchain"
import dotenv from "dotenv"
dotenv.config();

const geminiGoogleModel = new ChatGoogle({
    model: "gemini-3.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});


const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

// response to user message from google model
export const googleModelResponse = async (messages) =>{
    if(!messages || messages.length === 0){
        throw new Error("Message is required");
    }
    const response = await geminiGoogleModel.invoke(messages.map((msg) =>{
        if(msg?.role === "user"){
            return new HumanMessage(msg?.content)
        }else if(msg?.role=== "Ai"){
            return new SystemMessage(msg?.content)
        }else{
            throw new Error("Invalid role") 
        }
    }))

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