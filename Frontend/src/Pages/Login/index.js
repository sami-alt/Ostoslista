import Box from "@mui/material/Box"
import { TextField } from "@mui/material/"
import Button from "@mui/material/Button"
import { useState } from "react"
import { loginUser } from "../../Api/userApi"


const LoginPage = () => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handelePassWord = (event) => {
        setPassword(event.target.value)
    }

    const loginHandle = async (event) => {
        await loginUser({
            username: userName,
            password
        })
    }

    return (
        <Box>
            <div>
                <TextField className="input-text-field"  label="käyttäjä" onChange={handleUsername} />
                <TextField className="input-text-field" type="password" label="Salasana" onChange={handelePassWord} />
                <Button style={{backgroundColor:"blue"}} onClick={loginHandle}>Kirjadu</Button>            
            </div>
        </Box>
    )
}

export default LoginPage

