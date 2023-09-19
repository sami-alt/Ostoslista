import { useState } from "react"
import { getMe } from "./Api/userApi"

const Me = () => {
    const [username, setUsername] = useState('')
    getMe().then(response => setUsername(response.data.name))
    console.log(username)
    
    return (
        <p >{!username ? '' : username}</p>
    )
}

export default Me