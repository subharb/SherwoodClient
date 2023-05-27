import { Grid, Typography } from '@material-ui/core';
import { blue, brown, green, orange, red, yellow } from '@material-ui/core/colors';
import { ContactSupportOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { TypographyThemed } from '../../../components/general/mini_components';
import { ColourChip } from '../../../components/general/mini_components-ts';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { useDepartments } from '../../../hooks';
import { dateAndTimeFromPostgresString, decryptSinglePatientData, fullDateFromPostgresString, fullNamePatient, getDepartmentFromUnit, researcherFullName, stringDatePostgresToDate } from '../../../utils';
import axios from '../../../utils/axios';

import { IRequest, IRequestServiceInvestigation, IServiceInvestigation, RequestStatus, RequestType } from './types';
import SearchBox from '../../../components/general/SearchBox';

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
    let colour = "#000";
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
    noSearchBox?:boolean,
    uuidInvestigation:string,
    showActions?:boolean,
    surveys?:ISurvey[],
    searchFor:string,
    fillPending?:boolean,
    encryptionData?:{
        encryptedKeyUsed:number,
        keyResearcherInvestigation:string,
        permissions:any[],
        personalFields:any[],
    },
    callBackRequestSelected:(request:IRequest)=>void
}

type RequestTablePharmacyProps = Pick<RequestTableProps, 'serviceType' | 'uuidInvestigation' | 'callBackRequestSelected'>

const ACTIONABLE_REQUESTS = [RequestStatus.PENDING_APPROVAL, RequestStatus.ACCEPTED, RequestStatus.COMPLETED, RequestStatus.IN_PROGRESS];

export const RequestTableService:React.FC<RequestTableProps> = ({serviceType, uuidPatient, uuidInvestigation, showActions, surveys, fillPending, encryptionData, callBackRequestSelected}) => {
    return <RequestTable serviceType={serviceType} uuidPatient={uuidPatient} searchFor="general.patient"
                uuidInvestigation={uuidInvestigation} showActions={showActions} surveys={surveys} 
                fillPending={fillPending} encryptionData={encryptionData} 
                callBackRequestSelected={callBackRequestSelected} />
}

export const RequestTablePharmacy:React.FC<RequestTablePharmacyProps> = ({serviceType, uuidInvestigation, callBackRequestSelected}) => {
    return <RequestTable serviceType={serviceType} searchFor="hospital.search_box.staff"
                uuidInvestigation={uuidInvestigation} 
                callBackRequestSelected={callBackRequestSelected} />
}

const RequestTable: React.FC<RequestTableProps> = ({ serviceType, searchFor, surveys, uuidPatient, uuidInvestigation, encryptionData, showActions,fillPending,  callBackRequestSelected}) => {
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
            <RequestTableComponent searchFor={searchFor} serviceType={serviceType} surveys={surveys} fillPending={fillPending}  encryptionData={encryptionData} uuidPatient={uuidPatient} showActions={showActions}
                loading={loading} requests={requests} callBackRequestSelected={callBackRequestSelected}/>
        )
    }
    else if(!requests){
        return <Loader />
    }
    return (
        <TypographyThemed variant="body2">
            <Translate id="pages.hospital.services.no_requests" />
        </TypographyThemed>
        
    )
}

export default RequestTable;

interface RequestTableComponentProps extends Omit< RequestTableProps, 'uuidInvestigation' >{
    requests:IRequest[],
    loading:boolean,
    
}

