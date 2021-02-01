import { innerBackend } from "../../components/utils/axios";
import { NEW_DEPARTMENT, ALL_DEPARTMENTS, FIND_DEPARTMENT, JOIN_DEPARTMENT, LEAVE_DEPARTMENT, DEPARTMENT_FAIL} from "../types";






export const newDepartment = (data) => async dispatch  => {
    try {

        const res = await innerBackend.post('/div', data)


        dispatch({
            type: NEW_DEPARTMENT,
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

export const allDepartments = () => async dispatch  => {
    try {

        const res = await innerBackend.get('/div/all')

        dispatch({
            type: ALL_DEPARTMENTS,
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

export const findDepartment = (divname) => async dispatch  => {
    try {
        const res = await innerBackend.get(`/div/${divname}`)


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

        const res = await innerBackend.put(`/div/${divname}`)


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

        const res = await innerBackend.delete(`/div/${divname}`)


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