import Axios from "axios";
import { GET_TOKEN, GET_URN, NEW_ERROR, GET_STATUS, CLEAR_MODEL_DATA, ERROR_MSG } from "../types";
let url = process.env.REACT_APP_IP_MODELS;




export const postModel = (formData) => async (dispatch) => {
  try {

    const form = new FormData();

    Object.keys(formData).map(el => {
      form.append(`${el}`, formData[el]);
    });


    
    const res = await Axios.post("/up/upload/p", form, {
      baseURL: url,
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch({
      type: GET_URN,
      payload: res.data,
    });
    // dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;
    errors.map((error) => {
      return dispatch({
        type: ERROR_MSG,
        payload: error.msg,
      });
    });
  }
};


export const Oauth = (crypt) => async (dispatch) => {
  try {
        const res = await Axios.get(`/up/tkn/p/${crypt}`,  {
          baseURL: url,
          headers: {
            "content-type": "application/json",
          },
        });
    dispatch({
      type: GET_TOKEN,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    errors.map((error) => {
      return dispatch({
        type: ERROR_MSG,
        payload: error.msg,
      });
    });
  }
};



export const Status = (crypt) => async (dispatch) => {
  try {
     console.log('started')
     let date = new Date().getMilliseconds();
    const res = await Axios.get(`/up/status/p/${crypt}`, {
      baseURL:url,
      headers: {
        "content-type": "application/json",
      },
    });
    dispatch({
      type: GET_STATUS,
      payload: res.data.progress +' '+ date,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    errors.map((error) => {
      return dispatch({
        type: ERROR_MSG,
        payload: error.msg,
      });
    });
  }
};


export const cleardData = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_MODEL_DATA
    })
  } catch (err) {
    
  }
}