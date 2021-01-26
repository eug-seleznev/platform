import { GET_URN } from "../types";




const initialState = {
    urn: ''
}



export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
        case GET_URN:
            return {urn: payload}

            default:
                return state

    }

}