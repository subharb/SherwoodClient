import { Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import Form from '../../../components/general/form';
import { ButtonAccept, ButtonCancel, ButtonOk } from '../../../components/general/mini_components';
import Loader from '../../../components/Loader';
import { IDepartment, IUnit, SnackbarTypeSeverity } from '../../../constants/types';
import { useSnackBarState, SnackbarType, useUnitSelector, useDeparmentsSelector } from '../../../hooks';
import { serviceTypeToTranslation } from '../../../utils/index.jsx';
import { TabsSherwood } from '../../components/Tabs';
import { IRequest, IRequestServiceInvestigation, IServiceInvestigation } from './types';

interface RequestFormProps {
    serviceType: number;
    uuidPatient:string,
    uuidInvestigation:string,
    units:IUnit[],
    initServicesInvestigation?: IServiceInvestigation[],
    cancel?:() => void,
    callBackRequestFinished:(requestsService:IRequest)=>void,  
}

const RequestForm: React.FC<RequestFormProps> = ({ uuidPatient, units, serviceType, uuidInvestigation, initServicesInvestigation, callBackRequestFinished, cancel }) => {
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setShowSnackbar] = useSnackBarState();
    const [servicesInvestigation, setServicesInvestigation] = React.useState<null | IServiceInvestigation[]>(initServicesInvestigation ? initServicesInvestigation : null);
    const [request, setRequest] = React.useState<null | IRequest>(null);
    
    function handleClose(){
        setShowSnackbar({show:false});
        if(snackbar.severity === SnackbarTypeSeverity.SUCCESS && request !== null){
            callBackRequestFinished(request);
        }
    }
    useEffect(() => {
        if(request !== null){
            callBackRequestFinished(request);
        }
    }, [request]);
    
    function makeRequest(uuidPatient:string, servicesInvestigation:number[], serviceType:number, uuidDepartment:string | null) {
        setLoading(true);
        const postObject = {
            servicesInvestigationId: servicesInvestigation,
            uuidPatientInvestigation:uuidPatient,
            typeRequest:serviceType,
            uuidDepartment:uuidDepartment
        }
        axios.post(import.meta.env.VITE_APP_API_URL+"/hospital/"+uuidInvestigation+"/service/request", postObject, { headers: {"Authorization" : localStorage.getItem("jwt") }})
        .then(response => {
            if(response.status === 200){
                setShowSnackbar({show:true, severity:"success", message:"pages.hospital.services.success"});
                setRequest(response.data.request);
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
            axios(import.meta.env.VITE_APP_API_URL+"/hospital/"+uuidInvestigation+"/services/"+serviceType, { headers: {"Authorization" : localStorage.getItem("jwt") }})
            .then(response => {
                setServicesInvestigation(response.data.servicesInvestigation);
                setLoading(false);
            })
        }

    }, []);
    // if(!units || units.length === 0){
    //     return(
    //         <Typography variant="body2"><Translate id="pages.hospital.pharmacy.no_units" /></Typography>
    //     )
    // }
    return <RequestFormCoreLocalized loading={loading} snackbar={snackbar} servicesInvestigation={servicesInvestigation ? servicesInvestigation : []}
                handleCloseSnackBar={handleClose} cancel={cancel} units={units} serviceType={serviceType}
                callBackFormSubmitted={(servicesInvestigation:number[], uuidDepartment:string | null) => makeRequest(uuidPatient, servicesInvestigation, serviceType, uuidDepartment)} />;
}

export default RequestForm;

interface RequestFormCoreProps extends Omit<RequestFormProps, 'uuidPatient' | 'uuidInvestigation' | 'callBackRequestFinished' > , LocalizeContextProps {
    loading: boolean;
    snackbar: SnackbarType;
    servicesInvestigation:IServiceInvestigation[],
    handleCloseSnackBar:()=>void,
    callBackFormSubmitted:(serviceInvestigation:number[], uuidDepartment:string | null) => void
}

export const RequestFormCore: React.FC<RequestFormCoreProps> = ({ loading, servicesInvestigation, snackbar, serviceType, units, activeLanguage,
                                                                    translate, callBackFormSubmitted, handleCloseSnackBar, cancel }) => {
    const [servicesInvestigationSelected, setServicesInvestigationSelected] = React.useState<{ [id: string] : boolean; }>({});
    const [errorServices, setErrorServices] = React.useState(false);
    const {renderDepartmentSelector, departmentSelected, markAsErrorDepartmentCallback} = useDeparmentsSelector(false, true, true);

    const serviceCategories = useMemo(() => {
        let categories:{[id:string]:IServiceInvestigation[]} = {};
        servicesInvestigation.forEach(serviceInvestigation => {
            if(!categories[serviceInvestigation.service.category]){
                categories[serviceInvestigation.service.category] = [];
            }
            categories[serviceInvestigation.service.category].push(serviceInvestigation);
        });
        return categories;
    }, [servicesInvestigation]);
    const typeTestString = serviceTypeToTranslation(serviceType);
    const SERVICE_SEPARATOR = "service_";
    
  
    function callBackForm(){
        const serviceInvestigationIds = Object.keys(servicesInvestigationSelected).filter((key) => servicesInvestigationSelected[key] === true).map((key) => parseInt(key.replace(SERVICE_SEPARATOR, "")));
        if((departmentSelected === null && units.length > 0) || serviceInvestigationIds.length === 0){
            if(departmentSelected === null){
                markAsErrorDepartmentCallback();
            }
            if(serviceInvestigationIds.length === 0){
                setErrorServices(true);   
            }
            return;
        }
    
        console.log("callBackForm", servicesInvestigationSelected);
        
        console.log("serviceInvestigationIds", serviceInvestigationIds);
        callBackFormSubmitted(serviceInvestigationIds, departmentSelected);
    }

    function renderServiceForm(category?:string){
        const filterServicesInvestigation = category ? servicesInvestigation.filter((serviceInv) => serviceInv.service.category === category) : servicesInvestigation;
        return(
            filterServicesInvestigation.sort((serviceA, serviceB) => {
                const labelA = translate(`pages.hospital.services.tests.${typeTestString}.${serviceA.service.code}`).toString();
                const labelB = translate(`pages.hospital.services.tests.${typeTestString}.${serviceB.service.code}`).toString();
                return labelA.localeCompare(labelB, activeLanguage.code);
            }).map((serviceInvestigation) => {
                
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
        )
    }
    
    function renderCore(){
        if(Object.values(serviceCategories).length === 1){
            return(
                <Grid container item xs={12} spacing={1}>
                    { renderServiceForm() }
                </Grid>
            )
        }
        else{
            const orderedLabels = Object.keys(serviceCategories).map((category)=> {return {
                label : translate(`pages.hospital.${typeTestString}.category.${category.toLocaleLowerCase()}`).toString() ,
                key: category
            }}).sort((labelA, labelB) => labelA.label.localeCompare(labelB.label, activeLanguage.code))
            return (
                <TabsSherwood name="Requests"   
                    labels={orderedLabels.map((orderedLabel) => orderedLabel.label) } >
                        { orderedLabels.map((orderedLabel) => orderedLabel.key).map((serviceCategory) => {
                            return <Grid container item xs={12} spacing={1}>
                                { renderServiceForm(serviceCategory) }
                            </Grid>
                        }) }
                        <></>
                </TabsSherwood>
            ); 
        }
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
                <Grid container spacing={3}>
                    <Grid xs={12} item>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" ><Translate id={`hospital.request.${serviceTypeToTranslation(serviceType)}`} /></Typography>
                                {
                                    renderDepartmentSelector()
                                }
                                {
                                    renderCore()
                                }
                            </CardContent>
                        </Card>
                </Grid>
                {
                    errorServices &&
                    <Grid item xs={12}>
                        <Alert severity="error">
                            <Translate id="pages.hospital.services.request.select_services" />
                        </Alert>
                    </Grid>
                }
                <Grid container item xs={12}>
                    <Grid item>
                        <ButtonOk onClick={callBackForm}><Translate id="pages.hospital.services.request.make_request" /></ButtonOk> 
                    </Grid>
                    <Grid item style={{marginLeft:"1rem"}}>
                        <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
                    </Grid>
                </Grid>   
            </Grid>
        </>
    );
};

export const RequestFormCoreLocalized = withLocalize(RequestFormCore)
