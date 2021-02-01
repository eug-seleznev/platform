import { GET_STATUS, GET_URN } from "../types";




const initialState = {
    urn: '',
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
                urn: payload
            }
        case GET_STATUS:
            return {
                ...state,
                status: payload
            }

            default:
                return state

    }

}