import { BillItem } from "../constants/types";
import axios from "../utils/axios";

export function createBillService(uuidInstitution:string, uuidPatient:string, billItems:BillItem[]):Promise<{status:number}> {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.REACT_APP_API_URL+"/billing/investigation/"+uuidInstitution+"/bill/"+uuidPatient, billItems, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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

export function updateBillService(uuidInstitution:string, billId:number, billItems:BillItem[]):Promise<{status:number}> {
  return new Promise((resolve, reject) => {
    axios
      .put(process.env.REACT_APP_API_URL+"/billing/investigation/"+uuidInstitution+"/bill/"+billId, billItems, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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