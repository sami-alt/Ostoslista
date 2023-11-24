import { useState } from "react"
import { addNew } from "../../Api/productApi"


const AddProduct = (props) => {
    const [product, setProduct] = useState('')
    const handleInput = (event) => {
        setProduct(event.target.value)
    }

    const lisaa = (event) => {
        event.preventDefault()
        if (product === '') {
            alert('Kirjoita tuote')
            return
        } else {
            addNew(product, props.id).then((result) => {
                props.onProductAdded(result.data)
                setProduct('')
            })
        }
    }

    return (
        <form onSubmit={lisaa}>
            <input value={product} onChange={handleInput}/>
            <button className="button"  type="submit">+</button>
        </form>
    )
}

export default AddProduct
