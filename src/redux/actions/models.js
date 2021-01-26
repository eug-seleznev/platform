import Axios from "axios";
import { GET_URN } from "../types";

export const newTicket = ({ formData, file }) => async (dispatch) => {
  // formData.append('userName', 'Fred');

  try {
    // console.log(formData, 'data')
    const form = new FormData();
    if (file) {
      form.append("file", file);
    }

    Object.keys(formData).map((el, index) => {
      form.append(`${el}`, formData[el]);
    });

    const res = await Axios.post("/tickets", form, {
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
