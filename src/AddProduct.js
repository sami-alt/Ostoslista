import { useState } from "react"
import { addNew } from "./api"

const AddProduct = (props) => {
    const [product, setProduct] = useState('')

    const handleInput = (event) => {
        setProduct(event.target.value)
    }

    const lisaa = (event) => {
        if (product === '') {
            return alert('Kirjoita tuote')
        } else {
            event.preventDefault()
            addNew(product).then((result) => {
                props.onProductAdded(result.data)
                setProduct('')
            })
        }
    }

    return (
        <div>
            <form onSubmit={lisaa}>
                <input value={product} onChange={handleInput}></input>
                <button type="submit">Lisää</button>
            </form>
        </div>
    )
}

export default AddProduct