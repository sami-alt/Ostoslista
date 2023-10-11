import { getProducts, updateProduct } from "../../Api/productApi"
import React, { useEffect, useState } from "react"
import List from '@mui/material/List'
import { ButtonGroup, ListItem, TextField } from "@mui/material"
import Delete from "./deleteItem"
import AddProduct from "./AddProduct";
import Button from "@mui/material/Button"
import CheckIcon from "@mui/icons-material/Check"
import { useParams } from "react-router-dom"
import "./listIndex.css"

const ListComponent = () => {
    const [productList, setproductList] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getProducts(id).then((response) => (setproductList(response.data)))
    }, [id])

    const onProductChange = (product, event) => {
        const newList = productList.map(originalProduct => {
            if (product.id === originalProduct.id) {
                const changes = { product: event.target.value, done: 0 }
                const newProduct = {
                    ...product,
                    ...changes,
                }
                console.log('changes front', changes)
                
                updateProduct(product.id, changes)

                return newProduct
            } else {
                return originalProduct
            }
        })
        setproductList(newList)
    }

    const handleDone = (productDone) => {
        const newList = productList.map(product => {
            if (productDone.id === product.id) {
                const doneProduct = {
                    ...product,
                    done: 1
                }
                updateProduct(productDone.id, { done: doneProduct.done })
                return doneProduct
            } else {
                return product
            }
        })
        setproductList(newList)
    }

    const alteredListNew = (newProduct) => {
        const newList = productList.concat(newProduct)
        return setproductList(newList)
    }

    const alteredListDel = (deletedId) => {
        const newList = productList.filter(product => product.id !== deletedId)
        return setproductList(newList)
    }

    const list = productList.map((product) => (
        <ListItem key={product.id} >
            <TextField  style={{
                textDecoration: product.done === 1 ? 'line-through' : 'none',
            }} defaultValue={product.product} onBlur={(event) => onProductChange(product, event)}></TextField>
            <ButtonGroup>
                <Button variant="contained" size="small" id={product.id} onClick={(event => handleDone(product, event))} startIcon={<CheckIcon />}  > </Button>
                <Delete onProductDelete={alteredListDel} id={product.id} />
            </ButtonGroup>
        </ListItem>
    ))

    return (
        <List className="list">
            <ul>{list}
                <ListItem>
                    <AddProduct onProductAdded={alteredListNew} id={id} />
                </ListItem>
            </ul>
        </List>
    )
}

export default ListComponent
