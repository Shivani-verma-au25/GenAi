import { generateTitleFromGoogleModel, googleModelResponse } from "../aiModels/google.model.js"
import { MessageModel } from "../models/message.model.js"
import { Chat } from "../models/chat.model.js"

// export const aiMessageResponseController = async (req, res) => {
//     try {
//         const { message, chatId ,userID} = req.body;
//         const userId = userID || req.user?._id // Assuming you have user authentication and req.user contains the authenticated user 


//         if (!message) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Message is required",
//                 error: "Message is required"
//             })
//         };

//         // find chat for title
//         const chatTitle = await Chat.findOne({ user : userID});
//         console.log("chat title" , chatTitle);
        
//         // title : "Response from Google Model",
//         let title = null;
//         let chat = null;

//         if (!chatId) {
//             title = await generateTitleFromGoogleModel(message);
//             console.log("Generated Title from Google Model: ", title);

//             chat = await Chat.create({
//                 user: userId,
//                 title: title
//             })
//         }

//         // if chatId is avaiabe but the chat title is null then
//         if(chat?.title === null){
//             title = await generateTitleFromGoogleModel(message);
//         }

//         // Save the user message to the database
//         const userMessage = await MessageModel.create({
//             chat: chatId || chat._id, // Assuming you have user authentication and req.user contains the authenticated user
//             content: message,
//             role: "user"
//         })

//         // find all messages of the user's chat
//         const allMessages = await MessageModel.find({ chat: chatId || chat?._id }).populate("chat");
//         console.log("All Messages of the Chat: ", allMessages);

//         // gives respone of the message from google model
//         const response = await googleModelResponse(allMessages);
//         if (!response) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to get response from Google Model",
//                 error: "Failed to get response from Google Model"
//             })
//         };

//         // Save the AI response to the database
//         const aiMessage = await MessageModel.create({
//             chat: chatId || chat._id, // Assuming you have user authentication and req.user contains the authenticated user
//             content: response,
//             role: "Ai"
//         });

//         // console.log("AI Response from Google Model: ", response);
//         // console.log("User Message Saved: ", userMessage);
//         console.log("AI Message Saved: ", aiMessage);

//         return res.status(200).json({
//             success: true,
//             message: "Response from Google Model",
//             data: aiMessage,
//             chatTitle: title,
//         })

//     } catch (error) {
//         console.error("Error occurred while saving messages:", error);
//         return res.status(500).json({ error: error.message });
//     }
// }


//  get all messages of the chat



// export const aiMessageResponseController = async (req, res) => {
//     try {
//         const { message } = req.body;

//         const userId =  req.user?._id;

//         if (!message) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Message is required"
//             });
//         }

//         if (!userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User is required"
//             });
//         }

//         let chat;
//         let title = null;
//         const gettingexistchatId = await MessageModel.findById(chat);
//         console.log("geting cgat ",gettingexistchatId);
        

//         // STEP 1: Find existing chat OR create new chat
//         // if (chatId) {
//         //     chat = await Chat.findOne({
//         //         _id: chatId,
//         //         user: userId
//         //     });

//         //     if (!chat) {
//         //         return res.status(404).json({
//         //             success: false,
//         //             message: "Chat not found"
//         //         });
//         //     }
//         // } else {
//         //     // Generate title only for a new chat
//         //     title = await generateTitleFromGoogleModel(message);

//         //     chat = await Chat.create({
//         //         user: userId,
//         //         title
//         //     });
//         // }

//         // // STEP 2: If existing chat has no title, generate one
//         // if (!chat.title) {
//         //     title = await generateTitleFromGoogleModel(message);

//         //     chat.title = title;
//         //     await chat.save();
//         // }

//         // // STEP 3: Save user message
//         // const userMessage = await MessageModel.create({
//         //     chat: chat._id,
//         //     content: message,
//         //     role: "user"
//         // });

