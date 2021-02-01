import { innerBackend } from "../../components/utils/axios";
import { NEW_DEPARTMENT, ALL_DEPARTMENTS, FIND_DEPARTMENT, JOIN_DEPARTMENT, LEAVE_DEPARTMENT, DEPARTMENT_FAIL} from "../types";






export const newDepartment = (formData) => async dispatch  => {
    try {
        console.log(formData, 'dadadadta')
        const res = await innerBackend.post('/divisions', formData)

        console.log(formData, '222222')

        dispatch({
            type: NEW_DEPARTMENT,
            payload: res.data
        })
        console.log(formData, '333333333333')

        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: DEPARTMENT_FAIL,
            payload: error.msg
        })
        })            
      
    }

}

export const allDepartments = () => async dispatch  => {
    try {
        console.log( '111111111111')

        const res = await innerBackend.get('/divisions/all')
        console.log(res, '2222222222222')

        dispatch({
            type: ALL_DEPARTMENTS,
            payload: res.data
        })
        console.log( '333333333333333')

        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: DEPARTMENT_FAIL,
            payload: error.msg
        })
        })            
      
    }

}

export const findDepartment = (divname) => async dispatch  => {
    try {
        const res = await innerBackend.get(`/divisions/${divname}`)


        dispatch({
            type: FIND_DEPARTMENT,
            payload: res.data
        })

        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: DEPARTMENT_FAIL,
            payload: error.msg
        })
        })            
      
    }

}

export const joinDepartment = (divname) => async dispatch  => {
    try {

        const res = await innerBackend.put(`/divisions/${divname}`)


        dispatch({
            type: JOIN_DEPARTMENT,
            payload: res.data
        })

        }
      catch (err) {
        const errors = err.response.data.err;
        errors.map(error => {
           return dispatch({
            type: DEPARTMENT_FAIL,
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
            type: DEPARTMENT_FAIL,
            payload: error.msg
        })
        })            
      
    }

}