import axios from "axios"

const apiInstance = axios.create({
    baseURL : "http://localhost:8000/api",
    withCredentials : true
});


// user register api
export const registerApi = async(data)=>{
    const response =  await apiInstance.post("/register", data);
    return response
}

// user login api
export const loginApi = async(data)=>{
    const response =  await apiInstance.post("/login", data);
    return response
};

// user logout api
export const logoutApi = async()=>{
    const response =  await apiInstance.post("/logout");
    return response
}
// user getme api
export const getmeApi = async()=>{
    const response = await apiInstance.get("/me");
    return response
}


