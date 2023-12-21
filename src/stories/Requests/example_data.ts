import { IPatient, RequestService } from "../../constants/types";

const uuidPatient = "cf7ee1fb-c0da-4929-84ee-60d082f0a0a8";
export const requestService:RequestService = {
    "status": 200,
    "request": {
        "id": 1281,
        "type": 0,
        "status": 2,
        "createdAt": "2023-12-19T13:22:54.925Z",
        "updatedAt": "2023-12-19T13:26:52.809Z",
        "deletedAt": null,
        "researcher": {
            "id": 2,
            "name": "Pedro ",
            "surnames": "- Sherwood Staff",
            "email": "pedro.cruz@ucl.ac.uk",
            "uuid": "9c6dd74a-2362-4a30-b826-10330f250c07",
            "units": []
        },
        "surveyRequest": null,
        "departmentRequest": {
            "id": 35,
            "uuid": "1c655e29-100e-4fce-ad9f-5eb63d495338",
            "code": "",
            "name": "Service de Médecine",
            "type": 0,
            "units" : [],
            "wards" : []
        },
        "requestsPharmacy": [],
        "requestsServiceInvestigation": [
            {
                "id": 1406,
                "status": 2,
                "createdAt": "2023-12-19T13:22:54.934Z",
                "updatedAt": "2023-12-19T13:26:52.801Z",
                "deletedAt": null,
                "patientInvestigation": {
                    "id": 7179,
                    "uuid": uuidPatient,
                    "patientIdInvestigation": 1347,
                },
                "serviceInvestigation": {
                    "id": 536,
                    "description": "",
                    "active": true,
                    "category": "",
                    "external": 0,
                    "createdAt": "2023-12-19T11:43:20.529Z",
                    "updatedAt": "2023-12-19T11:43:20.529Z",
                    "deletedAt": null,
                    "service": {
                        "id": 17,
                        "code": "BQ017",
                        "name": "Electrolyte test",
                        "type": 0,
                        "category": "Biochemistry"
                    },
                    "billable": {
                        "id": 597,
                        "type": 3,
                        "concept": "Electrolyte test",
                        "createdAt": "2023-12-19T11:43:20.514Z",
                        "updatedAt": "2023-12-19T11:43:20.514Z",
                        "deletedAt": null
                    },
                    "survey": null
                },
                "billItem": {
                    "id": 3901,
                    "concept": "Electrolyte test",
                    "quantity": 1,
                    "type": 3,
                    "amount": 5000,
                    "paid": "2023-12-19T13:26:52.776Z",
                    "used": null,
                    "createdAt": "2023-12-19T13:22:54.947Z",
                    "updatedAt": "2023-12-19T13:26:52.779Z",
                    "deletedAt": null
                }
            }
        ],
        "submissionPatient": null
    }
}

export const patientInfo:IPatient[] = [
    {
        "id" : 1,
        "uuid" : uuidPatient,
        "personalData" : {
            "name" : "John",
            "surnames" : "Doe",
            "birthdate" : new Date("1990-01-01"),
            "sex" : "M",
            "insurance" : null,
        },
        "dateCreated" : new Date("2023-12-19T13:22:54.925Z"),

    }
]