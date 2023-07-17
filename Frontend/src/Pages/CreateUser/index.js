import Box from "@mui/material/Box"
import  {TextField}  from "@mui/material"
import Button from "@mui/material/Button"
import { useState } from "react"
import { newUser } from "../../Api/userApi"
import bcrypt from "bcryptjs"



const CreateUser = () => {
    const salt = bcrypt.genSaltSync(10)

    const [userName ,setUsername] = useState('')
    const [password ,setPassword] = useState('')
    const [confirm ,setConfirm]   = useState('')
    const hashedPassword = bcrypt(password, salt)
    
    const handleUser = (event) => {
        setUsername(event.target.value)
    }

    const handelePassWord = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirm  = (event) => {
        setConfirm(event.target.value)
    }

    const confirmPassword = () => {
        if(password !== confirm){
            alert('Salasanat eivät täsmää!')
            return
        } 
    }

    const confirmUsername = () =>{

    }

    const create = () => {
        confirmUsername()
        confirmPassword()
        newUser(userName, hashedPassword).then((result) => {
            console.log(userName, hashedPassword)
        })
    }


    return (
        <Box component="form" type="submit" >
            <div>
                <TextField label="Käyttäjä" className="input-text-field" onChange={handleUser}></TextField>
                <TextField type="password" label="Salasana" className="input-text-field" onChange={handelePassWord} ></TextField>
                <TextField type="password" label="Salasana" className="input-text-field" onChange={handleConfirm} ></TextField>
                <Button onClick={create}> Olen tässsä</Button>
            </div>
        </Box>
    )
}

export default CreateUser