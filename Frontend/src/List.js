import {getList, updateProduct} from "./api"
import React, { useEffect, useState } from "react"
import List from '@mui/material/List' 
import { ListItem, TextField } from "@mui/material"
import Delete from "./delete"
import AddProduct from "./AddProduct";
import Button from "@mui/material/Button"
import "./style.css"
import CheckIcon from "@mui/icons-material/Check"

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

    const handleDone = (prodDone, event) => {
        console.log( prodDone)
        const newList = proList.map(prod => {
            if(prodDone.id === prod.id){
                const doneProd = {
                    ...prod,
                    done : true
                }
                updateProduct(prodDone.id, {done: doneProd.done})
                return doneProd
            } else {
                return prod
            }
        })
        console.log(prodDone.done)
        setproList(newList)
    } 

    const alteredListNew = (newProduct) => {
        console.log('alteredListNew', newProduct)
        const newList = proList.concat(newProduct)
        return setproList(newList)
    }

    const alteredListDel = (deletedId) => {
        const newList = proList.filter(product => product.id !== deletedId)
        console.log(newList)
         return setproList(newList)
        }

    const lista = proList.map((tuote) => (
        <ListItem key={tuote.id}>
            <TextField className="text-field" style={{
                textDecoration: tuote.done === true ? 'line-through' : 'none',
            }} defaultValue={tuote.product} onBlur={(event) => onProductChange(tuote, event)}></TextField>
            <Button variant="contained"  size="small" id={tuote.id} onClick={(event => handleDone(tuote, event))} startIcon={<CheckIcon/>}  > </Button>
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