

// export let smth = v1();

type initialStateType = typeof initialState
const initialState= {}




type ActionTypes = SetSmthActionType

export const passwordRestoreReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType=> {
    switch (action.type) {

        case SET_SMTH: {
            return {...state}
        }

        default: {
            return state
        }
    }
}

const SET_SMTH='SET_SMTH'

export type SetSmthActionType = {
    type: typeof SET_SMTH,
    smth: string
}

export const passwordRestoreAC = (smth: string): SetSmthActionType => {
    return {type: 'SET_SMTH', smth: smth}
}


