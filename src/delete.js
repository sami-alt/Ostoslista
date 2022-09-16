import { deleteOld } from "./api"


const Delete = (props) =>{

 const poista = (event) =>{
    event.preventDefault()
    deleteOld(props.id).then((result)=>{
        props.onProductDelete(result.data)
        console.log(result.data)
    })
 }   


return (
    <div>
        <form onSubmit={poista} >
    <button type='submit'>Poista</button>
    </form>
    </div>
)

}

export default Delete