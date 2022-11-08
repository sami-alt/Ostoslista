import {getList} from "./api"
import React, { useEffect, useState } from "react"
import Delete from "./delete"
import AddProduct from "./AddProduct";
import Update from "./update"

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
                return {
                    ...tuote,
                    product: event.target.value,
                }
            } else {
                return originalTuote
            }
        })
        console.log(
            'old list', proList,
            'new list', newList
        )
        setproList(newList)
    }
    const lista = proList.map((tuote) => (
        <li key={tuote.id}>
            <input defaultValue={tuote.product} onBlur={(event) => onProductChange(tuote, event)}></input>
            <Delete onProductDelete={getLista} id={tuote.id} />
            <Update />
        </li>
    ))

    return (
        <div>
            {lista}
            <AddProduct onProductAdded={getLista} />
        </div>
    )
}

export default List