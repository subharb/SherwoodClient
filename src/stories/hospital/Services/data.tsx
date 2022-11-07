export const services = [{
    id: 1,
    code: "tchol",
    name: "Test Colesterol",
    type: 0,
},
{
    id: 2,
    code: "tcrea",
    name: "Test Creatinina",
    type: 0,
}, {
    id: 3,
    code: "themo",
    name: "Test Hemoglobina",
    type: 0,
},
{
    id: 4,
    code: "themo",
    name: "Test Hemoglobina",
    type: 0,
},
{
    id: 5,
    code: "themo",
    name: "Test Hemoglobina",
    type: 0,
},
{
    id: 6,
    code: "themo",
    name: "Test Hemoglobina",
    type: 0,
}]

export const requestsServiceInvestigationService = [{
		"request": {
			
			"type": 0,
			"researcher": {
				"id": 2,
				"name": "Pedro ",
				"surnames": "- Sherwood Staff",
				"email": "pedro.cruz@ucl.ac.uk",
				"phone": "774791468",
				"createdAt": "2022-06-21T06:02:34.799Z",
				"updatedAt": "2022-06-21T06:02:34.799Z",
				"uuid": "9c6dd74a-2362-4a30-b826-10330f250c07"
			},
			"status": 1,
			"deletedAt": null,
			"id": 24,
			"createdAt": "2022-11-07T13:11:05.406Z",
			"updatedAt": "2022-11-07T13:11:05.406Z"
		},
		"serviceInvestigation": {
			"id": 2,
			"description": "",
			"active": true,
			"external": 0,
		},
		"patientInvestigation": {
			"id": 4347,
			"uuid": "f417f31f-d96d-40e8-a62a-68ed4e81506f",
			"status": 0,
			"investigationId": 46,
			"patientId": 4347,
			"patientIdInvestigation": 24,
			"records": {}
		},
		"survey": {
			"id": 322,
			"uuid": "5e195cbe-a66c-4f52-9ea1-66b072442808",
			"name": "Test de laboratoire",
			"isActive": true,
			"hasRecords": true,
			"type": 2,
			"order": 20
		},
		"billItem": {
			"billable": {
				"id": 19,
				"amount": 500,
				"type": 3,
				"concept": "Test Colesterol",
				"insurance": null,
				"createdAt": "2022-11-06T15:20:07.851Z",
				"updatedAt": "2022-11-06T15:20:07.851Z",
				"deletedAt": null
			},
			"concept": "Test Colesterol",
			"amount": 500,
			"type": 3,
			
			"paid": null,
			"used": null,
			"deletedAt": null,
			"id": 3127,
			"createdAt": "2022-11-07T13:11:05.419Z",
			"updatedAt": "2022-11-07T13:11:05.419Z"
		},
		"id": 24
	}]


export const servicesInvestigation = [{
    id: 34,
    service: {
        id: 1,
        code: "tchol",
        name: "Test Colesterol",
        type: 0,
    },
    external: 0,
    billable: {
        amount: 100,
    }
},
{   id: 35,
    external: 0,
    service: services[0],
}, {
    id: 36,
    service: services[1],
    external: 0
},
{   id: 38,
    service: services[2],
    external: 1
    ,
},
{   id: 39,
    service: services[0],
    external: 0,
    survey: {
        name: "Test Hemoglobina",
    }
}]

export const requestsServiceInvestigation = [{
    id: 1,
    request : {
        id:2,
        status:0,
        researcher:{
            name:"Pedro",
            surnames:"Rodrigurez",
            uuid : "asdfasdfas"
        },
        createdAt: "2022-11-02T10:12:23.511Z",
        updatedAt: "2022-11-04T17:22:23.511Z"
    },
    serviceInvestigation : servicesInvestigation[0],
    patientInvestigation:{
        uuid : "asdfasdf",
        name: "Jose Luis",
        surnames: "Perez"
    },
    billItem:null,
    survey:null
},
{
    id: 3,
    request : {
        id:4,
        status:2,
        researcher:{
            name:"Guillermo",
            surnames:"Suarez",
            uuid : "asdfasdfas"
        },
        createdAt: "2022-11-04T17:22:23.511Z",
        updatedAt: "2022-11-08T18:42:33.511Z"
    },
    serviceInvestigation : servicesInvestigation[1],
    patientInvestigation:{
        uuid : "asdfasdf",
        name: "Matilde",
        surnames: "Martiniez"
    },
    billItem:{
        id : 34,
        amount:900,
        type:0
    },
    survey:{
        uuid:"asdfasd",
        name: "Test Creatinina"
    }
    
}]