import { Bill, Billable, BillablesServiceResponse, BillingInfoServiceResponse, BillItem, BillServiceResponse, DocumentType } from "../pages/hospital/Billing/types";
import axios from "../utils/axios";

export function createBillService(uuidInstitution: string, uuidPatient: string, bill: Bill): Promise<BillServiceResponse> {
    return new Promise((resolve, reject) => {
        axios
            .post(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInstitution + "/bill/" + uuidPatient, bill, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function updateBillService(uuidInvestigation: string, uuidBill: string, bill: Bill): Promise<{ status: number }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/bill/" + uuidBill, bill, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function updateBillItemsStatusService(uuidInvestigation: string, uuidBill: string, bill: Bill): Promise<{ status: number }> {
    return new Promise((resolve, reject) => {
        axios
            .put(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/billitems/" + uuidBill, bill, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getDocumentsService(uuidInvestigation: string): Promise<{ status: number, bills: Bill[] }> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/documents", { headers: { "Authorization": localStorage.getItem("jwt") } })
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



export function getBillablesService(uuidInvestigation: string, idBillingInfo: number, idInsurance:number): Promise<BillablesServiceResponse> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/billables/" + idBillingInfo + "/insurance/"+idInsurance, { headers: { "Authorization": localStorage.getItem("jwt") } })
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

export function getBillableComboService(uuidInvestigation: string, idBillingInfo: number): Promise<BillablesServiceResponse> {
    return new Promise((resolve, reject) => {
        axios
            .get(import.meta.env.VITE_APP_API_URL + "/billing/investigation/" + uuidInvestigation + "/billablecombo/" + idBillingInfo, { headers: { "Authorization": localStorage.getItem("jwt") } })
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


export function updateDocumentType(uuidInvestigation: string, uuidBill: string, type:DocumentType): Promise<BillServiceResponse> {
    return new Promise((resolve, reject) => {
        axios
            .put(`${import.meta.env.VITE_APP_API_URL}/billing/investigation/${uuidInvestigation}/bill/${uuidBill}/change/${type}`, {}, { headers: { "Authorization": localStorage.getItem("jwt") } })
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