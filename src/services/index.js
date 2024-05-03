import axios from "../utils/axios";
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { datalogger } from "../utils/index.jsx";


export const answerRequest = datalogger((uuidInvestigation, value, keyInvestigationResearcher) => {
    return new Promise((resolve, reject) => {
        const putObject = { answer: value, keyInvestigationResearcher: keyInvestigationResearcher }
        axios.put(import.meta.env.VITE_APP_API_URL + '/researcher/investigation/' + uuidInvestigation + '/answer', putObject, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const fetchInvestigations = datalogger(() => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + '/researcher/investigation/all', { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});


export const getInsurancesService = datalogger((uuidInvestigation) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + '/billing/investigation/' + uuidInvestigation+ '/insurances', { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const fetchProfileService = datalogger((uuidInvestigation) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + '/researcher/profile/' + uuidInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const fetchInvestigation = datalogger((uuid) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + '/' + localStorage.getItem("type") + '/investigation/' + uuid, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
})

export const searchDrugService = datalogger((searchText, country) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + '/hospital/search/drug/' + country + '/'+searchText, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
})

export const searchDrugComponentService = datalogger((searchText, country) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + '/hospital/search/component/' + country + '/' + searchText, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const getStatsPerDiagnosisService = datalogger((uuidInvestigation, icdCode, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_APP_API_URL + '/analytics/' + uuidInvestigation + '/diagnosis/' + icdCode + '/startDate/' + startDate + '/endDate/' + endDate, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
})

export const searchPatientByDiagnosis = datalogger((uuidInvestivation, ictCode) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_APP_API_URL + '/researcher/investigation/' + uuidInvestivation + '/patientsbydiagnose/' + ictCode, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
})

export const uploadFile = datalogger((file) => {
    const formData = new FormData();

    formData.append("files", file);
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: import.meta.env.VITE_APP_API_URL + '/files',
            data: formData,
            headers: { "Authorization": localStorage.getItem("jwt"), 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                reject(response.data);
            });
    });
});

export const getFile = datalogger((fileName) => {

    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_APP_API_URL + '/files/' + fileName, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { 
                console.log('Catch', err); reject(err); 
            });
    });
});

export const searchDiagnosticService = datalogger((searchText) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + '/hospital/search/diagnostic/' + searchText, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
})

export const fetchRecordsPatientFromSurvey = datalogger((uuidInvestigation, patientUUID, surveyUUID) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/submission/" + patientUUID + "/survey/" + surveyUUID, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const fetchRecordsSurveysService = datalogger((uuidInvestigation, surveyUUID) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/survey/" + surveyUUID + "/submissions", { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
})


export const fetchRecordsPatientAllSurveysService = datalogger((uuidInvestigation, patientUUID) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/patient/" + patientUUID + "/submissions", { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
})

export const fetchSubmissionsAllPatientsInvestigationService = datalogger((uuidInvestigation, surveyUUID) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/submissions", { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const addPatient = datalogger((uuidInvestigation, patientData) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/patient", patientData, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => {
                console.log('Catch', err);
                reject(err);
            });
    })
});

export const updatePersonalDataPatientService = datalogger((uuidInvestigation, uuidPatient, patientData) => {
    return new Promise((resolve, reject) => {
        axios.put(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/patient/" + uuidPatient, patientData, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    })
});

export const getTokenWho = datalogger((lang) => {
    return new Promise((resolve, reject) => {
        axios.get(import.meta.env.VITE_APP_API_URL + "/hospital/token/who/" + lang, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    })
});

export const postRecordPatientService = datalogger((postObj, uuidInvestigation, patientId, surveyUUID) => {
    return new Promise((resolve, reject) => {

        axios.post(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/submission/" + patientId + "/survey/" + surveyUUID, postObj, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch((error) => {
                // console.log(error.response);
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log('Catch', error); reject(error);
            });
    });
});

export const updateRecordPatientService = datalogger((postObj, uuidInvestigation, patientId, surveyUUID, idSubmission) => {
    return new Promise((resolve, reject) => {

        axios.put(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/patient/" + patientId + "/survey/" + surveyUUID + "/submission/" + idSubmission, postObj, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const getSubmissionPatientService = datalogger((uuidInvestigation, idSubmission, withRequests) => {
    const queryString = withRequests ? "?findRequests=true" : "";
    return new Promise((resolve, reject) => {
        axios.get(`${import.meta.env.VITE_APP_API_URL}/researcher/investigation/${uuidInvestigation}/submission/${idSubmission}${queryString}`, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });

    });
});

export const getPatientsFromId = datalogger((uuidInvestigation, patientId) => {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/patientsfrom/" + patientId, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject(response.data);
                }
            })
            .catch(err => { console.log('Catch', err); reject(err); });
    });
});

