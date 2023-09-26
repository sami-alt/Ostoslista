import Box from "@mui/material/Box"
import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { useState } from "react"
import { newUser } from "../../Api/userApi"
import { useNavigate } from "react-router-dom"
import './indexCreate.css'



const CreateUser = () => {
    const [userName, setUsername] = useState('')
    const [passWord, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const nav = useNavigate()

    const handleUser = (event) => {
        setUsername(event.target.value)
    }

    const handelePassWord = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirm = (event) => {
        setConfirm(event.target.value)
    }

    const confirmPassword = () => {
        if (passWord === '') {
            alert('Salasana puuttuu')
            return false
        }
        if (confirm === '') {
            alert('Kirjoita salasana uudelleen')
            return false
        }
        if (passWord !== confirm) {
            alert('Salasanat eivät täsmää!')
            return false
        }
        return true
    }

    const confirmUsername = () => {
        if (userName === '') {
            alert('Käyttäjä nimi puuttuu')
            return false
        }
        return true
    }

    const create = () => {
        if (confirmUsername() || confirmPassword()) {
            newUser(userName, passWord).then((result) => {
                console.log(userName, passWord, 'new user and password')
                nav('/')
            })
        }
    }

    return (
        <Box component="form" type="submit" >
            <div className="parrent">
                <TextField label="Käyttäjä" className="input-text-field" onChange={handleUser}></TextField>
                <TextField type="password" label="Salasana" className="input-text-field" onChange={handelePassWord} ></TextField>
                <TextField type="password" label="Salasana" className="input-text-field" onChange={handleConfirm} ></TextField>
                <Button className="button" onClick={create}> Luo käyttäjä</Button>
            </div>
        </Box>
    )
}

export default CreateUser