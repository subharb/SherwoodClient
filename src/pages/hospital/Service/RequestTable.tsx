import { blue, brown, green, orange, red, yellow } from '@material-ui/core/colors';
import { ContactSupportOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ColourChip } from '../../../components/general/mini_components-ts';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { dateAndTimeFromPostgresString, decryptSinglePatientData, fullDateFromPostgresString, fullNamePatient, researcherFullName, stringDatePostgresToDate } from '../../../utils';
import axios from '../../../utils/axios';

import { IRequest, IRequestGroup, IRequestServiceInvestigation, IServiceInvestigation, RequestStatus, RequestType } from './types';

const requestGroupStatus = (requestGroup:IRequestGroup) => {
    // Si una request es completada, el estado es completada. Si no, devuelvo los estados de las requests
    if(requestGroup.requests.some(request => request.status === RequestStatus.COMPLETED)){
        return <RequestStatusToChip type={RequestStatus.COMPLETED} />
    }
    else{
        return requestGroup.requests.map((req) => {
            return <RequestStatusToChip type={req.status} />
        }) 
    }
    
}

const RequestStatusToChip:React.FC<{type:RequestStatus}> = ({type}) =>  {
        let colour = null
        let translation = RequestStatus[type]
        switch(type){
            case RequestStatus.PENDING:
            case RequestStatus.PENDING_PAYMENT:
            case RequestStatus.IN_PROGRESS:
                colour = yellow[900];
                break;
            case RequestStatus.ACCEPTED: 
                colour = blue[900];
                break;
            case RequestStatus.COMPLETED: 
            case RequestStatus.INCOMPLETE_ACCEPTED:
                colour = green[700];            
                break;
            case RequestStatus.CANCELED:
            case RequestStatus.DENIED:
            case RequestStatus.INCOMPLETE:
                colour = red[100];            
                break;            
            default:
                return <ColourChip size="small" label={<Translate id={`pages.hospital.services.request_status.${translation}`} />} rgbcolor={colour} />
        }
        return <ColourChip size="small" label={<Translate id={`pages.hospital.services.request_status.${translation}`}  />} rgbcolor={colour} />
}

export const serviceToColor = (type:RequestType) => {
    let colour = null
    switch(type){
        case RequestType.LABORATORY:
            colour = orange[900];
            break;
        case RequestType.IMAGING:
            colour = yellow[900];
            break;
        case RequestType.PHARMACY:
            colour = green[900];
            break;
        case RequestType.SHOE:
            colour = brown[900];
            break;
        case RequestType.INTERCONSULT:
            colour = red[100];
            break;
    }
    return colour;
}

const ServiceTypeToChip:React.FC<{type:RequestType}> = ({type}) =>  {
    let colour = serviceToColor(type);
    let translation = RequestType[type];
    return <ColourChip size="small" label={<Translate id={`pages.hospital.services.service_type.${translation}`}  />} rgbcolor={colour} />
}


interface RequestTableProps {
    serviceType:number,
    uuidPatient?:string,
    uuidInvestigation:string,
    showActions:boolean,
    surveys:ISurvey[],
    fillPending:boolean,
    encryptionData:{
        encryptedKeyUsed:number,
        keyResearcherInvestigation:string,
        permissions:any[],
        personalFields:any[],
    },
    callBackRequestEdit:(request:IRequestGroup)=>void
}

const ACTIONABLE_REQUESTS = [RequestStatus.PENDING, RequestStatus.ACCEPTED, RequestStatus.COMPLETED];


const RequestTable: React.FC<RequestTableProps> = ({ serviceType, surveys, uuidPatient, uuidInvestigation, encryptionData, showActions,fillPending,  callBackRequestEdit: callBackSurveySelected}) => {
    const [requestsGroup, setRequestsGroup] = React.useState<IRequestGroup[] | null>(null);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            let response;
            if(uuidPatient){
                response = await axios(`${process.env.REACT_APP_API_URL}/hospital/${uuidInvestigation}/requests/${uuidPatient}/${serviceType}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                    .catch(err => {console.log('Catch', err); return err;});
            }
            else{
                response = await axios(`${process.env.REACT_APP_API_URL}/hospital/${uuidInvestigation}/requests/${serviceType}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;});
            }
            
            if(response.status === 200 && response.data){
                setRequestsGroup(response.data.requestsGroup);
            }
            setLoading(false);
        }
        fetchData();    
            
    }, [serviceType, uuidPatient]);

    if(requestsGroup && requestsGroup.length > 0){
        return(
            <RequestTableComponent surveys={surveys} fillPending={fillPending}  encryptionData={encryptionData} uuidPatient={uuidPatient} showActions={showActions}
                loading={loading} requestsGroup={requestsGroup} callBackRequestEdit={callBackSurveySelected}/>
        )
    }
    else if(!requestsGroup){
        return <Loader />
    }
    return (
        <Translate id="pages.hospital.services.no_requests" />
    )
}

