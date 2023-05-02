import request from "../Utils/request"


export const getProducts = (listId) => {
    return request({
        method: "GET",
        url: "tuotteet/" + listId
    })
}

export const addNew = (product, listId) => {
    return request({
        method: "POST",
        url: "tuote/",
        data: {
            product: product,
            listId: listId
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

