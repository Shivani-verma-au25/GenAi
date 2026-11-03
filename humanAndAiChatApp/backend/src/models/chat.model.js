import {Schema } from "mongoose"


const chatSchema = new Schema({
    user:{
        type :Schema.Types.ObjectId,
        ref : "UserModel",
        required : [true , "User is required"]
    },
    title:{
        type :String,
        default : "New Chat",
        trim : true
    }
} ,{timestamps : true});

export const ChatModel = mongoose.model("Chat" , chatSchema);   