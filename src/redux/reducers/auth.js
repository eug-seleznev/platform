
import {REGISTER, AUTH_ERROR, LOGIN, USER_LOADED, CHANGE_USERDATA, CHANGE_AVATAR, CHANGE_LOADED, ADD_SPRINT_TO_CHOSEN, CLEAR_MSG, CLEAR_ERROR} from '../types'



const initialState = {
    user: null,
    isAuthenticated: false,
    token: false,
    msg:'',
    error: '',
    loaded: false,
    chosenSprint: false
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case REGISTER:
        case LOGIN:
             localStorage.setItem('token', payload.token);
             console.log(localStorage.token, 'NEW TOKEN ')
            return {
                ...state,
                loaded: true,
                token: true,
                error: payload.err,
                msg:''
            }
            case CLEAR_ERROR:
                return {
                    ...state,
                   error:''
                }
            case CLEAR_MSG:
                return {
                    ...state,
                    msg:''
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
            
                case CHANGE_USERDATA:
                    return {
                        ...state,
                      
                        loaded: false,
                        msg: payload.msg
                    }
                    case CHANGE_AVATAR:
                        return {
                            ...state,
                        
                            loaded: false,
                            msg: payload.msg
                        }
                case ADD_SPRINT_TO_CHOSEN:
                    console.log('here is payload',payload)    
                
                return {
                        ...state,
                        chosenSprint:!state.chosenSprint,
                        msg: payload.msg
                    }
            case AUTH_ERROR:
                console.log('here is payload',payload) 
                return {
                    ...state,
                    
                    isAuthenticated: false,
                    error: payload.err
                }
            
            default: 
                return state;
    }

} 
