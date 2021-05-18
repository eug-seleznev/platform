
import axios from 'axios'


export const url = process.env.REACT_APP_IP;
// console.log(url, 'utl')



export const setAuthToken = (token) => {
    if(token){
        innerBackend.defaults.headers.common['auth-token'] = token;
    } 
}





export const innerBackend = axios.create ({
        baseURL: url,
        headers: {
            accept: 'application/json',
        
        }
       
    })





export const instance = axios.create({
    baseURL: url,
    headers: {
        accept: 'application/json',
      }})



