import { ERROR_MSG, GREEN_MSG} from "../types";

const initialState = {
  msg: '',
  error:'',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ERROR_MSG:
      // console.log(payload)

      return {
        ...state,
        error: payload,
        
      };
      case GREEN_MSG:
        // console.log(payload)
      return {
        ...state,
        msg: payload.msg,
       
      };
    default:
      return initialState;
  }
}
