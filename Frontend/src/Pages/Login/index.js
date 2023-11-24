import Box from "@mui/material/Box"
import { TextField } from "@mui/material/"
import Button from "@mui/material/Button"
import { useState } from "react"
import { loginUser } from "../../Api/userApi"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
import '../../style.css'


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

    const loginHandle = async (event) => {
        event.preventDefault()
        try{
        await loginUser({
            username: userName,
            password
        })}catch(err){
            console.log('login err', err)
            alert('Väärä käyttäjänimi tai salasana')
        }
        props.onLogin()
        nav('/MyLists')
    }

    return (
        <Box component="form" onSubmit={loginHandle} className="center">
            <div className="userForms">
                <TextField className="input-text-field"  label="käyttäjä" onChange={handleUsername} />
                <TextField className="input-text-field" type="password" label="Salasana" onChange={handelePassWord} />
                <Button className="button" type="submit">Kirjadu</Button>  
                <li>
              <Link className="link" to="/CreateUser" >Luo Käyttäjä</Link>
            </li>          
            </div>
        </Box>
    )
}

export default LoginPage

