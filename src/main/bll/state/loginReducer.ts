// export let smth = v1();


import {Dispatch} from "redux";
import {loginAPI} from "../../dal/API";

export type initialStateType = typeof initialState
const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: ''
}


type ActionTypes = SetLoginDataACType | SetLoginErrorACType

export const loginReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {

        case SET_LOGIN_DATA: {
            return {
                ...state,
                _id: action.loginData._id,
                email: action.loginData.email,
                name: action.loginData.name,
                avatar: action.loginData.avatar,
                publicCardPacksCount: action.loginData.publicCardPacksCount,
                created: action.loginData.created,
                updated: action.loginData.updated,
                isAdmin: action.loginData.isAdmin,
                verified: action.loginData.verified,
                rememberMe: action.loginData.rememberMe,
            }
        }

        case SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }

        default: {
            return state
        }
    }
}

const SET_LOGIN_DATA = 'SET_LOGIN_DATA'
const SET_ERROR = 'SET_ERROR'

export type LoginDataResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
}
export type SetLoginDataACType = {
    type: typeof SET_LOGIN_DATA,
    loginData: LoginDataResponseType
}

export type SetLoginErrorACType = {
    type: typeof SET_ERROR,
    error: string
}

export const setLoginDataAC = (loginData: LoginDataResponseType): SetLoginDataACType => {
    return {type: 'SET_LOGIN_DATA', loginData}
}

export const setLoginErrorAC = (error: string): SetLoginErrorACType => {
    return {type: 'SET_ERROR', error}
}

export const loginThunkCreator = (email: string, password: string, remember: boolean) => {
    return (
        (dispatch: Dispatch<ActionTypes>) => {

            loginAPI.login(email, password, remember)
                .then((res) => {
                    console.log(res)
                    dispatch(setLoginDataAC(res.data))
                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    dispatch(setLoginErrorAC(error))
                    console.log('Error', error)

                })
        }
    )
}



