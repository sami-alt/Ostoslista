import {getList, updateProduct} from "./api"
import React, { useEffect, useState } from "react"
import List from '@mui/material/List' 
import { ListItem, TextField } from "@mui/material"
import Delete from "./delete"
import AddProduct from "./AddProduct";

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

    const alteredList = (newProduct) => {
        console.log('alteredlist', newProduct)
        const newList = proList.concat(newProduct)
        return setproList(newList)
    }

    const lista = proList.map((tuote) => (
        <ListItem key={tuote.id}>
            <TextField className="viewable" defaultValue={tuote.product} onBlur={(event) => onProductChange(tuote, event)}></TextField>
            <Delete onProductDelete={getLista} id={tuote.id} />
        </ListItem>
    ))

    return (
        <List>
            <ul>{lista}
            <ListItem>
            <AddProduct onProductAdded={alteredList} />
            </ListItem>
            </ul>
        </List>
    )
}

export default ListComponent