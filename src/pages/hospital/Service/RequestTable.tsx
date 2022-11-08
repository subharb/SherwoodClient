import { blue, brown, green, orange, red, yellow } from '@material-ui/core/colors';
import { ContactSupportOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ColourChip } from '../../../components/general/mini_components';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { dateAndTimeFromPostgresString, decryptSinglePatientData, fullDateFromPostgresString, fullNamePatient, researcherFullName, stringDatePostgresToDate } from '../../../utils';
import axios from '../../../utils/axios';

import { IRequest, IRequestServiceInvestigation, IServiceInvestigation, RequestStatus, RequestType } from './types';

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

const ServiceTypeToChip:React.FC<{type:RequestType}> = ({type}) =>  {
    let colour = null
    let translation = RequestType[type]
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
        default:
            return <ColourChip size="small" label={<Translate id={`pages.hospital.services.service_type.${translation}`} />} rgbcolor={colour} />
    }
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
    callBackRequestEdit:(request:IRequestServiceInvestigation)=>void
}

const ACTIONABLE_REQUESTS = [RequestStatus.PENDING, RequestStatus.ACCEPTED, RequestStatus.COMPLETED];


const RequestTable: React.FC<RequestTableProps> = ({ serviceType, surveys, uuidPatient, uuidInvestigation, encryptionData, showActions,fillPending,  callBackRequestEdit: callBackSurveySelected}) => {
    const [requestsServiceInvestigation, setRequestsServiceInvestigation] = React.useState<IRequestServiceInvestigation[] | null>(null);
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
                setRequestsServiceInvestigation(response.data.requestsServiceInvestigation);
            }
            setLoading(false);
        }
        fetchData();    
            
    }, [serviceType, uuidPatient]);

    if(requestsServiceInvestigation && requestsServiceInvestigation.length > 0){
        return(
            <RequestTableComponent surveys={surveys} fillPending={fillPending}  encryptionData={encryptionData} uuidPatient={uuidPatient} showActions={showActions}
                loading={loading} requestsServiceInvestigation={requestsServiceInvestigation} callBackRequestEdit={callBackSurveySelected}/>
        )
    }
    else if(!requestsServiceInvestigation){
        return <Loader />
    }
    return (
        <Translate id="pages.hospital.services.no_requests" />
    )
}

export default RequestTable;

interface RequestTableComponentProps extends Omit< RequestTableProps, 'serviceType' | 'uuidInvestigation' >{
    requestsServiceInvestigation:IRequestServiceInvestigation[],
    loading:boolean,
    
}

export const RequestTableComponent: React.FC<RequestTableComponentProps> = ({ uuidPatient, fillPending, surveys, requestsServiceInvestigation, 
                                                                                showActions, encryptionData, loading, callBackRequestEdit }) => {
    
    function fillRequest(id:number){
        const requestService = requestsServiceInvestigation.find((req) => req.id === id);
        if(requestService && ACTIONABLE_REQUESTS.includes(requestService.request.status)){
            if(requestService.survey !== null){
                console.log(requestService.survey.name);
                callBackRequestEdit(requestService);
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
    else if(requestsServiceInvestigation.length === 0){
        return(
            <div className="text-center">
                <h4>No hay solicitudes</h4>
            </div>
        )
    }
    let headCells = [{id : 'request_id', label: 'Request ID', alignment:'left'},
                    {id : 'researcher', label: 'Investigador', alignment:'left'},
                    {id : 'service', label: 'Service', alignment:'left'},
                    {id : 'status', label: 'Estado', alignment:'left'},
                    {id : 'unit', label: 'Unit', alignment:'left'},
                    {id : 'type', label: 'Tipo', alignment:'left'},
                    {id : 'date', label: 'Fecha', alignment:'left'}];
    if(!uuidPatient){
        headCells.splice(1, 0, {id : 'nhc', label: 'NHC', alignment:'left'})
        headCells.splice(2, 0, {id : 'patient', label: 'Patient', alignment:'left'})
    } 
    
    const rows = requestsServiceInvestigation.sort((reqA, reqB) => stringDatePostgresToDate(reqB.request.updatedAt).getMilliseconds() - stringDatePostgresToDate(reqA.request.updatedAt).getMilliseconds() ).map((requestInvestigation) => {
        let survey = null
        if(requestInvestigation.survey){
            const aSurvey = requestInvestigation.survey as ISurvey;
            survey = surveys.find((survey) => survey.uuid === aSurvey.uuid);
        }
         
        return {
            id: requestInvestigation.id,
            request_id:requestInvestigation.id,
            nhc: requestInvestigation.patientInvestigation.id,
            service:requestInvestigation.serviceInvestigation.service.name,
            unit: survey && survey.unit ? survey.unit.name : "",
            patient:requestInvestigation.patientInvestigation.personalData ? fullNamePatient(decryptSinglePatientData(requestInvestigation.patientInvestigation.personalData, encryptionData)) : requestInvestigation.patientInvestigation.id,
            researcher: researcherFullName(requestInvestigation.request.researcher),            
            status: <RequestStatusToChip type={requestInvestigation.request.status} />,
            type : <ServiceTypeToChip type={requestInvestigation.serviceInvestigation.service.type} />, 
            date: dateAndTimeFromPostgresString("es", requestInvestigation.request.updatedAt),
        }
    })
    let actions = null;
    
    return (
        <>
          <EnhancedTable  selectRow={(id:number) => fillRequest(id)} noHeader noSelectable rows={rows} headCells={headCells} actions={actions} />  
        </>
    );
};
