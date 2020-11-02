import {ThunkAction} from "redux-thunk";
import {AppRootType} from "./store";
import {getAuthInfoThunkCreator} from "./authReducer";


type initialStateType = typeof initialState


let initialState = {
    isCurrentPageProfile: false,
    initialized: false
}

export type AppReducerActionTypes = InitializedSuccessACType | SetIsCurrentPageProfileACType
const appReducer = (state: initialStateType = initialState, action: AppReducerActionTypes): initialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true

            }
        }

        case SET_PROFILE_AS_CURRENT_PAGE:{
            return {
                ...state,
                isCurrentPageProfile: action.isCurrentPge

            }
        }

        default:
            return state
    }
}



const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SET_PROFILE_AS_CURRENT_PAGE = 'SET_PROFILE_AS_CURRENT_PAGE';

export type InitializedSuccessACType = {
    type: typeof INITIALIZED_SUCCESS
}
export type SetIsCurrentPageProfileACType = {
    type: typeof SET_PROFILE_AS_CURRENT_PAGE,
    isCurrentPge: boolean
}


export const initializedSuccessAC = (): InitializedSuccessACType => ({
    type: INITIALIZED_SUCCESS
});

export const setIsCurrentPageProfileAC = (isCurrentPge:boolean): SetIsCurrentPageProfileACType => ({
    type: SET_PROFILE_AS_CURRENT_PAGE, isCurrentPge
});


export const initializeAppThunkCreator = (): ThunkAction<void, AppRootType, unknown, AppReducerActionTypes> => {
    return (
        (dispatch: any, getState) => {
            dispatch(getAuthInfoThunkCreator())
        }
    )
};


export default appReducer;
