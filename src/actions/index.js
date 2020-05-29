import axios from 'axios'

import { LOGIN_USER } from './types';

/**
 * Makes a request to login a user
 * @constructor
 * @param {string} email - Email of the user.
 * @param {string} password - Password hashed already
 */
export const loginUser = (email, password) => async dispatch => {
    const postObj = {email:email, password:password};
    const request = await axios.post(process.env.REACT_APP_API_URL+'/researchers/login', postObj)
        .catch(err => console.log('Catch', err)); 
    
    //Guardamos el token si la request fue exitosa
    if(request.status === 200){
        console.log("TOKEN: "+request.data.token);
        localStorage.setItem("jwt", request.data.token);
    }
    // dispatch({
    //     type : LOGIN_USER,
    //     payload : request.data
    // });
}