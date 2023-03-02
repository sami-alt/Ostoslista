import { deleteOld } from "./api"
import "./style.css"
import  IconButton  from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

const Delete = (props) => {
    const poista = (event) => {
        event.preventDefault()
        deleteOld(props.id).then((result) => {
            props.onProductDelete(props.id)
        })
    }
    return (
            <IconButton onClick={poista} aria-label="delete">
                    <DeleteIcon className="button" />
            </IconButton>
    )
}

export default Delete