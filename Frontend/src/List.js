import {getList, updateProduct} from "./api"
import React, { useEffect, useState } from "react"
import List from '@mui/material/List' 
import { ListItem, TextField } from "@mui/material"
import Delete from "./delete"
import AddProduct from "./AddProduct";
import Button from "@mui/material/Button"
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

    const alteredListDel = (deletedId) => {
        //console.log("alteredListDel", id)
        const newList = proList.filter(product => product.id !== deletedId)
        console.log(newList)
         return setproList(newList)
        }
        
    

    const lista = proList.map((tuote) => (
        <ListItem key={tuote.id}>
            <TextField className="text-field" defaultValue={tuote.product} onBlur={(event) => onProductChange(tuote, event)}></TextField>
            <Button variant="contained" sx={{fontSize: 8}} size="small" >In basket</Button>
            <Delete onProductDelete={alteredListDel} id={tuote.id} />
        </ListItem>
    ))

    return (
        <List>
            <ul className="list">{lista}
            <ListItem>
            <AddProduct onProductAdded={alteredListNew} />
            </ListItem>
            </ul>
        </List>
    )
    }

export default ListComponent