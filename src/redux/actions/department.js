import { innerBackend } from "../../components/utils/axios";
import { NEW_DEPARTMENT, ALL_DEPARTMENTS, FIND_DEPARTMENT, JOIN_DEPARTMENT, LEAVE_DEPARTMENT, DEPARTMENT_FAIL,CLEAR_DEPS, ERROR_MSG, GREEN_MSG} from "../types";






export const newDepartment = (formData) => async dispatch  => {
    try {
        const res = await innerBackend.post('/divisions', formData)


        dispatch({
            type: NEW_DEPARTMENT,
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
export const clearDeps = () => async dispatch  => {
  
        dispatch({
            type: CLEAR_DEPS,
        })

}
export const allDepartments = () => async dispatch  => {
    try {

        const res = await innerBackend.get('/divisions/all')

        dispatch({
            type: ALL_DEPARTMENTS,
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

export const findDepartment = (divname) => async dispatch  => {
    try {
        const res = await innerBackend.get(`/divisions/find/${divname}`)


        dispatch({
            type: FIND_DEPARTMENT,
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

export const joinDepartment = (id) => async dispatch  => {
    try {
// console.log('join1' , id)
        const res = await innerBackend.put(`/divisions/${id}`)
        // console.log('join2')


        dispatch({
            type: JOIN_DEPARTMENT,
            payload: res.data
        })
        // console.log('join3')

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

export const deleteDepartment = (divname) => async dispatch  => {
    try {

        const res = await innerBackend.delete(`/divisions/${divname}`)


        dispatch({
            type: LEAVE_DEPARTMENT,
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