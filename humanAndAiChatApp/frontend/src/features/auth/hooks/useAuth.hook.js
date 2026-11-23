import { useState } from "react"
import {useSelector , useDispatch} from "react-redux"
import {setUser , setError ,setLoading} from "../services/auth.slice"
import { useDispatch } from "react-redux"
import {registerApi ,loginApi, logoutApi ,getmeApi} from "../apis/auth.api"



export const useAuth =  ()=>{
    const disptch = useDispatch();

    // handle user register 

    const handleRegister = async(userData) =>{
        try {
            disptch(setLoading(true));

            const response = await registerApi(userData);
            console.log("respoonse" , response);
            
            if(response?.success){
                disptch(response?.data)    
            }

        } catch (error) {
            console.log("error register hook",error);
            disptch(setError(error.response?.data?.error))
        }finally{
            setLoading(false)
        }
    }


    // handler user login
    const handleLogin = async(loginData) =>{
        try {
            disptch(setLoading(true));

            const response = await loginApi(loginData);
            console.log("data" , response);
            if(response?.success){
                disptch(response.data)
            }           
        } catch (error) {
            console.log("error in auth hook:", error);
            disptch(setError(error.response?.data?.error))   
        }finally{
            disptch(setLoading(false))
        }
    }


    // handle logout user

     const handleLogout = async() =>{
        try {
            disptch(setLoading(true));

            const response = await logoutApi();
            console.log("data" , response);
            if(response?.success){
                disptch(null)
            }           
        } catch (error) {
            console.log("error in auth hook:", error);
            disptch(setError(error.response?.data?.error))   
        }finally{
            disptch(setLoading(false))
        }
    }  

    // getme handler

     const handleGetme = async() =>{
        try {
            disptch(setLoading(true));

            const response = await loginApi();
            console.log("data" , response);
            if(response?.success){
                disptch(response.data)
            }           
        } catch (error) {
            console.log("error in auth hook:", error);
            disptch(setError(error.response?.data?.error))   
        }finally{
            disptch(setLoading(false))
        }
    }

   return { handleRegister , handleLogin , handleLogout , handleGetme}
    
  
}