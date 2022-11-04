import { Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import Form from '../../../components/general/form';
import Loader from '../../../components/Loader';
import { useSnackBarState, SnackbarType } from '../../../hooks';
import { IServiceInvestigation } from './types';

interface RequestFormProps {
    serviceType: number;
    uuidPatient:string,
    uuidInvestigation:string  
}

const RequestForm: React.FC<RequestFormProps> = ({ uuidPatient, serviceType, uuidInvestigation }) => {
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setShowSnackbar] = useSnackBarState();
    const [servicesInvestigation, setServicesInvestigation] = React.useState<null | IServiceInvestigation[]>(null);
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
            }
            else{
                setShowSnackbar({show:true, severity:"error", message:"general.error"});
            }
            
            setLoading(false);
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

    }, [])
    return <RequestFormCore loading={loading} snackbar={snackbar} servicesInvestigation={servicesInvestigation ? servicesInvestigation : []}
        callBackFormSubmitted={(servicesInvestigation:number[]) => makeRequest(uuidPatient, servicesInvestigation, serviceType)} />;
}
export default RequestForm;

interface RequestFormCoreProps extends Omit<RequestFormProps, 'uuidPatient' | 'serviceType' | 'uuidInvestigation' > {
    loading: boolean;
    snackbar: SnackbarType;
    servicesInvestigation:IServiceInvestigation[],
    callBackFormSubmitted:(serviceInvestigation:number[]) => void
}

export const RequestFormCore: React.FC<RequestFormCoreProps> = ({ loading, servicesInvestigation, snackbar, callBackFormSubmitted }) => {
    let formFields:{ [id: string] : any; }  = React.useMemo(() => {
        let tempDict:{ [id: string] : any; } = {};
        servicesInvestigation.forEach((serviceInvestigation) => {
            tempDict["service_"+serviceInvestigation.id] = {
                name: serviceInvestigation.id,
                label: "pages.hospital.services.list."+serviceInvestigation.service.code,
                type: "checkbox",
                required: false
            }
        });
        return tempDict;
    }, [servicesInvestigation]);
    function callBackForm(values:any){
        console.log("callBackForm", values);
        const serviceInvestigationIds = Object.keys(values).filter((key) => values[key] === true).map((key) => parseInt(key.split("_")[1]));
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
                >
                    <Alert severity={snackbar.severity}>
                            <Translate id={snackbar.message} />                            
                        </Alert>
                </Snackbar>
            <Typography variant="h3" component="h6"><Translate id="pages.hospital.services.request" /></Typography>
            <Form numberColumns={2} fields={formFields} callBackForm = {(values:any) => callBackForm(values)} />
        </>
    );
};


