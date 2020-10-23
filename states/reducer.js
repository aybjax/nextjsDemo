const { NONE, NO, CONFIRM, PENDING, YES, ALERT } = require("../helpers/constants");
import * as actionTypes from './actions'


export const initialState = {
    isRead: true,
    //info
    name: 'Иванова Анна Михайловна',
    email: 'ivanova@mail.ru',
    tele: 'Укажите номер телефона',
    //modal states
    modalState: NONE,
    resp: NO,
    payload:{}
}

export const stateReducer = (prevAppState, action) =>
{
    switch(action.type)
    {
        case actionTypes.TOGGLE_READ_MODE:
            return {
                ...prevAppState,
                payload: {
                    ...prevAppState.payload
                },
                //change
                isRead: !prevAppState.isRead,
            }
        case actionTypes.CLOSE_MODAL_CLEAR_DATA:
            return {
                 ...prevAppState,
                 //change
                modalState: NONE,
                resp: NO,
                payload:{}
            }
        case actionTypes.CLOSE_MODAL_TO_HOME:
            return {
                ...prevAppState,
                payload: {
                    ...prevAppState.payload
                },
                //change
                modalState: NONE,
                isRead: !prevAppState.isRead
            }
        case actionTypes.INITIATE_SAVING:
            return {
                ...prevAppState,
                //change
                modalState: CONFIRM,
                resp: PENDING,
                payload: action.payload
            }
        case actionTypes.START_LOADING_ANIMATION:
            return {
                ...prevAppState,
                payload: {
                    ...prevAppState.payload
                },
                //change
                modalState: NONE,
                resp: YES,
            }
        case actionTypes.SAVE_RESPONSE_DATA:
            return {
                ...prevAppState,
                //change
                name: action.payload.name,
                email: action.payload.email,
                tele: action.payload.tele,
                modalState: ALERT,
                resp: NO,
                payload:{}
            }
        default:
            throw Error('Unknown action type')
    }
}