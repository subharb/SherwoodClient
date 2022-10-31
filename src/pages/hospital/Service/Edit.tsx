import { Snackbar, Typography } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import axios from 'axios';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import Form from '../../../components/general/form';
import { ButtonAdd } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { useSnackBarState } from '../../../hooks';
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
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    function saveService(serviceInvestigation:any){
        serviceInvestigation.external = serviceInvestigation.external ? 1 : 0;
        console.log(serviceInvestigation);
        setLoading(true);
            axios.post(process.env.REACT_APP_API_URL+"/hospital/"+uuidInvestigation+"/service/", serviceInvestigation, { headers: {"Authorization" : localStorage.getItem("jwt") }})
            .then(response => {
                if(response.status === 200){
                    setShowSnackbar({show:true, severity:"success", message:"service.success"}); 
                    if(isArray(servicesInvestigation)){
                        setServicesInvestigation([...servicesInvestigation, response.data.serviceInvestigation]);
                        
                    }  
                    else{
                        setServicesInvestigation([response.data.serviceInvestigation]);
                    }
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
            showSnackbar ={showSnackbar} callBackSaveService={saveService} />
    )
}

interface EditServicesComponentProps extends Omit<EditServicesProps, 'uuidInvestigation'> {
    loading: boolean;
    servicesGeneral:IService[] | null;
    servicesInvestigation:IServiceInvestigation[] | null;
    surveys:ISurvey[];
    showSnackbar:{
        show: boolean;
        message?: string | undefined;
        severity?: Color | undefined;
    },
    callBackSaveService:(service:any) =>void
}

export const EditServicesComponent: React.FC<EditServicesComponentProps> = ({ serviceType, showSnackbar, surveys, loading, servicesGeneral, servicesInvestigation, callBackSaveService }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [addingService, setAddingService] = React.useState(false);
    
    let formFields:{ [id: string] : any; }  = React.useMemo(() => {
        let tempDict:{ [id: string] : any; } = {};

        const serviceOptions = servicesGeneral?.filter((service) =>{
            return !servicesInvestigation?.some((serviceInvestigation) => serviceInvestigation.service.id === service.id);
        }).map((service) => {

            return {
                label: "pages.hospital.services.list."+service.code,
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

    useEffect(() => {
        if(!loading){
            setShowModal(false);
        }
    }, [loading])
    if(loading){
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
                         {/* <Form numberColumns={2} fields={formFields} callBackForm = {(values:any) => callBackForm(values)} /> */}
                        </>
                    }
                    </>
            </Modal>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={4000}
                >
                    <Alert severity={showSnackbar.severity}>
                            <Translate id={showSnackbar.message} />                            
                        </Alert>
                </Snackbar>
            <Typography variant="body2" gutterBottom>
                Gestione los servicios de su hospital desde aquí añadiendo o eliminando servicios.
            </Typography>
            <ButtonAdd disabled={showModal || loading} 
                type="button" data-testid="add_service" 
                onClick={() => {
                    setShowModal(true);
                    setAddingService(true);
                }
            } />	
        </>
    );
};

export default EditServices;
