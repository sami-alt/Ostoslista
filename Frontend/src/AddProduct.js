import { Fragment, useState } from "react"
import { addNew } from "./api"
import AddShoppingCarIcon from '@mui/icons-material/AddShoppingCart'
import {IconButton } from "@mui/material"
import TextField from "@mui/material/TextField"
import"./style.css"

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
            <Fragment>
                <TextField className="input-text-field" id="outlined-basic" label="Lisää" variant="outlined" value={product} onChange={handleInput}></TextField>
                <IconButton className="button" color='primary' size='large'  type="submit" onClick={lisaa}>
                <AddShoppingCarIcon className=""/>
                </IconButton>
            </Fragment>
    )
}

export default AddProduct