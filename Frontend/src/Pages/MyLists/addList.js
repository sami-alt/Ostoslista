import { useState } from "react"
import { createList } from "../../Api/listApi"

const AddList = (props) => {
    const [listName, setListName] = useState('')

    const handleInput = (event) => {
        setListName(event.target.value)
    }

    const add = (event) => {
        if (listName === "") {
            alert("kirjoita nimi")
        } else {
            event.preventDefault()
            createList(listName).then((result) => {
                console.log(listName)
                props.onListAdded(result.data)
            })
            setListName('')
        }
    }

    return (
        <div className='addList'>
                <input className="input" value={listName} onChange={handleInput} />
                <button className="button" onClick={add}>Lisää </button>
        </div>
    )
}

export default AddList