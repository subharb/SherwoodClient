import React from 'react';
import RequestForm from '../../../pages/hospital/Service/RequestForm';
import { IRequestServiceInvestigation, IServiceInvestigation } from '../../../pages/hospital/Service/types';

interface RequestFieldProps {
    serviceType:number,
    initRequestsServiceInvestigation?:IRequestServiceInvestigation[],
    initServicesInvestigation?: IServiceInvestigation[],
    uuidPatient:string,
    uuidInvestigation:string,
}

const RequestField: React.FC<RequestFieldProps> = ({ serviceType, initServicesInvestigation, uuidPatient, uuidInvestigation, initRequestsServiceInvestigation }) => {
    const [requestsServiceInvestigation, setRequestsServiceInvestigation] = React.useState<null | IRequestServiceInvestigation[]>(initRequestsServiceInvestigation ? initRequestsServiceInvestigation : null);


    function callBackRequestFinished(requestsServiceInvestigation:IRequestServiceInvestigation[]){
        setRequestsServiceInvestigation(requestsServiceInvestigation);
    }
    if(requestsServiceInvestigation){
        return <div>Hay peticiones</div>
    }
    return (
        <>
            <RequestForm uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} 
                callBackRequestFinished={(reqs) => callBackRequestFinished(reqs)}
                initServicesInvestigation={initServicesInvestigation} serviceType={serviceType} />
        </>
    );
};

export default RequestField;