export const resetPassword = datalogger((credentials) => {
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
});


export const getStatsFirstMonitoring = datalogger((uuidInvestigation, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/startDate/" + startDate + "/endDate/" + endDate + "/firstmonitoring", { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const getPatientIdFromDepartment = datalogger((uuidInvestigation, uuidDepartment, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/patients/department/" + uuidDepartment + "/startDate/" + startDate + "/endDate/" + endDate, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const getStatsMostCommonDiagnosis = datalogger((uuidInvestigation, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/most-common-ict/startDate/" + startDate + "/endDate/" + endDate, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const getStatsActivityService = datalogger((uuidInvestigation, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/activity/startDate/" + startDate + "/endDate/" + endDate, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const getStatsAppointmentsDepartment = datalogger((uuidInvestigation, department, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/outpatients/appointments/"+department+"/startDate/" + startDate + "/endDate/" + endDate, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const getBillingDepartments = datalogger((uuidInvestigation, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/billing/startDate/" + startDate + "/endDate/" + endDate, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const getTotalBillingInsurances = datalogger((uuidInvestigation, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/analytics/" + uuidInvestigation + "/billing/insurances/startDate/" + startDate + "/endDate/" + endDate, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});



export const getSharedResearchersService = datalogger((uuidInvestigation) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/researchers", { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const getAgendasInvestigationService = datalogger((uuidInvestigation) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const makeAppointmentService = datalogger((uuidInvestigation, uuidAgenda, uuidPatient, date) => {
    const postObj = {
        uuidPatient,
        timestamp: date.getTime(),
        type: 0
    }
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation+"/appointment/agenda/"+uuidAgenda, postObj, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});


export const getDepartmentsInstitutionService = datalogger((uuidInvestigation) => {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/departments", { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const assignUnitToResearcherService = datalogger((uuidInvestigation, uuidResearcher, uuidDepartment) => {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/unit/" + uuidDepartment + "/toresearcher", { uuidResearcher }, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const removeUnitToResearcherService = datalogger((uuidInvestigation, uuidResearcher, uuidUnit) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/unit/" + uuidUnit + "/removeresearcher/" + uuidResearcher, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});



export const deleteDepartmentService = datalogger((uuidInvestigation, department) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/department/"+department.uuid, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const editDepartmentService = datalogger((uuidInvestigation, department) => {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/department/"+department.uuid, department, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const saveDepartmentService = datalogger((uuidInvestigation, department) => {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/department", department, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const saveUnitService = datalogger((uuidInvestigation, uuidDepartment, unit) => {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/department/" + uuidDepartment, unit, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});

export const editUnitService = datalogger((uuidInvestigation, uuidUnit, unit) => {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/unit/" + uuidUnit, unit, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
});



export function saveUpdateWardService(uuidInvestigation, uuidDepartment, ward) {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/department/" + uuidDepartment + "/ward", ward, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function deleteServiceService(uuidInvestigation, idServiceInvestigation) {
    return new Promise((resolve, reject) => {
        axios.delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/service/" + idServiceInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function deleteWardService(uuidInvestigation, uuidWard) {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/ward/" + uuidWard, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function deleteUnitService(uuidInvestigation, uuidUnit) {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/unit/" + uuidUnit, { headers: { "Authorization": localStorage.getItem("jwt") } })
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


export function updateBedService(uuidInvestigation, bedInfo) {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/bed/" + bedInfo.id, bedInfo, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function deleteBedService(uuidInvestigation, bedInfo) {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/bed/" + bedInfo.id, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function createBedService(uuidInvestigation, uuidWard, bedInfo) {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/ward/" + uuidWard + "/bed", bedInfo, { headers: { "Authorization": localStorage.getItem("jwt") } })
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


export function updateOrderBedsService(uuidInvestigation, uuidWard, bedsReorder) {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/ward/" + uuidWard + "/beds", bedsReorder, { headers: { "Authorization": localStorage.getItem("jwt") } })
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


export function createStayPatientService(uuidInvestigation, idBed, uuidPatient) {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/bed/" + idBed + "/stay", { uuidPatient }, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                reject(response.data);
            })
            .catch((error) => {
                error.errorCode = 500;
                reject(error);
            });
    });
}


export function saveResearcherPermissions(uuidInvestigation, permissions) {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/researcher/investigation/" + uuidInvestigation + "/permissions", permissions, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getWardService(uuidInvestigation, uuidWard) {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/ward/" + uuidWard, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getPatientStaysService(uuidInvestigation, uuidPatient) {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/stays/" + uuidPatient, { headers: { "Authorization": localStorage.getItem("jwt") } })
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



export function dischargePatientService(uuidInvestigation, uuidPatient) {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/discharge", { uuidPatient }, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
