import request from "../Utils/request"


export const getList = () => {
    return request({
        method: "GET",
        url: "lista"
    })
}

export const addNew = (product) => {
    return request({
        method: "POST",
        url: "lista/",
        data: {
            product: product
        }
    })
}

export const deleteOld = (id) => {
    return request({
        method: "DELETE",
        url: "lista/" + id,
    })
}

export const updateProduct = (id,patch) =>{
    return request({
        method: "PUT",
        url:"lista/" + id,
        data: patch
    })
}

