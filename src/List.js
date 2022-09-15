import { getList } from "./api"
import React, { useEffect, useState } from "react"

/*
const testiLista = [
    {id:1 , t: 'Kananmunia'},
    {id:2, t:'Meetwursti'},
    {id:3, t:'Maito'}
]
*/







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
    const lista = proList.map((tuote) => <li key={tuote.id}> {tuote.t}</li>)

    return (
        <div>{lista}</div>
    )
}

export default List