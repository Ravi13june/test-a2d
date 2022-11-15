import axios from "../config/axios";

export const getAllCities = (page,limit) =>{
    const result = axios.get(`/city-list?page=${page}&limit=${limit}`).then(res=>res.data)
    return result
}