import axios from "../config/axios";
export const getSmallForecast = (city)=>{
    const result = axios.get(`/view-small-forecast/${city}`).then(res=>res.data)
    return result
}
export const getOtherForecast = (city)=>{
    const result = axios.get(`/view-other-forecast/${city}`).then(res=>res.data)
    return result
}
