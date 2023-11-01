import Box from "@mui/material/Box"
import { TextField } from "@mui/material/"
import Button from "@mui/material/Button"
import { useState } from "react"
import { loginUser } from "../../Api/userApi"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import './indexLogin.css'


const LoginPage = (props) => {
    const nav = useNavigate()
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handelePassWord = (event) => {
        setPassword(event.target.value)
    }

    const loginHandle = async () => {
        await loginUser({
            username: userName,
            password
        })
        props.onLogin()
        nav('/')
    }

    return (
        <Box>
            <div className="parrent">
                <TextField className="input-text-field"  label="käyttäjä" onChange={handleUsername} />
                <TextField className="input-text-field" type="password" label="Salasana" onChange={handelePassWord} />
                <Button className="button"  onClick={loginHandle}>Kirjadu</Button>  
                <li>
              <Link className="link" to="/CreateUser" >Luo Käyttäjä</Link>
            </li>          
            </div>
        </Box>
    )
}

export default LoginPage

