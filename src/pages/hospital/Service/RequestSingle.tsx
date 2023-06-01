import { Card, Grid, Snackbar, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ColourChip } from '../../../components/general/mini_components-ts';
import Loader from '../../../components/Loader';
import PatientInfo from '../../../components/PatientInfo';
import { RequestStatusToChip, serviceToColor, statusToColor } from './RequestTable';
import { IRequest, RequestStatus } from './types';

import ShowPatientRecords from '../../../components/investigation/show/single/show_patient_records';
import { TYPE_FILL_IMG_SURVEY, TYPE_FILL_LAB_SURVEY, TYPE_REQUEST_LAB } from '../../../constants';
import { IResearcher, ISurvey, SnackbarTypeSeverity } from '../../../constants/types';
import FillDataCollection from '../FillDataCollection';
import { useRequest, useSnackBarState, useUpdateEffect } from '../../../hooks';
import { Alert } from '@material-ui/lab';
import { Translate } from 'react-localize-redux';
import { useSelector } from 'react-redux';
import RequestInfo from './RequestInfo';



interface RequestSingleProps { 
    idRequest:number,
    uuidInvestigation:string,
    permissions:string[],
    surveys:ISurvey[],
    country:string,
    researcher:IResearcher, 
    requestSentCallBack:(typeRequest:number)=>void,
}

const RequestSingle: React.FC<RequestSingleProps> = ({ idRequest, researcher, uuidInvestigation, country, permissions, surveys, requestSentCallBack }) => {
    const {request, loadingRequest} = useRequest(idRequest);
    const patientsSubmissions = useSelector((state:any) => state.patientsSubmissions)
    const [loading, setLoading] = useState(false);
    const [submissionData, setSubmissionData] = useState<{submission:any} | null>(null);
    const [editData, setEditData] = useState(false);
    const [snackbar, setShowSnackbar] = useSnackBarState();

    useEffect(() => {
        if(request && patientsSubmissions.loading === false){
            setEditData(false);
            if(patientsSubmissions.error){
                setShowSnackbar({show:true, message:"general.error", severity:SnackbarTypeSeverity.ERROR});
            }
            else{
                setShowSnackbar({show:true, severity:SnackbarTypeSeverity.SUCCESS, message:"pages.hospital.services.request.success"});
            }
        }
        
    }, [patientsSubmissions])

    useEffect(() => {
        async function fetchSubmission(){
            setLoading(true);
        
            const response = await axios(`${import.meta.env.VITE_APP_API_URL}/researcher/investigation/${uuidInvestigation}/submission/${request?.submissionPatient.id}?findRequests=true`, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                    .catch(err => {console.log('Catch', err); return err;});
            if(response.status === 200){
                setSubmissionData(response.data);
            }
            setLoading(false);
        }
        if(request?.submissionPatient){
            fetchSubmission();
        }
        
    }, [request])

   
    function renderCore(){
        const survey = surveys.find((survey) => {
            if(request?.type === TYPE_REQUEST_LAB){
                return survey.type === TYPE_FILL_LAB_SURVEY;
            }
            else{
                return survey.type === TYPE_FILL_IMG_SURVEY;
            }
            
        })
        if(!survey){
            return <Typography variant="h4">The survey could not be found</Typography>
        }
        if(!editData && request?.submissionPatient && submissionData){
            const newSubmission = patientsSubmissions.data && patientsSubmissions.data[request?.requestsServiceInvestigation[0].patientInvestigation.uuid] && patientsSubmissions.data[request?.requestsServiceInvestigation[0].patientInvestigation.uuid][survey.uuid] ?  patientsSubmissions.data[request?.requestsServiceInvestigation[0].patientInvestigation.uuid][survey.uuid].submissions.find((submission:any) => submission.id === request?.submissionPatient.id) : null;
            const submissionDataLocal = newSubmission ? newSubmission : submissionData.submission;
            return (
                <ShowPatientRecords permissions={permissions} survey={survey} forceEdit={request.status !== RequestStatus.COMPLETED}
                    mode="elements" callBackEditSubmission={() => setEditData(true)} idSubmission={request?.submissionPatient.id}
                    submissions={[submissionDataLocal]} surveys={surveys} />
            )
        }
        else{
            return (
                <FillDataCollection key={survey?.uuid} initData = {editData && submissionData ? submissionData.submission : null} dataCollection={survey} 
                    hideCollectionName={true} requestServiceId={idRequest} idSubmission={submissionData ? submissionData.submission.id : null}
                    country={country} researcher={researcher} alterSubmitButton={"pages.hospital.services.save_and_complete"}
                    uuidPatient={request?.requestsServiceInvestigation[0].patientInvestigation.uuid} 
                    uuidInvestigation={uuidInvestigation}
                    callBackDataCollection={() => console.log("Data saved")} />
            )
        }
    }

    function handleCloseSnackBar(){
        setShowSnackbar({show:false});
        if(snackbar.severity === SnackbarTypeSeverity.SUCCESS && request !== null){
            requestSentCallBack(request?.type);
        }
    }

    if(loading || loadingRequest || (patientsSubmissions.loading)){
        return <Loader />
    }
    else if(!request){
        return <Typography variant="h4">Request not found</Typography>
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={snackbar.show}
                autoHideDuration={4000}
                onClose={handleCloseSnackBar}
                >
                <Alert severity={snackbar.severity}>
                        <Translate id={snackbar.message} />                            
                    </Alert>
            </Snackbar>
            <Grid container spacing={3}>
                <RequestInfo request={request} />
                <Grid item xs={12}>
                    <Card style={{padding:"1rem"}}>
                        <PatientInfo uuidPatient={request.requestsServiceInvestigation[0].patientInvestigation.uuid}/>
                    </Card>
                </Grid>
            </Grid>
            {
                renderCore()
            }
        </>
    );
};

export default RequestSingle;
