import { Mistral } from "@mistralai/mistralai";
import dotenv from "dotenv";

dotenv.config();

const client = new Mistral({
  apiKey: process.env.MISTRALAI_STUDIO_KEY
});

console.log("Sending request...");

const response = await client.chat.complete({
  model: "mistral-small-latest",
  messages: [
    {
      role: "user",
      content: "Say hello"
    }
  ]
});

console.log(response.choices[0].message.content);