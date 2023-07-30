import AddList from './addList'
import { getLists } from '../../Api/listApi'
import { useState, useEffect } from 'react'
import { List } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Delete from './deleteList'
import Sharelist from './shareList'
import { Link} from "react-router-dom";

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
        console.log('remove list' ,removedId)
        const newList = allLists.filter(list => list.id !== removedId)
        return setAllLists(newList)
    }

    const lists = allLists.map((lists) => (
        <ListItem key={lists.id}>
            <Link to={"/ShoppingList/" + lists.id}>{lists.name}</Link>
            <Sharelist id={lists.id} />
            <Delete onDelete={removeList} id={lists.id} />
        </ListItem>
    ))
    return (
        <Box >
            <List>
                <ul>{lists}</ul>
            </List>
            <AddList onListAdded={newList} />
        </Box>
    )

}

export default MyLists
