import { innerBackend } from "../../components/utils/axios";
import { ALL_USERS, USER_ERR, CHANGE_PERMISSION, PERM_RETURN, ONE_USER,SEARCH_USER, CLEAR_ERROR, CLEAR_MSG,ADD_CONTRACTOR,ALL_CONTRACTORS } from "../types";





export const allContractors = () => async dispatch  => {
  try {
      // console.log('hello all users?')
      const res = await innerBackend.get('/merc/find?name=all')
      dispatch({
          type: ALL_CONTRACTORS,
          payload: res.data
      })
      // setAuthToken(localStorage.token);

    }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: USER_ERR,
          payload: error.msg
      })
      })
          
    } 
  }

export const allUsers = ({query, sortOrder}) => async dispatch  => {
    try {
        // console.log('hello all users?')
        const res = await innerBackend.get(`/users/all?field=${query}&order=${sortOrder}`)
        dispatch({
            type: ALL_USERS,
            payload: res.data
        })
        // setAuthToken(localStorage.token);

      }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: USER_ERR,
            payload: error.msg
        })
        })
            
      } 

}
export const searchUser = (request) => async dispatch  => {
  try {
 
      const res = await innerBackend.get(`/users/usr/get?name=${request}`)
      dispatch({
          type: SEARCH_USER,
          payload: res.data
      })

      }
    catch (err) {
      const errors = err.response.data.err
      errors.map(error => {
         return dispatch({
          type: USER_ERR,
          payload: error.msg
      })
      })            
    
  }

}
export const getUser = (id) => async dispatch  => {
  try {
      // console.log('hello 1 user?')
      const res = await innerBackend.get(`/users/${id}`)
      dispatch({
          type: ONE_USER,
          payload: res.data
      })
      // setAuthToken(localStorage.token);

    }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: USER_ERR,
          payload: error.msg
      })
      })
          
    } 

}
export const addContractor = (formData) => async dispatch  => {
  let body = {
    name:formData.name,
    lastname: formData.lastname,
    job: formData.job,
    contacts: {
      phone:formData.phone,
      email:formData.email
    }
  }
  try {
      console.log(body)
      const res = await innerBackend.post(`/merc`, body)
      dispatch({
          type: ADD_CONTRACTOR,
          payload: res.data
      })
      // setAuthToken(localStorage.token);

    }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: USER_ERR,
          payload: error.msg
      })
      })
          
    } 

}
export const permissionReturn = () =>  dispatch => {
  return dispatch({
    type: PERM_RETURN,
    
  })
}

export const userPermissions = (perm, id) => async dispatch  => {
  let body = {
    permission: perm
}
  try {
      // console.log('hello permissions', id, perm) 
      const res = await innerBackend.put(`/users/permchange/${id}`, body)
      dispatch({
          type: CHANGE_PERMISSION,
          payload: res.data
      })
      // setAuthToken(localStorage.token);

    }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: USER_ERR,
          payload: error.msg
      })
      })
          
    } 

}
