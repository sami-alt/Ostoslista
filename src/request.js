import axios from "axios"

 export  const baseURL = "http://localhost:3001/"

const request = axios.create({
    baseURL,
    timeout: 5000,
})

export default request