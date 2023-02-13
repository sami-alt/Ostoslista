import {getList, updateProduct} from "./api"
import React, { useEffect, useState } from "react"
import List from '@mui/material/List' 
import { ListItem } from "@mui/material"
import Delete from "./delete"
import AddProduct from "./AddProduct";
import "./tyyli.css"

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
       /* console.log(
            'old list', proList,
            'new list', newList
        )
        */
        setproList(newList)
    }

    const lista = proList.map((tuote) => (
        <ListItem key={tuote.id}>
            
            <input className="viewable" defaultValue={tuote.product} onBlur={(event) => onProductChange(tuote, event)}></input>
            <Delete onProductDelete={getLista} id={tuote.id} />
            
        </ListItem>
    ))

    return (
        <List>
            <ul>{lista}</ul>
            <AddProduct onProductAdded={getLista} />
        </List>
    )
}

export default ListComponent