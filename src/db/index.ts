import { IPatient } from '../constants/types';
import { decryptSinglePatientData, getInvestigationRawKey } from '../utils';
import Dexie, { type EntityTable } from 'dexie';


const DB_PATIENTS_NAME = 'Patients';
const STORE_PATIENTS_NAME = 'patients';

export let db = new Dexie(DB_PATIENTS_NAME) as Dexie & {
    patients: EntityTable<IPatient, 'uuid'>;
};

// Define the database schema
db.version(1).stores({
    patients: 'uuid, uuidInvestigation, id, dateCreated, personalData' // Define primary key and indexes
});

export const deleteAllPatientsFromInvestigation = async (uuidInvestigation: string): Promise<void> => {
    await db.patients.where('uuidInvestigation').equals(uuidInvestigation).delete();
};

export const saveListPatients = async (patients: IPatient[], investigation: any): Promise<void> => {
    console.time("Decrypting Patient Data");
    console.log("Number patients", patients.length);

    const chunkSize = 1000; // Define the size of each chunk
    const patientChunks = []; // Array to hold chunks of patients

    // Split patients into chunks
    for (let i = 0; i < patients.length; i += chunkSize) {
        patientChunks.push(patients.slice(i, i + chunkSize));
    }

    const promises = patientChunks.map((chunk, index) => {
        console.log("Chunk", index);
        
        return new Promise((resolve, reject) => {
            console.log("Number patients", chunk.length);
            console.log("First patient chunk", chunk[0]);
            const worker = new Worker(new URL('../webworkers/decryptWorker.ts', import.meta.url), { type: 'module' });

            worker.onmessage = (event) => {
                resolve(event.data); // Resolve with decrypted patients
            };

            worker.onerror = (error) => {
                console.error("Worker error:", error);
                reject(error);
            };

            // Send the patients and investigation to the worker
            const keyInvestigation =  getInvestigationRawKey(investigation.encryptedKeyUsed, investigation.keyResearcherInvestigation);
            const uuidInvestigation = investigation.uuid;
            const permissions = investigation.permissions;
            const personalFields = investigation.personalFields;
            worker.postMessage({ chunk, keyInvestigation, uuidInvestigation, permissions, personalFields });
        });
    });

    // Wait for all workers to finish
    const results = await Promise.all(promises);
    const patientsToSave:IPatient[] = results.flat() as IPatient[]; // Flatten the array of results

    console.timeEnd("Decrypting Patient Data");
    console.time("Saving Bulk Patients");
    await db.patients.bulkPut(patientsToSave);
    console.timeEnd("Saving Bulk Patients");
};

export const getAllPatientsInvestigation = async (uuidInvestigation:string): Promise<IPatient[]> => {
    return await db.patients.where('uuidInvestigation').equals(uuidInvestigation).toArray();
  };
// Save data to IndexedDB
export const savePatient = async (patientData: IPatient, uuidInvestigation: string): Promise<void> => {
    await db.patients.put({
        id: patientData.id,
        uuid: patientData.uuid,
        uuidInvestigation: uuidInvestigation,
        dateCreated: patientData.dateCreated,
        personalData: patientData.personalData
    });
};

// Fetch data from IndexedDB
export const fetchPatient = async (uuidPatient: string): Promise<IPatient | null> => {
    const patient = await db.patients.get(uuidPatient); // Use Dexie's get method directly
    return patient ? patient : null;
};


export async function clearPatientsStore(): Promise<void> {
    await db.patients.clear(); // Use Dexie's clear method to remove all entries
}