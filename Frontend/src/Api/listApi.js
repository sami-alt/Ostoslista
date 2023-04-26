import request from "../Utils/request";

export const createList = (name, owner) =>{
    return request({
        method:"POST",
        url:"lista",
        data:{
            owner:owner,
            name:name
        }
    })
}

export const getLists = () =>{
    return request({
        method:"GET",
        url:"listat"
    })

}

export const getList = (id) => {
    return request({
        method:"GET",
        url:"lista/" + id
    })
}

export const deleteList = (id) => {
    return request({
        method: "DELETE",
        url:"lista/" + id
    })
}