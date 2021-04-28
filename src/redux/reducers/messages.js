import { ERROR_MSG, GREEN_MSG, CLEAR_MSG} from "../types";

const initialState = {
  msg: '',
  error:'',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
      case ERROR_MSG:
      return {
        ...state,
        error: payload,
        
      };
      case GREEN_MSG:
      return {
        ...state,
        msg: payload.msg,
       
      };
      case CLEAR_MSG:
      return {
        ...state,
        msg: '',
        error: '',
      };
    default:
      return initialState;
  }
}
