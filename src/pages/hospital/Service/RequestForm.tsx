import { Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import Form from '../../../components/general/form';
import { ButtonAccept, ButtonCancel } from '../../../components/general/mini_components';
import Loader from '../../../components/Loader';
import { IDepartment, IUnit, SnackbarTypeSeverity } from '../../../constants/types';
import { useSnackBarState, SnackbarType } from '../../../hooks';
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
    
    function makeRequest(uuidPatient:string, servicesInvestigation:number[], serviceType:number, uuidUnit:string) {
        setLoading(true);
        const postObject = {
            servicesInvestigationId: servicesInvestigation,
            uuidPatientInvestigation:uuidPatient,
            typeRequest:serviceType,
            uuidUnit:uuidUnit
        }
        axios.post(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/service/request", postObject, { headers: {"Authorization" : localStorage.getItem("jwt") }})
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
            axios(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/services/"+serviceType, { headers: {"Authorization" : localStorage.getItem("jwt") }})
            .then(response => {
                setServicesInvestigation(response.data.servicesInvestigation);
                setLoading(false);
            })
        }

    }, []);
    if(!units || units.length === 0){
        return(
            <Typography variant="body2"><Translate id="pages.hospital.pharmacy.no_units" /></Typography>
        )
    }
    return <RequestFormCoreLocalized loading={loading} snackbar={snackbar} servicesInvestigation={servicesInvestigation ? servicesInvestigation : []}
                handleCloseSnackBar={handleClose} cancel={cancel} units={units} serviceType={serviceType}
                callBackFormSubmitted={(servicesInvestigation:number[], uuidUnit:string) => makeRequest(uuidPatient, servicesInvestigation, serviceType, uuidUnit)} />;
}

export default RequestForm;

interface RequestFormCoreProps extends Omit<RequestFormProps, 'uuidPatient' | 'uuidInvestigation' | 'callBackRequestFinished' > , LocalizeContextProps {
    loading: boolean;
    snackbar: SnackbarType;
    servicesInvestigation:IServiceInvestigation[],
    handleCloseSnackBar:()=>void,
    callBackFormSubmitted:(serviceInvestigation:number[], uuidUnit:string) => void
}

export const RequestFormCore: React.FC<RequestFormCoreProps> = ({ loading, servicesInvestigation, snackbar, serviceType, units,
                                                                    translate, callBackFormSubmitted, handleCloseSnackBar, cancel }) => {
    const [servicesInvestigationSelected, setServicesInvestigationSelected] = React.useState<{ [id: string] : boolean; }>({});
    const [unitSelected, setUnitSelected] = React.useState<string | null>(null);
    const [errorUnit, setErrorUnit] = React.useState(false);
    const [errorServices, setErrorServices] = React.useState(false);

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
    const typeTestString = serviceType === 0 ? "laboratory" :"medical-imaging";
    const SERVICE_SEPARATOR = "service_";
    
    useEffect(() => {
        if(units.length === 1){
            setUnitSelected(units[0].uuid as string);
        }
    }, [units])

    function callBackForm(){
        const serviceInvestigationIds = Object.keys(servicesInvestigationSelected).filter((key) => servicesInvestigationSelected[key] === true).map((key) => parseInt(key.replace(SERVICE_SEPARATOR, "")));
        if(unitSelected === null || serviceInvestigationIds.length === 0){
            if(unitSelected === null){
                setErrorUnit(true);
            }
            if(serviceInvestigationIds.length === 0){
                setErrorServices(true);   
            }
            return;
        }
    
        console.log("callBackForm", servicesInvestigationSelected);
        
        console.log("serviceInvestigationIds", serviceInvestigationIds);
        callBackFormSubmitted(serviceInvestigationIds, unitSelected);
    }

    function renderServiceForm(category?:string){
        const filterServicesInvestigation = category ? servicesInvestigation.filter((serviceInv) => serviceInv.service.category === category) : servicesInvestigation;
        return(
            filterServicesInvestigation.map((serviceInvestigation) => {
                
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
    function renderUnitSelector(){
        if(units.length === 1){
            return null;
            return(
                <Grid item xs={12}>
                    <Translate id="hospital.departments.unit" />: {units[0].name}
                </Grid>
            );
        }
        else{
            const optionsArray = units.map((unit) => {
                return <MenuItem value={unit.uuid}>{unit.department.name} - {unit.name}</MenuItem>
            })
            return(
                <Grid item xs={12} style={{paddingTop:'0.5rem', paddingBottom:'0.5rem'}}>
                    <FormControl variant="outlined"  style={{minWidth: 220}} error={errorUnit} >
                    <InputLabel id="unit"><Translate id="pages.hospital.pharmacy.request.select_unit" /></InputLabel>
                        <Select 
                            labelId="unit"
                            id="unit"
                            label="unit"
                            value={unitSelected}
                            onChange={(event) => {
                                setErrorUnit(false);
                                setUnitSelected(event.target.value as string)}}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </Grid>
            )
        }
        
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
            return (
                <TabsSherwood name="Requests"   
                    labels={ Object.keys(serviceCategories).map((category)=> translate(`pages.hospital.${typeTestString}.category.${category.toLocaleLowerCase()}`).toString() )} >
                        { Object.keys(serviceCategories).map((serviceCategory) => {
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
                                <Typography variant="subtitle1" ><Translate id={`hospital.request_${["lab", "img"][serviceType]}`} /></Typography>
                                {
                                    renderUnitSelector()
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
                        <ButtonAccept onClick={callBackForm}><Translate id="pages.hospital.services.request.make_request" /></ButtonAccept> 
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
