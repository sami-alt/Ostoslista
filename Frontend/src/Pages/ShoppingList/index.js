import { getProducts, updateProduct } from "../../Api/productApi"
import React, { useEffect, useState } from "react"
import Delete from "./deleteItem"
import AddProduct from "./AddProduct";
import { useParams, useNavigate } from "react-router-dom"
import "../../style.css"

const ListComponent = () => {
    const [productList, setproductList] = useState([])
    const [update, setUpdate] = useState(false)
    const { id } = useParams()
    const nav = useNavigate()

    useEffect(() => {
        getProducts(id).then((response) => (setproductList(response.data)))
    }, [id])

    const onProductChange = (product, event) => {
        const newList = productList.map(originalProduct => {
            if (product.id === originalProduct.id) {
                const changes = { product: event.target.value, done: 0 }
                const newProduct = {
                    ...product,
                    ...changes,
                }
                console.log('changes front', changes)
                
                updateProduct(product.id, changes)

                return newProduct
            } else {
                return originalProduct
            }
        })
        setproductList(newList)
        setUpdate(false)
    }

    const handleDone = (productDone) => {
        const newList = productList.map(product => {
            if (productDone.id === product.id) {
                const doneProduct = {
                    ...product,
                    done: 1
                }
                updateProduct(productDone.id, { done: doneProduct.done })
                return doneProduct
            } else {
                return product
            }
        })
        setproductList(newList)
    }

    const alteredListNew = (newProduct) => {
        const newList = productList.concat(newProduct)
        return setproductList(newList)
    }

    const alteredListDel = (deletedId) => {
        const newList = productList.filter(product => product.id !== deletedId)
        return setproductList(newList)
    }

    const list = productList.map((product) => (
        <li key={product.id} >
            <input  style={{
                textDecoration: product.done === 1 ? 'line-through' : 'none',  border: update ? 1 : 0
            }} defaultValue={product.product} onBlur={(event) => onProductChange(product, event)}onClick={()=>setUpdate(true)} ></input>
            <>
                <button className="button" variant="contained" size="small" id={product.id} onClick={(event => handleDone(product, event))}>Korissa</button>
                <Delete onProductDelete={alteredListDel} id={product.id} />
            </>
        </li>
    ))
    
    return (
        <ul className="list" sx={{listStyleType: 'disc', pl: 4}}>
            {list}
            <li>
                <div id="addList">
                <AddProduct onProductAdded={alteredListNew} id={id} />
                </div>
            </li>
                <button className="button" onClick={()=>nav('/MyLists')}>Takaisin</button>
        </ul>
    )
}

export default ListComponent
