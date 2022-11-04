import { brown, green, orange, red, yellow } from '@material-ui/core/colors';
import React from 'react';
import { Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ColourChip } from '../departments/Admin';
import { IRequestServiceInvestigation, IServiceInvestigation, RequestStatus, RequestType } from './types';

interface RequestTableProps {
    requestsServiceInvestigation:IRequestServiceInvestigation[],
    serviceType:number,
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

const RequestTable: React.FC<RequestTableProps> = ({ requestsServiceInvestigation }) => {
    if(requestsServiceInvestigation.length === 0){
        return(
            <div className="text-center">
                <h4>No hay solicitudes</h4>
            </div>
        )
    }
    const headCells = [{id : 'researcher', label: 'Investigador', alignment:'left'},
                    {id : 'status', label: 'Estado', alignment:'left'},
                    {id : 'type', label: 'Tipo', alignment:'left'},
                    {id : 'date', label: 'Fecha', alignment:'left'}];
    const rows = requestsServiceInvestigation.map((requestInvestigation) => {
        return {
            id: requestInvestigation.id,
            researcher: requestInvestigation.request.researcher.name,
            status: <RequestStatusToChip type={requestInvestigation.request.status} />,
            type : <ServiceTypeToChip type={requestInvestigation.serviceInvestigation.service.type} />, 
            date: requestInvestigation.request.updatedAt,
        }
    })
    return (
        <>
          <EnhancedTable noHeader noSelectable rows={rows} headCells={headCells} />  
        </>
    );
};

export default RequestTable;
