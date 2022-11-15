import axios from "../config/axios";

export const registerUser = (credentials) =>{
    const result = axios.post(`/create-user`,credentials).then(res=>res.data)
    return result
} 

export const userLogin = (credentials) =>{
    const result = axios.post(`/login`,credentials).then(res=>res.data)
    return result
} 