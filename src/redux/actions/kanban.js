import { innerBackend, } from "../../components/utils/axios";
import {ADD_USER_TO_EVENT,CHANGE_CARD_DATE,CHANGE_CARD_EMERGENCY,DELETE_CARD_BACKLOG,CHANGE_CARD_REGULAR,LOAD_BOARD,REMOVE_TAG_CARD,CHOSEN_BOARD,ADD_TAG_CARD,DELETE_CARD,ADD_CARD_TO_CHOSEN,CHANGE_CARD_INFO,ADD_NEW_CARD,ADD_COMMENT, ADD_NEW_BOARD, ADD_NEW_COLUMN, ADD_NEW_ROW, MOVE_CARD, ERROR_MSG, CHANGE_CARD_TITLE, CHANGE_CARD_DESCRIPTION, CHANGE_CARD, COMMON_KANBAN_RELOAD, ADD_USER_TO_TASK_NEW, UNEXPIRED} from "../types";



export const addBoardToChosen = (id) => async dispatch  => {
    console.log('hi')
    try {
        console.log(id)
        const res = await innerBackend.put(`/kanban/boards/favorite/${id}`)
        dispatch({
            type: CHOSEN_BOARD,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}
export const removeTagCard = (id, tag) => async dispatch  => {
    let body = {
        tag: tag
    }
    try {
        const res = await innerBackend.put(`/kanban/cards/tags/remove/${id}`,body)
        dispatch({
            type: REMOVE_TAG_CARD,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}
export const addUserToEvent = (card_id,id) => async dispatch  => {
    let body = {
        user_id: id
    }
    try {
        const res = await innerBackend.put(`/kanban/cards/events/adduser/${card_id}`,body)
        dispatch({
            type: ADD_USER_TO_EVENT,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}

export const addTagCard = (id, value) => async dispatch  => {
    let body = {
        tag: value
    }
    try {
        const res = await innerBackend.put(`/kanban/cards/tags/add/${id}`,body)
        dispatch({
            type: ADD_TAG_CARD,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}
export const loadBoard = (id) => async dispatch  => {

    console.log(id)
    try {
        const res = await innerBackend.get(`/kanban/boards/get/single/${id}`)
       console.log(res)         

        dispatch({
            type: LOAD_BOARD,
            payload: res.data
        })
    }
    catch (err) {
       console.log(err.response)         
    }
}

export const cardDelete = (id,crypt,boardId,backlog) => async dispatch  => {
    
    let type = !backlog?DELETE_CARD:DELETE_CARD_BACKLOG
    let bid = !backlog?'&boardid='+boardId:''
    console.log(id, crypt,type, boardId)
    try {
        const res = await innerBackend.delete(`/kanban/cards/delete/single?cardid=${id}&crypt=${crypt+bid}`)
        dispatch({
            type: type,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
    }
}
export const addCardToChosen = (id) => async dispatch  => {
    
    try {
        const res = await innerBackend.put(`/kanban/cards/favorite/${id}`)
        dispatch({
            type: ADD_CARD_TO_CHOSEN,
            payload: res.data
        })
    }
    catch (err) {
       alert('ошибка')           
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
        CHANGE_CARD_DESCRIPTION:
        field==='regular'?CHANGE_CARD_REGULAR:
        field==='event_date'?CHANGE_CARD_DATE:
        field==='emergency'?CHANGE_CARD_EMERGENCY:''
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
    const body = {
        name: formData}
    console.log('formData',body)
    try {
        const res = await innerBackend.post(`/kanban/categories/new/${board_id}`,body )
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
export const addNewCard = (crypt,title, board_id,) => async dispatch  => {
    let body ={
        title: title,
        board_id: board_id,
    }
    try {
        const res = await innerBackend.post(`/kanban/cards/new/backlog/${crypt}`,body )
        dispatch({
            type:ADD_NEW_CARD,
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
export const addNewCardToColumn = (category_id, title, column, timeline_id, boardId,) => async dispatch  => {
    
    let body = {
        title: title,
        column:column,
        timeline:timeline_id,
        board_id: boardId,
    }
    try {
        const res = await innerBackend.post(`/kanban/cards/new/category/${category_id}`,body )
        
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
            console.log(err.response)
         }
} 
export const moveCard = ({board_id,from, to, oldPlaceId, newPlaceId, cardId, column, index}) => async dispatch  => {
    
    let body = oldPlaceId ? {
        [`${from}_${to}`]: true, 
        old_place: oldPlaceId,
        new_place: newPlaceId,
        card_id: cardId,
        column: column,
        board_id: board_id,
        index: index
    } : {
        [`${from}_${to}`]: true, 
        new_place: newPlaceId,
        card_id: cardId,
        column: column,
        board_id: board_id,
        index: index
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

export const addComment = (text, id,mentions,link) => async dispatch  => {
    console.log(text,id)
    let body ={
        text:text,
        mentions:mentions,
        url:link
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

export const newTimeline = (categoryId, boardId, timelineId) => async dispatch  => {
    let body ={
        board_id: boardId,
        timeline_id: timelineId,
    }
    try {
        console.log('new timeline',body, categoryId)

        const res = await innerBackend.put(`/kanban/categories/edit/newtimeline/${categoryId}`,body )
        console.log(res)
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
            console.log('ошибка',err.response)           
         }
} 


export const updateTimeline = (categoryId, step, boardId, timelineId) => async dispatch  => {
    let body ={
        step: step,
        board_id: boardId,
        timeline_id: timelineId,
    }
    try {
        console.log('timeline shit',body, categoryId, )

        const res = await innerBackend.put(`/kanban/categories/edit/timeline/${categoryId}`,body )
        console.log(res)
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
            console.log('ошибка',err.response)           
         }
} 


export const finishExpired = (card_id, board_id) => async dispatch  => {
    
    const body = {
        board_id: board_id
    }
    try {
        console.log('unexbody',body)

        const res = await innerBackend.put(`/kanban/cards/unexpire/${card_id}`,body)
        console.log('unex',res)
        dispatch({
            type: UNEXPIRED,
            payload: res.data
        })
        // dispatch({
        //     type: GREEN_MSG,
        //     payload: res.data
        // })
        }
        catch (err) {
            console.log('ошибка',err.response)           
         }
} 