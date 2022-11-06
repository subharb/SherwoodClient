import { brown, green, orange, red, yellow } from '@material-ui/core/colors';
import { ContactSupportOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { dateAndTimeFromPostgresString, decryptSinglePatientData, fullDateFromPostgresString, fullNamePatient, researcherFullName } from '../../../utils';
import axios from '../../../utils/axios';
import { ColourChip } from '../departments/Admin';
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
    encryptionData:{
        encryptedKeyUsed:number,
        keyResearcherInvestigation:string,
        permissions:any[],
        personalFields:any[],
    },
    callBackRequestEdit:(request:IRequestServiceInvestigation)=>void
}

const RequestTable: React.FC<RequestTableProps> = ({ serviceType, uuidPatient, uuidInvestigation, encryptionData, showActions, callBackRequestEdit: callBackSurveySelected}) => {
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
            <RequestTableComponent encryptionData={encryptionData} uuidPatient={uuidPatient} showActions={showActions}
                loading={loading} requestsServiceInvestigation={requestsServiceInvestigation} callBackRequestEdit={callBackSurveySelected}/>
        )
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

export const RequestTableComponent: React.FC<RequestTableComponentProps> = ({ uuidPatient, requestsServiceInvestigation, 
                                                                                showActions, encryptionData, loading, callBackRequestEdit }) => {
    
    function fillRequest(id:number){
        const request = requestsServiceInvestigation.find((req) => req.id === id);
        if(request && request.survey !== null){
            console.log(request.survey.name);
            callBackRequestEdit(request);
        }
        else{
            console.log("No hay survey");
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
    let headCells = [{id : 'researcher', label: 'Investigador', alignment:'left'},
                    {id : 'service', label: 'Service', alignment:'left'},
                    {id : 'status', label: 'Estado', alignment:'left'},
                    {id : 'type', label: 'Tipo', alignment:'left'},
                    {id : 'date', label: 'Fecha', alignment:'left'}];
    if(!uuidPatient){
        headCells.splice(0, 0, {id : 'NHC', label: 'NHC', alignment:'left'})
        headCells.splice(1, 0, {id : 'patient', label: 'Patient', alignment:'left'})
    } 
    
    const rows = requestsServiceInvestigation.map((requestInvestigation) => {
        return {
            id: requestInvestigation.id,
            nhc: requestInvestigation.patientInvestigation.id,
            service:requestInvestigation.serviceInvestigation.service.name,
            patient:requestInvestigation.patientInvestigation.personalData ? fullNamePatient(decryptSinglePatientData(requestInvestigation.patientInvestigation.personalData, encryptionData)) : requestInvestigation.patientInvestigation.id,
            researcher: researcherFullName(requestInvestigation.request.researcher),            
            status: <RequestStatusToChip type={requestInvestigation.request.status} />,
            type : <ServiceTypeToChip type={requestInvestigation.serviceInvestigation.service.type} />, 
            date: dateAndTimeFromPostgresString("es", requestInvestigation.request.updatedAt),
        }
    })
    let actions = null;
    if(showActions){
        actions = [{"type" : "edit", "func" : (id:number) => fillRequest(id)}]
    }
    
    return (
        <>
          <EnhancedTable noHeader noSelectable rows={rows} headCells={headCells} actions={actions} />  
        </>
    );
};
