import { Fragment, useState } from "react"
import { addNew } from "../../Api/listApi"
import AddShoppingCarIcon from '@mui/icons-material/AddShoppingCart'
import {IconButton } from "@mui/material"
import TextField from "@mui/material/TextField"



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
            addNew(product).then((result) => {
                props.onProductAdded(result.data)
                setProduct('')
                
            })
        }
    }

    return (
            <Fragment>
                <TextField className="input-text-field" id="outlined-basic, margin-dense" label="Lisää" variant="filled"   value={product} onChange={handleInput}></TextField>
                <IconButton className="button" color='primary' size='large'  type="submit" onClick={lisaa}>
                <AddShoppingCarIcon/>
                </IconButton>
                
            </Fragment>
    )
}

export default AddProduct
