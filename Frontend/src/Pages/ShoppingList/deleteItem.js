import { deleteOld } from "../../Api/productApi"

const Delete = (props) => {
    const poista = (event) => {
        event.preventDefault()
        deleteOld(props.id).then(() => {
            props.onProductDelete(props.id)
        })
    }
    
    return (
        <button  className="button" onClick={poista}>poista</button>
    )
}

export default Delete