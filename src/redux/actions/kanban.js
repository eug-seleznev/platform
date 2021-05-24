import { innerBackend, } from "../../components/utils/axios";
import {CHANGE_CARD_INFO,ADD_NEW_CARD,ADD_COMMENT, ADD_NEW_BOARD, ADD_NEW_COLUMN, ADD_NEW_ROW, MOVE_CARD, ERROR_MSG, CHANGE_CARD_TITLE, CHANGE_CARD_DESCRIPTION, CHANGE_CARD, COMMON_KANBAN_RELOAD, ADD_USER_TO_TASK_NEW} from "../types";



export const loadBoard = (id) => async dispatch  => {

    // console.log('action ', `/kanban/boards/get/single/${id}`)
    try {
        const res = await innerBackend.get(`/kanban/boards/get/single/${id}`)
       console.log(res)         

        dispatch({
            type: COMMON_KANBAN_RELOAD,
            payload: res.data
        })
    }
    catch (err) {
       console.log(err.response)         
    }
}

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

export const addNewCategory = (board_id, formData) => async dispatch  => {
    
    // let body ={
    //     name:string,
    //     step:number,
    //     start:date,
    //     end:date}
    const body = {...formData, board_id}
    console.log('formData',body)
    try {
        const res = await innerBackend.post(`/kanban/categories/new/${board_id}`,formData )
            console.log('formData',res.data)

        dispatch({
            type: COMMON_KANBAN_RELOAD,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
        catch (err) {
            console.log('ошибка создания категории',err.response)                  
         }
} 
export const deleteCategory = (boardId, categoryId) => async dispatch  => {
    
    const body ={
        board_id: boardId    
    }
    try {
        const res = await innerBackend.put(`/kanban/categories/delete/${categoryId}`,body)
            console.log('formData',res.data)

        dispatch({
            type: COMMON_KANBAN_RELOAD,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
        catch (err) {
            console.log('ошибка удаления категории',err.response)        
         }
} 
export const addNewColumn = (board_id, name) => async dispatch  => {
    
    let body ={
        column:name,
    }
    try {
        console.log(board_id, body)
        const res = await innerBackend.put(`/kanban/boards/column/new/${board_id}`,body )
        dispatch({
            type: COMMON_KANBAN_RELOAD,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
        catch (err) {
            console.log('ошибка создания колонки',err.response)        
         }
} 
export const deleteColumn = (board_id, name) => async dispatch  => {
    
    const body = {
        column:name
    }
    try {
        console.log(board_id, body)
        const res = await innerBackend.put(`/kanban/boards/column/delete/${board_id}`,body)
        dispatch({
            type: COMMON_KANBAN_RELOAD,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
        catch (err) {
            console.log('ошибка удаления колонки',err.response)        
         }
} 
export const addNewCard = (crypt,title, description, board_id) => async dispatch  => {
    
    let body ={
        title: title,
        description: description,
        board_id: board_id
    }
    try {
        const res = await innerBackend.post(`/kanban/cards/new/backlog/${crypt}`,body )
        dispatch({
            type: COMMON_KANBAN_RELOAD,
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
export const addNewCardToColumn = (category_id, title, description, column, timeline_id) => async dispatch  => {
    
    let body = {
        title: title,
        desctiption: description,
        column:column,
        timeline:timeline_id}
    try {
        const res = await innerBackend.post(`/kanban/cards/new/category/${category_id}`,body )
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
export const moveCard = ({board_id,from, to, oldPlaceId, newPlaceId, cardId, column}) => async dispatch  => {
    
    let body = oldPlaceId ? {
        [`${from}_${to}`]: true, 
        old_place: oldPlaceId,
        new_place: newPlaceId,
        card_id: cardId,
        column: column,
        board_id: board_id
    } : {
        [`${from}_${to}`]: true, 
        new_place: newPlaceId,
        card_id: cardId,
        column: column,
        board_id: board_id
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
        const errors = err;
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
