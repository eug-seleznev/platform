import Axios from "axios";
import { GET_TOKEN, GET_URN, NEW_ERROR } from "../types";

export const postModel = (formData) => async (dispatch) => {
  // formData.append('userName', 'Fred');

  try {
    // console.log(formData, 'data')
    const form = new FormData();

    Object.keys(formData).map((el, index) => {
      form.append(`${el}`, formData[el]);
    });

    const res = await Axios.post("/up/upload/p", form, {
      baseURL: "http://192.168.0.16:7770",
      headers: {
        "content-type": "multipart/form-data",
        "auth-token": localStorage.token,
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
        type: NEW_ERROR,
        payload: error.msg,
      });
    });
  }
};


export const Oauth = (crypt) => async (dispatch) => {
  try {
        const res = await Axios.get(`/up/tkn/p/${crypt}`,  {
          baseURL: "http://192.168.0.16:7770",
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
        type: NEW_ERROR,
        payload: error.msg,
      });
    });
  }
};



export const Status = (crypt) => async (dispatch) => {
  try {
    console.log('hello')
    const res = await Axios.get(`/up/status/p/${crypt}`, {
      baseURL: "http://192.168.0.16:7770",
      headers: {
        "content-type": "application/json",
      },
    });
    dispatch({
      type: GET_TOKEN,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    errors.map((error) => {
      return dispatch({
        type: NEW_ERROR,
        payload: error.msg,
      });
    });
  }
};