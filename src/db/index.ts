import { IPatient } from '../constants/types';
import { decryptSinglePatientData } from '../utils';
import Dexie, { type EntityTable } from 'dexie';


const DB_PATIENTS_NAME = 'Patients';
const STORE_PATIENTS_NAME = 'patients';

export let db = new Dexie(DB_PATIENTS_NAME) as Dexie & {
    patients: EntityTable<IPatient, 'uuid'>;
};

// Define the database schema
db.version(2).stores({
    patients: 'uuid, uuidInvestigation, id, dateCreated, personalData.name, personalData.surnames'
});

export const deleteAllPatientsFromInvestigation = async (uuidInvestigation: string): Promise<void> => {
    await db.patients.where('uuidInvestigation').equals(uuidInvestigation).delete();
};

export const saveListPatients = async (patients: IPatient[], investigation: any): Promise<void> => {
    console.time("Decrypting Patient Data");
    console.log("Number patients", patients.length);
    const patientsToSave = patients.map((patient, id) => {
        console.log("Decrypting Patient Data", id);
        patient.personalData = patient.personalData ? decryptSinglePatientData(patient.personalData, investigation) : null;
        if(!patient.personalData){
            console.error("Patient without personal data", patient);
        }
        return {
            id: patient.id,
            uuid: patient.uuid,
            uuidInvestigation: investigation.uuid,
            dateCreated: new Date(patient.dateCreated),
            personalData: patient.personalData
        };
    });
    console.timeEnd("Decrypting Patient Data");
    console.time("Saving Bulk Patients");
    await db.patients.bulkPut(patientsToSave);
    console.timeEnd("Saving Bulk Patients");
}


export const getAllPatientsInvestigation = async (uuidInvestigation:string): Promise<IPatient[]> => {
    return await db.patients
        .where('uuidInvestigation')
        .equals(uuidInvestigation)
        .sortBy('dateCreated')
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
export const findPatientByIdAndInvestigation = async (id: number, uuidInvestigation: string): Promise<IPatient | null> => {
    const patient = await db.patients
        .where('uuidInvestigation')
        .equals(uuidInvestigation)
        .and(patient => patient.id === id)
        .first();
    return patient ? patient : null;
};

export const findPatientsByNameOrSurname = async (nameOrSurname: string, uuidInvestigation: string): Promise<IPatient[]> => {
    const searchTerms = nameOrSurname.toLowerCase().split(' ');
    return await db.patients
        .where('uuidInvestigation').equals(uuidInvestigation)
        .and(patient => {
            const fullName = `${patient.personalData.name} ${patient.personalData.surnames}`.toLowerCase();
            const matchhealthId = patient.personalData.automated_health_id ? patient.personalData.automated_health_id.toLowerCase().includes(nameOrSurname.toLowerCase()) : false;
            return searchTerms.every(term => fullName.includes(term)) || matchhealthId;
        })
        .toArray();
};

export async function clearPatientsStore(): Promise<void> {
    await db.patients.clear(); // Use Dexie's clear method to remove all entries
    localStorage.removeItem("lastUpdatePatients");
}
