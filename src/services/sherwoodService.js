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

export function searchDrugService(searchText, country) {
    return new Promise((resolve, reject) => {
      
        axios.get(process.env.REACT_APP_API_URL+'/hospital/search/drug/'+country+'/'+searchText, { headers: {"Authorization" : localStorage.getItem("jwt")}})
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

export function searchDrugComponentService(searchText, country) {
    return new Promise((resolve, reject) => {
      
        axios.get(process.env.REACT_APP_API_URL+'/hospital/search/component/'+country+'/'+searchText, { headers: {"Authorization" : localStorage.getItem("jwt")}})
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

export function uploadFile(file) {
    const formData = new FormData();

    formData.append("files", file);
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL+'/files',
            data: formData,
            headers: {"Authorization" : localStorage.getItem("jwt"), 'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                console.log(response);
                if(response.status === 200){
                    resolve(response.data);
                }
                else{
                    reject(response.data);
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                reject(response.data);
            });
    });
}

export function getFile(fileName) {
 
    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_API_URL+'/files/'+fileName, { headers: {"Authorization" : localStorage.getItem("jwt")}})
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



export function searchDiagnosticService(searchText) {
    return new Promise((resolve, reject) => {
      
        axios.get(process.env.REACT_APP_API_URL+'/hospital/search/diagnostic/'+searchText, { headers: {"Authorization" : localStorage.getItem("jwt")}})
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

export function fetchRecordsSurveysService(uuidInvestigation, surveyUUID) {
    return new Promise((resolve, reject) => {
        
        axios.get(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/survey/"+surveyUUID+"/submissions", { headers: {"Authorization" : localStorage.getItem("jwt")} })
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

export function updatePersonalDataPatientService(uuidInvestigation, uuidPatient, patientData){
    return new Promise((resolve, reject) => {
        axios.put(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/patient/"+uuidPatient, patientData , { headers: {"Authorization" : localStorage.getItem("jwt")} })
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

export function getTokenWho(lang){
    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_API_URL+"/hospital/token/who/"+lang, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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

export function updateRecordPatientService(postObj, uuidInvestigation, patientId, surveyUUID, idSubmission) {
    return new Promise((resolve, reject) => {
        
        axios.put(process.env.REACT_APP_API_URL+"/researcher/investigation/"+uuidInvestigation+"/patient/"+patientId+"/survey/"+surveyUUID+"/submission/"+idSubmission, postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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
