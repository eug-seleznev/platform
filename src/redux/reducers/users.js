
import { backgroundWhite } from '../actions/user';
import { ALL_USERS, CHANGE_PERMISSION,PERM_RETURN,ONE_USER, CLEAR_ERROR, CLEAR_MSG, SEARCH_USER, ADD_CONTRACTOR, ALL_CONTRACTORS, PARTITION_UPDATE, BACK_WHITE} from '../types'



const initialState = {
    user: null,
    users: [],
    loaded: false,
    msg: '',
    userLoaded: false,
    error:'',
    searchResult:[],
    contractors: [],
    background:'#ECECEC'
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case SEARCH_USER: 
            return {
                ...state,
                searchResult:payload,
                
            }
        case ALL_CONTRACTORS: 
            return {
                ...state,
                contractors: payload
                
              
            }
        case BACK_WHITE: 
            return {
                ...state,
                background: payload
                
              
            }
        case ADD_CONTRACTOR: 
            return {
                ...state,
                msg:payload.msg,
              
            }
        case ONE_USER:
            return {
                ...state,
                user: payload,
                userLoaded: true
            }
        case PERM_RETURN:
            return {
                ...state,
                loaded: false,
                
            }
        case PARTITION_UPDATE: 
        return {
            ...state,
            user: payload
        } 
            case CLEAR_ERROR:
                return {
                    ...state,
                   error:''
                   
                }
            case CLEAR_MSG:
                return {
                    ...state,
                    msg:'',
                   
                }
            case ALL_USERS:
                return {
                    ...state,
                    loaded: true,
                    users: payload
                }
                case CHANGE_PERMISSION:
                    return {
                        ...state,
                        loaded: true,
                        msg: payload.msg
                    }
                    
                    
            default: 
                return state;
    }

} 
