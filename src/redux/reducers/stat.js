import { GET_STAT } from "../types";




const initialState = {

}



export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case GET_STAT:
                return {
                    ...state,
                    newPropose: payload,
                    reload: !state.reload,
                    
                    
                    error: ''
                }
             default:
                return {...state}

            }

        }