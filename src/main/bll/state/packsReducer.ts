import {Dispatch} from "redux";
import {AuthDataACResponseType} from "./authReducer";
import {packsAPI} from "../../dal/API";
import {setLoadingAC, SetLoadingACType} from "./loginReducer";

type initialStateType = typeof initialState
const initialState = {

    preflightTotalCount: null as number | null,

    packsData: {
        cardPacks: [] as Array<CardPacksItemType>,
        cardPacksTotalCount: null as number | null,
        maxCardsCount: null as number | null,
        minCardsCount: null as number | null,
        page: null as number | null,
        pageCount: null as number | null,
        token: '',
        tokenDeathTime: null as number | null,
    },
    packsError: '',

}


type ActionTypes = SetPacksErrorACType | SetPacksDataACType | SetPacksTotalCountACType

export const packsReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {

        case SET_PACKS_DATA: {
            return {
                ...state,
                packsData: {
                    cardPacks: [...action.packsData.cardPacks.map(el => ({...el}))],
                    cardPacksTotalCount: action.packsData.cardPacksTotalCount,
                    maxCardsCount: action.packsData.maxCardsCount,
                    minCardsCount: action.packsData.minCardsCount,
                    page: action.packsData.page,
                    pageCount: action.packsData.pageCount,
                    token: action.packsData.token,
                    tokenDeathTime: action.packsData.tokenDeathTime,
                }


            }
        }

        case SET_ERROR: {
            return {
                ...state,
                packsError: action.packsError
            }
        }

        default: {
            return state
        }
    }
}

const SET_ERROR = 'SET_ERROR'
const SET_PACKS_DATA = 'SET_PACKS_DATA'
const SET_PACKS_TOTAL_COUNT = 'SET_PACKS_TOTAL_COUNT'


export type CardPacksItemType = {
    cardsCount: number
    created: string
    deckCover: any
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    _v: number
    _id: string

}

export type PacksDataType = {
    cardPacks: Array<CardPacksItemType>
    cardPacksTotalCount: number | null
    maxCardsCount: number | null
    minCardsCount: number | null
    page: number | null
    pageCount: number | null
    token: string
    tokenDeathTime: number | null
}

export type SetPacksErrorACType = {
    type: typeof SET_ERROR,
    packsError: string
}

export type SetPacksDataACType = {
    type: typeof SET_PACKS_DATA,
    packsData: PacksDataType
}
export type SetPacksTotalCountACType = {
    type: typeof SET_PACKS_TOTAL_COUNT,
    packsTotalCount: number
}


export const setPacksErrorAC = (packsError: string): SetPacksErrorACType => {
    return {type: 'SET_ERROR', packsError}
}

export const setPacksDataAC = (packsData: PacksDataType): SetPacksDataACType => {
    return {type: 'SET_PACKS_DATA', packsData}
}


export const getPacksThunkCreator = (page: number, pageSize: number) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType | SetLoadingACType | SetPacksErrorACType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            packsAPI.getPacks(page,pageSize)
                .then((res) => {
                    console.log(res)

                    dispatch(setPacksDataAC(res.data))

                    dispatch(setLoadingAC(false))

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    console.log('Error', error)

                    setPacksErrorAC(error)

                    dispatch(setLoadingAC(false))
                })
        }
    )
}

export const postNewPackThunkCreator = (packName:string, privatePack:boolean, page: number, pageSize: number) => {
    return (
        (dispatch: Dispatch<ActionTypes | SetLoadingACType | any>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            packsAPI.postPack(packName, privatePack)
                .then((res) => {
                    console.log(res)

                    dispatch(getPacksThunkCreator(page,pageSize))
                    dispatch(setLoadingAC(false))

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    console.log('Error', error)

                    dispatch(setLoadingAC(false))
                })
        }
    )
}



export const updatePackThunkCreator = (packId:string,packName:string, page: number, pageSize: number) => {
    return (
        (dispatch: Dispatch<ActionTypes | SetLoadingACType | any>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            packsAPI.updatePack(packId,packName)
                .then((res) => {
                    console.log(res)

                    dispatch(getPacksThunkCreator(page,pageSize))
                    dispatch(setLoadingAC(false))

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + 'more details in console')
                    console.log('Error', error)

                    dispatch(setLoadingAC(false))
                })
        }
    )
}




