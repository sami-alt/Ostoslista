import {getList, updateProduct} from "./api"
import React, { useEffect, useState } from "react"
import Delete from "./delete"
import AddProduct from "./AddProduct";
import "./tyyli.css"

const List = () => {
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
        <li key={tuote.id}>
            
            <input className="viewable" defaultValue={tuote.product} onBlur={(event) => onProductChange(tuote, event)}></input>
            <Delete onProductDelete={getLista} id={tuote.id} />
            
        </li>
    ))

    return (
        <div>
            <ol>{lista}</ol>
            <AddProduct onProductAdded={getLista} />
        </div>
    )
}

export default List