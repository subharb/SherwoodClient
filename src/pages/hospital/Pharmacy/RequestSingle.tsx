import { Card, CardContent, Grid } from '@material-ui/core';
import React from 'react';
import Loader from '../../../components/Loader';
import { useRequest } from '../../../hooks';
import RequestInfo from '../Service/RequestInfo';
import ListPharmacyItems from './ListRequestPharmacyItems';

interface RequestSingleProps {
    idRequest:number,
}

const RequestSingle: React.FC<RequestSingleProps> = ({ idRequest }) => {
    const {request, loadingRequest} = useRequest(idRequest);
    if(loadingRequest || !request){
        return <Loader />
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <RequestInfo request={request} />   
            </Grid>
            <Grid item xs={12}>
                <ListPharmacyItems statusRequest={request.status} requestsPharmacy={request.requestsPharmacy} />
            </Grid>
        </Grid>
    );
};

export default RequestSingle;
