import { NEW_PROPOSE, PROPOSE_FAIL, LIKED_PROPOSES, DATE_PROPOSES, LIKE_PROPOSE, DELETE_PROPOSE, IN_WORK } from "../types";



const initialState = {
    likedProposes: null,
    dateProposes: null,
    newPropose: null,
    loaded: false,
    msg: null,

    
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


                    error: ''
                }
            case IN_WORK:
                return {
                    ...state,
                    msg:payload,

                    error:''
                }

            case DELETE_PROPOSE:
                return {
                    ...state,
                    msg: payload,


                    error: ''
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
