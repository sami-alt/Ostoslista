import {getList, updateProduct} from "./api"
import React, { useEffect, useState } from "react"
import List from '@mui/material/List' 
import { ListItem, TextField } from "@mui/material"
import Delete from "./delete"
import AddProduct from "./AddProduct";
import Checkbox from "@mui/material/Checkbox"
import "./style.css"

const ListComponent = () => {
    const [proList, setproList] = useState([])
    const getLista = () => {
        (
            getList().then((response) => setproList(response.data))
        )
    }
    useEffect(() => {
        getLista()
    }, [])

    const onProductChange = (tuote, event) => {
        const newList = proList.map(originalTuote => {
            if (tuote.id === originalTuote.id) {
                const newTuote = {
                    ...tuote,
                    product: event.target.value,
                }

                updateProduct(tuote.id, {product: newTuote.product})

                return newTuote
            } else {
                return originalTuote
            }
        })
    
        setproList(newList)
    }

    const alteredListNew = (newProduct) => {
        console.log('alteredListNew', newProduct)
        const newList = proList.concat(newProduct)
        return setproList(newList)
    }

    const alteredListDel = (id) => {
        console.log("alteredListDel", id)
        const newList = proList.filter(deletedProduct => deletedProduct.id === id)
         return setproList(newList)
        }
        
    

    const lista = proList.map((tuote) => (
        <ListItem key={tuote.id}>
            <TextField className="text-field" defaultValue={tuote.product} onBlur={(event) => onProductChange(tuote, event)}></TextField>
            <Checkbox className="check-box"></Checkbox>
            <Delete onProductDelete={alteredListDel} id={tuote.id} />
        </ListItem>
    ))

    return (
        <List>
            <ul>{lista}
            <ListItem>
            <AddProduct onProductAdded={alteredListNew} />
            </ListItem>
            </ul>
        </List>
    )
    }

export default ListComponent