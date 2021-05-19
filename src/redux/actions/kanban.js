import { innerBackend, } from "../../components/utils/axios";
import {ADD_NEW_CARD, ERROR_MSG,CHANGE_CARD_TITLE, CHANGE_CARD_DESCRIPTION, CHANGE_CARD} from "../types";
export const currentCard = (info) => async dispatch  => {
    dispatch({
        type: CHANGE_CARD,
        payload: info
    })
}
export const changeCardField = (val, field, id) => async dispatch  => {
    let body = {}
    body[field] = val
    console.log(body)
    let type = field==='title'?
        CHANGE_CARD_TITLE:
        field==='description'?
        CHANGE_CARD_DESCRIPTION:''
    try {
        const res = await innerBackend.put(`/kanban/cards/fields/edit/${id}`,body)
        dispatch({
            type: type,
            payload: res.data
        })
    }
    catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })             
    }
}

export const addNewCard = (crypt,title, description) => async dispatch  => {
    
    let body ={
        title: title,
        description: description
    }
    try {
        const res = await innerBackend.post(`/kanban/cards/new/backlog/${crypt}`,body )
        dispatch({
            type: ADD_NEW_CARD,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })             
    }
} 