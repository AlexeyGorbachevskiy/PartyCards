import {ThunkAction} from "redux-thunk";
import {AppRootType} from "./store";
import {getAuthInfoThunkCreator} from "./authReducer";


type initialStateType = typeof initialState


let initialState = {
    initialized: false
}

export type AppReducerActionTypes = InitializedSuccessACType
const appReducer = (state: initialStateType = initialState, action: AppReducerActionTypes): initialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true

            }
        }

        default:
            return state
    }
}


export type InitializedSuccessACType = {
    type: typeof INITIALIZED_SUCCESS
}
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


export const initializedSuccessAC = (): InitializedSuccessACType => ({
    type: INITIALIZED_SUCCESS
});


export const initializeAppThunkCreator = (): ThunkAction<void, AppRootType, unknown, AppReducerActionTypes> => {
    return (
        (dispatch: any, getState) => {
            dispatch(getAuthInfoThunkCreator())
        }
    )
};


export default appReducer;
