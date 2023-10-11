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

export const usernameCheck = (username) => {
    return request({
        method:"POST",
        url:"username/",
        data:{username}
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

export const logoutUser = (username) => {
    return request({
        method:"GET",
        url:"logout",
        
    })
}

export const getMe = () => {
    return request({
        method:"GET",
        url:"user/me"
    })
}