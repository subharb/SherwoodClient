import axios from 'axios'

import { LOGIN_USER, LOADING, FETCH_INVESTIGATION } from './types';

/**
 *  Makes a request to login a user
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



/**
 *  Fetches an investigation
 * @param {string} uuidInvestigation - uuidInvestigation
*/
export const fetchInvestigation = (uuidInvestigation) => async dispatch => {
    
    const request = await axios.get(process.env.REACT_APP_API_URL+'/investigation/'+uuidInvestigation)
        .catch(err => console.log('Catch', err)); 
    
    dispatch({
        type : FETCH_INVESTIGATION,
        payload : request,
        meta: uuidInvestigation
    });
}

/**
 * Changes the state of Loading, that hides or shows the loading screen
 */
export const toogleLoading = ()  => dispatch => {
    
    dispatch({
        type : LOADING
    });
}
