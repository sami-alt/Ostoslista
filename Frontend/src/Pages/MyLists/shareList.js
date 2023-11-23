import { useState } from "react"
import DialogTitle from '@mui/material/DialogTitle';
import { shareList } from "../../Api/listApi";

const ShareList = (props) => {
    const [shareTo, setShareTo] = useState('')
    const [open, setOpen] = useState(false)
    const userId = props.id
    console.log(userId)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleInput = (event) => {
        console.log('handle input', event)
        setShareTo(event.target.value)
    }

    const share = (event) => {
        event.preventDefault()
        shareList(shareTo, userId)
    }

    return (
        <>
            <button className="button" onClick={handleOpen} >Jaa</button>
            <dialog open={open} onClose={handleClose}>
                <DialogTitle>Jaa lista käyttäjälle</DialogTitle>
                    <input  value={shareTo} onChange={handleInput}></input>
                    <button className="button" onClick={share} >Jaa</button>
            </dialog>
        </>
    )
}

export default ShareList