import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete"
import { deleteList } from "../../Api/listApi"

const Delete = (props) => {
    const del = (event) => {
        event.preventDefault()
        deleteList(props.id).then(() => {
            props.onDelete(props.id)
        })
    }

    return (
        <Button variant="contained" size="small" onClick={del} startIcon={<DeleteIcon />} ></Button>
    )
}

export default Delete