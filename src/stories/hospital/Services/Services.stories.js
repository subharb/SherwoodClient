import React from 'react';

import { AddPatientComponent } from '../../../pages/hospital/AddPatient'
import { personal_data_investigation1, investigation_server } from "../../example_data";
import ProviderSherwood from '../../../providerSherwood';
import Service from '../../../pages/hospital/Service';
import { EditServicesComponent } from '../../../pages/hospital/Service/Edit';
import RequestFormComponent from '../../../pages/hospital/Service/RequestForm';
import { RequestTableComponent } from '../../../pages/hospital/Service/RequestTable';
import { requestsServiceInvestigation, services, servicesInvestigation } from './data';


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
const TemplateRequestTable = (args) => <RequestTableComponent {...args} />;


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

export const RequestTable = TemplateRequestTable.bind({});
RequestTable.args = {
    loading:false,
    showActions: true,
    requestsServiceInvestigation: requestsServiceInvestigation
}