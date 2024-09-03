import { IPatient } from '../constants/types';
import { decryptSinglePatientData } from '../utils'; // Adjust the import path as necessary

// Define the message event handler
self.onmessage = async (event: MessageEvent) => {
    const { patients, keyInvestigation, uuidInvestigation, permissions, personalFields } = event.data;
    const decryptedPatients = patients.map((patient:IPatient, index:number) => {
        console.log("Decrypting patient", index);
        patient.personalData = patient.personalData ? decryptSinglePatientData(patient.personalData, keyInvestigation, permissions, personalFields) : null;
        return {
            id: patient.id,
            uuid: patient.uuid,
            uuidInvestigation: uuidInvestigation,
            dateCreated: patient.dateCreated,
            personalData: patient.personalData
        };
    });
    self.postMessage(decryptedPatients); // Send the decrypted patients back to the main thread
};