//         // // STEP 4: Get conversation history
//         // const allMessages = await MessageModel.find({
//         //     chat: chat._id
//         // }).sort({ createdAt: 1 });

//         // // STEP 5: Get Google AI response
//         // const response = await googleModelResponse(allMessages);

//         // if (!response) {
//         //     return res.status(500).json({
//         //         success: false,
//         //         message: "Failed to get response from Google Model"
//         //     });
//         // }

//         // // STEP 6: Save AI response
//         // const aiMessage = await MessageModel.create({
//         //     chat: chat._id,
//         //     content: response,
//         //     role: "Ai"
//         // });

//         // // STEP 7: Send response
//         // return res.status(200).json({
//         //     success: true,
//         //     message: "Response from Google Model",
//         //     data: aiMessage,
//         //     chatTitle: chat.title
//         // });

//     } catch (error) {
//         console.error("Error occurred while saving messages:", error);

//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// };




// converstion chat user and ai 
export const aiMessageResponseController = async (req, res) => {
    try {
        // 1. Get data
        const { message, chatId } = req.body;
        const userId = req.user?._id;

        if (!message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated"
            });
        }

        let chat;
        let title = null;

        // 2. Check whether chat already exists
        if (chatId) {
            chat = await Chat.findOne({
                _id: chatId,
                user: userId
            });

            if (!chat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found"
                });
            }

        } else {
            // 3. Create a new chat and generate title
            title = await generateTitleFromGoogleModel(message);

            chat = await Chat.create({
                user: userId,
                title
            });
        }

        // 4. Save user message
        const userMessage = await MessageModel.create({
            chat: chat._id,
            content: message,
            role: "user"
        });

        // 5. Get conversation history
        const allMessages = await MessageModel.find({
            chat: chat._id
        }).sort({ createdAt: 1 });

        // 6. Get AI response
        const response = await googleModelResponse(allMessages);

        if (!response) {
            return res.status(500).json({
                success: false,
                message: "Failed to get AI response"
            });
        }

        // 7. Save AI response
        const aiMessage = await MessageModel.create({
            chat: chat._id,
            content: response,
            role: "Ai"
        });

        // 8. Return response
        return res.status(200).json({
            success: true,
            message: "AI response generated successfully",
            chatTitle: chat.title,
            data : aiMessage
        });

    } catch (error) {
        console.error("Error in AI controller:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// get all chat fron the  users
export const getAllChatOFUserController = async (req, res) => {
    const user = req?.user ;
    try {
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated",
                error: "User is not authenticated"
            })
        };

        // find all chats of the user
        const chats = await Chat.find({ user: user?._id }).populate("user").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Chats fetched successfully",
            data: chats
        });


    } catch (error) {
        console.error("Error occurred while fetching chats:", error);
        return res.status(500).json({ error: error.message });
    }
}


// get messages return a particular chat of the chatid
export const getMessages = async(req ,res) =>{

    const {chatId} = req.params;
    
    try {
        const chat = await Chat.findOne({ _id: chatId , user : req?.user?._id });
        if (!chat){
            return res.status(404).json({
                success: false,
                message: "Chat not found",
                error: "Chat not found"
            })
        };
        const messages = await MessageModel.find({ chat: chatId }).populate("chat").sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            data:  messages 
        });
    } catch (error) {
        console.error("Error occurred while fetching messages:", error);
        return res.status(500).json({ error: error.message });
    }
};

// delete chats
export const deleteChatsController = async (req, res) => {
    const { chatId } = req.params;

    try {
        // 1. Check authenticated user
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authorized"
            });
        }

        // 2. Find and delete chat belonging to user
        const chat = await Chat.findOneAndDelete({
            _id: chatId,
            user: userId
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        // 3. Delete all messages belonging to this chat
        await MessageModel.deleteMany({
            chat: chat._id
        });

        // 4. Send response
        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully!"
        });

    } catch (error) {
        console.error("Error while deleting chat:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting chat",
            error: error.message
        });
    }
};
