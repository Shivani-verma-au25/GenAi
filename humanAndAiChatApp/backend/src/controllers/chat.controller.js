import { generateTitleFromGoogleModel, googleModelResponse } from "../aiModels/google.model.js"
import { MessageModel } from "../models/message.model.js"
import { Chat } from "../models/chat.model.js"

export const aiMessageResponseController = async (req, res) => {
    try {
        const { message, chatId } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
                error: "Message is required"
            })
        };

        
        // title : "Response from Google Model",
        let title = null;
        let chat = null;
        
        if (!chatId) {
            title = await generateTitleFromGoogleModel(message);
            console.log("Generated Title from Google Model: ", title);

            chat = await Chat.create({
                user: chatId || chat?._id , // Assuming you have user authentication and req.user contains the authenticated user
                title: title
            })
        }

        // Save the user message to the database
        const userMessage = await MessageModel.create({
            chat: chatId  || chat._id , // Assuming you have user authentication and req.user contains the authenticated user
            content: message,
            role: "user"
        })

        // find all messages of the user's chat
        const allMessages = await MessageModel.find({chat:chatId || chat?._id}).populate("chat");
        console.log("All Messages of the Chat: ", allMessages);

        // gives respone of the message from google model
        const response = await googleModelResponse(allMessages);
        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Failed to get response from Google Model",
                error: "Failed to get response from Google Model"
            })
        };

        // Save the AI response to the database
        const aiMessage = await MessageModel.create({
            chat: chatId  || chat._id , // Assuming you have user authentication and req.user contains the authenticated user
            content: response,
            role: "Ai"
        });

        // console.log("AI Response from Google Model: ", response);
        // console.log("User Message Saved: ", userMessage);
        console.log("AI Message Saved: ", aiMessage);

        return res.status(200).json({
            success: true,
            message: "Response from Google Model",
            data: aiMessage,
            chatTitle: title,
        })

    } catch (error) {
        console.error("Error occurred while saving messages:", error);
        return res.status(500).json({ error: error.message });
    }
}