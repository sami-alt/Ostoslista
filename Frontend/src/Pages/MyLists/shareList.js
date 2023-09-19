import Button from "@mui/material/Button"
import ShareIcon from '@mui/icons-material/Share';
import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import { useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
        <Box>
            <Button variant="contained" size="small" onClick={handleOpen} startIcon={<ShareIcon />} ></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Jaa lista käyttäjälle</DialogTitle>
                <DialogContentText>
                    <TextField variant="filled" label="Käyttäjän nimi" value={shareTo} onChange={handleInput}></TextField>
                </DialogContentText>
                <DialogActions>
                    <Button onClick={share} >Jaa</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ShareList