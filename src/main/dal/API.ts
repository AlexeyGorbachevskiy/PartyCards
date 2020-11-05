import axios from "axios";
import {registerFieldsType} from "../bll/state/registerReducer";


const axiosInstance = axios.create(
    {
        // TODO Change before every deploy
        baseURL: 'https://neko-back.herokuapp.com/2.0/',
        // baseURL: 'http://localhost:7542/2.0/',
        withCredentials: true,
        // headers: {'API-KEY': '0b2bdd80-32f2-11ea-aa6d-ebd61add4aaa'}
    },
);
// declare module 'axios' {
//     export interface AxiosRequestConfig {
//         page?: number;
//     }
// }

type LoginResponseType = {}

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
    auth() {
        return (
            axiosInstance.post('auth/me', {})
        )
    }
}


export const registerAPI = {
    register(values: registerFieldsType) {
        return (
            axiosInstance.post('auth/register', values)
        )
    }
}

export const profileAPI = {
    changeInfo(name: string, avatar: string) {
        return (
            axiosInstance.put('auth/me', {name, avatar})
        )
    }
}

export const settingsAPI = {
    restore(email: string) {
        return (
            axiosInstance.post('auth/forgot', {
                email,
                from: '<alexeygorbachevskiyy@gmail.com>',
                message: `<div style="background-color: lime; padding:15px; font-size: 16px">
Password recovery link: 
<!--TODO Change before every deploy-->
<a href="https://alexeygorbachevskiy.github.io/PartyCards/#/new_password/$token$">Link</a>
<!--<a href="http://localhost:3000/PartyCards#/new_password/$token$">Link</a>-->
</div>`
            })
        )
    },

    setNewPassword(password: string, token: string) {

        return (
            axiosInstance.post('auth/set-new-password', {password, resetPasswordToken: token})
        )
    }
}


export const packsAPI = {
    //?&pageCount=817
    getPacks(page: number, pageSize: number) {
        return (
            axiosInstance.get(`cards/pack?&pageCount=${pageSize}&page=${page}`)
        )
    },
}
