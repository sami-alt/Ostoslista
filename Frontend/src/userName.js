import { useState } from "react"
import { getMe } from "./Api/userApi"
import './style.css'

const Me = () => {
    const [username, setUsername] = useState('')
    getMe().then(response => setUsername(response.data.name))
    console.log(username)
    
    return (
        <p className="username" >{!username ? '' : username}</p>
    )
}

export default Me