interface Row {
    id: number;
    nhc: string | number;
    service: string | JSX.Element;
    department: string;
    patient: string;
    researcher: string;
    status: JSX.Element;
    type: string | JSX.Element;
    date: string;
}
export const RequestTableComponent: React.FC<RequestTableComponentProps> = ({ uuidPatient, searchFor, requests, serviceType, noSearchBox,
                                                                                encryptionData, loading, callBackRequestSelected }) => {
    
    
    const {departments} = useDepartments();    
    const [rows, setRows] = React.useState<Row[]>([]);
    const [filteredRows, setFilteredRows] = React.useState<Row[]>([]);
    const [searchText, setSearchText] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<RequestStatus | null>(null);

    useEffect(() => {
        setFilteredRows(rows.filter((row: Row) => {
            const searchItem = serviceType === RequestType.PHARMACY ? row.researcher : row.patient;
            return (searchItem.toLocaleLowerCase().includes(searchText) && (statusFilter !== null ? row.status.props.status === statusFilter : true))
                        
        }));
        
    }, [searchText, statusFilter]);
    
    useEffect(() => {
        const rows = requests.sort((reqA, reqB) => stringDatePostgresToDate(reqB.updatedAt).getTime() - stringDatePostgresToDate(reqA.updatedAt).getTime() ).map((request) => {            
            return {
                id: request.id,
                nhc: request.requestsServiceInvestigation[0] ? request.requestsServiceInvestigation[0].patientInvestigation.id : "",
                service: request.requestsServiceInvestigation[0] ? request.requestsServiceInvestigation.length > 1 ? <ColourChip rgbcolor={serviceToColor(request.type)} label={<Translate id="general.several" />} /> : <ColourChip rgbcolor={serviceToColor(request.type)} label={request.requestsServiceInvestigation[0].serviceInvestigation.service.name} /> : "",
                department:request.departmentRequest ? request.departmentRequest.name : "",
                patient:request.requestsServiceInvestigation[0] ? request.requestsServiceInvestigation[0].patientInvestigation.personalData ? fullNamePatient(decryptSinglePatientData(request.requestsServiceInvestigation[0].patientInvestigation.personalData, encryptionData)) : request.requestsServiceInvestigation[0].patientInvestigation.id.toLocaleString() : "",
                researcher: researcherFullName(request.researcher),            
                status: <RequestStatusToChip status={request.status} />,
                type : request.requestsServiceInvestigation[0] ? <ServiceTypeToChip type={request.requestsServiceInvestigation[0].serviceInvestigation.service.type} /> : "", 
                date: dateAndTimeFromPostgresString("es", request.updatedAt),
            }
        })
        setRows(rows);
        setFilteredRows(rows);
    }, [requests]);

    function applyStatusFilter(status:RequestStatus){
        if(status === statusFilter){
            setStatusFilter(null);
        }
        else{
            setStatusFilter(status);
        }
        
    }

    function fillRequest(id:number){
        const request = requests.find((req) => req.id === id);
        if(request){
            const hasActionableRequests = ACTIONABLE_REQUESTS.filter(function(status) {
                if(serviceType === RequestType.PHARMACY){
                    return status === request.status
                }
                return request.requestsServiceInvestigation.findIndex((req) => req.status === status) !== -1
            }).length > 0;
            if(hasActionableRequests){
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
    if(loading || !departments){
        return <Loader />
    }
    else if(requests.length === 0){
        return(
            <div className="text-center">
                <h4>No hay solicitudes</h4>
            </div>
        )
    }
    let headCells;
    if(serviceType === RequestType.PHARMACY){
        headCells = [
            { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
            {id : 'researcher', label: <Translate id="hospital.staff" />, alignment:'left'},
            {id : 'status', label: <Translate id="pages.hospital.services.status" />, alignment:'left'},
            {id : 'department', label: <Translate id="hospital.departments.department" />, alignment:'left'},
            {id : 'date', label: <Translate id="general.date" />, alignment:'left'},
        ];
    }
    else{
        headCells = [{id : 'id', label: 'Request ID', alignment:'left'},
                    {id : 'researcher', label: <Translate id="hospital.staff" />, alignment:'left'},
                    {id : 'department', label: <Translate id="hospital.departments.department" />, alignment:'left'},
                    {id : 'service', label: <Translate id="pages.hospital.services.service" />, alignment:'left'},
                    {id : 'type', label: <Translate id="pages.hospital.services.type" />, alignment:'left'},
                    {id : 'date', label: <Translate id="general.date" />, alignment:'left'},
                    {id : 'status', label: <Translate id="pages.hospital.services.status" />, alignment:'left'},];
        if(!uuidPatient){
            headCells.splice(headCells.findIndex((head) => head.id === 'type'), 1); 
            headCells.splice(1, 0, {id : 'nhc', label: <Translate id="investigation.create.personal_data.fields.health_id" />, alignment:'left'})
            headCells.splice(2, 0, {id : 'patient', label: <Translate id="general.patient" />, alignment:'left'})
        }
    }
     
    
    
    let actions = null;
    
    return (
        <Grid container spacing={2}>
            {
                noSearchBox && 
                <SearchBox textField={{label:searchFor, callBack:setSearchText}} filterItems={[
                    {label:"completed", color:statusToColor(RequestStatus.COMPLETED), callBack:() => applyStatusFilter(RequestStatus.COMPLETED)},
                    {label:"in_progress", color:statusToColor(RequestStatus.IN_PROGRESS), callBack:() => applyStatusFilter(RequestStatus.IN_PROGRESS)},
                    {label:"accepted", color:statusToColor(RequestStatus.ACCEPTED), callBack:() => applyStatusFilter(RequestStatus.ACCEPTED)},
                    {label:"some_accepted", color:statusToColor(RequestStatus.SOME_ACCEPTED), callBack:() => applyStatusFilter(RequestStatus.SOME_ACCEPTED)},
                ]} />
            }
            
            <Grid item xs={12}>
                <EnhancedTable  selectRow={(id:number) => fillRequest(id)} noHeader noSelectable rows={filteredRows} headCells={headCells} actions={actions} />  
            </Grid>
        </Grid>
    );
};
