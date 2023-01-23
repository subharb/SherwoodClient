import axios from "axios";
import { IAppointment } from "../constants/types";

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

