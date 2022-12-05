import { Card, CardContent, Grid } from '@material-ui/core';
import React from 'react';
import Loader from '../../../components/Loader';
import { PHARMACY_CENTRAL_PERMISSIONS } from '../../../constants';
import { PERMISSION } from '../../../constants/types';
import { useRequest } from '../../../hooks';
import RequestInfo from '../Service/RequestInfo';
import { IRequest, IRequestPharmacy, RequestStatus } from '../Service/types';
import ListPharmacyItems from './ListRequestPharmacyItems';
import { IPharmacyItem } from './types';

export enum RequestAction {
    MAKE = 0,
    APPROVE = 1
}
interface RequestSingleProps {
    idRequest:number,
    userPermissions:PERMISSION[],
    pharmacyItems:IPharmacyItem[],
    saveRequestCallback:(request:IRequest,approve:boolean) => void,
}

const RequestSingle: React.FC<RequestSingleProps> = ({ idRequest, userPermissions,pharmacyItems,  saveRequestCallback }) => {
    const {request, loadingRequest} = useRequest(idRequest);
    const canViewPharmacyCentral = userPermissions.some((value:PERMISSION) => PHARMACY_CENTRAL_PERMISSIONS.includes(value));
    const action:RequestAction = canViewPharmacyCentral ? RequestAction.APPROVE : RequestAction.MAKE;
    
    function updateRequest(reqPharmacy:IRequestPharmacy[], approved:boolean){
        if(request){
            request.requestsPharmacy = reqPharmacy;
            saveRequestCallback(request, approved);
        }
        
    }
    if(loadingRequest || !request){
        return <Loader />
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <RequestInfo request={request} />   
            </Grid>
            <Grid item xs={12}>
                <ListPharmacyItems completed={request.status === RequestStatus.COMPLETED} action={action} userPermissions={userPermissions} pharmacyItems={pharmacyItems}
                    statusRequest={request.status} requestsPharmacy={request.requestsPharmacy}
                    saveRequestCallback={(reqPharmacy:IRequestPharmacy[], approved:boolean) => updateRequest(reqPharmacy, approved)} />
            </Grid>
        </Grid>
    );
};

export default RequestSingle;
