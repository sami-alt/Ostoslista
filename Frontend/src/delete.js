import { deleteOld } from "./api"
import  Stack  from "@mui/material/Stack"
import  IconButton  from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
//import { Button } from "@mui/material"


const Delete = (props) => {

    const poista = (event) => {
        event.preventDefault()
        deleteOld(props.id).then((result) => {
            props.onProductDelete(result.data)
        })
    }
    
    return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="delete" onClick={poista}>
            <DeleteIcon/>
                </IconButton>
        </Stack>
    )

}

export default Delete