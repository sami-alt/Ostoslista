import Box from "@mui/material/Box"
import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { useState } from "react"
import { newUser, usernameCheck } from "../../Api/userApi"
import { useNavigate } from "react-router-dom"
import '../../style.css'

const CreateUser = (props) => {
    const [userName, setUsername] = useState('')
    const [passWord, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [taken, setTaken] = useState(true)
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

    const notTaken = (blurEvent) => {
        const userName = blurEvent.target.value
        if(userName === ''){
            return
        }
        usernameCheck(userName).then((result) =>{
            //console.log(result)
            if(result.data) {
                alert('Käyttäjänimi on varattu, valitse toinen')
             } else {
                setTaken(result.data)
             }
        })
        
    }
    
    const create = (event) => {
        event.preventDefault()
        if (confirmUsername() && confirmPassword() && !taken) {
            newUser(userName, passWord).then(() => {
                //console.log(userName, passWord, 'new user and password')
                nav('/Login')
            }) 
        } else{
            alert('Käyttäjää ei luotu!')
            return
        }
    }

    return (
        <Box component="form"  onSubmit={create} className="center" >
            <div className="userForms">
                <TextField label="Käyttäjä" className="input-text-field" onChange={handleUser} onBlur={notTaken} ></TextField>
                <TextField type="password" label="Salasana" className="input-text-field" onChange={handelePassWord} ></TextField>
                <TextField type="password" label="Salasana" className="input-text-field" onChange={handleConfirm} ></TextField>
                <Button className="button" type="submit"> Luo käyttäjä</Button>
                <Button className="button" onClick={()=> nav('/Login')}>Takaisin</Button>
            </div>
        </Box>
    )
}

export default CreateUser