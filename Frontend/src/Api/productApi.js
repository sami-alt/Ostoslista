import request from "../Utils/request"


export const getProducts = () => {
    return request({
        method: "GET",
        url: "tuotteet"
    })
}

export const addNew = (product, listId) => {
    return request({
        method: "POST",
        url: "tuote/",
        data: {
            product: product,
            listId,
        }
    })
}

export const deleteOld = (id) => {
    return request({
        method: "DELETE",
        url: "tuote/" + id,
    })
}

export const updateProduct = (id,patch) =>{
    return request({
        method: "PUT",
        url:"tuote/" + id,
        data: patch
    })
}

