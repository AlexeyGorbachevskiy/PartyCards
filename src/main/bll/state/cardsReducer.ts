import {Dispatch} from "redux";
import {AuthDataACResponseType} from "./authReducer";
import {cardsAPI} from "../../dal/API";
import {setLoadingAC, SetLoadingACType} from "./loginReducer";
import {message} from "antd";

type initialStateType = typeof initialState
const initialState = {


    cardsData: {
        cards: [] as Array<CardsItemType>,
        cardsTotalCount: null as number | null,
        maxGrade: null as number | null,
        minGrade: null as number | null,
        page: null as number | null,
        pageCount: null as number | null,
    },

    chosenPackData: {
        packName: null as string | null,
        packId: null as string | null,
        cardsCount: null as number | null,
    },

    cardsError: '',
}


type ActionTypes = SetCardsDataACType | SetCardsErrorACType | SetChosenPackDataACType | ResetCardsStateACType

export const cardsReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {

        case SET_CARDS_DATA: {
            return {
                ...state,
                cardsData: {
                    cards: [...action.cardsData.cards.map(el => ({...el}))],
                    cardsTotalCount: action.cardsData.cardsTotalCount,
                    maxGrade: action.cardsData.maxGrade,
                    minGrade: action.cardsData.minGrade,
                    page: action.cardsData.page,
                    pageCount: action.cardsData.pageCount,
                }

            }
        }

        case SET_ERROR: {
            return {
                ...state,
                cardsError: action.cardsError,
            }
        }

        case SET_CHOSEN_PACK_DATA: {
            return {
                ...state,
                chosenPackData: {...action.chosenPackData}
            }
        }

        case RESET_CARDS_STATE: {
            return initialState
        }


        default: {
            return state
        }
    }
}

const SET_ERROR = 'SET_ERROR'
const SET_CARDS_DATA = 'SET_CARDS_DATA'
const SET_CHOSEN_PACK_DATA = 'SET_CHOSEN_PACK_DATA'
const RESET_CARDS_STATE = 'RESET_CARDS_STATE'


export type CardsItemType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

export type CardsDataType = {
    cards: Array<CardsItemType>
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    page: number | null
    pageCount: number | null
}

export type SetCardsErrorACType = {
    type: typeof SET_ERROR,
    cardsError: string
}

export type SetCardsDataACType = {
    type: typeof SET_CARDS_DATA,
    cardsData: CardsDataType
}


export const setCardsErrorAC = (cardsError: string): SetCardsErrorACType => {
    return {type: 'SET_ERROR', cardsError}
}

export const setCardsDataAC = (cardsData: CardsDataType): SetCardsDataACType => {
    return {type: 'SET_CARDS_DATA', cardsData}
}


export const getCardsThunkCreator = (packId: string, page: number, chosenPackCardsCount: number | null, sortField: string, sortOrder: string) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType | SetLoadingACType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            cardsAPI.getCards(packId, page, chosenPackCardsCount, sortField, sortOrder)
                .then((res) => {
                    console.log(res)
                    dispatch(setCardsDataAC(res.data))
                    dispatch(setLoadingAC(false))

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + ' more details in console')
                    console.log('Error', error)

                    dispatch(setCardsErrorAC(error))

                    dispatch(setLoadingAC(false))
                })
        }
    )
}


export type SetChosenPackDataACType = {
    type: typeof SET_CHOSEN_PACK_DATA,
    chosenPackData: ChosenPackDataType
}

export type ResetCardsStateACType = {
    type: typeof RESET_CARDS_STATE,
}

type ChosenPackDataType = {
    packName: string | null,
    packId: string | null,
    cardsCount: number | null,
}

export const setChosenPackDataAC = (chosenPackData: ChosenPackDataType): SetChosenPackDataACType => {
    return {type: 'SET_CHOSEN_PACK_DATA', chosenPackData}
}
export const resetCardsStateAC = (): ResetCardsStateACType => {
    return {type: 'RESET_CARDS_STATE'}
}


export const postCardThunkCreator = (packId: string, question: string, answer: string, currentPage: number, pageSize: number, sortColumn: any, sortOrder: any) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType | SetLoadingACType | any>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            cardsAPI.postCard(packId, question, answer)
                .then((res) => {
                    console.log(res)
                    dispatch(getCardsThunkCreator(packId, currentPage, pageSize, sortColumn, sortOrder))
                    dispatch(setLoadingAC(false))
                    message.success('Card was successfully created');
                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + ' more details in console')
                    console.log('Error', error)

                    dispatch(setCardsErrorAC(error))

                    dispatch(setLoadingAC(false))
                })
        }
    )
}


export const deleteCardThunkCreator = (packId: string, cardId: string, currentPage: number, pageSize: number, sortColumn: any, sortOrder: any) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType | SetLoadingACType | any>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            cardsAPI.deleteCard(cardId)
                .then((res) => {
                    console.log(res)
                    dispatch(getCardsThunkCreator(packId, currentPage, pageSize, sortColumn, sortOrder))
                    dispatch(setLoadingAC(false))
                    message.success('Card was successfully deleted');

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + ' more details in console')
                    console.log('Error', error)

                    dispatch(setCardsErrorAC(error))

                    dispatch(setLoadingAC(false))
                })
        }
    )
}


export const updateCardThunkCreator = (packId: string, cardId: string, question: string, answer: string, currentPage: number,pageSize:number, sortColumn:any, sortOrder:any) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType | SetLoadingACType | any>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            cardsAPI.editCard(cardId, question, answer)
                .then((res) => {
                    console.log(res)
                    dispatch(getCardsThunkCreator(packId, currentPage, pageSize,sortColumn,sortOrder))
                    dispatch(setLoadingAC(false))
                    message.success('Card was successfully updated');
                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + ' more details in console')
                    console.log('Error', error)

                    dispatch(setCardsErrorAC(error))

                    dispatch(setLoadingAC(false))
                })
        }
    )
}


export const searchForCardQuestion = (packId: string, question: string | null, currentPage: number, pageSize: number) => {
    return (
        (dispatch: Dispatch<ActionTypes | AuthDataACResponseType | SetLoadingACType>) => {

            // loader appears
            dispatch(setLoadingAC(true))

            cardsAPI.searchForCardQuestion(packId, question, currentPage, pageSize)
                .then((res) => {
                    console.log(res)
                    dispatch(setCardsDataAC(res.data))
                    dispatch(setLoadingAC(false))

                })
                .catch((e) => {
                    const error = e.response ? e.response.data.error : (e.message + ' more details in console')
                    console.log('Error', error)

                    dispatch(setCardsErrorAC(error))

                    dispatch(setLoadingAC(false))
                })
        }
    )
}



