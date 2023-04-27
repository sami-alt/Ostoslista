import  Button  from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Box } from "@mui/system"
import CheckIcon from "@mui/icons-material/Check"
import { useState } from "react"
import { createList } from "../../Api/listApi"



const AddList = (props) => {

    const [listName, setListName] = useState('') 
    const ownerID = 2

    const handleInput = (event) => {
        setListName(event.target.value)
    }

    const add = (event) => {
        if(listName === ""){
            alert("kirjoita nimi")
        } else {
            event.preventDefault()
            createList(listName, ownerID).then((result) =>{
             props.onListAdded(result.data)})
             setListName('')
        }
    }

    return(
        <nav aria-label="main mailbox folders">
        <Box component="form" sx={{bgcolor: "Background.paper"}}>
        <TextField className="list-text-field" id="outlined-basic, margin-dense"  variant="filled" label="Listan nimi" value={listName} onChange={handleInput} />
        <Button variant="contained" size="small" label="Add list" onClick={add} startIcon={<CheckIcon/>}/>
        </Box>
        </nav>
    )

}

export default AddList