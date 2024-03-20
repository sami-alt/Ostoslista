import AddList from './addList'
import { getLists } from '../../Api/listApi'
import { useState, useEffect } from 'react'
import Delete from './deleteList'
import Sharelist from './shareList'
import { Link } from "react-router-dom";
import "../../style.css"

const MyLists = () => {
    const [allLists, setAllLists] = useState([])

    useEffect(() => {
        getLists().then((response) => { setAllLists(response.data) })
    }, [])

    const newList = (addedList) => {
        const listAdded = allLists.concat(addedList)
        return setAllLists(listAdded)
    }

    const removeList = (removedId) => {
        //console.log('remove list', removedId)
        const newList = allLists.filter(list => list.id !== removedId)
        return setAllLists(newList)
    }

    const paddingList = []
    while (paddingList.length + allLists.length < 10) {
        paddingList.push(<li key={`padding${paddingList.length}`}>
            <div className='addList'></div>
        </li>)
    }

    const lists = allLists.map((lists) => (
        <li key={lists.id}>
            <div className='addList'>
                <Link to={"/ShoppingList/" + lists.id}>{lists.name}</Link>
                <Sharelist id={lists.id} />
                <Delete onDelete={removeList} id={lists.id} />
            </div>
        </li>
    ))
    return (
        
            <div className='center'>
                <ul className='list'>
                    {lists}
                <li><AddList onListAdded={newList} /></li>
                {paddingList}
                </ul>
            </div>
        
    )

}

export default MyLists
