import { GET_STAT, GET_WEEKLY_TASK } from "../types";




const initialState = {
  dailyusers: null,
  weeklyTask: null
};



export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch(type){
       

            case GET_STAT:
                return {
                    ...state,
                    dailyusers: payload,
                    reload: !state.reload,
                    error: ''
                }
            case GET_WEEKLY_TASK:
                return {
                    ...state,
                    weeklyTask: payload

                }
             default:
                return {...state}

            }

        }