import { getList } from "./api"
import React, { useEffect, useState } from "react"
import Delete from "./delete"



const List = (props) => {
    const [proList, setproList] = useState([])
    const getLista = () => {
        (
            getList().then((response) => setproList(response.data))
        )
    }
    useEffect(() => {
        getLista()
    }, [])
    const lista = proList.concat(props.newProducts).map((tuote) => <li key={tuote.id}> {tuote.product}<Delete/></li>)

    return (
        <div>{lista}</div>
    )
}

export default List