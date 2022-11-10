import { Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import axios from 'axios';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Form from '../../../components/general/form';
import { ButtonAdd } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { useSnackBarState, SnackbarType } from '../../../hooks';
import { IService, IServiceInvestigation } from './types';

interface EditServicesProps {
    serviceType: number;
    uuidInvestigation: string;
    surveys: ISurvey[];
}

const EditServices: React.FC<EditServicesProps> = ({uuidInvestigation, serviceType, surveys }) => {
    const [loading, setLoading] = useState(false);
    const [servicesGeneral, setServicesGeneral] = useState<null | IService[]>(null);
    const [servicesInvestigation, setServicesInvestigation] = useState<null | IServiceInvestigation[]>(null);
    const [snackbar, setSnackbar] = useSnackBarState();
    function saveService(serviceInvestigation:any){
        serviceInvestigation.external = serviceInvestigation.external ? 1 : 0;
        console.log(serviceInvestigation);
        setLoading(true);
            axios.post(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/service/", serviceInvestigation, { headers: {"Authorization" : localStorage.getItem("jwt") }})
            .then(response => {
                if(response.status === 200){
                    setSnackbar({show:true, severity:"success", message:"pages.hospital.services.success"}); 
                    if(isArray(servicesInvestigation)){
                        setServicesInvestigation([...servicesInvestigation, response.data.serviceInvestigation]);
                        
                    }  
                    else{
                        setServicesInvestigation([response.data.serviceInvestigation]);
                    }
                }
                else{
                    setSnackbar({show:true, severity:"error", message:"general.error"}); 
                }
                
                setLoading(false);
            })
    }
    useEffect(() => {
        if(!servicesGeneral){
            setLoading(true);
            axios(process.env.REACT_APP_API_URL+"/hospital/servicesgeneral/"+serviceType, { headers: {"Authorization" : localStorage.getItem("jwt") }})
            .then(response => {
                setServicesGeneral(response.data.services);
                setLoading(false);
            })
        }
        if(!servicesInvestigation){
            setLoading(true);
            axios(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/services/", { headers: {"Authorization" : localStorage.getItem("jwt") }})
            .then(response => {
                setServicesInvestigation(response.data.servicesInvestigation);
                setLoading(false);
            })
        }
    }, []);
    return(
        <EditServicesComponent servicesGeneral={servicesGeneral} servicesInvestigation={servicesInvestigation} surveys={surveys} serviceType={serviceType} loading={loading} 
        snackbar ={snackbar} callBackSaveService={saveService} />
    )
}

interface EditServicesComponentProps extends Omit<EditServicesProps, 'uuidInvestigation'> {
    loading: boolean;
    servicesGeneral:IService[] | null;
    servicesInvestigation:IServiceInvestigation[] | null;
    surveys:ISurvey[];
    snackbar:SnackbarType,
    callBackSaveService:(service:any) =>void
}

export const EditServicesComponent: React.FC<EditServicesComponentProps> = ({ serviceType, snackbar, surveys, loading, servicesGeneral, servicesInvestigation, callBackSaveService }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [addingService, setAddingService] = React.useState(false);
    
    let formFields:{ [id: string] : any; }  = React.useMemo(() => {
        let tempDict:{ [id: string] : any; } = {};

        const serviceOptions = servicesGeneral?.filter((service) =>{
            return !servicesInvestigation?.some((serviceInvestigation) => serviceInvestigation.service.id === service.id);
        }).map((service) => {
            const typeTestString = serviceType === 0 ? "laboratory" : "img"; 
            return {
                label: `pages.hospital.services.tests.${typeTestString}.${service.code}`,
                value: service.id,
            }
        })
        const surveyOptions = surveys?.map((survey) => {
            return {
                label: survey.name,
                value: survey.uuid,
            }
        })
        tempDict["serviceId"] = {
            name: "serviceId",
            label: "pages.hospital.services.form.service",
            type: "select",
            required: true,
            options: serviceOptions
            
        }
        tempDict["external"] = {
            name: "external",
            label: "pages.hospital.services.form.external",
            type: "checkbox",
            required: false
        }
        tempDict["price"] = {
            name: "price",
            label: "pages.hospital.services.form.price",
            type: "text",
            validation:"number",
            required: false
        }
        tempDict["survey"] = {
            name: "survey",
            label: "pages.hospital.services.form.survey",
            type: "select",
            required: false,
            options: surveyOptions
        }
        return tempDict;
    },[servicesGeneral, servicesInvestigation]);

    function renderCore(){
        if(servicesInvestigation?.length === 0){
            return(
                <Typography variant="h6" component="h6">
                    <Translate id="pages.hospital.services.no_services" />
                </Typography>
            )
        }
        else{
            const rows = servicesInvestigation?.map((serviceInvestigation) => {
                return {
                    id: serviceInvestigation.service.id,
                    name: serviceInvestigation.service.name,
                    price: serviceInvestigation.billable ? serviceInvestigation.billable.amount : 0,
                    external: serviceInvestigation.external,
                    survey: serviceInvestigation.survey ? serviceInvestigation.survey.name : "",
                }
            });
            const headCells = [{ id:"name", alignment: "left", label: "name"}, {id:"price", alignment: "left", label: "price"},
                {id:"external", alignment: "left", label: "external"}, {id:"survey", alignment: "left", label: "survey"}];
            return <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells}  />
        }
    }
    useEffect(() => {
        if(!loading){
            setShowModal(false);
        }
    }, [loading])
    if(loading || !servicesGeneral || !servicesInvestigation){
        return <Loader/>
    }
    return (
        <>  
            <Modal key="modal" medium 
                open={showModal} title={<Translate id="pages.hospital.services.edit.new_service.title" />} 
                closeModal={() => setShowModal(false)}>
                    <>
                    {
                        loading &&
                        <Loader />
                    }
                    {
                        !loading && addingService &&
                        <>  
                        {
                            formFields.serviceId.options?.length === 0 &&
                            <Translate id="pages.hospital.services.edit.no_services_remaining"/>
                        }
                        {   
                            formFields.serviceId.options?.length > 0 &&
                            <Form fields={formFields} callBackForm = {(values:any) => callBackSaveService(values)} />
                           
                        }
                         
                        </>
                    }
                    </>
            </Modal>
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
            <ButtonAdd disabled={showModal || loading} 
                type="button" data-testid="add_service" 
                onClick={() => {
                    setShowModal(true);
                    setAddingService(true);
                }
            } />
            <Typography variant="body2" gutterBottom>
                <Translate id="pages.hospital.services.description" />
                
            </Typography>
            <Grid container style={{ padding: 20 }}>
                <Grid item xs={12}>
                {
                    renderCore()
                }
                </Grid>
            </Grid>
            
            </>
    );
};

export default EditServices;
