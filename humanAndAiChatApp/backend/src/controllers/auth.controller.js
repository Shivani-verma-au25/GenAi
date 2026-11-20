import { UserModel } from "../models/user.model.js";


// geneate access token 

const generateAccessToken = async(userId) =>{
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(404).json({
            success : false ,
            message : "User not found.",
            error : "User not found for toekn"
        });
    }
    try {
        // generate access token
        const accessToken = await user.generateUserAccessToken();
        return accessToken;
    } catch (error) {
        console.log("Getting error while generating access token", error);
        return res.status(400).json({
            success : false,
            message : "Something went wrong while generating access token",
            error : "Something went wrong while generating access token"
        })
        
    }
}

// user register controller
export const userRegisterController = async (req, res) =>{
    try {
        const {userName ,email, password} = req.body;
        

        // validation for fileds should not  be empty
        if([userName,email,password].some((fields) => fields.trim() === "")){
            return res.status(404).json({
                success : false,
                message : "feilds should not be empty.",
                error : "fields should not be empty."
            })
        }

        // check if user already exists
        const existUser = await UserModel.findOne({email})
        if (existUser){
            return res.status(400).json({
                success : false,
                message : "User is already exists.",
                error :"User is already exists."
            })
        };

        // create new user
        const user = await UserModel.create({
            userName,
            email,
            password
        });

        // check user is created or not
        const createdUser = await UserModel.findById(user?._id).select("-password")

        if (!createdUser) {
            return res.status(404).json({
                success : false,
                message :"User not created.",
                error : "User not created.",
            })
        };

        return res.status(200).json({
            success : true,
            message : "User created successfully.",
            user : createdUser
        })
        
    } catch (error) {
        console.log("getting error while registering user,", error);
        return res.status(500).json({
            success :false,
            message : "Internal Server Error",
            error : error?.message || " Internal Server Error"
        })
        
    }
};


// user login controller

export const userLoginRegister = async(req ,res) =>{
    try {
        const {email , password} = req.body;
        
        if(!email || email?.trim() === ""){
            return res.status(401).json({
                success : false,
                message : "email is required.",
                error : "email is required."
            })
        };

        if(!password || password?.trim() === ""){
            return res.status(404).json({
                success : false,
                message : "Password is required.",
                error : "Password is required."
            })
        };

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User no exist.",
                error: "User no exist."
            })
        };

        // verify the passsword

        const isCorrect = await user.isPasswordCorrect(password);
        if(!isCorrect){
            return res.status(404).json({
                success : false,
                message : "Invalid credentials."
            })
        };

        // token generating
        const token = await generateAccessToken(user?._id);

        const loggedInUser = await UserModel.findById(user?._id).select("-password");

        if(!loggedInUser){
            return res.status(404).json({
                success : false,
                message : "User not found.",
                error : "User not found."
            })
        }

        return res.status(200)
        .cookie("accessToken" , token,{ 
            httpOnly : true,
            secure : true,

        })
        .json({
            success : true ,
            message :user?.userName + "is Logged in successsfully",
            user  : loggedInUser
        });
        
        
    } catch (error) {
        console.log("Getting error while logining user" , error);
        return res.status(500).json({
            success : false,
            message : error?.message || "Internal server error"
        })       
    }
}