import { getList } from "./api"
import React, { useEffect, useState } from "react"
import Delete from "./delete"
import AddProduct from "./AddProduct";



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
    const lista = proList.map((tuote) => (
        <li key={tuote.id}>
            {tuote.product}
            <Delete onProductDelete={getLista} id={tuote.id} />
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