export default RequestTable;

interface RequestTableComponentProps extends Omit< RequestTableProps, 'serviceType' | 'uuidInvestigation' >{
    requestsGroup:IRequestGroup[],
    loading:boolean,
    
}

export const RequestTableComponent: React.FC<RequestTableComponentProps> = ({ uuidPatient, fillPending, surveys, requestsGroup, 
                                                                                showActions, encryptionData, loading, callBackRequestEdit }) => {
    
    function fillRequest(id:number){
        const requestGroup = requestsGroup.find((req) => req.id === id);
        if(requestGroup){
            const hasActionableRequests = ACTIONABLE_REQUESTS.filter(function(status) {
                return requestGroup.requests.findIndex((req) => req.status === status) !== -1
            }).length > 0;
            if(hasActionableRequests && requestGroup.requests[0].requestServiceInvestigation.survey !== null){
                console.log(requestGroup.requests[0].requestServiceInvestigation.serviceInvestigation.survey.name);
                callBackRequestEdit(requestGroup);
            }
            else{
                console.log("No hay survey");
            }
        }
        else{
            console.log("No hay nada que hacer con esa solicitud");
        }
        
    }
    if(loading){
        return <Loader />
    }
    else if(requestsGroup.length === 0){
        return(
            <div className="text-center">
                <h4>No hay solicitudes</h4>
            </div>
        )
    }
    let headCells = [{id : 'id', label: 'Request ID', alignment:'left'},
                    {id : 'researcher', label: <Translate id="hospital.staff" />, alignment:'left'},
                    {id : 'unit', label: <Translate id="hospital.departments.unit" />, alignment:'left'},
                    {id : 'service', label: <Translate id="pages.hospital.services.service" />, alignment:'left'},
                    {id : 'type', label: <Translate id="pages.hospital.services.type" />, alignment:'left'},
                    {id : 'date', label: <Translate id="general.date" />, alignment:'left'},
                    {id : 'status', label: <Translate id="pages.hospital.services.status" />, alignment:'left'},];
    if(!uuidPatient){
        headCells.splice(1, 0, {id : 'nhc', label: <Translate id="investigation.create.personal_data.fields.health_id" />, alignment:'left'})
        headCells.splice(2, 0, {id : 'patient', label: <Translate id="general.patient" />, alignment:'left'})
    } 
    
    const rows = requestsGroup.sort((reqA, reqB) => stringDatePostgresToDate(reqB.updatedAt).getMilliseconds() - stringDatePostgresToDate(reqA.updatedAt).getMilliseconds() ).map((requestGroup) => {
        let survey = null
        if(requestGroup.requests[0].requestServiceInvestigation.survey){
            const aSurvey = requestGroup.requests[0].requestServiceInvestigation.survey as ISurvey;
            survey = surveys.find((survey) => survey.uuid === aSurvey.uuid);
        }
        
        return {
            id: requestGroup.id,
            nhc: requestGroup.requests[0].requestServiceInvestigation.patientInvestigation.id,
            service:requestGroup.requests[0].requestServiceInvestigation.serviceInvestigation.service.name,
            unit: requestGroup.surveyRequest && requestGroup.surveyRequest.unit ? requestGroup.surveyRequest.unit.name : "",
            patient:requestGroup.requests[0].requestServiceInvestigation.patientInvestigation.personalData ? fullNamePatient(decryptSinglePatientData(requestGroup.requests[0].requestServiceInvestigation.patientInvestigation.personalData, encryptionData)) : requestGroup.requests[0].requestServiceInvestigation.patientInvestigation.id,
            researcher: researcherFullName(requestGroup.researcher),            
            status: requestGroupStatus(requestGroup),
            type : <ServiceTypeToChip type={requestGroup.requests[0].requestServiceInvestigation.serviceInvestigation.service.type} />, 
            date: dateAndTimeFromPostgresString("es", requestGroup.updatedAt),
        }
    })
    let actions = null;
    
    return (
        <>
          <EnhancedTable  selectRow={(id:number) => fillRequest(id)} noHeader noSelectable rows={rows} headCells={headCells} actions={actions} />  
        </>
    );
};
