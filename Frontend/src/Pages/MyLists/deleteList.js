import { deleteList } from "../../Api/listApi"

const Delete = (props) => {
    const del = (event) => {
        event.preventDefault()
        deleteList(props.id).then(() => {
            props.onDelete(props.id)
        })
    }

    return (
        <button className="button" onClick={del}>Poista</button>
        )
}

export default Delete