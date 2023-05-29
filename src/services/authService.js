import axios from "../utils/axios";
import { decryptData, saveData } from '../utils/index.jsx';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export function fetchUser(){
    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_API_URL+'/researcher/validate', { headers: {"Authorization" : localStorage.getItem("jwt")}})
            .then((response) => {
                resolve(response.status === 200);
            })
            .catch(err => {console.log('Catch', err); reject(err);}); 
    });
}

export function signIn(credentials, typeUser) {
  return new Promise((resolve, reject) => {
    saveData("password", credentials.password); 
    console.log("Pass", credentials.password);
    credentials.password = CryptoJS.SHA256(credentials.password).toString(CryptoJS.enc.Base64) 
    console.log("Pass Encr", credentials.password);
    axios.post(process.env.REACT_APP_API_URL+'/'+typeUser+'/login', credentials)
        .then((response) => {
            if(response.status === 200){
                console.log("TOKEN: "+response.data.jwt);
                saveData("jwt", response.data.jwt);
                saveData("type", typeUser);
                const payload = jwt.decode(localStorage.getItem("jwt"));
                const rawKeyResearcher = decryptData(payload.keyResearcher, localStorage.getItem("password"));
                saveData("rawKeyResearcher", rawKeyResearcher);
                saveData("name", payload.name);
                saveData("surnames", payload.surnames);
                saveData("uuid", payload.uuid);
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
