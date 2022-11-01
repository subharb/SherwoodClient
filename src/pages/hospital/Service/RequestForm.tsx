import { Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React from 'react';
import { Translate } from 'react-localize-redux';
import Form from '../../../components/general/form';
import Loader from '../../../components/Loader';
import { useSnackBarState, SnackbarType } from '../../../hooks';
import { IServiceInvestigation } from './types';

interface RequestFormProps {
    serviceType: number;
    uuidPatient:string,
    servicesInvestigation:IServiceInvestigation[],
    callBackFormSubmitted:(serviceInvestigation:number[]) => void
}

const RequestForm: React.FC<RequestFormProps> = ({ uuidPatient, serviceType, servicesInvestigation }) => {
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setShowSnackbar] = useSnackBarState();
    function makeRequest(uuidPatient:string, servicesInvestigation:number[], serviceType:number) {
        setLoading(true);
        axios.post(process.env.REACT_APP_API_URL+"/hospital/servicesgeneral/"+serviceType, { headers: {"Authorization" : localStorage.getItem("jwt") }})
        .then(response => {
            
            setLoading(false);
        })
    }
    return <RequestFormCore loading={loading} snackbar={snackbar} servicesInvestigation={servicesInvestigation}
        callBackFormSubmitted={(servicesInvestigation:number[]) => makeRequest(uuidPatient, servicesInvestigation, serviceType)} />;
}
export default RequestForm;

interface RequestFormCoreProps extends Omit<RequestFormProps, 'uuidPatient' | 'serviceType'> {
    loading: boolean;
    snackbar: SnackbarType;
}

export const RequestFormCore: React.FC<RequestFormCoreProps> = ({ loading, servicesInvestigation, snackbar }) => {
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


