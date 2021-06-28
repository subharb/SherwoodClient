import axios from 'axios'
import jwt from 'jsonwebtoken';

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
        const payload = jwt.decode(localStorage.getItem("jwt"));
        localStorage.setItem("keyResearcher", payload.keyResearcher);
    }
}



/**
 *  Fetches an investigation
 * @param {string} uuidInvestigation - uuidInvestigation
*/
export const fetchInvestigation = (uuidInvestigation) => async dispatch => {
    
    const request = await axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem('type')+'/investigation/'+uuidInvestigation)
       
    
    dispatch({
        type : FETCH_INVESTIGATION,
        payload : request,
        meta: uuidInvestigation
    });
}

/**
 * Changes the state of Loading, that hides or shows the loading screen
 */
export const toggleLoading = ()  => dispatch => {
    
    dispatch({
        type : LOADING
    });
}
