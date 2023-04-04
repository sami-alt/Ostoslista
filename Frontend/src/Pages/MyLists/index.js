import useState from 'react'



const MyLists = () => {
    const [alllists, setAllLists] = useState('')

    const lists = alllists.map()

    return(
        <>
            {lists}
        </>

    )

}

export default MyLists