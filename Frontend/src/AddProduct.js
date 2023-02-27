import { useState } from "react"
import { addNew } from "./api"
import AddShoppingCarIcon from '@mui/icons-material/AddShoppingCart'
import { Stack } from "@mui/system"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"

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
            <Box>
                <TextField id="outlined-basic" label="Lisää" variant="outlined" value={product} onChange={handleInput}></TextField>
                <IconButton color='primary' size='large'  type="submit" onClick={lisaa}>
                <AddShoppingCarIcon/>
                </IconButton>
            </Box>
    )
}

export default AddProduct