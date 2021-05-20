import { innerBackend, } from "../../components/utils/axios";
import {ADD_NEW_CARD, ADD_NEW_BOARD, ADD_NEW_COLUMN, ADD_NEW_ROW, MOVE_CARD, ERROR_MSG, CHANGE_CARD_TITLE, CHANGE_CARD_DESCRIPTION, CHANGE_CARD} from "../types";

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

export const addNewBoard = (crypt, name) => async dispatch  => {
    
    let body ={
        name: name,
    }
    try {
        const res = await innerBackend.post(`/kanban/boards/new/${crypt}`,body )
        dispatch({
            type: ADD_NEW_BOARD,
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

export const addNewRow = (board_id, formData) => async dispatch  => {
    
    // let body ={
    //     name:string,
    //     step:number,
    //     start:date,
    //     end:date}
    console.log('formData',formData)
    try {
        const res = await innerBackend.post(`/kanban/categories/new/${board_id}`,formData )
            console.log('formData',res.data)

        dispatch({
            type: ADD_NEW_ROW,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
      catch (err) {
        const errors = err.response.data.err;
        console.log('errorrrr', err.response.data)
        errors.map(error => {
           return dispatch({
            type: ERROR_MSG,
            payload: error.msg
        })
        })             
    }
} 
export const addNewColumn = (board_id, name) => async dispatch  => {
    
    let body ={
        column:name
    }
    try {
        const res = await innerBackend.put(`/kanban/boards/column/new/${board_id}`,body )
        dispatch({
            type: ADD_NEW_COLUMN,
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
export const moveCard = (card_id, oldCategory, newCategory, backlog, column) => async dispatch  => {
    
    let body = {
        old_category: oldCategory, 
        new_category: newCategory, 
        backlog: backlog,
        column: column} 
    try {
        const res = await innerBackend.post(`/kanban/cards/move/${card_id}`,body )
        dispatch({
            type: MOVE_CARD,
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