import axios from "axios";


const axiosInstance = axios.create(
    {
        // baseURL: 'https://neko-back.herokuapp.com/2.0/',
        baseURL: 'http://localhost:7542/2.0/',
        withCredentials: true,
        // headers: {'API-KEY': '0b2bdd80-32f2-11ea-aa6d-ebd61add4aaa'}
    },
);


type LoginResponseType = {}

//TODO: test (admin) credentials
// email: "nya-admin@nya.nya"
// password: "1qazxcvBG"
export const loginAPI = {
    login(email: string, password: string, remember: boolean) {
        return (
            axiosInstance.post(`auth/login`, {email, password, remember})
        )
    },
    logout() {
        return (
            axiosInstance.delete(`auth/me`, {})
        )
    },
}

export const authAPI = {
    auth(){
        return (
            axiosInstance.post('auth/me',{})
        )
    }
}

