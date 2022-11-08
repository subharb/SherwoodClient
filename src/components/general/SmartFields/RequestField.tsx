import React from 'react';
import RequestForm from '../../../pages/hospital/Service/RequestForm';
import { IRequestServiceInvestigation, IServiceInvestigation } from '../../../pages/hospital/Service/types';
import { PropsSmartField, PropsSmartFieldLocalized } from './index';

interface RequestFieldProps extends PropsSmartField {
    serviceType:number,
    initRequestsServiceInvestigation?:IRequestServiceInvestigation[],
    initServicesInvestigation?: IServiceInvestigation[],
    uuidPatient:string,
    uuidSurvey:string,
    uuidInvestigation:string,
    cancel:() => void,
}

const RequestField: React.FC<RequestFieldProps> = ({ serviceType, uuidSurvey, initServicesInvestigation, uuidPatient, uuidInvestigation, 
                                                        initRequestsServiceInvestigation, cancel, elementSelected }) => {
    const [requestsServiceInvestigation, setRequestsServiceInvestigation] = React.useState<null | IRequestServiceInvestigation[]>(initRequestsServiceInvestigation ? initRequestsServiceInvestigation : null);


    function callBackRequestFinished(requestsServiceInvestigation:IRequestServiceInvestigation[]){
        setRequestsServiceInvestigation(requestsServiceInvestigation);
        requestsServiceInvestigation.forEach((req) => {
            switch(serviceType){
                case 0:
                    elementSelected({
                        request_lab : req.serviceInvestigation.service.name,
                        request_id : req.id,
                    });
                break;
                case 1:
                    elementSelected({
                        request_img : req.serviceInvestigation.service.name,
                        request_id :req.id
                    });
            }
        })
        
    }
    if(requestsServiceInvestigation){
        return <div>Hay peticiones</div>
    }
    return (
        <>
            <RequestForm uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} 
                uuidSurvey={uuidSurvey} 
                callBackRequestFinished={(reqs) => callBackRequestFinished(reqs)} cancel={cancel}
                initServicesInvestigation={initServicesInvestigation} serviceType={serviceType} />
        </>
    );
};

export default RequestField;
