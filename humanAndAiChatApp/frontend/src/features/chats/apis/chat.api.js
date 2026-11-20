import axios from "axios"


const axiosInstance = axios.create({
    baseURL : 'http//:localhost:3000',
    withCredentials : true
});


export const sendMessage = async(message ,chatId)=>{
    
}