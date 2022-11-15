import axios from "../config/axios";
export const getLiveWeather = (city)=>{
    const result = axios.get(`/live-weather/${city}`).then(res=>res.data)
    return result
}
