
import {Dispatch} from "redux";
import {authAPI} from "../../dal/API";
import {setLoginDataAC, SetLoginDataACType} from "./loginReducer";
import {initializedSuccessAC, InitializedSuccessACType} from "./appReducer";

export type initialStateType = typeof initialState
const initialState = {
    isAuth:false,
}


type ActionTypes = AuthDataACResponseType | SetLoginDataACType

export const authReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {


        case SET_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }

        default: {
            return state
        }
    }
}


const SET_AUTH = 'SET_AUTH'

export type AuthDataACResponseType = {
    type: typeof SET_AUTH,
    isAuth:boolean
}

export const setAuthDataAC = (isAuth: boolean): AuthDataACResponseType => {
    return {type: 'SET_AUTH', isAuth}
}

export const getAuthInfoThunkCreator = () => {
    return (
        (dispatch: Dispatch<ActionTypes | InitializedSuccessACType>) => {

            authAPI.auth()
                .then((res) => {
                    console.log(res.data)
                    dispatch(setLoginDataAC(res.data))
                    dispatch(setAuthDataAC(true))

                    dispatch(initializedSuccessAC())

                })
                .catch((e) => {
                    dispatch(initializedSuccessAC())
                    // const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    // dispatch(setLoginErrorAC(error))
                    // console.log('Error', error)

                })
        }
    )
}



