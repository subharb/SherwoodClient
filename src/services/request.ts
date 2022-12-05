import { Bill, Billable, BillablesServiceResponse, BillingInfoServiceResponse, BillItem } from "../pages/hospital/Billing/types";
import { IPharmacyRequest } from "../pages/hospital/Pharmacy/types";
import { IRequest } from "../pages/hospital/Service/types";
import axios from "../utils/axios";

export function makePharmacyRequestService(uuidInvestigation:string, idPharmacy:number, request:IPharmacyRequest): Promise<{ status: number }> {
    return new Promise((resolve, reject) => {
        axios.post(process.env.REACT_APP_API_URL + "/hospital/"+uuidInvestigation+"/pharmacy/"+idPharmacy+"/request", request,{ headers: { "Authorization": localStorage.getItem("jwt") } })
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


export function updatePharmacyRequestService(uuidInvestigation:string, idPharmacy:number, request:IRequest, approved:boolean): Promise<{ status: number }> {
    return new Promise((resolve, reject) => {
        const requestSend = {...request, approved};
        axios.put(process.env.REACT_APP_API_URL + "/hospital/"+uuidInvestigation+"/pharmacy/"+idPharmacy+"/request/"+request.id, requestSend,{ headers: { "Authorization": localStorage.getItem("jwt") } })
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


