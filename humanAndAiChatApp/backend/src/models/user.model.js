import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    userName :{
        type : String,
        required : [true , "User name is required"],
        trim : true

    },
    email :{
        type : String,
        required : [true , "Email is required"],
        trim : true,
    },
    password :{
        type : String,
        required : [true , "Password is required"],
        max: [8 , "Password should be at least 8 characters long"],
        min: [4 , "Password should be at most 4 characters long"]
    }

} ,{timestamps : true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    return this.password =await bcrypt.hash(this.password , 10);
    next();
});


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateUserAccessToken = async function(){
    // that is short live token
    return jwt.sign(
        {
            _id:this._id,
            userName : this.userName,
        },
        process.env.SECRET_ACCESS_TOKEN,
        {
            expiresIn : process.env.SECRET_ACCESS_TOKEN_EXPIRY
        }
    )
}
export const UserModel = mongoose.model("User" , userSchema);

