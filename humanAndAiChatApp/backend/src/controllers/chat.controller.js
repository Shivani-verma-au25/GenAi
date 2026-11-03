import {generateTitleFromGoogleModel, googleModelResponse} from "../aiModels/google.model.js"
import {MessageModel} from "../models/message.model.js"

export const aiMessageResponseController = async (req , res ) =>{
    try{
        const { message } = req.body;

        if(!message){
            return res.status(400).json({
                success : false,
                message : "Message is required",
                error : "Message is required"
            })
        };
        // gives respone of the message from google model
        const response = await googleModelResponse(message);
        if(!response){
            return res.status(500).json({
                success : false,
                message : "Failed to get response from Google Model",
                error : "Failed to get response from Google Model"
            })
        };

        // title : "Response from Google Model",

        const title = await generateTitleFromGoogleModel(message);
        console.log("Generated Title from Google Model: ", title);  

        // Save the user message to the database
        const userMessage = await MessageModel.create({
            chat: req.user?._id, // Assuming you have user authentication and req.user contains the authenticated user
            content: message,
            role : "user"
        })
        
        // Save the AI response to the database
        const aiMessage = await MessageModel.create({
            chat: req.user?._id, // Assuming you have user authentication and req.user contains the authenticated user
            content: response,
            role : "Ai"
        });

        console.log("User Message Saved: ", userMessage);
        console.log("AI Message Saved: ", aiMessage);

        return res.status(200).json({
            success : true,
            message : "Response from Google Model",
            data : aiMessage
        })

    }catch(error){
        console.error("Error occurred while saving messages:", error);
        return res.status(500).json({ error: error.message });
    }
}