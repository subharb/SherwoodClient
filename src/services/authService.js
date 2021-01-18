import axios from "../utils/axios";
import { decryptData } from '../utils';
import jwt from 'jsonwebtoken';

export function signIn(credentials, typeUser) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API_URL+'/'+typeUser+'/login', credentials)
        .then((response) => {
            if(response.status === 200){
                console.log("TOKEN: "+response.data.jwt);
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("type", typeUser);
                const payload = jwt.decode(localStorage.getItem("jwt"));
                const rawKeyResearcher = decryptData(payload.keyResearcher, localStorage.getItem("password"));
                localStorage.setItem("rawKeyResearcher", rawKeyResearcher);
        
                axios.defaults.headers['Authorization'] = localStorage.getItem('jwt');
                resolve(response.data);
            }
            else{
                reject(response.data);
            }
        })
        .catch(err => {console.log('Catch', err); reject(err);}); 
  });
}

export function signUp(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/sign-up", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function resetPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/reset-password", credentials)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
