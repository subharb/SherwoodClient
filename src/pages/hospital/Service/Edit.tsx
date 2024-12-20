import { Grid, Snackbar, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import axios from 'axios';
import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Form from '../../../components/general/form';
import FormTSFunc from '../../../components/general/formTSFunction';
import { ButtonAccept, ButtonAdd, ButtonCancel, ButtonOk } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { ISurvey } from '../../../constants/types';
import { useSnackBarState, SnackbarType } from '../../../hooks';
import { serviceTypeToTranslation } from '../../../utils/index.jsx';
import { IService, IServiceInvestigation, ServiceType } from './types';

interface EditServicesProps {
    serviceType: number;
    uuidInvestigation: string;
    surveys: ISurvey[];
}

const EditServices: React.FC<EditServicesProps> = ({ uuidInvestigation, serviceType, surveys }) => {
    const [loading, setLoading] = useState(false);
    const [servicesGeneral, setServicesGeneral] = useState<null | IService[]>(null);
    const [servicesInvestigation, setServicesInvestigation] = useState<null | IServiceInvestigation[]>(null);
    const [snackbar, setSnackbar] = useSnackBarState();

    function deleteService(idServiceInvestigation:number){
        console.log("delete service", idServiceInvestigation);
        axios.delete(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/service/" + idServiceInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } })
            .then((response) => {
                if(response.status === 200) {
                    setSnackbar({ show: true, severity: "success", message: "pages.hospital.services.success_removed" });
                    if (isArray(servicesInvestigation)) {
                        const removeServiceInvestigationIndex = servicesInvestigation.findIndex((serviceInvestigation) => {
                            return serviceInvestigation.id === idServiceInvestigation;
                        });
                        servicesInvestigation.splice(removeServiceInvestigationIndex, 1);
                        
                        setServicesInvestigation([...servicesInvestigation]);

                    }
                    
                }
                else {
                    setSnackbar({ show: true, severity: "error", message: "pages.hospital.services.error.delete_service" });
                }

                setLoading(false);
            })
            .catch((error) => {
                setSnackbar({ show: true, severity: "error", message: "pages.hospital.services.error.delete_service" });
                setLoading(false);
            })
    }

    function saveService(serviceInvestigation: any, idServiceInvestigation: number) {
        serviceInvestigation.external = serviceInvestigation.external ? 1 : 0;
        console.log(serviceInvestigation);
        setLoading(true);
        if (idServiceInvestigation !== -1) {
            axios.put(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/service/" + idServiceInvestigation, serviceInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } })
                .then((response) => {
                    if (response.status === 200) {
                        setSnackbar({ show: true, severity: "success", message: "pages.hospital.services.success" });
                        if (isArray(servicesInvestigation)) {
                            const updateServiceInvestigationIndex = servicesInvestigation.findIndex((serviceInvestigation) => {
                                return serviceInvestigation.id === idServiceInvestigation;
                            });
                            servicesInvestigation[updateServiceInvestigationIndex] = response.data.serviceInvestigation;
                            setServicesInvestigation([...servicesInvestigation]);

                        }
                        else {
                            setServicesInvestigation([response.data.serviceInvestigation]);
                        }
                    }
                    else {
                        setSnackbar({ show: true, severity: "error", message: "general.error" });
                    }

                    setLoading(false);
                })
                .catch((error) => {
                    setSnackbar({ show: true, severity: "error", message: "pages.hospital.services.error" });
                    setLoading(false);
                })
        }
        else {
            axios.post(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/service/", serviceInvestigation, { headers: { "Authorization": localStorage.getItem("jwt") } })
                .then(response => {
                    setLoading(false);
                    if (response.status === 200) {
                        setSnackbar({ show: true, severity: "success", message: "pages.hospital.services.success" });
                        if (isArray(servicesInvestigation)) {
                            setServicesInvestigation([...servicesInvestigation, response.data.serviceInvestigation]);

                        }
                        else {
                            setServicesInvestigation([response.data.serviceInvestigation]);
                        }
                    }
                    else {
                        setSnackbar({ show: true, severity: "error", message: "general.error" });
                    }
                })
        }

    }
    useEffect(() => {
        if (!servicesGeneral) {
            setLoading(true);
            axios(import.meta.env.VITE_APP_API_URL + "/hospital/servicesgeneral/" + serviceType, { headers: { "Authorization": localStorage.getItem("jwt") } })
                .then(response => {
                    setServicesGeneral(response.data.services);
                    setLoading(false);
                })
        }
        if (!servicesInvestigation) {
            setLoading(true);
            axios(import.meta.env.VITE_APP_API_URL + "/hospital/" + uuidInvestigation + "/services/" + serviceType, { headers: { "Authorization": localStorage.getItem("jwt") } })
                .then(response => {
                    setServicesInvestigation(response.data.servicesInvestigation);
                    setLoading(false);
                })
        }
    }, []);
    return (
        <EditServicesLocalized servicesGeneral={servicesGeneral} servicesInvestigation={servicesInvestigation} surveys={surveys} serviceType={serviceType} loading={loading}
            snackbar={snackbar} setSnackbar={setSnackbar} callBackSaveService={saveService} callBackDeleteService={deleteService}/>
    )
}

interface EditServicesComponentProps extends Omit<EditServicesProps, 'uuidInvestigation'> {
    loading: boolean;
    servicesGeneral: IService[] | null;
    servicesInvestigation: IServiceInvestigation[] | null;
    surveys: ISurvey[];
    snackbar: SnackbarType,
    setSnackbar: (snackbar: SnackbarType) => void;
    callBackSaveService: (service: any, idServiceInv: number) => void,
    callBackDeleteService: (idServiceInv: number) => void
}
interface EditServicesLocalizedProps extends EditServicesComponentProps, LocalizeContextProps {}

const EditServicesComponent: React.FC<EditServicesLocalizedProps> = ({ serviceType, snackbar, surveys, translate,
    loading, servicesGeneral, servicesInvestigation, setSnackbar, callBackSaveService, callBackDeleteService }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [addingService, setAddingService] = React.useState(false);
    const [selectedService, setSelectedService] = React.useState<{ [id: string]: any; } | undefined>(undefined);
    const [removingService, setRemovingService] = React.useState<boolean>(false);

    let formFields: { [id: string]: any; } = React.useMemo(() => {
        let tempDict: { [id: string]: any; } = {};

        let serviceOptions = servicesGeneral?.filter((service) => {
            if (selectedService) {
                return service.id === selectedService.serviceId;
            }
            return !servicesInvestigation?.some((serviceInvestigation) => serviceInvestigation.service.id === service.id);
        }).map((service) => {
            const typeTestString = serviceTypeToTranslation(serviceType);
            return {
                label: translate(`pages.hospital.services.tests.${typeTestString}.${service.code}`).toString(),
                value: service.id,
            }
        }).sort((optionA, optionB) => optionA.label.localeCompare(optionB.label));
        const typeSurvey = serviceType === 0 ? 2 : 1;
        const surveyOptions = surveys?.filter((survey) => survey.type === typeSurvey).map((survey) => {
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
            validation: "number",
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
    }, [servicesGeneral, servicesInvestigation, selectedService]);

    function editService(id: number) {
        const service = servicesInvestigation?.find((serviceInvestigation) => serviceInvestigation.id === id);
        if (service) {
            const initialData = {
                id: service.id,
                serviceId: service.service.id,
                external: service.external,
                price: service?.billable ? service?.billable.price : 0,
                survey: service.survey?.uuid
            }
            setSelectedService(initialData);
            setShowModal(true);
            setAddingService(true);
        }
    }
    function deleteService(id:number){
        const service = servicesInvestigation?.find((serviceInvestigation) => serviceInvestigation.id === id);
        if (service) {
            const initialData = {
                id: service.id,
                code : service.service.code,
                serviceId: service.service.id,
                external: service.external,
                price: service?.billable ? service?.billable.price : 0,
                survey: service.survey?.uuid
            }
            setSelectedService(initialData);
        }
        setShowModal(true);
        setRemovingService(true);
        setAddingService(false);
    }
    function confirmDelete(){
        if(selectedService){
            callBackDeleteService(selectedService.id);
            setShowModal(false);
            setRemovingService(false);
        }
    }
    function cancel(){
        setShowModal(false);
        setRemovingService(false);
        setSelectedService(undefined);
    }
    function renderCore() {
        if (servicesInvestigation?.length === 0) {
            return (
                <Typography variant="h6" component="h6">
                    <Translate id="pages.hospital.services.no_services" />
                </Typography>
            )
        }
        else {
            const rows = servicesInvestigation?.map((serviceInvestigation) => {
                const typeTestString = serviceTypeToTranslation(serviceType);
                return {
                    id: serviceInvestigation.id,
                    name: <Translate id={`pages.hospital.services.tests.${typeTestString}.${serviceInvestigation.service.code}`} />,
                    price: serviceInvestigation.billable ? serviceInvestigation.billable.amount : 0,
                    external: serviceInvestigation.external,
                    survey: serviceInvestigation.survey ? serviceInvestigation.survey.name : "",
                }
            });
            const headCells = [{ id: "name", alignment: "left", label: "name" }, { id: "price", alignment: "left", label: "price" },
            { id: "external", alignment: "left", label: "external" }, { id: "survey", alignment: "left", label: "survey" }];
            return <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells}
                actions={[{ "type": "delete", "func": (id: number) => deleteService(id) }]} />
        }
    }
    useEffect(() => {
        if (!loading) {
            //Set time out before closing modal to avoid flickering
            setTimeout(() => {
                setShowModal(false);
            }, 0);
            
        }
    }, [loading]);

    if (loading || !servicesGeneral || !servicesInvestigation) {
        return <Loader />
    }
    return (
        <>
            <Modal key="modal" medium
                open={showModal} title={<Translate id={`pages.hospital.services.edit.${addingService ? "new_service" : "delete_service"}.title`} />}
                closeModal={() => setShowModal(false)}>
                <Grid container>
                    {
                        loading &&
                        <Loader />
                    }
                    {
                        !loading && addingService &&
                        <>
                            {
                                formFields.serviceId.options?.length === 0 &&
                                <Translate id="pages.hospital.services.edit.no_services_remaining" />
                            }
                            {
                                formFields.serviceId.options?.length > 0 &&
                                <FormTSFunc fields={formFields} initialData={selectedService}
                                    callBackForm={(values: any) => callBackSaveService(values, selectedService ? selectedService.id : -1)} />

                            }

                        </>
                    }
                    {
                        !loading && removingService && selectedService &&
                        <>
                            <Typography variant="body2" style={{fontWeight:'bold'}} gutterBottom><Translate id="pages.hospital.services.edit.delete_service.description" /></Typography>
                            <Translate id={`pages.hospital.services.tests.${serviceTypeToTranslation(serviceType)}.${selectedService.code as string}`} />
                            <div style={{paddingTop:'1rem'}}>
                                <ButtonOk onClick={confirmDelete}>Delete</ButtonOk>
                                <ButtonCancel style={{marginLeft:'1rem'}} onClick={cancel}>Cancel</ButtonCancel>
                            </div>
                        </>
                    }
                </Grid>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackbar.show}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ show: false })}
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
                    setSelectedService(undefined);
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
export const EditServicesLocalized = withLocalize(EditServicesComponent);

export default EditServices;
