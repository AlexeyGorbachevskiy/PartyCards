// export let smth = v1();


import {Dispatch} from "redux";
import {loginAPI} from "../../dal/API";

type initialStateType = typeof initialState
const initialState = {}


type ActionTypes = SetSmthActionType

export const loginReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {

        case SET_SMTH: {
            return {...state}
        }

        default: {
            return state
        }
    }
}

const SET_SMTH = 'SET_SMTH'

export type SetSmthActionType = {
    type: typeof SET_SMTH,
    smth: string
}

export const loginAC = (smth: string): SetSmthActionType => {
    return {type: 'SET_SMTH', smth: smth}
}

export const loginThunkCreator = (email: string, password: string, remember: boolean) => {
    return (
        (dispatch: Dispatch<ActionTypes>) => {


            loginAPI.login(email, password, remember)
                .then((res) => {

                    console.log(res)
                    // dispatch(loginReducer())

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    console.log('Error',error)
                })
        }
    )
}



