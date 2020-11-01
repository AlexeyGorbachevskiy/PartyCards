// export let smth = v1();

import {Dispatch} from "redux";
import {AuthDataACResponseType} from "./authReducer";
import {registerAPI} from "../../dal/API";
import {setLoadingAC, SetLoadingACType} from "./loginReducer";

type initialStateType = typeof initialState
const initialState = {
    error: '',
    status: 0,
}


type ActionTypes = SetRegisterErrorACType | SetRegisterStatusACType

export const registerReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
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

const SET_ERROR = 'SET_ERROR'
const SET_STATUS = 'SET_STATUS'

export type SetRegisterErrorACType = {
    type: typeof SET_ERROR,
    error: string
}
export type SetRegisterStatusACType = {
    type: typeof SET_STATUS,
    status: number
}

export const setRegisterErrorAC = (error: string): SetRegisterErrorACType => {
    return {type: 'SET_ERROR', error}
}
export const setRegisterStatusAC = (status: number): SetRegisterStatusACType => {
    return {type: 'SET_STATUS', status}
}

export type registerFieldsType = {
    email: string,
    password: string
}


export const registerThunkCreator = (values: registerFieldsType) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType | SetLoadingACType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            registerAPI.register(values)
                .then((res) => {
                    console.log(res)
                    dispatch(setRegisterStatusAC(res.status))
                    dispatch(setLoadingAC(false))
                    dispatch(setRegisterErrorAC(''))

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    console.log('Error', error)

                    dispatch(setRegisterErrorAC(error))

                    dispatch(setLoadingAC(false))
                })
        }
    )
}


