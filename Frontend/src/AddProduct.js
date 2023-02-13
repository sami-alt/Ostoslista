import { useState } from "react"
import { addNew } from "./api"
import AddShoppingCarIcon from '@mui/icons-material/AddShoppingCart'
import { Stack } from "@mui/system"
import { IconButton } from "@mui/material"

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
        <Stack direction='row' spacing={3}>
            <IconButton color='primary' size='small'>
            <form onSubmit={lisaa}>
                <input value={product} onChange={handleInput}></input>
                <button type="submit"><AddShoppingCarIcon></AddShoppingCarIcon></button>
            </form>
            </IconButton>
        </Stack>
    )
}

export default AddProduct