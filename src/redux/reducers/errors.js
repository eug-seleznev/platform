import { ERROR_MSG } from "../types";

const initialState = {
  msg: '',
  color: '',

};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ERROR_MSG:
      return {
        ...state,
        msg: payload.msg,
        color: payload.color
      };
      
    default:
      return initialState;
  }
}
