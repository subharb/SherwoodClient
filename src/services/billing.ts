import { Bill, Billable, BillablesServiceResponse, BillingInfoServiceResponse, BillItem } from "../pages/hospital/Billing/types";
import axios from "../utils/axios";

export function createBillService(uuidInstitution: string, uuidPatient: string, billItems: BillItem[]): Promise<{ status: number }> {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInstitution + "/bill/" + uuidPatient, billItems, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function updateBillService(uuidInvestigation: string, billId: number, billItems: BillItem[]): Promise<{ status: number }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/bill/" + billId, billItems, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function createUpdateBillingInfoService(uuidInvestigation: string, billingInfo: any):Promise<BillingInfoServiceResponse> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/billingInfo", billingInfo, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function updateBillablesService(uuidInvestigation: string, idBillingInfo:number, billables: BillItem[]):Promise<BillablesServiceResponse> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/billables/"+idBillingInfo, billables, 
                { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getBillsService(uuidInvestigation: string): Promise<{ status: number, bills: Bill[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/bills/", { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getBillsPatientService(uuidInvestigation: string, uuidPatient:string): Promise<{ status: number, bills: Bill[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/bills/patient/"+uuidPatient, { headers: { "Authorization": localStorage.getItem("jwt") } })
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



export function getBillablesService(uuidInvestigation: string, idBillingInfo: number): Promise<BillablesServiceResponse> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/billables/" + idBillingInfo, { headers: { "Authorization": localStorage.getItem("jwt") } })
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