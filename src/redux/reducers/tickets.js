import { ALL_TICKETS, CLEAR_ERROR, CLEAR_MSG, GET_TICKET, NEW_ERROR, NEW_TICKET } from "../types";




const initialState = {
    tickets: [],
    ticket: null,
    ticketLoad: false,
    error: '',
    loaded: false,
    msg: '',
}

export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case NEW_TICKET:
            return {
                ...state,
                msg: payload.msg,
                
                
            }
        case ALL_TICKETS:
            return {
                ...state,
                loaded: true,
                error: '',
                tickets: payload
                
                
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
        case GET_TICKET:
            return {
                ...state,
                ticketLoad: true,
                error: '',
                ticket: payload
                
                
            }
        case NEW_ERROR:
            return {
                ...state,
                error: payload,
                
                
                
            }
            default: 
                return state;
        }
    }