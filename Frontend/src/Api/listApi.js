
import request from "../Utils/request";

export const createList = (name) =>{
    return request({
        method:"POST",
        url:"lista",
        data:{
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

export const shareList = (toUserName, listId) => {
    return request({
        method: "POST",
        url: "sharelist",
        data: {
            toUserName:toUserName,
            listId:listId
        }
    })
}