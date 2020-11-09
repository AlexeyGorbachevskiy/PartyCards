import {Dispatch} from "redux";
import {settingsAPI} from "../../dal/API";
import {setLoadingAC, SetLoadingACType} from "./loginReducer";
import {message} from "antd";

type initialStateType = typeof initialState
const initialState= {
    passwordRestoreError:'',
    passwordRestoreSuccessMessage:'',
}




type ActionTypes = setSettingsErrorACType | setSettingsSuccessMessageACType

export const passwordRestoreReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType=> {
    switch (action.type) {

        case SET_ERROR: {
            return {
                ...state,
                passwordRestoreError:action.passwordRestoreError
            }
        }
        case SET_SUCCESS_MESSAGE: {
            return {
                ...state,
                passwordRestoreSuccessMessage:action.passwordRestoreSuccessMessage
            }
        }

        default: {
            return state
        }
    }
}

const SET_ERROR='SET_ERROR'
const SET_SUCCESS_MESSAGE='SET_SUCCESS_MESSAGE'

export type setSettingsErrorACType = {
    type: typeof SET_ERROR,
    passwordRestoreError: string
}
export type setSettingsSuccessMessageACType = {
    type: typeof SET_SUCCESS_MESSAGE,
    passwordRestoreSuccessMessage: string
}

export const setSettingsErrorAC = (passwordRestoreError: string): setSettingsErrorACType => {
    return {type: 'SET_ERROR', passwordRestoreError}
}
export const setSettingsSuccessMessageAC = (passwordRestoreSuccessMessage: string): setSettingsSuccessMessageACType => {
    return {type: 'SET_SUCCESS_MESSAGE', passwordRestoreSuccessMessage}
}


export const restorePasswordThunkCreator = (email: string) => {
    return (
        (dispatch: Dispatch<ActionTypes | SetLoadingACType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            settingsAPI.restore(email)
                .then((res) => {
                    // console.log(res)
                    dispatch(setSettingsSuccessMessageAC(res.data.info))
                    dispatch(setSettingsErrorAC(''))
                    dispatch(setLoadingAC(false))
                    message.success('Check your email for link');

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    dispatch(setSettingsErrorAC(error))
                    console.log('Error', error)

                    dispatch(setLoadingAC(false))
                })
        }
    )
}


