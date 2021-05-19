import { ADD_NEW_CARD } from "../types";



const initialState = {
    cardsArray: [],
}


export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {
      case ADD_NEW_CARD:
        return {
          ...state,
          cardsArray: payload,
        };

      default:
        return state;
    }
}