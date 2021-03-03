import { GET_STATUS, CLEAR_MODEL_DATA } from "../types";




const initialState = {
    urn: null,
    status: ''
}



export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type) {

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