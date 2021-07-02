









//GET /news/get/stats?type=all/все-что_угодно_что_не_all

import { innerBackend } from "../../components/utils/axios";
import { GET_STAT, GET_WEEKLY_TASK } from "../types";



export const getStat = () => async (dispatch) => {
  try {
    const res = await innerBackend.get(
      `/news/get/stats?type=all`);

    dispatch({
      type: GET_STAT,
      payload: res.data,
    });

    // console.log(res.data);
  } catch (err) {}
};


// get / news / get / stats / week;
export const WeeklyTask = () => async (dispatch) => {
  try {
    // console.log('ermmmm')
      const res = await innerBackend.get('/news/get/stats/week')
      // console.log(res.data)
      dispatch({
        type: GET_WEEKLY_TASK,
        payload: res.data
      })
  } catch (err) {
    
  }
} 