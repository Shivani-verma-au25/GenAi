import mongoose ,{Schema} from "mongoose"; 

const messageSchema = new Schema({
    chat:{
        type :Schema.Types.ObjectId,
        ref : "Chat",
        // required : [true , "Chat is required"]
    },
    content : {
        type :String,
        required : [true , "Message content is required"]
    },
    role:{
        type: String,
        enum: ["user", "Ai"],
        required: [true, "Role is required"]
    }
}, {timestamps : true});

export const MessageModel = mongoose.model("Message" , messageSchema);