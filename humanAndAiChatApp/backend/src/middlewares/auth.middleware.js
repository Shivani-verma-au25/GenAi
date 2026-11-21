import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';


export const authVerify = async ( req , res ,next)=>{
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer " , "");

    if(!token){
        return res.status(409).json({
            success : false,
            message :"Unauthorized",
            error : "Unauthorized"
        })
    };

    try {
        // decode  the token

        const decodedToken = jwt.verify(token ,process.env.SECRET_ACCESS_TOKEN);
        const user = await UserModel.findById(decodedToken?._id).select('-password');
        

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found! Unauthorized User",
                error: "User not found! Unauthorized User"
            })
        };

        req.user = user;
        next()
    } catch (error) {
        console.log("Getting error while checking auth user" , error);
        return res.status(500).json({
            success : false,
            message : error?.message || "Somwthing went wrong.",
            error : error?.message
        })
    }
}