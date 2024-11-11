import axios from "axios";
import { IAgenda, IAppointment, IBox, IOutpatientsInfo, IResearcher } from "../constants/types";
import { IService, IServiceInvestigation } from "../pages/hospital/Service/types";



export function getOutpatientsInfo(uuidInvestigation: string): Promise<{ status: number, outpatientInfo: IOutpatientsInfo }> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/outpatientsinfo", { headers: { "Authorization": localStorage.getItem("jwt") } })
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
            .get(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/box/all", { headers: { "Authorization": localStorage.getItem("jwt") } })
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
            .get(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/services/" + serviceType, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
            .get(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/box/all", { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getServiceGeneralService(serviceType:number): Promise<{ status: number, services: IService[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/hospital/servicesgeneral/" + serviceType, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                }
                reject(response.data); 
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export function saveServiceInvestigationService(uuidInvestigation: string, serviceInvestigation:IServiceInvestigation): Promise<{ status: number, serviceInvestigation: IServiceInvestigation }> {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/service/", serviceInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } }).then((response) => {
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
    
export function updateServiceInvestigationService(uuidInvestigation: string, serviceInvestigation:IServiceInvestigation): Promise<{ status: number, serviceInvestigation: IServiceInvestigation }> {
    return new Promise((resolve, reject) => {
        axios.put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/service/"+serviceInvestigation.id, serviceInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } }).then((response) => {
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
            .post(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/box", box, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function updateBoxService(uuidInvestigation: string, box:IBox): Promise<{ status: number, box: IBox }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/box/"+box.uuid, box, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
            .post(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation, agenda, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function updateAgendaService(uuidInvestigation: string, agenda:IAgenda): Promise<{ status: number, agenda: IAgenda }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation+"/"+agenda.uuid, agenda, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function deleteAgendaService(uuidInvestigation: string, uuidAgenda:string): Promise<{ status: number, agenda: IAgenda }> {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation +"/"+uuidAgenda, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function deleteBoxService(uuidInvestigation: string, uuidBox:string): Promise<{ status: number, box: IBox }> {
    return new Promise((resolve, reject) => {
        axios
            .delete(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation +"/box/"+uuidBox, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
            .get(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation+"/"+uuidAgenda, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function blockDateAgenda(uuidInvestigation: string, uuidAgenda:string, dateTS:number): Promise<{ status: number, agenda: IAgenda }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation+"/agenda/"+uuidAgenda+"/blockdate/"+dateTS, {}, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function freeDateAgenda(uuidInvestigation: string, uuidAgenda:string, dateTS:number): Promise<{ status: number, agenda: IAgenda }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation+"/agenda/"+uuidAgenda+"/freedate/"+dateTS, {}, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getAppoinmentsDateService(uuidInvestigation: string, uuidAgenda:string, date:Date,): Promise<{ status: number, appointments: IAppointment[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/appointment/agenda/"+uuidAgenda+"/date/"+date.getTime(), { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function cancelAppointmentService(uuidInvestigation: string, uuidAppointment:string, byUser:boolean): Promise<{ status: number, appointments: IAppointment[] }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/appointment/"+uuidAppointment+"/cancel", { byUser },{ headers: { "Authorization": localStorage.getItem("jwt") } })
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
            .put(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/appointment/"+uuidAppointment+"/showup", {}, { headers: { "Authorization": localStorage.getItem("jwt") } })
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
            .get(import.meta.env.VITE_APP_API_URL + "/agenda/" + uuidInvestigation + "/patient/"+uuidPatient+"/appointments", { headers: { "Authorization": localStorage.getItem("jwt") } })
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

