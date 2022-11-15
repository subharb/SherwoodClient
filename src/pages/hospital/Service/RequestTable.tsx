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

import { IRequest, IRequestServiceInvestigation, IServiceInvestigation, RequestStatus, RequestType } from './types';

const requestGroupStatus = (request:IRequest) => {
    // Si una request es completada, el estado es completada. Si no, devuelvo los estados de las requests
    if(request.requestsServiceInvestigation.some(request => request.status === RequestStatus.COMPLETED)){
        return <RequestStatusToChip status={RequestStatus.COMPLETED} />
    }
    else{
        return request.requestsServiceInvestigation.map((req) => {
            return <RequestStatusToChip status={req.status} />
        }) 
    }
    
}

export const statusToColor = (status:RequestStatus) => {
    let colour = null;
    switch(status){
        case RequestStatus.PENDING_APPROVAL:
        case RequestStatus.PENDING_PAYMENT:
        case RequestStatus.IN_PROGRESS:
            colour = yellow[900];
            break;
        case RequestStatus.ACCEPTED: 
            colour = blue[900];
            break;
        case RequestStatus.SOME_ACCEPTED:
        case RequestStatus.INCOMPLETE_ACCEPTED:
            colour = blue[600];
            break;
        case RequestStatus.COMPLETED: 
            colour = green[700];            
            break;
        case RequestStatus.CANCELED:
        case RequestStatus.DENIED:
        case RequestStatus.INCOMPLETE:
            colour = red[100];            
            break;  
    }
    return colour;
}

export const RequestStatusToChip:React.FC<{status:RequestStatus}> = ({status}) =>  {
        let colour = statusToColor(status);
        let translation = RequestStatus[status]
       
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
    callBackRequestSelected:(request:IRequest)=>void
}

const ACTIONABLE_REQUESTS = [RequestStatus.PENDING_APPROVAL, RequestStatus.ACCEPTED, RequestStatus.COMPLETED];


const RequestTable: React.FC<RequestTableProps> = ({ serviceType, surveys, uuidPatient, uuidInvestigation, encryptionData, showActions,fillPending,  callBackRequestSelected}) => {
    const [requests, setRequests] = React.useState<IRequest[] | null>(null);
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
                setRequests(response.data.requests);
            }
            setLoading(false);
        }
        fetchData();    
            
    }, [serviceType, uuidPatient]);

    if(requests && requests.length > 0){
        return(
            <RequestTableComponent surveys={surveys} fillPending={fillPending}  encryptionData={encryptionData} uuidPatient={uuidPatient} showActions={showActions}
                loading={loading} requests={requests} callBackRequestSelected={callBackRequestSelected}/>
        )
    }
    else if(!requests){
        return <Loader />
    }
    return (
        <Translate id="pages.hospital.services.no_requests" />
    )
}

export default RequestTable;

interface RequestTableComponentProps extends Omit< RequestTableProps, 'serviceType' | 'uuidInvestigation' >{
    requests:IRequest[],
    loading:boolean,
    
}

export const RequestTableComponent: React.FC<RequestTableComponentProps> = ({ uuidPatient, fillPending, surveys, requests, 
                                                                                showActions, encryptionData, loading, callBackRequestSelected }) => {
    
    function fillRequest(id:number){
        const request = requests.find((req) => req.id === id);
        if(request){
            const hasActionableRequests = ACTIONABLE_REQUESTS.filter(function(status) {
                return request.requestsServiceInvestigation.findIndex((req) => req.status === status) !== -1
            }).length > 0;
            if(hasActionableRequests && request.requestsServiceInvestigation[0].survey !== null){
                callBackRequestSelected(request);
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
    else if(requests.length === 0){
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
        headCells.splice(headCells.findIndex((head) => head.id === 'type'), 1); 
        headCells.splice(1, 0, {id : 'nhc', label: <Translate id="investigation.create.personal_data.fields.health_id" />, alignment:'left'})
        headCells.splice(2, 0, {id : 'patient', label: <Translate id="general.patient" />, alignment:'left'})
    } 
    
    const rows = requests.sort((reqA, reqB) => stringDatePostgresToDate(reqB.updatedAt).getTime() - stringDatePostgresToDate(reqA.updatedAt).getTime() ).map((request) => {
        let survey = null
        if(request.requestsServiceInvestigation[0].survey){
            const aSurvey = request.requestsServiceInvestigation[0].survey as ISurvey;
            survey = surveys.find((survey) => survey.uuid === aSurvey.uuid);
        }
        
        return {
            id: request.id,
            nhc: request.requestsServiceInvestigation[0].patientInvestigation.id,
            service: request.requestsServiceInvestigation.length > 1 ? <ColourChip rgbcolor={serviceToColor(request.type)} label={<Translate id="general.several" />} /> : <ColourChip rgbcolor={serviceToColor(request.type)} label={request.requestsServiceInvestigation[0].serviceInvestigation.service.name} />,
            unit: request.surveyRequest && request.surveyRequest.unit ? request.surveyRequest.unit.name : "",
            patient:request.requestsServiceInvestigation[0].patientInvestigation.personalData ? fullNamePatient(decryptSinglePatientData(request.requestsServiceInvestigation[0].patientInvestigation.personalData, encryptionData)) : request.requestsServiceInvestigation[0].patientInvestigation.id,
            researcher: researcherFullName(request.researcher),            
            status: <RequestStatusToChip status={request.status} />,
            type : <ServiceTypeToChip type={request.requestsServiceInvestigation[0].serviceInvestigation.service.type} />, 
            date: dateAndTimeFromPostgresString("es", request.updatedAt),
        }
    })
    let actions = null;
    
    return (
        <>
          <EnhancedTable  selectRow={(id:number) => fillRequest(id)} noHeader noSelectable rows={rows} headCells={headCells} actions={actions} />  
        </>
    );
};
