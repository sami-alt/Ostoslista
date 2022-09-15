import request from "./request"


export const getList = () => {
    return request({
        method:"GET",
        url:"lista"
    })
}