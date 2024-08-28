import { IPatient } from '../constants/types';
import { decryptSinglePatientData } from '../utils';


const DB_PATIENTS_NAME = 'Patients';
const STORE_PATIENTS_NAME = 'patients';

let db: IDBDatabase | null = null;

export const getDB = async (): Promise<IDBDatabase> => { // Specify return type as Promise<IDBDatabase>
    if(db !== null){
        return db;
    }
    return await initDB();
}
// // Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("Database initialization timed out"));
            alert("Please close all Sherwood tabs and try again");
        }, 5000); // 5 seconds timeout

        if (db !== null) {
            clearTimeout(timeout);
            resolve(db);
        }
        const request = indexedDB.open(DB_PATIENTS_NAME, 1);

        request.onupgradeneeded = event => {
            const db = (event.target as IDBOpenDBRequest).result;
            const store = db.createObjectStore(STORE_PATIENTS_NAME, { keyPath: 'uuid' });
            store.createIndex('uuidInvestigationIndex', 'uuidInvestigation', { unique: false });
            store.createIndex('patientIdInvestigationIndex', 'id', { unique: false });

        };

        request.onsuccess = event => {
            console.log('Database opened successfully');
            db = (event.target as IDBOpenDBRequest).result;
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = event => {
            console.error(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
            reject(new Error(`Database error: ${(event.target as IDBOpenDBRequest).error}`));
        };
    });
};

export const doesDBPatientsExist = (): Promise<boolean> => {
    return doesDBExist(DB_PATIENTS_NAME);
}

export const doesInvestigationPatientsStoreExist = async (): Promise<boolean> => {
    const dbExists = await doesDBPatientsExist();
    const storeExists = await doesStoreExist(STORE_PATIENTS_NAME, DB_PATIENTS_NAME);
    return dbExists && storeExists;
}

export const doesDBExist = (dbName: string, version?: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        let dbExists = true;

        request.onupgradeneeded = () => {
            // The database doesn't exist if this event handler is called.
            dbExists = false;
            // Abort the upgrade to prevent the creation of the new database.
            request.transaction.abort();
        };

        request.onsuccess = () => {
            request.result.close();
            if (dbExists) {
                resolve(true);
            } else {
                resolve(false);
            }
        };

        request.onerror = () => {
            // If there's an error opening the database, assume it doesn't exist.
            resolve(false);
        };

        request.onblocked = () => {
            // If the open request is blocked, assume it exists and is open in another tab.
            resolve(true);
        };
    });
};

export const doesStoreExist = (storeName: string, dbName: string, version?: number): Promise<boolean> => {

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version);

        request.onupgradeneeded = () => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(storeName)) {
                resolve(false);
            } else {
                resolve(true);
            }
        };

        request.onsuccess = () => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(storeName)) {
                resolve(false);
            } else {
                resolve(true);
            }
        };

        request.onerror = () => {
            resolve(false);
        };

        request.onblocked = () => {
            resolve(true);
        };
    });
};

export const deleteAllPatientsFromInvestigation = async (uuidInvestigation: string): Promise<void> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_PATIENTS_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_PATIENTS_NAME);
        const index = store.index('uuidInvestigationIndex');
        const request = index.openCursor(uuidInvestigation);

        transaction.oncomplete = () => {
            resolve();
        };

        transaction.onerror = event => {
            reject(new Error(`Transaction error: ${(event.target as IDBRequest).error}`));
        };

        request.onsuccess = event => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                cursor.delete();  // Delete the current record
                cursor.continue();  // Move to the next record
            }
        };

        request.onerror = event => {
            reject(new Error(`Cursor error: ${(event.target as IDBRequest).error}`));
        };
    });
};

export const saveListPatients = async (patients: IPatient[], investigation: any): Promise<void> => {
    patients.forEach(async(patient, index) => {
        console.log("Saving patient Index: ", index);
        patient.personalData = patient.personalData ? decryptSinglePatientData(patient.personalData, investigation) : null;
        await savePatient(patient, investigation.uuid);
    })
}


export const getAllPatientsInvestigation = async (uuidInvestigation:string): Promise<IPatient[]> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_PATIENTS_NAME], 'readonly');
        const store = transaction.objectStore(STORE_PATIENTS_NAME);
        const index = store.index('uuidInvestigationIndex');
        const request = index.getAll(uuidInvestigation);
        
        const patients: IPatient[] = [];
  
        request.onsuccess = event => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                resolve(cursor);
            } else {
                resolve(patients);
            }
        };
    
        request.onerror = event => {
            reject(new Error(`Cursor error: ${(event.target as IDBRequest).error}`));
        };
    });
  };
// Save data to IndexedDB
export const savePatient = async (patientData: IPatient, uuidInvestigation:string): Promise<void> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        try{
            
            const transaction = db.transaction([STORE_PATIENTS_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_PATIENTS_NAME);
            const request = store.put({ id: patientData.id, 
                                        uuid : patientData.uuid,
                                        uuidInvestigation: uuidInvestigation, 
                                        dateCreated:patientData.dateCreated, 
                                        personalData: patientData.personalData });
            request.onsuccess = () => {
                resolve();
            };
    
            request.onerror = event => {
                console.error(`Save error: ${(event.target as IDBRequest).error}`);
                reject(new Error(`Save error: ${(event.target as IDBRequest).error}`));
            };
        }
        catch(error){
            console.log(error);
            console.log("Error saving patient");
        }
        
        
    });
};

// Fetch data from IndexedDB
export const fetchPatient = async (uuidPatient: string): Promise<IPatient | null> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_PATIENTS_NAME], 'readonly');
        const store = transaction.objectStore(STORE_PATIENTS_NAME);
        const request = store.get(uuidPatient);

        request.onsuccess = event => {
            const result = (event.target as IDBRequest).result;
            resolve(result ? result : null); // Directly resolve the result
        };

        request.onerror = event => {
            reject(new Error(`Fetch error: ${(event.target as IDBRequest).error}`));
        };
    });
};

export const findPatientByUUID = async (uuidPatient: string): Promise<IPatient | null> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        try {
            const transaction = db.transaction([STORE_PATIENTS_NAME], 'readonly');
            const store = transaction.objectStore(STORE_PATIENTS_NAME);
            const request = store.get(uuidPatient);

            request.onsuccess = event => {
                const result = (event.target as IDBRequest).result;
                resolve(result ? result : null);
            };

            request.onerror = event => {
                reject(new Error(`Fetch error: ${(event.target as IDBRequest).error}`));
            };
        } catch (error) {
            console.log(error);
            reject(new Error("Error fetching patient"));
        }
    });
};

export function clearPatientsStore(): void {
    // Reference to the database connection
    // Function to delete the database
    const deleteDatabase = () => {
        const deleteRequest = indexedDB.deleteDatabase(DB_PATIENTS_NAME);

        deleteRequest.onsuccess = () => {
            console.log('Database deleted successfully');
        
        };

        deleteRequest.onerror = (event: Event) => {
            console.error('Error deleting database:', (event.target as IDBRequest).error);
        };

        deleteRequest.onblocked = () => {
            console.warn('Delete operation blocked. Close all other connections before deleting.');
        };
    };

    // Close the existing database connection if it's open
    if (db) {
        (db as IDBDatabase).close();
        db = null;
    }

    // Call the function to delete the database
    deleteDatabase();
}