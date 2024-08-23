
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



export const agendas = () => {
    return [
        {
            "id": 57,
            "uuid": "abc2ca53-da0e-4800-a29a-be512435bc9a",
            "name": "Colonel SARR",
            "daysWeek": [
                "Tue",
                "Thu"
            ],
            "slotsPerDay": 50,
            "turn": [
                [
                    9,
                    0
                ],
                [
                    18,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {
                "2024-08-22": 1
            },
            "createdAt": "2024-08-16T07:06:03.432Z",
            "updatedAt": "2024-08-22T03:35:39.638Z",
            "deletedAt": null,
            "department": {
                "id": 151,
                "uuid": "3243a9c0-54ea-4593-8e4f-47d468fea134",
                "code": "",
                "name": "Médecine",
                "type": 0,
                "createdAt": "2024-08-16T05:31:15.203Z",
                "updatedAt": "2024-08-16T05:31:15.203Z",
                "deletedAt": null
            },
            "box": {
                "id": 78,
                "uuid": "08b872a2-c491-4620-8ebc-74eec936ff22",
                "name": "Box Médecin",
                "type": 0,
                "createdAt": "2024-08-16T07:04:30.687Z",
                "updatedAt": "2024-08-16T07:04:30.687Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2629,
                "name": "Colonel",
                "surnames": "Sarr",
                "email": "c.sarr@cmk.sn",
                "phone": "0000000",
                "createdAt": "2024-08-16T05:26:23.084Z",
                "updatedAt": "2024-08-16T05:27:29.589Z",
                "uuid": "b5239c3f-f63a-40ae-bc52-85c5ab6f8606"
            },
            "listServicesInvestigation": [
                {
                    "id": 1353,
                    "description": "Consultation rééducation (controle)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T07:01:47.420Z",
                    "updatedAt": "2024-08-16T07:01:47.420Z",
                    "deletedAt": null
                },
                {
                    "id": 1352,
                    "description": "Consultation rééducation (première visite)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T07:01:16.795Z",
                    "updatedAt": "2024-08-16T07:01:16.795Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 58,
            "uuid": "a90fb10e-ed61-471a-aaee-2627b2d01932",
            "name": "Charles DIEME",
            "daysWeek": [
                "Wed",
                "Sat"
            ],
            "slotsPerDay": 50,
            "turn": [
                [
                    9,
                    0
                ],
                [
                    18,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-16T07:06:56.555Z",
            "updatedAt": "2024-08-19T06:13:34.272Z",
            "deletedAt": null,
            "department": {
                "id": 151,
                "uuid": "3243a9c0-54ea-4593-8e4f-47d468fea134",
                "code": "",
                "name": "Médecine",
                "type": 0,
                "createdAt": "2024-08-16T05:31:15.203Z",
                "updatedAt": "2024-08-16T05:31:15.203Z",
                "deletedAt": null
            },
            "box": {
                "id": 78,
                "uuid": "08b872a2-c491-4620-8ebc-74eec936ff22",
                "name": "Box Médecin",
                "type": 0,
                "createdAt": "2024-08-16T07:04:30.687Z",
                "updatedAt": "2024-08-16T07:04:30.687Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2630,
                "name": "Charles",
                "surnames": "Dieme",
                "email": "c.dieme@cmk.sn",
                "phone": "000000",
                "createdAt": "2024-08-16T05:26:42.598Z",
                "updatedAt": "2024-08-16T05:28:26.250Z",
                "uuid": "8881397e-ceda-412e-ac71-51d9fef6ca54"
            },
            "listServicesInvestigation": [
                {
                    "id": 1354,
                    "description": "Consultation orthopédie (première visite)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T07:02:16.138Z",
                    "updatedAt": "2024-08-16T07:02:16.138Z",
                    "deletedAt": null
                },
                {
                    "id": 1355,
                    "description": "Consultation orthopédie (controle)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T07:02:36.598Z",
                    "updatedAt": "2024-08-16T07:02:36.598Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 59,
            "uuid": "65c3394d-f3c8-41af-8156-cddf3128aaed",
            "name": "Abdou FAYE",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Sat",
                "Fri"
            ],
            "slotsPerDay": 50,
            "turn": [
                [
                    9,
                    0
                ],
                [
                    10,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-16T07:10:15.048Z",
            "updatedAt": "2024-08-19T06:11:47.882Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 68,
                "uuid": "e4858c8c-3479-478d-8a22-0c7d07f6e9f2",
                "name": "Box Kine 1",
                "type": 0,
                "createdAt": "2024-08-16T06:52:26.394Z",
                "updatedAt": "2024-08-16T07:03:11.520Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2598,
                "name": "Abdou",
                "surnames": "Faye",
                "email": "abdou.faye@cmk.sn",
                "phone": "0000000",
                "createdAt": "2024-08-16T03:41:30.342Z",
                "updatedAt": "2024-08-16T04:27:24.597Z",
                "uuid": "d0b90cb6-fb9d-4e95-985c-adafc5462505"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 60,
            "uuid": "941103e1-502d-4c3d-a87c-a2f11dfe7bf8",
            "name": "Daouda SENE",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 50,
            "turn": [
                [
                    10,
                    0
                ],
                [
                    11,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {
                "2024-08-16": 1
            },
            "createdAt": "2024-08-16T07:11:34.420Z",
            "updatedAt": "2024-08-19T06:11:55.986Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 68,
                "uuid": "e4858c8c-3479-478d-8a22-0c7d07f6e9f2",
                "name": "Box Kine 1",
                "type": 0,
                "createdAt": "2024-08-16T06:52:26.394Z",
                "updatedAt": "2024-08-16T07:03:11.520Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2604,
                "name": "Daouda",
                "surnames": "Sene",
                "email": "d.sene@cmk.sn",
                "phone": "00000000",
                "createdAt": "2024-08-16T03:49:39.107Z",
                "updatedAt": "2024-08-16T04:32:06.997Z",
                "uuid": "58a48a9f-7218-4ce1-a87e-33cc81b6c626"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 61,
            "uuid": "f1569013-3aeb-43bc-a2e6-99d04bd2e82b",
            "name": "Mr Demba BA",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:27:55.466Z",
            "updatedAt": "2024-08-19T04:28:26.773Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 69,
                "uuid": "e7f5d6c4-1c68-40bd-8afe-9804eb7fd230",
                "name": "Box Kine 2",
                "type": 0,
                "createdAt": "2024-08-16T07:03:00.540Z",
                "updatedAt": "2024-08-16T07:03:00.540Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2605,
                "name": "Demba",
                "surnames": "Ba",
                "email": "d.ba@cmk.sn",
                "phone": "0000000",
                "createdAt": "2024-08-16T03:50:19.023Z",
                "updatedAt": "2024-08-16T04:35:09.900Z",
                "uuid": "bcbb066d-9038-4df7-b2ea-6148fb837875"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 62,
            "uuid": "534e7dcb-fa44-44e2-80e5-15ef62e74b16",
            "name": "Maniang Ndiaye",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:29:54.077Z",
            "updatedAt": "2024-08-19T06:12:07.892Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 70,
                "uuid": "63cce8ae-b94d-4dc5-b718-8ac6eed69a1d",
                "name": "Box Kine 3",
                "type": 0,
                "createdAt": "2024-08-16T07:03:17.037Z",
                "updatedAt": "2024-08-16T07:03:17.037Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2610,
                "name": "Mame Maniang",
                "surnames": "Ndiaye",
                "email": "mm.ndiaye@cmk.sn",
                "phone": "0000000",
                "createdAt": "2024-08-16T03:55:57.675Z",
                "updatedAt": "2024-08-16T04:40:47.686Z",
                "uuid": "c71fa1ed-d5ff-42db-b17a-4cfc7f2bcdc8"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 63,
            "uuid": "c4a20c64-0f06-427f-85c4-0b098ad18e95",
            "name": "Mbaye SENE",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:31:18.381Z",
            "updatedAt": "2024-08-19T06:12:22.900Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 71,
                "uuid": "0ddfbfaf-28b8-48bf-a26c-d1f30c907ef7",
                "name": "Box Kine 4",
                "type": 0,
                "createdAt": "2024-08-16T07:03:27.360Z",
                "updatedAt": "2024-08-16T07:03:27.360Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2612,
                "name": "Mbaye",
                "surnames": "Sene",
                "email": "m.sene@cmk.sn",
                "phone": "00000000",
                "createdAt": "2024-08-16T03:58:52.068Z",
                "updatedAt": "2024-08-16T04:44:00.425Z",
                "uuid": "faf6c3d3-54b0-4607-8a8c-79798eac5315"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 64,
            "uuid": "1682bd98-954a-45eb-b49b-230a91da280d",
            "name": "Papa Gor SARR",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:33:26.387Z",
            "updatedAt": "2024-08-19T06:12:32.540Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 72,
                "uuid": "2573b006-8529-46c2-a9b5-43680a3a4521",
                "name": "Box Kine 5",
                "type": 0,
                "createdAt": "2024-08-16T07:03:33.782Z",
                "updatedAt": "2024-08-16T07:03:33.782Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2618,
                "name": "Pape Gor",
                "surnames": "Sarr",
                "email": "pg.sarr@cmk.sn",
                "phone": "00000000",
                "createdAt": "2024-08-16T04:04:43.797Z",
                "updatedAt": "2024-08-16T04:51:05.746Z",
                "uuid": "1c48c1fe-b178-4a22-bd3f-f018bef2dfc2"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 65,
            "uuid": "a8967663-7a39-4723-954d-d36a1f7327e2",
            "name": "Seynabou Faye SENE",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:34:45.320Z",
            "updatedAt": "2024-08-19T06:12:46.273Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 73,
                "uuid": "653a703f-05a2-4201-8895-72642343ed82",
                "name": "Box Kine 6",
                "type": 0,
                "createdAt": "2024-08-16T07:03:39.687Z",
                "updatedAt": "2024-08-16T07:03:39.687Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2623,
                "name": "Seynabou ",
                "surnames": "Faye Sene",
                "email": "s.fayesene@cmk.sn",
                "phone": "0000000",
                "createdAt": "2024-08-16T04:14:37.051Z",
                "updatedAt": "2024-08-16T04:55:29.921Z",
                "uuid": "fc1b0242-a668-4f86-9c02-4eb5cfd0090f"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 66,
            "uuid": "92e9f9a2-6591-43bf-aa40-29002b2032ee",
            "name": "Sokhna Assyetou NDIAYE FAYE",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:35:58.458Z",
            "updatedAt": "2024-08-19T04:35:58.458Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 74,
                "uuid": "d024612e-4e4b-4858-8b47-839db0485cad",
                "name": "Box Kine 7",
                "type": 0,
                "createdAt": "2024-08-16T07:03:46.381Z",
                "updatedAt": "2024-08-16T07:03:46.381Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2624,
                "name": "Sokhna Assyetou",
                "surnames": "Ndiaye Faye",
                "email": "sa.ndiayefaye@cmk.sn",
                "phone": "0000000",
                "createdAt": "2024-08-16T04:16:01.022Z",
                "updatedAt": "2024-08-16T04:56:22.042Z",
                "uuid": "f0225799-c76f-4dab-b34c-cdb455daa44f"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 67,
            "uuid": "86f372a6-03c7-4139-bed6-90215ee7da3a",
            "name": "Mr Amadou Mendy",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:36:53.755Z",
            "updatedAt": "2024-08-19T04:36:53.755Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 75,
                "uuid": "d38d0fdc-f4c3-401d-a046-996259f4b4d3",
                "name": "Box Kine 8",
                "type": 0,
                "createdAt": "2024-08-16T07:03:52.278Z",
                "updatedAt": "2024-08-16T07:03:52.278Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2602,
                "name": "Amadou",
                "surnames": "Mendy",
                "email": "a.mendy@cmk.sn",
                "phone": "000000",
                "createdAt": "2024-08-16T03:47:02.581Z",
                "updatedAt": "2024-08-16T04:39:53.691Z",
                "uuid": "40e995f0-eb9d-4a94-a07a-5cc271f027fe"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                }
            ]
        },
        {
            "id": 68,
            "uuid": "32f5f834-ae2e-4bba-b282-5bab298d647a",
            "name": "Fatou Mbow BITEYE",
            "daysWeek": [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ],
            "slotsPerDay": 40,
            "turn": [
                [
                    8,
                    0
                ],
                [
                    9,
                    0
                ]
            ],
            "durationFirstVisit": 0,
            "durationFollowingVisit": 0,
            "blockedDates": [],
            "datesOccupancy": {},
            "createdAt": "2024-08-19T04:38:53.514Z",
            "updatedAt": "2024-08-19T04:38:53.514Z",
            "deletedAt": null,
            "department": {
                "id": 150,
                "uuid": "ab5a720c-7361-4ecf-a2e6-a59cd0e5f286",
                "code": "",
                "name": "Kinésithérapie",
                "type": 0,
                "createdAt": "2024-08-16T05:30:52.140Z",
                "updatedAt": "2024-08-16T05:30:52.140Z",
                "deletedAt": null
            },
            "box": {
                "id": 76,
                "uuid": "012e0078-7c95-48c7-801c-890598e5f596",
                "name": "Box Kine 9",
                "type": 0,
                "createdAt": "2024-08-16T07:03:58.739Z",
                "updatedAt": "2024-08-16T07:03:58.739Z",
                "deletedAt": null
            },
            "principalResearcher": {
                "id": 2606,
                "name": "Fatou",
                "surnames": "Mbow Biteye",
                "email": "f.biteye@cmk.sn",
                "phone": "0000000",
                "createdAt": "2024-08-16T03:51:12.046Z",
                "updatedAt": "2024-08-16T04:36:05.671Z",
                "uuid": "bc4965cd-6ab6-45a0-a09d-6ade4293140b"
            },
            "listServicesInvestigation": [
                {
                    "id": 1348,
                    "description": "Kinésithérapie respiratoire (adulte)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:56:38.801Z",
                    "updatedAt": "2024-08-16T06:56:38.801Z",
                    "deletedAt": null
                },
                {
                    "id": 1351,
                    "description": "Kinésithérapie respiratoire (enfant avec prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:20.904Z",
                    "updatedAt": "2024-08-19T04:26:53.604Z",
                    "deletedAt": null
                },
                {
                    "id": 1347,
                    "description": "Kinésitherapie",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:55:39.326Z",
                    "updatedAt": "2024-08-16T06:55:39.326Z",
                    "deletedAt": null
                },
                {
                    "id": 1350,
                    "description": "Kinésithérapie respiratoire (enfant sans prise en charge)",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:58:08.092Z",
                    "updatedAt": "2024-08-19T04:27:02.898Z",
                    "deletedAt": null
                },
                {
                    "id": 1349,
                    "description": "Rééducation périnéale",
                    "active": true,
                    "category": "",
                    "params": {},
                    "external": 0,
                    "createdAt": "2024-08-16T06:57:32.810Z",
                    "updatedAt": "2024-08-19T04:26:32.777Z",
                    "deletedAt": null
                }
            ]
        }
    ]
}

export const appointmentsAllAgendas = () => {
    return {
        "status": 200,
        "appointments": [
            {
                "id": 3202,
                "uuid": "b70d32c2-124d-421d-9d87-5750f2eefd15",
                "order": 1,
                "type": 0,
                "startDateTime": "2024-08-21T10:00:00.000Z",
                "endDateTime": "2024-08-21T10:30:00.000Z",
                "createdAt": "2024-08-22T05:35:39.598Z",
                "updatedAt": "2024-08-22T05:35:39.598Z",
                "deletedAt": null,
                "patient": {
                    "id": 36530,
                    "uuid": "a92cc1e6-b3a3-4d6a-8e48-8805e0106097",
                    "patientId": 36531,
                    "patientIdInvestigation": 1
                },
                "requestAppointment": {
                    "id": 3336,
                    "type": 4,
                    "status": 0,
                    "createdAt": "2024-08-22T03:35:39.563Z",
                    "updatedAt": "2024-08-22T03:35:39.563Z",
                    "deletedAt": null
                },
                "agendaId": 57
            },
            {
                "id": 3202,
                "uuid": "b70d32c2-124d-421d-9d87-5750f2eefd15",
                "order": 1,
                "type": 0,
                "startDateTime": "2024-08-21T10:00:00.000Z",
                "endDateTime": "2024-08-21T10:40:00.000Z",
                "createdAt": "2024-08-22T05:35:39.598Z",
                "updatedAt": "2024-08-22T05:35:39.598Z",
                "deletedAt": null,
                "patient": {
                    "id": 36530,
                    "uuid": "a92cc1e6-b3a3-4d6a-8e48-8805e0106097",
                    "patientId": 36531,
                    "patientIdInvestigation": 1
                },
                "requestAppointment": {
                    "id": 3336,
                    "type": 4,
                    "status": 0,
                    "createdAt": "2024-08-22T03:35:39.563Z",
                    "updatedAt": "2024-08-22T03:35:39.563Z",
                    "deletedAt": null
                },
                "agendaId": 58
            }
        ]
    }
}

export const patients = () => {
    return appointmentsAllAgendas().appointments.map(appointment => {
        const patientInfo = {...appointment.patient}
        patientInfo.personalData = {
            name: "Moussa S",
            surnames: "Diop",
        }
        return patientInfo
    })
}