import Axios from "axios";
import { innerBackend } from "../../components/utils/axios";
import { ALL_TICKETS, NEW_TICKET, GET_TICKET, ERROR_MSG, GREEN_MSG } from "../types";
import {url} from '../../components/utils/axios'


export const newTicket = ({formData, file}) => async dispatch  => {

     
    // formData.append('userName', 'Fred');


    try {
        // console.log(formData, 'data')
    const form = new FormData()
    if(file){
        form.append(
            'file',
            file
          )
    }
    

    Object.keys(formData).map((el) => {
        form.append(
            `${el}`, formData[el]
        )
    })



        const res = await Axios.post('/tickets', form, {
            baseURL: url,
            headers: {
                'content-type': 'multipart/form-data', // do not forget this 
                'auth-token': localStorage.token
               }})

        dispatch({
            type: NEW_TICKET,
            payload: res.data
        })
        dispatch({
            type: GREEN_MSG,
            payload: res.data
        })
            // dispatch(loadUser())

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

export const allTickets = () => async dispatch  => {
    try {

        const res = await innerBackend.get('/tickets/all')
        dispatch({
            type: ALL_TICKETS,
            payload: res.data
        })
        // console.log(res.data, 'respond')

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





export const getTicket = (id) => async dispatch  => {
    try {
        // console.log(id, 'my id ticket')
        const res = await innerBackend.get(`/tickets/${id}`)
        dispatch({
            type: GET_TICKET,
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