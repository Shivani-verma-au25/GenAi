import { aiChatBot } from "../AI/aiModel.js";
export const aiChatbot = async(req , res) =>{
    try{
        const {message} = req.body;
        if(!message){
            return res.status(400).json({
                success : false,
                error : "Message is required"});
        };

        // invoke the aiChatBot function from aiModel.js    
        const response = await aiChatBot(message);
        if(!response){
            return res.status(500).json({error : "No response from AI model"});
        };

        // return the response to the client
        return res.status(200).json({
            success : true,
            result : response
        });
    }catch(error){
        console.log("Error : -" , error);
        return res.status(500).json({
            success : false,
            error : "Internal Server Error"
            
        });


    }
}