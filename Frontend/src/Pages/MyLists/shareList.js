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

const ShareList = (props) => {
    const [shareTo, setShareTo] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleInput = (event) => {
        setShareTo(event.target.value)

    }

    const share = (props) => {
        shareTo()
    }

    return (
        <Box>
            <Button variant="contained" size="small" onClick={handleOpen} startIcon={<ShareIcon />} ></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Jaa lista käyttäjälle</DialogTitle>
                <DialogContentText>
                    <TextField variant="filled" label="Listan nimi" value={shareTo} onChange={handleInput}></TextField>
                </DialogContentText>
                <DialogActions>
                    <Button onAuxClick={share} >Jaa</Button>
                </DialogActions>
            </Dialog>

        </Box>

    )


}

export default ShareList