// export let smth = v1();


import {Dispatch} from "redux";
import {loginAPI} from "../../dal/API";
import {initializedSuccessAC} from "./appReducer";
import {AuthDataACResponseType, setAuthDataAC} from "./authReducer";

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

    error: '',
    isLoading: false,
}


type ActionTypes = SetLoginDataACType | SetLoginErrorACType | SetLoadingACType

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
                error: '',
            }
        }

        case SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }

        default: {
            return state
        }
    }
}

const SET_LOGIN_DATA = 'SET_LOGIN_DATA'
const SET_ERROR = 'SET_ERROR'
const SET_LOADING = 'SET_LOADING'

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
export type SetLoadingACType = {
    type: typeof SET_LOADING
    isLoading: boolean
}

export const setLoginDataAC = (loginData: LoginDataResponseType): SetLoginDataACType => {
    return {type: 'SET_LOGIN_DATA', loginData}
}

export const setLoginErrorAC = (error: string): SetLoginErrorACType => {
    return {type: 'SET_ERROR', error}
}
export const setLoadingAC = (isLoading: boolean): SetLoadingACType => {
    return {type: 'SET_LOADING', isLoading}
}

export const loginThunkCreator = (email: string, password: string, remember: boolean) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            loginAPI.login(email, password, remember)
                .then((res) => {
                    console.log(res)

                    dispatch(setLoginDataAC(res.data))
                    dispatch(setAuthDataAC(true))

                    dispatch(setLoadingAC(false))

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    dispatch(setLoginErrorAC(error))
                    console.log('Error', error)

                    dispatch(setLoadingAC(false))
                })
        }
    )
}

export const logoutThunkCreator = () => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            loginAPI.logout()
                .then((res) => {
                    console.log(res)
                    dispatch(setLoginDataAC(res.data))
                    dispatch(setAuthDataAC(false))

                    // loader doesn't not appears
                    dispatch(setLoadingAC(false))
                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    dispatch(setLoginErrorAC(error))
                    console.log('Error', error)

                    // loader doesn't not appears
                    dispatch(setLoadingAC(false))
                })
        }
    )
}





