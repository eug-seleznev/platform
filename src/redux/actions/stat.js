









//GET /news/get/stats?type=all/все-что_угодно_что_не_all

import { innerBackend } from "../../components/utils/axios";
import { GET_STAT } from "../types";



export const getStat = () => async (dispatch) => {
  try {
    const res = await innerBackend.get(
      `/news/get/stats?type=all`);

    dispatch({
      type: GET_STAT,
      payload: res.data,
    });

    console.log(res.data);
  } catch (err) {}
};