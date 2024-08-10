interface PatientData {
    id: string;
    name: string;
    age: number;
    medicalHistory: string;
}

const DB_PATIENTS_NAME = 'Patients';
const STORE_PATIENTS_NAME = 'patients';
// Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_PATIENTS_NAME, 1.6);

        request.onupgradeneeded = event => {
            const db = (event.target as IDBOpenDBRequest).result;
            const store = db.createObjectStore(STORE_PATIENTS_NAME, { keyPath: 'id' });
            store.createIndex('uuidInvestigationIndex', 'uuidInvestigation', { unique: false });
        };

        request.onsuccess = event => {
            console.log('Database opened successfully');
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

export const getAllPatients = async (uuidInvestigation:string): Promise<PatientData[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_PATIENTS_NAME], 'readonly');
        const store = transaction.objectStore(STORE_PATIENTS_NAME);
        const index = store.index('uuidInvestigationIndex');
        const request = index.getAll(uuidInvestigation);
        
        const patients: PatientData[] = [];
  
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
export const savePatientData = async (patientData: PatientData, uuidInvestigation:string): Promise<void> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_PATIENTS_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_PATIENTS_NAME);
        const request = store.put({ id: patientData.id, uuidInvestigation: uuidInvestigation, data: patientData });

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = event => {
            reject(new Error(`Save error: ${(event.target as IDBRequest).error}`));
        };
    });
};

// Fetch data from IndexedDB
export const fetchPatientData = async (patientId: string): Promise<PatientData | null> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_PATIENTS_NAME], 'readonly');
        const store = transaction.objectStore(STORE_PATIENTS_NAME);
        const request = store.get(patientId);

        request.onsuccess = event => {
            if ((event.target as IDBRequest).result) {
                const data = (event.target as IDBRequest).result.data;
                // const patientData = decryptData(encryptedData) as PatientData;
                resolve(data);
            } else {
                resolve(null);
            }
        };

        request.onerror = event => {
            reject(new Error(`Fetch error: ${(event.target as IDBRequest).error}`));
        };
    });
};

export function resetDatabase(): void {
    // Reference to the database connection
    let db: IDBDatabase | null = null;

    // Function to open the database
    const openDatabase = () => {
        const request = indexedDB.open(DB_PATIENTS_NAME, 1);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const store = db.createObjectStore('YourObjectStoreName', { keyPath: 'id' });
            store.createIndex('uuidInvestigationIndex', 'uuidInvestigation', { unique: false });
        };

        request.onsuccess = (event: Event) => {
            db = (event.target as IDBOpenDBRequest).result;
            console.log('Database recreated successfully');
        };

        request.onerror = (event: Event) => {
            console.error('Error opening database:', (event.target as IDBRequest).error);
        };
    };

    // Function to delete the database
    const deleteDatabase = () => {
        const deleteRequest = indexedDB.deleteDatabase(DB_PATIENTS_NAME);

        deleteRequest.onsuccess = () => {
            console.log('Database deleted successfully');
            openDatabase(); // Optionally recreate the database after deletion
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