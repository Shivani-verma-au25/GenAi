import {ChatGoogle} from '@langchain/google';
import { configDotenv } from 'dotenv';
configDotenv();


const googleModel = new ChatGoogle({
    model : 'gemini-3.6-flash',
    apiKey : process.env.GEMINI_API_KEY
});


export const aiSummerizer = async (longPrompt) =>{
    try {
        const response = await googleModel.invoke(longPrompt);
        // console.log("resp" , response.text);
        
        return response.text
    } catch (error) {
        console.log("Error : -" , error.message);
    }
}