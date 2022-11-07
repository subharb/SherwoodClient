import { Checkbox, FormControlLabel, Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import Form from '../../../components/general/form';
import { ButtonAccept, ButtonCancel } from '../../../components/general/mini_components';
import Loader from '../../../components/Loader';
import { SnackbarTypeSeverity } from '../../../constants/types';
import { useSnackBarState, SnackbarType } from '../../../hooks';
import { IRequestServiceInvestigation, IServiceInvestigation } from './types';

interface RequestFormProps {
    serviceType: number;
    uuidPatient:string,
    uuidInvestigation:string,
    initServicesInvestigation?: IServiceInvestigation[],
    cancel:() => void,
    callBackRequestFinished:(requestsService:IRequestServiceInvestigation[])=>void,  
}

const RequestForm: React.FC<RequestFormProps> = ({ uuidPatient, serviceType, uuidInvestigation, initServicesInvestigation, callBackRequestFinished, cancel }) => {
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setShowSnackbar] = useSnackBarState();
    const [servicesInvestigation, setServicesInvestigation] = React.useState<null | IServiceInvestigation[]>(initServicesInvestigation ? initServicesInvestigation : null);
    const [requestsServiceInvestigation, setRequestsServiceInvestigation] = React.useState<null | IRequestServiceInvestigation[]>(null);
    
    function handleClose(){
        setShowSnackbar({show:false});
        if(snackbar.severity === SnackbarTypeSeverity.SUCCESS && requestsServiceInvestigation !== null){
            callBackRequestFinished(requestsServiceInvestigation);
        }
        
        
    }
    useEffect(() => {
        if(requestsServiceInvestigation !== null){
            callBackRequestFinished(requestsServiceInvestigation);
        }
    }, [requestsServiceInvestigation]);
    
    function makeRequest(uuidPatient:string, servicesInvestigation:number[], serviceType:number) {
        setLoading(true);
        const postObject = {
            servicesInvestigationId: servicesInvestigation,
            uuidPatientInvestigation:uuidPatient,
            typeRequest:serviceType
        }
        axios.post(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/service/request", postObject, { headers: {"Authorization" : localStorage.getItem("jwt") }})
        .then(response => {
            if(response.status === 200){
                setShowSnackbar({show:true, severity:"success", message:"pages.hospital.services.success"});
                setRequestsServiceInvestigation(response.data.requestsServiceInvestigation);
            }
            else{
                setShowSnackbar({show:true, severity:"error", message:"general.error"});
            }
        })
        .catch(error => {
            console.log(error.response.data.errorCode);
            let translateError = "general.error";
            if(error.response.data.errorCode === 3){
                translateError = "pages.hospital.services.error.previous_request";
            }
            setLoading(false);
            setShowSnackbar({show:true, severity:"error", message:translateError});
          
        })
    }
    useEffect(() => {
        if(!servicesInvestigation){
            setLoading(true);
            axios(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/services/"+serviceType, { headers: {"Authorization" : localStorage.getItem("jwt") }})
            .then(response => {
                setServicesInvestigation(response.data.servicesInvestigation);
                setLoading(false);
            })
        }

    }, []);

    return <RequestFormCore loading={loading} snackbar={snackbar} servicesInvestigation={servicesInvestigation ? servicesInvestigation : []}
                handleCloseSnackBar={handleClose} cancel={cancel}
                callBackFormSubmitted={(servicesInvestigation:number[]) => makeRequest(uuidPatient, servicesInvestigation, serviceType)} />;
}

export default RequestForm;

interface RequestFormCoreProps extends Omit<RequestFormProps, 'uuidPatient' | 'serviceType' | 'uuidInvestigation' | 'callBackRequestFinished' > {
    loading: boolean;
    snackbar: SnackbarType;
    servicesInvestigation:IServiceInvestigation[],
    handleCloseSnackBar:()=>void,
    callBackFormSubmitted:(serviceInvestigation:number[]) => void
}

export const RequestFormCore: React.FC<RequestFormCoreProps> = ({ loading, servicesInvestigation, snackbar, callBackFormSubmitted, handleCloseSnackBar, cancel }) => {
    const [servicesInvestigationSelected, setServicesInvestigationSelected] = React.useState<{ [id: string] : boolean; }>({});
    const SERVICE_SEPARATOR = "service_";
    
    function callBackForm(){
        console.log("callBackForm", servicesInvestigationSelected);
        const serviceInvestigationIds = Object.keys(servicesInvestigationSelected).filter((key) => servicesInvestigationSelected[key] === true).map((key) => parseInt(key.replace(SERVICE_SEPARATOR, "")));
        console.log("serviceInvestigationIds", serviceInvestigationIds);
        callBackFormSubmitted(serviceInvestigationIds);
    }
    if(loading){
        return <Loader />;
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
            <Typography variant="h3" component="h6"><Translate id="pages.hospital.services.request" /></Typography>
            <Grid container item xs={12} spacing={1}>
            {
                servicesInvestigation.length > 0 &&
                servicesInvestigation.map((serviceInvestigation) => {
                    return <Grid item xs={6}>
                            <FormControlLabel
                                control={<Checkbox checked={servicesInvestigationSelected[SERVICE_SEPARATOR+serviceInvestigation.id]} />}
                                onChange={
                                    (event) => {
                                        setServicesInvestigationSelected({...servicesInvestigationSelected, ["service_"+serviceInvestigation.id]:event.target.checked});
                                    }
                                }
                                label={<Translate id={`pages.hospital.services.list.${serviceInvestigation.service.code}`} />} 
                            />
                            </Grid>
                })
            }
            </Grid>
            <Grid container item xs={12} spacing={1}>
                <Grid item>
                    <ButtonAccept onClick={callBackForm}><Translate id="general.add" /></ButtonAccept> 
                </Grid>
                <Grid item>
                    <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
                </Grid>
                
            </Grid>
        </>
    );
};


