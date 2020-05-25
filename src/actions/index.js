import axios from 'axios'

import { LOGIN_USER } from './types';

export const loginUser = (email, password) => async dispatch => {
    const postObj = {email:email, password:password};
    const request = await axios.post(process.env.REACT_APP_API_URL+'/researchers/login', postObj)
        .catch(err => console.log('Catch', err)); 
    
    dispatch({type : LOGIN_USER,
        payload : request
    });
}