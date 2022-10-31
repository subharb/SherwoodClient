import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import Form from '../../../components/general/form';
import { ButtonAdd } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { IService } from './types';

interface EditServicesProps {
    serviceType: string;
}

const EditServices: React.FC<EditServicesProps> = ({ serviceType }) => {
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState(null);
    const [surveys, setSurveys] = useState(null);
    function saveService(serviceInvestigation:any){
        
    }
    return(
        <EditServicesComponent services={services} surveys={surveys} serviceType={serviceType} loading={loading} 
            callBackSaveService={saveService} />
    )
}

interface EditServicesComponentProps extends EditServicesProps{
    loading: boolean;
    services:IService[] | null;
    surveys:ISurvey[] | null;
    callBackSaveService:(service:any) =>void
}

export const EditServicesComponent: React.FC<EditServicesComponentProps> = ({ serviceType, surveys, loading, services }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [addingService, setAddingService] = React.useState(false);
    
    let formFields:{ [id: string] : any; }  = React.useMemo(() => {
        let tempDict:{ [id: string] : any; } = {};
        const serviceOptions = services?.map((service) => {
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
        tempDict["service"] = {
            name: "service",
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
    },[services]);

    function callBackForm(values:any){
        console.log(values);
        

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
                            <Form fields={formFields} callBackForm = {(values:any) => callBackForm(values)} />
                            {/* <Form numberColumns={2} fields={formFields} callBackForm = {(values:any) => callBackForm(values)} /> */}
                        </>
                    }
                    </>
            </Modal>
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
