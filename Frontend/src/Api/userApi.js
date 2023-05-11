import request from "../Utils/request";


export const newUser = (username, password) => {
    return request({
        method:"POST",
        url:"user/",
        data:{
            username:username,
            password:password
        }
    })
}

export const loginUser = (loginInfo) => {
    return request({
        method:"POST",
        url:"login",
        data: loginInfo
        
    })
}

export const getToken = () => {
    return request({
        method: "GET",
        url:"auth/"

    })
}

export const logUserOut = () => {

}
