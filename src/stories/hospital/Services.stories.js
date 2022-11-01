import React from 'react';

import { AddPatientComponent } from '../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server } from "../example_data";
import ProviderSherwood from '../../providerSherwood';
import Service from '../../pages/hospital/Service';
import { EditServicesComponent } from '../../pages/hospital/Service/Edit';
import RequestFormComponent from '../../pages/hospital/Service/RequestForm';

export default {
    title: 'Hospital/Service Home',
    component: Service,
    argTypes: {


    },
    decorators: [story =>
        <ProviderSherwood>
            {story()}
        </ProviderSherwood>],
};

const TemplateEdit = (args) => <EditServicesComponent {...args} />;
const TemplateRequestForm = (args) => <RequestFormComponent {...args} />;

const services = [{
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
const servicesInvestigation = [{
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
    service: {
        id: 2,
        code: "tcrea",
        name: "Test Creatinina",
        type: 0
    },
}, {
    id: 36,
    service: {
        id: 3,
        code: "themo",
        name: "Test Hemoglobina",
        type: 0
    },
    external: 0
},
{   id: 38,
    service: {
        id: 4,
        code: "themo",
        name: "Test Hemoglobina",
        type: 0
    },
    external: 1
    ,
},
{   id: 39,
    service: {
        id: 5,
        code: "themo",
        name: "Test Hemoglobina",
        type: 0
    },
    external: 0,
    survey: {
        name: "Test Hemoglobina",
    }
}]
export const Edit = TemplateEdit.bind({});
Edit.args = {
    typeService: "laboratory",
    loading: false,
    surveys: [{
        uuid: "asdfasdf",
        name: "Prueba Colesterol",
    },
    {
        uuid: "asdfasdf",
        name: "Prueba Creatinina",
    }],
    services: services
};

export const RequestForm = TemplateRequestForm.bind({});
RequestForm.args = {
    servicesInvestigation: servicesInvestigation
}