import  Button  from "@mui/material"
import TextField from "@mui/material/TextField"
import { useState } from "react"


const AddList = () => {

    const [listName, setListName] = useState('') 

    const handleInput = (event) => {
        setListName(event.target.value)
    }



    return(
        <>
        <TextField label="Name of the list" value={listName} onChange={handleInput}/>
        <Button label="Add list"/>
        </>

    )

}

export default AddList