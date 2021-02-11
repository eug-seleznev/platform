import { GET_STATUS, GET_URN, CLEAR_MODEL_DATA } from "../types";




const initialState = {
    urn: null,
    status: ''
}



export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type) {
        case GET_URN:
            return {
                ...state,
                status: 'started'
            }
        case GET_STATUS:
            return {
              ...state,
              status: payload
            };
        case CLEAR_MODEL_DATA:
            return  initialState
        

            default:
                return state

    }

}