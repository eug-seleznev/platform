import Axios from "axios";
import { GET_TOKEN, GET_URN, GET_STATUS, CLEAR_MODEL_DATA, ERROR_MSG } from "../types";
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
    // console.log(res.data)
    dispatch({
      type: GET_URN,
      payload: res.data,
    });
    console.log(res.data)
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



export const Status = ({crypt, name}) => async (dispatch) => {
  try {
    if(name !== ''){
        let date = new Date().getMilliseconds();
        const res = await Axios.get(`/up/status/p/${crypt}?id=${name}`, {
          baseURL: url,
          headers: {
            "content-type": "application/json",
          },
        });
        dispatch({
          type: GET_STATUS,
          payload: res.data.progress + " " + date,
        });
    } else {
      //clear status on model submit
      dispatch({
        type: GET_STATUS,
        payload: "not started",
      });
    }
   
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
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