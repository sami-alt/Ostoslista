import {getList, updateProduct} from "../../Api/api"
import React, { useEffect, useState } from "react"
import List from '@mui/material/List' 
import { ButtonGroup, ListItem, TextField } from "@mui/material"
import Delete from "./delete"
import AddProduct from "./AddProduct";
import Button from "@mui/material/Button"
import CheckIcon from "@mui/icons-material/Check"


const ListComponent = (props) => {
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
                const changes = {product: event.target.value, done: false}
                const newTuote = {
                    ...tuote,
                    ...changes,
                }

                updateProduct(tuote.id, changes)

                return newTuote
            } else {
                return originalTuote
            }
        })
        setproList(newList)
    }

    const handleDone = (prodDone) => {
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
        setproList(newList)
    } 

    const alteredListNew = (newProduct) => {
        const newList = proList.concat(newProduct)
        return setproList(newList)
    }

    const alteredListDel = (deletedId) => {
        const newList = proList.filter(product => product.id !== deletedId)
        return setproList(newList)
    }

    const list = proList.map((product) => (
        <ListItem key={product.id}>
            <TextField className="text-field" style={{
                textDecoration: product.done === true ? 'line-through' : 'none',
            }} defaultValue={product.product} onBlur={(event) => onProductChange(product, event)}></TextField>
            <ButtonGroup>
            <Button variant="contained"  size="small" id={product.id} onClick={(event => handleDone(product, event))} startIcon={<CheckIcon/>}  > </Button>
            <Delete onProductDelete={alteredListDel} id={product.id} />
            </ButtonGroup>
        </ListItem>
    ))

    return (
        <List>
            <ul>{list}
            <ListItem>
            <AddProduct onProductAdded={alteredListNew} setAlertState={props.setAlertState} />
            </ListItem>
            </ul>
        </List>
    )
    }

export default ListComponent