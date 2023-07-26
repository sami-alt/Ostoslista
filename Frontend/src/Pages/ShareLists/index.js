import Box from "@mui/material/Box"
import { IconButton, TextField } from "@mui/material"
import { useState } from "react"
import ShareIcon from '@mui/icons-material/Share';

const ShareList = () => {
    const [list, setList] = useState('')

    const handleInput = (event) => {
        setList(event.target.value)
    }

    const listToShare = (list, event) => {
        

    }



    return (

        <Box>
            <TextField className="input-text-field" id="outlined-basic, margin-dense" label="Lisää" variant="filled" value={list} onChange={handleInput} ></TextField>
            <IconButton>
                <ShareIcon></ShareIcon>
            </IconButton>
        </Box>
    )


}

export default ShareList