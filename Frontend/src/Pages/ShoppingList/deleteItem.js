import { deleteOld } from "../../Api/productApi"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"

const Delete = (props) => {
    const poista = (event) => {
        event.preventDefault()
        deleteOld(props.id).then(() => {
            props.onProductDelete(props.id)
        })
    }
    
    return (
        <Button variant="contained" size="small" onClick={poista} startIcon={<DeleteIcon />}></Button>
    )
}

export default Delete