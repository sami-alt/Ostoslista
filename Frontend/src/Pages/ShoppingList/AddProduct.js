import { useState } from "react"
import { addNew } from "../../Api/productApi"


const AddProduct = (props) => {
    const [product, setProduct] = useState('')
    const handleInput = (event) => {
        setProduct(event.target.value)
    }

    const lisaa = (event) => {
        if (product === '') {
            alert('Kirjoita tuote')
            return
        } else {
            event.preventDefault()
            addNew(product, props.id).then((result) => {
                props.onProductAdded(result.data)
                setProduct('')
            })
        }
    }

    return (
        <>
            <input value={product} onChange={handleInput}/>
            <button className="button"  onClick={lisaa}>+</button>
        </>
    )
}

export default AddProduct
