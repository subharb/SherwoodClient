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
import { IRequestGroup, IRequestServiceInvestigation, IServiceInvestigation } from './types';

interface RequestFormProps {
    serviceType: number;
    uuidPatient:string,
    uuidInvestigation:string,
    uuidSurvey:string,
    initServicesInvestigation?: IServiceInvestigation[],
    cancel?:() => void,
    callBackRequestFinished:(requestsService:IRequestGroup)=>void,  
}

const RequestForm: React.FC<RequestFormProps> = ({ uuidPatient,uuidSurvey, serviceType, uuidInvestigation, initServicesInvestigation, callBackRequestFinished, cancel }) => {
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setShowSnackbar] = useSnackBarState();
    const [servicesInvestigation, setServicesInvestigation] = React.useState<null | IServiceInvestigation[]>(initServicesInvestigation ? initServicesInvestigation : null);
    const [requestGroup, setRequestGroup] = React.useState<null | IRequestGroup>(null);
    
    function handleClose(){
        setShowSnackbar({show:false});
        if(snackbar.severity === SnackbarTypeSeverity.SUCCESS && requestGroup !== null){
            callBackRequestFinished(requestGroup);
        }
    }
    useEffect(() => {
        if(requestGroup !== null){
            callBackRequestFinished(requestGroup);
        }
    }, [requestGroup]);
    
    function makeRequest(uuidPatient:string, servicesInvestigation:number[], serviceType:number) {
        setLoading(true);
        const postObject = {
            servicesInvestigationId: servicesInvestigation,
            uuidPatientInvestigation:uuidPatient,
            typeRequest:serviceType,
            uuidSurvey:uuidSurvey
        }
        axios.post(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/service/request", postObject, { headers: {"Authorization" : localStorage.getItem("jwt") }})
        .then(response => {
            if(response.status === 200){
                setShowSnackbar({show:true, severity:"success", message:"pages.hospital.services.success"});
                setRequestGroup(response.data.requestGroup);
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
                handleCloseSnackBar={handleClose} cancel={cancel} uuidSurvey={uuidSurvey} serviceType={serviceType}
                callBackFormSubmitted={(servicesInvestigation:number[]) => makeRequest(uuidPatient, servicesInvestigation, serviceType)} />;
}

export default RequestForm;

interface RequestFormCoreProps extends Omit<RequestFormProps, 'uuidPatient' | 'uuidInvestigation' | 'callBackRequestFinished' > {
    loading: boolean;
    snackbar: SnackbarType;
    servicesInvestigation:IServiceInvestigation[],
    handleCloseSnackBar:()=>void,
    callBackFormSubmitted:(serviceInvestigation:number[]) => void
}

export const RequestFormCore: React.FC<RequestFormCoreProps> = ({ loading, servicesInvestigation, snackbar, serviceType, callBackFormSubmitted, handleCloseSnackBar, cancel }) => {
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
            <Grid container item xs={12} spacing={1}>
            {
                servicesInvestigation.length > 0 &&
                servicesInvestigation.map((serviceInvestigation) => {
                    const typeTestString = serviceType === 0 ? "laboratory" : "img";
                    return <Grid item xs={6}>
                            <FormControlLabel
                                control={<Checkbox checked={servicesInvestigationSelected[SERVICE_SEPARATOR+serviceInvestigation.id]} />}
                                onChange={
                                    (event: React.ChangeEvent<{}>, checked: boolean) => {
                                        setServicesInvestigationSelected({...servicesInvestigationSelected, ["service_"+serviceInvestigation.id]:checked});
                                    }
                                }
                                label={<Translate id={`pages.hospital.services.tests.${typeTestString}.${serviceInvestigation.service.code}`} />} 
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


