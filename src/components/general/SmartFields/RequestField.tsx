import React from 'react';
import RequestForm from '../../../pages/hospital/Service/RequestForm';
import { IRequest, IRequestServiceInvestigation, IServiceInvestigation } from '../../../pages/hospital/Service/types';
import { PropsSmartField, PropsSmartFieldLocalized } from './index';

interface RequestFieldProps extends PropsSmartField {
    serviceType:number,
    initRequestsServiceInvestigation?:IRequest,
    initServicesInvestigation?: IServiceInvestigation[],
    uuidPatient:string,
    uuidSurvey:string,
    uuidInvestigation:string,
    cancel:() => void,
}

const RequestField: React.FC<RequestFieldProps> = ({ serviceType, uuidSurvey, initServicesInvestigation, uuidPatient, uuidInvestigation, 
                                                        initRequestsServiceInvestigation, cancel, elementSelected }) => {
    const [requestsServiceInvestigation, setRequestsServiceInvestigation] = React.useState<null | IRequest>(initRequestsServiceInvestigation ? initRequestsServiceInvestigation : null);


    function callBackRequestFinished(request:IRequest){
        setRequestsServiceInvestigation(request);
        request.requestsServiceInvestigation.forEach((requestServiceInvestigation) => {
            switch(serviceType){
                case 0:
                    elementSelected({
                        request_lab : requestServiceInvestigation.serviceInvestigation.service.name,
                        request_id : requestServiceInvestigation.serviceInvestigation.service.id,
                    });
                break;
                case 1:
                    elementSelected({
                        request_img : requestServiceInvestigation.serviceInvestigation.service.name,
                        request_id : requestServiceInvestigation.serviceInvestigation.service.id
                    });
            }
        })
        
    }
    if(requestsServiceInvestigation){
        return <div>Hay peticiones</div>
    }
    return (
        <>
            {/* <RequestForm uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} 
                callBackRequestFinished={(reqs) => callBackRequestFinished(reqs)} cancel={cancel}
                initServicesInvestigation={initServicesInvestigation} serviceType={serviceType} /> */}
        </>
    );
};

export default RequestField;
