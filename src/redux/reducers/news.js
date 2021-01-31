import { ALL_NEWS,CREATE_NEWS, GET_NEWS, DELETE_NEWS, UPDATE_NEWS, NEWS_FAIL, CLEAR_MSG, CLEAR_ERROR, } from "../types";



const initialState = {
    news: null,
    getNews: null,
    error: '',
    msg:'',
    loaded: false,
    
}



export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case ALL_NEWS:
                return {
                    ...state,
                    loaded: true,
                    news: payload,
                    // loadNews: true,
                    error: ''
                }
                case CREATE_NEWS:
                    return {
                        ...state,
                        getNews: payload,
                        // loadNews: true,
                        msg:payload.msg,
                        error: ''
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
            case GET_NEWS:
                return {
                    ...state,
                    getNews: payload,
                    // loadNews: true,

                    error: ''
                }
          
            
            case UPDATE_NEWS:
                return {
                    ...state,
                    loaded: true,
                    getNews: payload,
                    error: ''
                }

            case DELETE_NEWS: 
                return {
                    ...state,
                    msg: payload.msg
                }

                case NEWS_FAIL:
                    return {
                        ...state,
                        error: payload,
                       
                    }
            
            default: 
                return state;
    }

} 