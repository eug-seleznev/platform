import { innerBackend, } from "../../components/utils/axios";
import {CHANGE_CARD_INFO,ADD_NEW_CARD,ADD_COMMENT, ADD_NEW_BOARD, ADD_NEW_COLUMN, ADD_NEW_ROW, MOVE_CARD, ERROR_MSG, CHANGE_CARD_TITLE, CHANGE_CARD_DESCRIPTION, CHANGE_CARD, ADD_USER_TO_TASK_NEW} from "../types";

export const changeTaskCard = (prop, id, field) => async dispatch  => {
    let body = {}
    body[field] = prop
    try {
        const res = await innerBackend.put(`/kanban/cards/tasks/edit/${id}`, body)
        dispatch({
            type: CHANGE_CARD_INFO,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}
export const currentCard = (info) => async dispatch  => {
    // console.log(info._id)
    try {
        const res = await innerBackend.get(`/kanban/cards/get/single/${info._id}`)
        dispatch({
            type: CHANGE_CARD,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}
export const addTaskCard = (text,id) => async dispatch  => {
    let body = {
        title:text
    }
    try {
        const res = await innerBackend.post(`/kanban/cards/tasks/new/${id}`,body)
        dispatch({
            type: CHANGE_CARD,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}
export const changeCardField = (val, field, id) => async dispatch  => {
    let body = {}
    body[field] = val
    // console.log(body)
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
        alert('ошибка')           
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
            alert('ошибка')           
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
            alert('ошибка')           
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
            alert('ошибка')           
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
            alert('ошибка')           
         }
} 
export const moveCard = ({from, to, oldPlaceId, newPlaceId, cardId, column}) => async dispatch  => {
    
    let body = oldPlaceId ? {
        [`${from}_${to}`]: true, 
        old_place: oldPlaceId,
        new_place: newPlaceId,
        card_id: cardId,
        column: column
    } : {
        [`${from}_${to}`]: true, 
        new_place: newPlaceId,
        card_id: cardId,
        column: column
    }
    try {
        console.log('transfer body',body)
        const res = await innerBackend.put(`/kanban/cards/move`,body )
        console.log('transfer res',res)

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
        console.log('moving error::',errors)
        // errors.map(error => {
        //    return dispatch({
        //     type: ERROR_MSG,
        //     payload: error.msg
        // })
        // })             
    }
} 

export const addComment = (text, id) => async dispatch  => {
    console.log(text,id)
    let body ={
        text:text
    }
    try {
        const res = await innerBackend.post(`/kanban/cards/comment/new/${id}`,body )
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
        catch (err) {
            alert('ошибка')           
         }
} 
export const userToTask = (id, task_id) => async dispatch  => {
    console.log(id)
    let body ={
        user:id
    }
    try {
        const res = await innerBackend.put(`/kanban/cards/tasks/exec/${task_id}`,body )
        dispatch({
            type: ADD_USER_TO_TASK_NEW,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
        catch (err) {
            alert('ошибка')           
         }
} 
