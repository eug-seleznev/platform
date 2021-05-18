import {REGISTER, USER_TASKS, LOGIN, USER_LOADED,CHANGE_AVATAR,CLEAR_MSG,CLEAR_ERROR, CHANGE_USERDATA, CHANGE_LOADED, ADD_SPRINT_TO_CHOSEN, ERROR_MSG, GREEN_MSG} from '../types'
import {innerBackend, instance, setAuthToken} from '../../components/utils/axios'



// LOAD USER 
export const loadUser = () => async dispatch => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
      innerBackend(localStorage.token);
    }

  try {

        const res = await innerBackend.get("/users/me");
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
        dispatch({
          type: GREEN_MSG,
          payload: res.data,
        });
    



     }

    
     
   catch (err) {
    console.log(err.response.data, 'ERROR!!!')
  }
}
   
  
    
export const msgAuthClear = ()=>dispatch => {
    
    return dispatch({
        type: CLEAR_MSG,
    
      })
}

export const login = (formData) => async dispatch  => {
    try {
        const res = await instance.post('/auth', formData)
        dispatch({
            type: LOGIN,
            payload: res.data
        })
                  setAuthToken(res.data.token);
                  dispatch(loadUser())
                 
                  
                  

        }
      catch (err) {
        const errors = err.response.data.errors;
        errors.map(err => {
          
           return dispatch({
            type: ERROR_MSG,
            payload: err.err
        })
        })            
      
    }

}


export const register = ({formData}) => async dispatch  => {


    try {
        const res = await instance.post('/users', formData)
        dispatch({
            type: REGISTER,
            payload: res.data
        })
         setAuthToken(localStorage.token);
         dispatch(loadUser());
      }
      catch (err) {
        const errors = err.response.data
 
    
           dispatch({
              type: ERROR_MSG,
              payload: errors
        })
      

        
        
            
      } 

}
export const changeData = (formData) => async dispatch  => {
  /////////////////////////
  // let body ={
  //   name: formData.name,
  //   email: formData.email,
  //   position: formData.position,
    
  // }
  //////////////////////
  try {
      // console.log('hello change', formData)
      const res = await innerBackend.put(`/users/me`, formData)
      dispatch({
          type: CHANGE_USERDATA,
          payload: res.data
      })
      dispatch({
        type: GREEN_MSG,
        payload: res.data
    })

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
export const changeAvatar = (file) => async dispatch  => {

  try {
    console.log('file is here::::::',file)
  
  const form = new FormData()
  if(file){
      form.append(
          'file',
          file
        )
  }
    console.log(form, 'form?')

      console.log(form.get('file'), 'file HERE')
   


      const res = await innerBackend.put(`/users/me/a`, form)
console.log('res is here::::::',res.data)

      dispatch({
          type: CHANGE_AVATAR,
          payload: res.data
      })
  

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

export const getUserTasks = () => async dispatch  => {
  try {
      // console.log('hello 1 user?')
      const res = await innerBackend.get(`/users/me?tasks=true`)
      dispatch({
          type: USER_TASKS,
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
export const addToChosen = (id) => async dispatch  => {
  // console.log ('hi sprint', id)
  try {
      const res = await innerBackend.put(`projects/favsprint/${id}`)
      dispatch({
          type: ADD_SPRINT_TO_CHOSEN,
          payload: res.data
      })
      dispatch({
        type: GREEN_MSG,
        payload: res.data
    })
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


export const changeLoaded = () =>  dispatch => {
  return dispatch({
    type: CHANGE_LOADED,
    
  })
}
