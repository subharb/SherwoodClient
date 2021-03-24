import axios from "../utils/axios";
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export function answerRequest(uuidInvestigation, value, keyInvestigationResearcher) {
  return new Promise((resolve, reject) => {
    const putObject= {answer:value, keyInvestigationResearcher:keyInvestigationResearcher}
    axios.put(process.env.REACT_APP_API_URL+'/researcher/investigation/'+uuidInvestigation+'/answer', putObject, { headers: {"Authorization" : localStorage.getItem("jwt")}})
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

export function fetchProfileService() {
    return new Promise((resolve, reject) => {
      
      axios.get(process.env.REACT_APP_API_URL+'/researcher/profile', { headers: {"Authorization" : localStorage.getItem("jwt")}})
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

export function fetchInvestigation(uuid) {
    return new Promise((resolve, reject) => {
      
        axios.get(process.env.REACT_APP_API_URL+'/'+localStorage.getItem("type")+'/investigation/'+uuid, { headers: {"Authorization" : localStorage.getItem("jwt")}})
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

export function fetchRecordsPatientFromSurvey(uuidInvestigation, patientUUID, surveyUUID) {
    return new Promise((resolve, reject) => {
      
        axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/submission/"+patientUUID+"/survey/"+surveyUUID, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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


export function fetchRecordsPatientAllSurveysService(uuidInvestigation, patientUUID) {
    return new Promise((resolve, reject) => {
      
        axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/patient/"+patientUUID+"/submissions", { headers: {"Authorization" : localStorage.getItem("jwt")} })
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

export function fetchSubmissionsAllPatientsInvestigationService(uuidInvestigation, surveyUUID) {
    return new Promise((resolve, reject) => {
      
        axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/submissions", { headers: {"Authorization" : localStorage.getItem("jwt")} })
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

export function addPatient(uuidInvestigation, patientData){
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/patient", patientData , { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .then((response) => {
                if(response.status === 200){
                    resolve(response.data);
                }
                else{
                    reject(response.data);
                }
            })
            .catch(err => {console.log('Catch', err); reject(err);}); 
    })
}

export function postRecordPatientService(postObj, uuidInvestigation, patientId, surveyUUID) {
    return new Promise((resolve, reject) => {
        
        axios.post(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/submission/"+patientId+"/survey/"+surveyUUID, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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
