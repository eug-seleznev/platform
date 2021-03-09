import { innerBackend } from "../../components/utils/axios";
import { ALL_USERS, USER_ERR,EDIT_CONTRACTOR, CHANGE_PERMISSION, PERM_RETURN,ONE_CONTRACTOR, ONE_USER,SEARCH_USER,BACK_WHITE, CLEAR_ERROR, CLEAR_MSG,ADD_CONTRACTOR,ALL_CONTRACTORS, ERROR_MSG, GREEN_MSG,PARTITION_UPDATE} from "../types";





export const allContractors = () => async dispatch  => {
  try {
      // console.log('hello all users?')
      const res = await innerBackend.get('/merc/search?name=all')
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
          type: ERROR_MSG,
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
            type: ERROR_MSG,
            payload: error.msg
        })
        })
            
      } 

}


export const userSearch = (formData) => async dispatch => {
  try {
    ///users/usr/get?name=huila&division=govnoedi&partition=HUY
    const res = await innerBackend.get(`users/usr/get?name=${formData.name}&division=${formData.division}&partition=${formData.partition}`)
    dispatch({
      type: SEARCH_USER,
      payload: res.data
    });
  } catch (err) {
    alert('aaaaaaaaaaaaaaa')
  }
}


export const usersPartition = (partition) => async dispatch =>  {
  try {
    let body = {
      partition: partition
    }
    console.log(body);

    const res = await innerBackend.put('users/part', body)

    dispatch({
      type: PARTITION_UPDATE,
      payload: res.data
    })

  } catch (err) {
    console.log('lol')


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
          type: ERROR_MSG,
          payload: error.msg
      })
      })            
    
  }

}
export const editContractor = (id, formData) => async dispatch  => {
  try {
      console.log(formData)
      const res = await innerBackend.put(`/merc/new/edit/${id}`,formData)
      dispatch({
          type: EDIT_CONTRACTOR,
          payload: res.data
      })
      // setAuthToken(localStorage.token);

    }
    catch (err) {
      const error = err.response.data.err;
      
         return dispatch({
          type: ERROR_MSG,
          payload: error
    
      })
          
    } 

}
export const getContractor = (id) => async dispatch  => {
  try {
      // console.log('hello 1 user?')
      const res = await innerBackend.get(`/merc/search?name=${id}`)
      dispatch({
          type: ONE_CONTRACTOR,
          payload: res.data
      })
      // setAuthToken(localStorage.token);

    }
    catch (err) {
      const errors = err.response.data.err;
      errors.map(error => {
         return dispatch({
          type: ERROR_MSG,
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
          type: ERROR_MSG,
          payload: error.msg
      })
      })
          
    } 

}
export const background = (value) =>  dispatch => {
  return dispatch({
    type: BACK_WHITE,
    payload: value
  })
}
export const addContractor = (formData) => async dispatch  => {
  let body = {
    name:formData.name,
    lastname: formData.lastname,
    partition:formData.partition,
    phone:formData.phone,
    email:formData.email
  }
  try {
      console.log(body)
      const res = await innerBackend.post(`/merc/new`, body)
      dispatch({
          type: ADD_CONTRACTOR,
          payload: res.data
      })
      dispatch({
        type: GREEN_MSG,
        payload: res.data
    })
      // setAuthToken(localStorage.token);

    }
    catch (err) {
      const error = err.response.data.err;
      console.log(error)
    
         dispatch({
          type: ERROR_MSG,
          payload: error
         })
    
          
    

}}
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
          type: ERROR_MSG,
          payload: error.msg
      })
      })
          
    } 

}
