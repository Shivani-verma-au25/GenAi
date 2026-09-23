import { ChatMistralAI } from "@langchain/mistralai";
import readline from "readline/promises";
import * as dotenv from "dotenv";
import {ChatGoogle} from "@langchain/google"
import { HumanMessage } from "@langchain/core/messages";

dotenv.config();



// for reading user input from the command line coz we are not using any front end framework here and node is not a front end framework so we need to use readline module to read user input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// creating an instance of the ChatMistralAI class and passing the model name and api key to it
// const mistralModel = new ChatMistralAI({
//     model: "mistral-small-latest",
//     apiKey: process.env.GEMINI_API_KEY
// });

const googleModel = new ChatGoogle({
    model : "gemini-3.6-flash",
    apiKey : process.env.GEMINI_API_KEY
})

// message arra to store the messages from the user and the model
const messages =  [];

// creating a while loop to keep the chat going until the user types "exit"
while (true) {
    // prompting the user for input and storing it in a variable
    const userInput = await rl.question("User :");
    // checking if the user input is "exit" and breaking the loop if it is
    if (userInput.toLowerCase() === "exit") {
        console.log("Exiting the chat...");
        break;
    };

    // pushing the user input to the messages array as a HumanMessage object
    messages.push( new HumanMessage(userInput ));
    // invoking the mistral model with the user input and logging the response to the console
    try {
        const response = await googleModel.invoke(messages);
        console.log("Google AI:", response.text);
        // pushing the response from the model to the messages array as a HumanMessage object
        messages.push(response.text)
    } catch (error) {
        // logging the error message to the console if there is an error invoking the mistral model
        console.error("Error:", error.message);
    }
}

// closing the readline interface to free up resources
rl.close();