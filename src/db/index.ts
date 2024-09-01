import { IPatient } from '../constants/types';
import { decryptSinglePatientData } from '../utils';
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
    const patientsToSave = patients.map(patient => {
        patient.personalData = patient.personalData ? decryptSinglePatientData(patient.personalData, investigation) : null;
        return {
            id: patient.id,
            uuid: patient.uuid,
            uuidInvestigation: investigation.uuid,
            dateCreated: patient.dateCreated,
            personalData: patient.personalData
        };
    });

    await db.patients.bulkPut(patientsToSave);
}


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