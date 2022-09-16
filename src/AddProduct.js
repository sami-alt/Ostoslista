import { useState } from "react"
import { addNew } from "./api"

const AddProduct = (props) => {
    const [product, setProduct] = useState(null)

    const handleInput = (event) => {
        setProduct(event.target.value)
    }

    const lisaa = (event) => {
        event.preventDefault()
        addNew(product).then((result) => {
            props.onProductAdded(result.data)
        })
    }

    return (
        <div>
            <form onSubmit={lisaa}>
                <input onChange={handleInput}></input>
                <button type="submit">Lisää</button>
            </form>
        </div>
    )
}

export default AddProduct