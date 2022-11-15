import { Card, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RequestStatusToChip, statusToColor } from './RequestTable';
import { IRequest } from './types';
import styled from 'styled-components';
import { ColourChip } from '../../../components/general/mini_components-ts';
import Loader from '../../../components/Loader';
import axios from '../../../utils/axios';

const ChipContainer = styled.div`
    display:inline;
    margin-left:0.5rem;
`;

interface RequestInfoWithFetchProps {
    idSubmission:number, 
    uuidInvestigation:string
}

export const RequestInfoWithFetch: React.FC<RequestInfoWithFetchProps> = ({ idSubmission, uuidInvestigation }) => {
    const [request, setRequest] = useState<IRequest | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRequest = async () => {
            setLoading(true);
            
            const response = await axios(`${process.env.REACT_APP_API_URL}/hospital/${uuidInvestigation}/request/submission/${idSubmission}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                    .catch(err => {console.log('Catch', err); return err;});
            if(response.status === 200){
                setRequest(response.data.request);
            }
            setLoading(false);
        }
        if(!request){
            fetchRequest();
        }
    }, [idSubmission])

    if(loading){
        return <Loader />
    }
    else{
        if(!request){
            return <Typography variant="h6">No request found</Typography>
        }
        return(
            <RequestInfo request={request} />
        )
    }
    


}

interface RequestInfoProps {
    request:IRequest
}

const RequestInfo: React.FC<RequestInfoProps> = ({ request }) => {
    return (
        <Grid item xs={12}>
            <Card style={{padding:"1rem"}}>
                <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Request ID: </span>{request.id}</Typography> </div>
                <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Request Status: </span><RequestStatusToChip status={request.status} /></Typography> </div>
                <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Requested Items: </span>{request.requestsServiceInvestigation.map((reqSer) => <ChipContainer><ColourChip size="small" rgbcolor={statusToColor(reqSer.status)} label={reqSer.serviceInvestigation.service.name}/></ChipContainer>)}</Typography> </div>
            </Card>  
        </Grid>
    );
};

export default RequestInfo;
