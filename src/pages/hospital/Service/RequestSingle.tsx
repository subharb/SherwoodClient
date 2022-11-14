import { Card, Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColourChip } from '../../../components/general/mini_components-ts';
import Loader from '../../../components/Loader';
import PatientInfo from '../../../components/PatientInfo';
import { serviceToColor } from './RequestTable';
import { IRequest } from './types';
import styled from 'styled-components';

const ChipContainer = styled.div`
    display:inline;
    margin-left:0.5rem;
`

interface RequestSingleProps {
    idRequest:number,
    uuidPatient:string,
    uuidInvestigation:string,
}

const RequestSingle: React.FC<RequestSingleProps> = ({ idRequest, uuidInvestigation }) => {
    const [request, setRequest] = useState<IRequest | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRequest = async () => {
            setLoading(true);
            
            const response = await axios(`${process.env.REACT_APP_API_URL}/hospital/${uuidInvestigation}/request/${idRequest}`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                    .catch(err => {console.log('Catch', err); return err;});
            if(response.status === 200){
                setRequest(response.data.request);
            }
            setLoading(false);
        }

        fetchRequest();
    }, [idRequest])

    if(!request && loading){
        return <Loader />
    }
    else if(!request){
        return <Typography variant="h4">Request not found</Typography>
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card style={{padding:"1rem"}}>
                        <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Request ID: </span>{request.id}</Typography> </div>
                        <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Requested Items: </span>{request.requestsServiceInvestigation.map((reqSer) => <ChipContainer><ColourChip size="small" rgbcolor={serviceToColor(request.type)} label={reqSer.serviceInvestigation.service.name}/></ChipContainer>)}</Typography> </div>
                    </Card>  
                </Grid>
                <Grid item xs={12}>
                    <Card style={{padding:"1rem"}}>
                        <PatientInfo uuidPatient={request.requestsServiceInvestigation[0].patientInvestigation.uuid}/>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default RequestSingle;
