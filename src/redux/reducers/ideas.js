import { GET_IDEAS, LIKE_IDEA, MOVE_IDEA, POST_IDEA,DELETE_IDEA } from "../types";



const initialState = {
    new: null,
    work: null,
    done: null
    
}


export default function(state = initialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {
      case GET_IDEAS:
      case DELETE_IDEA:
        return {
          ...state,
          new: payload.unapproved,
          work: payload.approved,
          done: payload.finished,
        }
      case MOVE_IDEA:
        return {
          ...state,
          new: payload.unapproved,
          work: payload.approved,
          done: payload.finished,
        };
      case POST_IDEA:
      case LIKE_IDEA:
        return {
          ...state,
          new: payload,
        };

      default:
        return state;
    }
}