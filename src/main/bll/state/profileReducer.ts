import {Dispatch} from "redux";
import {profileAPI} from "../../dal/API";
import {setLoadingAC, SetLoadingACType} from "./loginReducer";

type initialStateType = typeof initialState
const initialState = {
    name: '',
    avatar: '',
}


type ActionTypes = SetProfileInfoACType

export const profileReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {

        case SAVE_PROFILE_INFO: {
            return {
                ...state,
                name: action.name,
                avatar: action.avatar,
            }
        }

        default: {
            return state
        }
    }
}

const SAVE_PROFILE_INFO = 'SAVE_PROFILE_INFO'

export type SetProfileInfoACType = {
    type: typeof SAVE_PROFILE_INFO,
    name: string,
    avatar:string
}

export const saveProfileInfoAC = (name: string, avatar:string): SetProfileInfoACType => {
    return {type: 'SAVE_PROFILE_INFO', name, avatar}
}

export const changeInfoThunkCreator = (name:string, avatar:string) => {
    return (
        (dispatch: Dispatch<ActionTypes | SetLoadingACType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            profileAPI.changeInfo(name, avatar)
                .then((res) => {
                    saveProfileInfoAC(res.data.name,res.data.avatar)
                    dispatch(setLoadingAC(false))

                })
                .catch((e) => {
                    // const error = e.response ? e.response.data.error : (e.message + 'more details in console')

                    console.log('Error', e)

                    dispatch(setLoadingAC(false))
                })
        }
    )
}


