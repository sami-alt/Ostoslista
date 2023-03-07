import { deleteOld } from "./api"
import "./style.css"
import  Button  from "@mui/material/Button"
//import  IconButton  from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

const Delete = (props) => {
    const poista = (event) => {
        event.preventDefault()
        deleteOld(props.id).then((result) => {
            props.onProductDelete(props.id)
        })
    }
    return (
            <Button variant="contained" onClick={poista} startIcon={<DeleteIcon/>}></Button>
    )
}

export default Delete