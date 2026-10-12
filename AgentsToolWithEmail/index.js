import { ChatMistralAI } from "@langchain/mistralai";
import readline from "readline/promises";
import * as dotenv from "dotenv";
import { HumanMessage ,createAgent  } from "langchain";
import  {ChatGoogle} from "@langchain/google"
import * as z from "zod"
import { tool } from "@langchain/core/tools";
import { sendEmail } from "./mail.service.js";
import { addToNumbers } from "./calculator.service.js";

dotenv.config();

// send eamil tool
const emailTool = tool(
    sendEmail,
    {
        name : "emailTool",
        description:"Use  this tool to send an email",
        schema : z.object({
            to : z.string().describe("The recipient's email address"),
            html : z.string().describe("The HTML content of the email"),
            subject:z.string().describe("The subject of the email") 
        })
    }
);

// add two numbers tool
const addTwoNumers = tool(
    addToNumbers,
    {
        name : "Add_numbers",
        deccription : "Add to numbers",

        schema : z.object({
            num1 : z.number().describe("First number"),
            num2 : z.number().describe("Second number")
        })
    }
);


// readline interface to read user input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// creating a mistral model instance with the specified model name and API key
const googleModel = new ChatGoogle({
    model : "gemini-3.6-flash",
    apiKey : process.env.GEMINI_API_KEY
})


// creating agent

const AiAgent = createAgent({
    model :googleModel,
    tools : [emailTool ,addTwoNumers]
});



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
        // const response = await googleModel.invoke(messages);
        const response = await AiAgent.invoke({messages});

        // console.log("Mistral AI:", response.text);

        // pushing the response from the model to the messages array as a HumanMessage object

        // messages.push(response.text)
        messages.push(response.messages[ response.messages.length - 1 ])

        console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
    } catch (error) {
        // logging the error message to the console if there is an error invoking the mistral model
        console.error("Error:", error.message);
    }
}

// closing the readline interface to free up resources
rl.close();