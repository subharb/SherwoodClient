import { Card, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RequestStatusToChip, statusToColor } from './RequestTable';
import { IRequest, IRequestServiceInvestigation, RequestStatus } from './types';
import styled from 'styled-components';
import { ColourChip } from '../../../components/general/mini_components-ts';
import Loader from '../../../components/Loader';
import axios from '../../../utils/axios';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { serviceTypeToTranslation } from '../../../utils/index.jsx';

export const ChipContainer = styled.div`
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
            <RequestInfoWithLocalize request={request} />
        )
    }
}

interface RequestInfoProps extends LocalizeContextProps{
    request:IRequest
}

const RequestInfo: React.FC<RequestInfoProps> = ({ request, translate }) => {
  
    function renderServices(){
        let completedRequests:IRequestServiceInvestigation[] = [];
        let acceptedRequests:IRequestServiceInvestigation[] = [];
        let otherStateRequests:IRequestServiceInvestigation[] = [];
        if(request.status !== RequestStatus.COMPLETED){
            acceptedRequests = request.requestsServiceInvestigation.filter(r => r.status === RequestStatus.ACCEPTED);
            otherStateRequests = request.requestsServiceInvestigation.filter(r => r.status !== RequestStatus.ACCEPTED);
        }
        else{
            completedRequests = request.requestsServiceInvestigation;
        }

        const allRequests = [completedRequests, acceptedRequests, otherStateRequests];
        const infoRequests = [];
        for(let i = 0; i < allRequests.length; i++){
            if(allRequests[i].length > 0){
                const statusString = i === 0 ? "completed" :  i === 1 ? "accepted" : "pending" ;
                const requests = request.requestsServiceInvestigation.map((reqSer) =>{
                    const serviceCode = reqSer.serviceInvestigation.service.code;
                    const typeService = serviceTypeToTranslation(reqSer.serviceInvestigation.service.type);
                    return(<ChipContainer><ColourChip size="small" rgbcolor={statusToColor(reqSer.status)} label={translate(`pages.hospital.services.tests.${typeService}.${serviceCode}`)}/></ChipContainer>)})
                infoRequests.push(<div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id={`pages.hospital.services.request.${statusString}`} />: </span>{requests}</Typography> </div>)
            }
        }
        return(
            <>
                {infoRequests}
            </>
        )
        
    }

    
    
    return (
        <Grid item xs={12}>
            <Card style={{padding:"1rem"}}>
                <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.services.request.request_id" />: </span>{request.id}</Typography> </div>
                <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.services.request.status" />: </span><RequestStatusToChip status={request.status} /></Typography> </div>
                {
                    renderServices()
                }
                
            </Card>  
        </Grid>
    );
};

const RequestInfoWithLocalize = withLocalize(RequestInfo);
export default RequestInfoWithLocalize;
