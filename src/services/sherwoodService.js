import axios from "../utils/axios";
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export function answerRequest(uuidInvestigation, value) {
  return new Promise((resolve, reject) => {
    const postObject= {value:value}
    axios.post(process.env.REACT_APP_API_URL+'/researcher/investigation/'+uuidInvestigation+'/answer', postObject, { headers: {"Authorization" : localStorage.getItem("jwt")}})
        .then((response) => {
            if(response.status === 200){
                resolve(response.data);
            }
            else{
                reject(response.data);
            }
        })
        .catch(err => {console.log('Catch', err); reject(err);}); 
  });
}

export function updateListKeyPatientResearcher(listPatients){
    const putObject = { listPatients : listPatients};
    return new Promise((resolve, reject) => {
    
        axios.put(process.env.REACT_APP_API_URL+'/researcher/updatekeys/patients', putObject, { headers: {"Authorization" : localStorage.getItem("jwt")}})
            .then((response) => {
                if(response.status === 200){
                    resolve(response.data);
                }
                else{
                    reject(response.data);
                }
            })
            .catch(err => {console.log('Catch', err); reject(err);}); 
      });
}

export function fetchInvestigations() {
    return new Promise((resolve, reject) => {
      
      axios.get(process.env.REACT_APP_API_URL+'/researcher/investigation/all', { headers: {"Authorization" : localStorage.getItem("jwt")}})
          .then((response) => {
              if(response.status === 200){
                  resolve(response.data);
              }
              else{
                  reject(response.data);
              }
          })
          .catch(err => {console.log('Catch', err); reject(err);}); 
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
