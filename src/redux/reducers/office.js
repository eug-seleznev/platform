import { NEW_PROPOSE, PROPOSE_FAIL, LIKED_PROPOSES, DATE_PROPOSES, LIKE_PROPOSE, DELETE_PROPOSE, IN_WORK,REVERSE_ARR, REVERSE_ARRDATE } from "../types";



const initialState = {
    likedProposes: null,
    dateProposes: null,
    newPropose: null,
    loaded: false,
    msg: null,
    reload:false,
    data: null

    
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case NEW_PROPOSE:
                return {
                    ...state,
                    newPropose: payload,
                    reload: !state.reload,
                    
                    
                    error: ''
                }
            
            case LIKED_PROPOSES:
                return {
                    ...state,
                    likedProposes: payload,
                    loaded: true,

                    error: ''
                }
            case DATE_PROPOSES:
                return {
                    ...state,
                    dateProposes: payload,
                    loaded: true,

                    error: ''
                }

            case LIKE_PROPOSE:
                return {
                    ...state,
                    msg: payload,
                    reload: !state.reload,

                    error: ''
                }
            case IN_WORK:
                return {
                    ...state,
                    msg:payload,
                    reload: !state.reload,

                    error:''
                }

            case DELETE_PROPOSE:
                return {
                    ...state,
                    msg: payload,
                    reload: !state.reload,


                    error: ''
                }
            case REVERSE_ARR:
                return {
                    ...state,
                    data: payload
                }
                case REVERSE_ARRDATE:
                    return {
                        ...state,
                        data: payload
                    }
    case PROPOSE_FAIL:
        return {
            ...state,
            error: payload,
            loaded: false,
            
        }
            
            default: 
                return state;
    }

} 
