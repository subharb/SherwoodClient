import { Card, CardContent, Grid } from '@material-ui/core';
import React from 'react';
import Loader from '../../../components/Loader';
import { PHARMACY_CENTRAL_PERMISSIONS } from '../../../constants';
import { PERMISSION } from '../../../constants/types';
import { useRequest } from '../../../hooks';
import RequestInfo from '../Service/RequestInfo';
import ListPharmacyItems from './ListRequestPharmacyItems';
import DataGridDemo from './TestDataGrid';

export enum RequestAction {
    MAKE = 0,
    APPROVE = 1
}
interface RequestSingleProps {
    idRequest:number,
    userPermissions:PERMISSION[]
}

const RequestSingle: React.FC<RequestSingleProps> = ({ idRequest, userPermissions }) => {
    const {request, loadingRequest} = useRequest(idRequest);
    const canViewPharmacyCentral = userPermissions.some((value:PERMISSION) => PHARMACY_CENTRAL_PERMISSIONS.includes(value));
    const action:RequestAction = canViewPharmacyCentral ? RequestAction.APPROVE : RequestAction.MAKE;
    if(loadingRequest || !request){
        return <Loader />
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <RequestInfo request={request} />   
            </Grid>
            <Grid item xs={12}>
                <ListPharmacyItems action={action} userPermissions={userPermissions} statusRequest={request.status} requestsPharmacy={request.requestsPharmacy} />
            </Grid>
        </Grid>
    );
};

export default RequestSingle;
