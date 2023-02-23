import axios from "axios";
import { IAgenda, IAppointment, IBox, IOutpatientsInfo, IResearcher } from "../constants/types";
import { IService, IServiceInvestigation } from "../pages/hospital/Service/types";



export function getOutpatientsInfo(uuidInvestigation: string): Promise<{ status: number, outpatientInfo: IOutpatientsInfo }> {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation + "/outpatientsinfo", { headers: { "Authorization": localStorage.getItem("jwt") } })
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
export function getReseachersFromDepartment(uuidInvestigation: string, uuidDepartment:string): Promise<{ status: number, researchers: IResearcher[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation + "/box/all", { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getServicesInvestigationService(uuidInvestigation: string, serviceType:number): Promise<{ status: number, servicesInvestigation: IServiceInvestigation[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API_URL + "/hospital/" + uuidInvestigation + "/services/" + serviceType, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getBoxesService(uuidInvestigation: string): Promise<{ status: number, boxes: IBox[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation + "/box/all", { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function saveBoxService(uuidInvestigation: string, box:IBox): Promise<{ status: number, box: IBox }> {
    return new Promise((resolve, reject) => {
        axios
            .post(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation + "/box", box, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function saveAgendaService(uuidInvestigation: string, agenda:IAgenda): Promise<{ status: number, agenda: IAgenda }> {
    return new Promise((resolve, reject) => {
        axios
            .post(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation, agenda, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getAgendaService(uuidInvestigation: string, uuidAgenda:string): Promise<{ status: number, agenda: IAgenda }> {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation+"/"+uuidAgenda, { headers: { "Authorization": localStorage.getItem("jwt") } })
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


export function getAppoinmentsDateService(uuidInvestigation: string, uuidAgenda:string, date:Date): Promise<{ status: number, appointments: IAppointment[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation + "/appointment/agenda/"+uuidAgenda+"/date/"+date.getTime(), { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function updateAppoinmentsService(uuidInvestigation: string, uuidAppointment:string): Promise<{ status: number, appointment: IAppointment }> {
    return new Promise((resolve, reject) => {
        axios
            .put(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation + "/appointment/"+uuidAppointment+"/showup", {}, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getPatientsAppoinmentsService(uuidInvestigation: string, uuidPatient:string): Promise<{ status: number, appointments: IAppointment[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.REACT_APP_API_URL + "/agenda/" + uuidInvestigation + "/patient/"+uuidPatient+"/appointments", { headers: { "Authorization": localStorage.getItem("jwt") } })
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

