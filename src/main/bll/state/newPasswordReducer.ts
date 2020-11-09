
import {Dispatch} from "redux";
import {setLoadingAC, SetLoadingACType} from "./loginReducer";
import {settingsAPI} from "../../dal/API";
import {message} from "antd";

type initialStateType = typeof initialState
const initialState= {
    mewPasswordMessage:'',
    newPasswordError:'',
}


type ActionTypes = SetNewPasswordSuccessMessageACType | SetNewPasswordErrorACType

export const newPasswordReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType=> {
    switch (action.type) {

        case SET_NEW_PASSWORD_MESSAGE: {
            return {
                ...state,
                mewPasswordMessage:action.mewPasswordMessage
            }
        }
        case SET_NEW_PASSWORD_ERROR: {
            return {
                ...state,
                newPasswordError: action.newPasswordError
            }
        }

        default: {
            return state
        }
    }
}

const SET_NEW_PASSWORD_MESSAGE='SET_NEW_PASSWORD_MESSAGE'
const SET_NEW_PASSWORD_ERROR='SET_NEW_PASSWORD_ERROR'

export type SetNewPasswordSuccessMessageACType = {
    type: typeof SET_NEW_PASSWORD_MESSAGE,
    mewPasswordMessage: string
}
export type SetNewPasswordErrorACType = {
    type: typeof SET_NEW_PASSWORD_ERROR,
    newPasswordError: string
}

export const setNewPasswordSuccessMessageAC = (mewPasswordMessage: string): SetNewPasswordSuccessMessageACType => {
    return {type: 'SET_NEW_PASSWORD_MESSAGE', mewPasswordMessage}
}
export const setNewPasswordErrorAC = (newPasswordError: string): SetNewPasswordErrorACType => {
    return {type: 'SET_NEW_PASSWORD_ERROR', newPasswordError}
}

export const setNewPasswordThunkCreator = (password: string, token:string) => {
    return (
        (dispatch: Dispatch<ActionTypes | SetLoadingACType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            settingsAPI.setNewPassword(password,token)
                .then((res) => {
                    // console.log(res)
                    dispatch(setNewPasswordSuccessMessageAC(res.data.info))
                    dispatch(setNewPasswordErrorAC(''))
                    dispatch(setLoadingAC(false))
                    message.success('Password was successfully changed. Log in now.');

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    dispatch(setNewPasswordErrorAC(error))

                    console.log('Error', error)

                    dispatch(setLoadingAC(false))
                })
        }
    )
}
