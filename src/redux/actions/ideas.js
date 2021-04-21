import { innerBackend } from "../../components/utils/axios";
import { GET_IDEAS, LIKE_IDEA, MOVE_IDEA, POST_IDEA,DELETE_IDEA } from "../types";








export const getAll = () => async (dispatch) => {
  try {
    const res = await innerBackend.get("/ideas/all");
    console.log(res.data)
    dispatch({
      type: GET_IDEAS,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.err;
    // errors.map((error) => {
    //   return dispatch({
    //     type: ERROR_MSG,
    //     payload: error.msg,
    //   });
    // });
  }
};




export const postNew = (formData) => async (dispatch) => {
  try {
    const res = await innerBackend.post("/ideas", formData);
    console.log(res.data)
    dispatch({
      type: POST_IDEA,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.err;
    // errors.map((error) => {
    //   return dispatch({
    //     type: ERROR_MSG,
    //     payload: error.msg,
    //   });
    // });
  }
};

export const deleteIdea = (id) => async (dispatch) => {
  try {
    const res = await innerBackend.delete(`/ideas/delete/${id}`);
    console.log(res.data)
    dispatch({
      type: DELETE_IDEA,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.err;
    // errors.map((error) => {
    //   return dispatch({
    //     type: ERROR_MSG,
    //     payload: error.msg,
    //   });
    // });
  }
};

export const likeIdea = ({id}) => async (dispatch) => {
  try {
    const res = await innerBackend.put(`/ideas/like/${id}`);
    console.log(res.data)
    dispatch({
      type: LIKE_IDEA,
      payload: res.data,
    });
  } catch (err) {
    // const errors = err.response.data.err;
    // errors.map((error) => {
    //   return dispatch({
    //     type: ERROR_MSG,
    //     payload: error.msg,
    //   });
    // });
  }
};




export const moveIdea = ({id, type}) => async (dispatch) => {
  
  try {
    const res = await innerBackend.put(`/ideas/typechange?id=${id}&type=${type}`);
    dispatch({
      type: MOVE_IDEA,
      payload: res.data
    })
    console.log(res.data)
  } catch (err) {
    alert('nope')  
  }
}
