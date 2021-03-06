
import {REGISTER,EDIT_USER_TASK,MY_TASK_DELITE,USER_TASKS, AUTH_ERROR,SORT_USER_TASKS,FINISH_USER_TASK, LOGIN, USER_LOADED, CHANGE_USERDATA, CHANGE_AVATAR, CHANGE_LOADED, ADD_SPRINT_TO_CHOSEN, CLEAR_MSG, CLEAR_ERROR, ADD_USER_TASK, CHANGE_THEME} from '../types'



const initialState = {
    user: null,
    isAuthenticated: false,
    token: false,
    msg:null,
    error: '',
    loaded: false,
    chosenSprint: false,

}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case REGISTER:
        case LOGIN:
             localStorage.setItem('token', payload.token);
            //  console.log(localStorage.token, 'NEW TOKEN ')
            return {
                ...state,
                loaded: true,
                token: true,
                error: payload.err,
            
            }
            case MY_TASK_DELITE:
                return {
                    ...state,
                    user: payload
                }
            case SORT_USER_TASKS: 
            return {
                ...state,
                user: payload,
            } 
            case EDIT_USER_TASK: 
            return {
                ...state,
                user: payload,
            }
            case USER_TASKS: 
            return {
                ...state,
                user: payload,
            }
            case ADD_USER_TASK: 
            return {
                ...state,
                user: payload,
            }
            case FINISH_USER_TASK:
                return {
                    ...state,
                    user: payload,
                }
            case CLEAR_MSG:
                return {
                    ...state,
                    msg:' ',
                    error:' '
                }
            case USER_LOADED:
                return {
                    ...state,
                    loaded: true,
                    isAuthenticated: true,
                    user: payload
                }
                case CHANGE_LOADED:
                    return {
                        ...state,
                        loaded: true
                    }
                case CHANGE_THEME: 
                // console.log (payload.theme)
                    return {
                        ...state,
                        user: payload
                    }
                case CHANGE_USERDATA:
                    return {
                        ...state,
                      
                        loaded: false,
                        msg: payload.msg
                    }
                    case CHANGE_AVATAR:
                        return {
                            ...state,
                        
                            
                            msg: payload.msg,
                            user: payload.user,
                        }
                case ADD_SPRINT_TO_CHOSEN:
                    // console.log('here is payload',payload)    
                
                return {
                        ...state,
                        chosenSprint:!state.chosenSprint,
                        msg: payload.msg
                    }
            case AUTH_ERROR:
                // console.log('here is payload',payload) 
                return {
                    ...state,
                    
                    isAuthenticated: false,
                    error: payload.err
                }
            
            default: 
                return state;
    }

} 
