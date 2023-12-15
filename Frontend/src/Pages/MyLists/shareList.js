import { useState } from "react"
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from "@mui/material";
import { shareList } from "../../Api/listApi";
import { usernameCheck } from "../../Api/userApi";

const ShareList = (props) => {
    const [shareTo, setShareTo] = useState('')
    const [open, setOpen] = useState(false)
    const userId = props.id
    //console.log(userId)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleInput = (event) => {
        //console.log('handle input', event)
        setShareTo(event.target.value)
    }

    const userExists = (username) => {
        usernameCheck(username).then((result) => {
            if(!result.data){
                return false
            }
            return true
        })
    }
    
    const share =  (event) => {
        event.preventDefault()
        if(userExists(shareTo)){
            alert(`Käyttäjää ${shareTo} ei ole`)
            return
        } else {
        shareList(shareTo, userId)
        handleClose()
        }
    }

    return (
        <>
            <button className="button" onClick={handleOpen} >Jaa</button>
            <Dialog open={open} className="shareDialog">
                <DialogTitle>Jaa lista käyttäjälle</DialogTitle>
                    <input  value={shareTo} onChange={handleInput}></input>
                    <button className="button" onClick={share} >Jaa</button>
            </Dialog>
        </>
    )
}

export default ShareList