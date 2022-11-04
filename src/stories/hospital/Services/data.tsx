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
        }
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
        }
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