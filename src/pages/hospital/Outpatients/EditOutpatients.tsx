import { Box, Grid, IconButton, ListItem, ListItemText, Paper, Snackbar, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Form from '../../../components/general/form';
import FormTSFunc, { FieldProps, FormValues } from '../../../components/general/formTSFunction';
import { ButtonAdd, ButtonCancel, ButtonContinue, IconGenerator } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import { TabsSherwood } from '../../components/Tabs';
import Loader from '../../../components/Loader';
import { IAgenda, IBox, IDepartment, IOutpatientsInfo, IResearcher, SnackbarType } from '../../../constants/types';
import { useAgendas, useDepartments, useServiceGeneral, useSnackBarState } from '../../../hooks';
import { deleteAgendaAction, saveUpdateAgendaAction } from '../../../redux/actions/hospitalActions';
import { HOSPITAL_ACTION_AGENDA_ROUTE, HOSPITAL_AGENDA_ROUTE } from '../../../routes/urls';
import { deleteAgendaService, deleteBoxService, getBoxesService, getServicesInvestigationService, saveAgendaService, saveBoxService, saveServiceInvestigationService, updateAgendaService, updateBoxService, updateServiceInvestigationService } from '../../../services/agenda';
import { researcherFullName } from '../../../utils/index.jsx';
import Accordion2Levels, { MainElementType } from '../../components/Accordion2Levels';
import { IService, IServiceInvestigation, ServiceType } from '../Service/types';
import StartingOutpatients from './Starting';
import { deleteServiceService } from '../../../services';


interface EditProps {
    uuidInvestigation:string,
    outpatientsInfo:IOutpatientsInfo | null,
    billingInfo:any,
    // boxes: IBox[],
    // researchers: IResearcher[],
    // services: any[],
}

const EditOutpatients: React.FC<EditProps> = ({ uuidInvestigation, outpatientsInfo, billingInfo }) => {
    const {departments, researchers} = useDepartments();
    const [boxes, setBoxes] = React.useState<IBox[]>([]);
    const {agendas} = useAgendas();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [loadingBoxes, setLoadingBoxes] = React.useState(false);
    const [loadingServices, setLoadingServices] = React.useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [services, setServices] = React.useState<IServiceInvestigation[]>([]);
    const {servicesGeneral} = useServiceGeneral(2);

    useEffect(() => {
        setLoading(true);
        getBoxesService(uuidInvestigation)
            .then(response => {
                setBoxes(response.boxes);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                const message = err.errorCode !== undefined ? err.errorCode : err.message;
                setShowSnackbar({show:true, message : err.message, severity:"error"})
            })
           
    }, [uuidInvestigation]);

    useEffect(() => {
        setLoadingServices(true);
        getServicesInvestigationService(uuidInvestigation, ServiceType.CONSULTATION )
            .then(response => {
                setServices(response.servicesInvestigation);
                setLoadingServices(false);
            })
            .catch(err => {
                setLoadingServices(false);
                setShowSnackbar({show:true, message:err.message, severity:"error"})
            }) 
    }, [uuidInvestigation]);

    async function saveBox(box:IBox){
        setLoadingBoxes(true);
        saveBoxService(uuidInvestigation, box)
            .then(response => {
                setBoxes([...boxes, response.box]);
                setLoadingBoxes(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success.saved", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
                setShowSnackbar({show:true, message:err.message, severity:"error"})
            }) 
    }
    function updateService(service:IServiceInvestigation){
        setLoadingServices(true);
        updateServiceInvestigationService(uuidInvestigation, service)
            .then(response => {
                const service = services.findIndex(s => s.id === response.serviceInvestigation.id);
                services[service] = response.serviceInvestigation;
                setServices([...services]);
                setLoadingServices(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.service.success.updated", severity:"success"})
            })
            .catch(err => {
                setLoadingServices(false);
                setShowSnackbar({show:true, message:"general.error", severity:"error"})
            })
    }
    function saveService(service:IServiceInvestigation){
        setLoadingServices(true);
        saveServiceInvestigationService(uuidInvestigation, service)
            .then(response => {
                setServices([...services, response.serviceInvestigation]);
                setLoadingServices(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success.saved", severity:"success"})
            })
            .catch(err => {
                setLoadingServices(false);
                setShowSnackbar({show:true, message:"general.error", severity:"error"})
            }) 
    }
    function deleteService(idService:number){
        setLoadingServices(true);
        deleteServiceService(uuidInvestigation, idService)
            .then(response => {
                const service = services.findIndex(s => s.id === idService);
                services.splice(service, 1);
                setServices([...services]);
                setLoadingServices(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.service.success.deleted", severity:"success"})
            })
            .catch(err => {
                setLoadingServices(false);
                setShowSnackbar({show:true, message:"general.error", severity:"error"})
            }) 
    }
    function updateBoxCallback(box:IBox){
        setLoadingBoxes(true);
        updateBoxService(uuidInvestigation, box)
            .then(response => {
                const box = boxes.findIndex(b => b.uuid === response.box.uuid);
                boxes[box] = response.box;
                setBoxes([...boxes]);
                setLoadingBoxes(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success.updated", severity:"success"})
            })
            .catch(err => {
                setLoadingBoxes(false);
                setShowSnackbar({show:true, message:err.message, severity:"error"})
            }) 
    }

    function deleteAgenda(uuidAgenda:string){
        setLoading(true);
        deleteAgendaService(uuidInvestigation, uuidAgenda)
            .then(async(response) => {
                await dispatch(deleteAgendaAction(uuidAgenda));
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.agenda.success.deleted", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
                const message = err.response.data.errorCode !== undefined ? "pages.hospital.outpatients.agenda.errors.error_"+err.response.data.errorCode : err.message;
                setShowSnackbar({show:true, message:message, severity:"error"});
            }) 
    }

    function deleteBox(uuidBox:string){
        setLoadingBoxes(true);
        deleteBoxService(uuidInvestigation, uuidBox)
            .then(async(response) => {
                const box = boxes.findIndex(b => b.uuid === uuidBox);
                boxes.splice(box, 1);
                setBoxes([...boxes]);
                setLoadingBoxes(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success.deleted", severity:"success"})
            })
            .catch(err => {
                setLoadingBoxes(false);
                const message = err.response.data.errorCode !== undefined ? "pages.hospital.outpatients.box.errors.error_"+err.response.data.errorCode : err.message;
                setShowSnackbar({show:true, message:message, severity:"error"});
            }) 
    }

    async function saveAgenda(agenda:IAgenda){
        setLoading(true);
        saveAgendaService(uuidInvestigation, agenda)
            .then(async(response) => {
                await dispatch(saveUpdateAgendaAction(response.agenda));
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.agenda.success.saved", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
                const message = err.response.data.errorCode !== undefined ? "pages.hospital.outpatients.agenda.errors.error_"+err.response.data.errorCode : err.message;
                setShowSnackbar({show:true, message:message, severity:"error"});
            }) 
    }

    function updateAgenda(agenda:IAgenda){
        setLoading(true);
        updateAgendaService(uuidInvestigation, agenda)
            .then(async(response) => {
                await dispatch(saveUpdateAgendaAction(response.agenda));
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.agenda.success.updated", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
                const message = err.response.data.errorCode !== undefined ? "pages.hospital.outpatients.agenda.errors.error_"+err.response.data.errorCode : err.message;
                setShowSnackbar({show:true, message:message, severity:"error"});
            }) 
    }

    
    if(departments && outpatientsInfo){
        return <EditOutpatientsComponent setShowSnackbar={setShowSnackbar} showSnackbar={showSnackbar} agendas={agendas}
                    loading={loading} loadingBoxes={loadingBoxes} loadingServices={loadingServices}
                    billingInfo={billingInfo}
                    departments={departments} boxes={boxes} services={services} researchers={researchers}                    
                    saveAgendaCallback={saveAgenda} outpatientsInfo={outpatientsInfo} callbackDeleteAgenda={deleteAgenda}
                    saveBoxCallback={saveBox} updateBoxCallback={updateBoxCallback} callbackDeleteBox={deleteBox}
                    updateAgendaCallback={updateAgenda} saveServiceCallback={saveService} servicesGeneral={servicesGeneral ? servicesGeneral : []}
                    callbackDeleteService={deleteService} updateServiceCallback={updateService}
                    />
    }
    else{
        return <Loader />
    }    
}

interface EditPropsComponent extends LocalizeContextProps {
    departments: IDepartment[],
    boxes: IBox[],
    billingInfo:any,
    services: IServiceInvestigation[],
    loading:boolean,
    loadingBoxes:boolean,
    loadingServices:boolean,
    researchers: IResearcher[],
    showSnackbar: SnackbarType,
    agendas: IAgenda[] | null,
    outpatientsInfo: IOutpatientsInfo,
    servicesGeneral: IService[],
    setShowSnackbar: (snackbar: SnackbarType) => void,
    saveBoxCallback: (box:IBox) => void
    saveAgendaCallback: (agenda:IAgenda) => void,
    callbackDeleteAgenda: (uuidAgenda:string) => void,
    updateBoxCallback: (box:IBox) => void,
    callbackDeleteBox: (uuidBox:string) => void,
    updateAgendaCallback: (agenda:IAgenda) => void,
    updateServiceCallback: (service:IServiceInvestigation) => void,
    saveServiceCallback: (service:IServiceInvestigation) => void,
    callbackDeleteService: (idService:number) => void,
}

const EditOutpatientsLocalized: React.FC<EditPropsComponent> = ({ boxes, agendas, showSnackbar, outpatientsInfo, billingInfo,
                                        updateBoxCallback, callbackDeleteBox, callbackDeleteAgenda, 
                                        setShowSnackbar, updateAgendaCallback, saveAgendaCallback, servicesGeneral,
                                        researchers, departments, loading, loadingBoxes, loadingServices, services, translate, 
                                        saveBoxCallback, saveServiceCallback, updateServiceCallback, callbackDeleteService }) => {
    const initialBoxInfo = {type:0};
    const initialAgendaInfo = {otherStaff:[]}
    const initialServiceInfo = {external:0}
    const [deletedBox, setDeletedBox] = React.useState<IBox | null>(null);
    const [modalInfo, setModalInfo] = React.useState({showModal: false, type:""});
    const [initDataAgenda, setInitDataAgenda] = React.useState<FormValues>(initialAgendaInfo);
    const [initDataBox, setInitDataBox] = React.useState<FormValues>(initialBoxInfo);
    const [initDataService, setInitDataService] = React.useState<FormValues>(initialServiceInfo);
    const [reseachersDepartment, setResearchersDepartment] = React.useState<IResearcher[]>([]);
    const [deletedAgenda, setDeletedAgenda] = React.useState<IAgenda | null>(null);
    const [deletedService, setDeletedService] = React.useState<IServiceInvestigation | null>(null);

    const history = useHistory();

    let departmentOptions = departments.map((department) => {
        return {
            label: department.name,
            value: department.uuid
        }
    })
    departmentOptions.unshift({label: "pages.hospital.outpatients.box.no_department", value: "null"})

    const CREATE_SERVICE: {[key: string]: FieldProps} | {}  = useMemo(() => {
        return {
            "id" : {
                required : false,
                name:"id",
                type:"hidden",
                label:"pages.hospital.outpatients.service.id",
                shortLabel: "pages.hospital.outpatients.service.id",
                validation : "notEmpty"
            },
            "description":{
                required : true,
                name:"description",
                type:"text",
                label:"pages.hospital.outpatients.service.name",
                shortLabel: "pages.hospital.outpatients.service.name",
                validation : "textMin2"
            },
            "external":{
                required : false,
                name:"external",
                type:"hidden",
                label:"pages.hospital.outpatients.service.external",
                shortLabel: "pages.hospital.outpatients.service.external",

            },
            "serviceId":{
                required : false,
                type:"select",
                name:"serviceId",
                label:"pages.hospital.outpatients.service.type_service",
                shortLabel:"pages.hospital.outpatients.service.type_service",
                validation : "notEmpty",
                options:servicesGeneral.map((service) =>{
                    console.log(service.id);
                    return {
                        label: service.name,
                        value: service.id
                    }
                })
            },
            price:{
                name: "price",
                label:"pages.hospital.outpatients.service.price",
                type: "text",
                validation: "number",
                required: false
            }
        }
    }, [services]); 
    const CREATE_BOX_FORM:{[key: string]: FieldProps} | {} = useMemo(() => {
        if(!services){
            return {}
        }
        else{
            return {
                "name":{
                    required : true,
                    name:"name",
                    type:"text",
                    label:"pages.hospital.outpatients.box.name",
                    shortLabel: "pages.hospital.outpatients.box.name",
                    validation : "textMin2"
                },
                "uuid":{
                    required : false,
                    name:"type",
                    type:"hidden",
                    label:""
                },
                "type":{
                    required : false,
                    name:"type",
                    type:"hidden",
                    label:""
                },
                "department":{
                    required : false,
                    type:"select",
                    name:"department",
                    label:"pages.hospital.outpatients.box.select_department",
                    shortLabel:"pages.hospital.outpatients.box.select_department",
                    validation : "notEmpty",
                    options:departmentOptions
                }
            }       
        }
    }, [departments])
    const CREATE_AGENDA_FORM:{[key: string]: FieldProps} | {} = useMemo(() => {
        if(!boxes){
            return {}
        }
        else{
            const agendaForm =  {
                "uuid" : {
                    required : false,
                    name:"uuid",
                    type:"hidden",
                    label:"",
                    shortLabel:""
                },
                "name":{
                    required : true,
                    name:"name",
                    type:"text",
                    numberColumnsLg:12,
                    numberColumnsXs:12,
                    label:"general.name",
                    shortLabel: "general.name",
                    validation : "textMin2"
                },
                "durationFirstVisit":{
                    required : true,
                    name:"durationFirstVisit",
                    type:"text",
                    numberColumnsLg:3,
                    numberColumnsXs:3,
                    label:"pages.hospital.outpatients.agenda.duration",
                    shortLabel: "pages.hospital.outpatients.agenda.duration",
                    validation : "number"
                },
                "slotsPerDay":{
                    required : true,
                    name:"slotsPerDay",
                    type:"text",
                    numberColumnsLg:3,
                    numberColumnsXs:3,
                    label:"pages.hospital.outpatients.agenda.slotsPerDay",
                    shortLabel: "pages.hospital.outpatients.agenda.slotsPerDay",
                    validation : "number"
                },
                "turnStart":{
                    required : true,
                    name:"turnStart",
                    type:"time",
                    numberColumnsLg:3,
                    numberColumnsXs:3,
                    label:"pages.hospital.outpatients.agenda.turn_start",
                    shortLabel: "pages.hospital.outpatients.agenda.turn_start",
                    validation : "number"
                },
                "turnEnd":{
                    required : true,
                    name:"turnEnd",
                    type:"time",
                    numberColumnsLg:3,
                    numberColumnsXs:3,
                    label:"pages.hospital.outpatients.agenda.turn_end",
                    shortLabel:"pages.hospital.outpatients.agenda.turn_end",
                    validation : "number"
                },
                "daysWeek":{
                    required : true,
                    name:"daysWeek",
                    type:"multioption",
                    numberColumnsLg:12,
                    numberColumnsXs:12,
                    label:"pages.hospital.outpatients.agenda.week_days",
                    shortLabel: "pages.hospital.outpatients.agenda.week_days",
                    validation : "notEmpty",
                    options:[{label:translate("general.week_days.monday"), value:"Mon"},{label:translate("general.week_days.tuesday"), value:"Tue"},
                                {label:translate("general.week_days.wednesday"), value:"Wed"},{label:translate("general.week_days.thursday"), value:"Thu"},
                                {label:translate("general.week_days.friday"), value:"Fri"},{label:translate("general.week_days.saturday"), value:"Sat"},
                                {label:translate("general.week_days.sunday"), value:"Sun"}]
                },
                "department":{
                    required : false,
                    type:"select",
                    name:"department",
                    numberColumnsLg:6,
                    numberColumnsXs:12,
                    label:"pages.hospital.outpatients.box.select_department",
                    shortLabel:"pages.hospital.outpatients.box.select_department",
                    validation : "notEmpty",
                    callBackOnChange: (uuidDepartment:string) => {
                        console.log(uuidDepartment);
                        if(uuidDepartment === "null"){
                            setResearchersDepartment(researchers);
                        }
                        else{
                            const reseachersDepartment = researchers.filter((researcher) => researcher.units.filter((unit) => unit.department.uuid === uuidDepartment).length > 0);
                            setResearchersDepartment(reseachersDepartment);
                        }
                        

                    },
                    options:departmentOptions
                },
               "box":{
                    required : true,
                    type:"hidden",
                    name:"box",
                    label:"pages.hospital.outpatients.agenda.doctor",
                    shortLabel:"pages.hospital.outpatients.agenda.doctor",
                    validation : "notEmpty",
                },
                "principalResearcher":{
                    required : true,
                    type:"select",
                    name:"principalResearcher",
                    label:"pages.hospital.outpatients.agenda.doctor",
                    shortLabel:"pages.hospital.outpatients.agenda.doctor",
                    validation : "notEmpty",
                    options:reseachersDepartment.map((researcher) => {
                        return {
                            label: researcherFullName(researcher),
                            value: researcher.uuid
                        }
                    })
                },
                "otherStaff" : {
                    required : false,
                    type:"hidden",
                    name:"otherStaff",
                    label:"pages.hospital.outpatients.agenda.service",
                    shortLabel:"pages.hospital.outpatients.agenda.service",
                    validation : "notEmpty",
                },
                "idServiceInvestigationFirstVisit":{
                    required : true,
                    type:"select",
                    name:"idServiceInvestigationFirstVisit",
                    label:"pages.hospital.outpatients.agenda.service",
                    shortLabel:"pages.hospital.outpatients.agenda.service",
                    validation : "notEmpty",
                    options:services.map((service) => {
                        return {
                            label: service.service.name +" - " +service.description,
                            value: service.id
                        }
                    })
                }
            }  
            if(initDataAgenda.hasOwnProperty("department")){
                agendaForm.department.type = "hidden";
            }
            if(outpatientsInfo.params.type === "date"){
                // @ts-ignore: Unreachable code error
                delete agendaForm["durationFirstVisit"];
            }
            return agendaForm;
        }
    }, [boxes, researchers, services, reseachersDepartment, initDataAgenda])
    
    function saveBox(box:any){
        console.log(box);
        if(box.uuid){
            updateBoxCallback(box)
        }
        else{
            saveBoxCallback(box);
        }
        
    }
    function deleteAgenda(uuidAgenda:string){
        const agenda = agendas!.find((agenda) => agenda.uuid === uuidAgenda);
        if(agenda){
            const futureAppointments = Object.keys(agenda.datesOccupancy).filter((date) => new Date(date) > new Date()).length > 0;
            if(futureAppointments){
                setModalInfo({showModal: true, type:"agenda_error_appointments"});
            }
            else{
                setDeletedAgenda(agenda);
                setModalInfo({showModal: true, type:"delete_agenda"});
            }
            
        }
        
    }
    function saveAgenda(agenda:any){
        console.log(agenda);
        const turnStart = [agenda.turnStart.getHours(), agenda.turnStart.getMinutes()]
        const turnEnd = [agenda.turnEnd.getHours(), agenda.turnEnd.getMinutes()]
        
        const agendaPost:IAgenda = {...agenda};
        agendaPost.turn = [turnStart, turnEnd];
        setInitDataAgenda(agenda);
        agendaPost.daysWeek = agenda.daysWeek.map((day:{multioption : string}) => day.multioption);
        if(agenda.uuid){
            updateAgendaCallback(agendaPost);
        }
        else{
            saveAgendaCallback(agendaPost);
        }
        
    }
    function saveService(service:any){
        if(service.id){
            updateServiceCallback(service);
        }
        else{
            saveServiceCallback(service);
        }
    }
    function editAgenda(uuidAgenda:string){
        const agendaSelected = agendas!.find((agenda) => agenda.uuid === uuidAgenda);
        if(agendaSelected){
            const turnStart = agendaSelected.turn[0];
            const turnEnd = agendaSelected.turn[1];
            const reseachersDepartment = researchers.filter((researcher) => researcher.units.filter((unit) => unit.department.uuid === agendaSelected.department?.uuid).length > 0);
            setResearchersDepartment(reseachersDepartment);
            const box = agendaSelected.box as IBox;
            const agendaEdit:FormValues = {
                    uuid:agendaSelected.uuid,
                    name:agendaSelected.name, slotsPerDay:agendaSelected.slotsPerDay, department:agendaSelected.department?.uuid, 
                    daysWeek:agendaSelected.daysWeek.map((day) =>{return {"multioption" : day}}),
                    turnStart: new Date(0,0,0, turnStart[0], turnStart[1]), turnEnd: new Date(0,0,0, turnEnd[0], turnEnd[1]),
                    principalResearcher: agendaSelected.principalResearcher?.uuid,
                    box: box!.uuid as string,
                    idServiceInvestigationFirstVisit : agendaSelected.serviceInvestigationFirstVisit.id,
                    otherStaff:[]
                };
            setInitDataAgenda(agendaEdit);
            setModalInfo({showModal: true, type:"agenda"});
        }
    }
    function editBox(uuidBox:string){
        const boxSelected = boxes.find((box) => box.uuid === uuidBox);
        if(boxSelected){
            setInitDataBox({...initDataBox, uuid:boxSelected.uuid, name: boxSelected.name, department:boxSelected.department ? boxSelected.department.uuid : undefined}, );
            setModalInfo({showModal: true, type:"box_edit"});
        }
    }
    function deleteBox(uuidBox:string){
        const boxSelected = boxes.find((box) => box.uuid === uuidBox);
        if(boxSelected && agendas){
            const hasAgendas = agendas?.filter((agenda) => (agenda.box as IBox).uuid === uuidBox).length > 0;
            if(hasAgendas){
                setDeletedBox(boxSelected);
                setModalInfo({showModal: true, type:"delete_box_error"});
            }
            else{
                setDeletedBox(boxSelected);
                setModalInfo({showModal: true, type:"delete_box"});
            }
        }
    }
    function resetModal(){
        setModalInfo({showModal: false, type:""});
    }
    function editService(idService:number){
        const serviceSelected = services.find((service) => service.id === idService);
        if(serviceSelected){
            setInitDataService({...initDataService, id:serviceSelected.id, serviceId: serviceSelected.service.id, description: serviceSelected.description, price:serviceSelected.billable ? serviceSelected.billable.amount : 0});
            setModalInfo({showModal: true, type:"service_edit"});
        }
    }
    function deleteService(idService:number){
        const agendaWithService = agendas?.find((agenda) => agenda.serviceInvestigationFirstVisit.id === idService);
        if(agendaWithService){
            setModalInfo({showModal: true, type:"error_service_agenda"});
        }
        else{
            const serviceSelected = services.find((service) => service.id === idService);
            if(serviceSelected){
                setDeletedService(serviceSelected);
                setModalInfo({showModal: true, type:"delete_service_confirm"});            
            }
        }
    }
    function addAgenda(uuidBox?:string){
        const boxSelected = boxes.find((box) => box.uuid === uuidBox);
        if(boxSelected && boxSelected.department !== null){
            const uuidDepartmentBox = boxSelected.department.uuid;
            const reseachersDepartment = researchers.filter((researcher) => researcher.units.filter((unit) => unit.department.uuid === uuidDepartmentBox).length > 0);
            setResearchersDepartment(reseachersDepartment);
            setInitDataAgenda({department: boxSelected.department.uuid, otherStaff:[], box:boxSelected.uuid});
            setModalInfo({showModal: true, type:"agenda"});
        }
        else if(boxSelected){
            setInitDataAgenda({otherStaff:[], box:boxSelected.uuid});
        }
        setModalInfo({showModal: true, type:"agenda", });
    }
    function renderModal(){
        if(!loading){
            const title = translate(`pages.hospital.outpatients.edit.modal.title.${modalInfo.type}`)

            return(
                <Modal key="modal" medium size="sm" open={modalInfo.showModal} title={title} closeModal={() => resetModal()}>
                    <>
                    {
                        (modalInfo.type === "box" || modalInfo.type === "box_edit") && 
                        <Form fields={CREATE_BOX_FORM} fullWidth callBackForm={saveBox}
                            initialData={initDataBox} 
                            closeCallBack={() => resetModal()}/>
                    }       
                    {
                        modalInfo.type === "agenda" && 
                        <Form fields={CREATE_AGENDA_FORM} fullWidth={true} callBackForm={saveAgenda}
                            initialData={initDataAgenda} 
                            closeCallBack={() => resetModal()}/> 
                    } 
                    {
                        (modalInfo.type === "service" || modalInfo.type === "service_edit") && 
                        <Form fields={CREATE_SERVICE} fullWidth={true} callBackForm={saveService}
                            initialData={initDataService} 
                            closeCallBack={() => resetModal()}/> 
                    }
                    {
                        deletedService && modalInfo.type === "delete_service_confirm" && 
                        <>
                            <Typography variant="body1"><Translate id="pages.hospital.outpatients.confirm.DELETE_SERVICE" /></Typography>
                            { deletedService.description }
                            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                    <Translate id="general.cancel" />
                                </ButtonCancel>
                                <ButtonContinue onClick={ () => callbackDeleteService(deletedService.id)} data-testid="continue-modal" color="green">
                                    <Translate id="general.continue" />
                                </ButtonContinue>
                            </Grid>
                        </>
                    }
                    {
                        modalInfo.type === "error_service_agenda" && 
                        <Typography variant="body1"><Translate id="pages.hospital.outpatients.confirm.error_service_agenda" /></Typography>
                    } 
                    {
                        modalInfo.type === "agenda_error_appointments" && 
                        <Typography variant="body1"><Translate id="pages.hospital.outpatients.confirm.ERROR_DELETE_AGENDA" /></Typography>
                    } 
                    {
                        (modalInfo.type === "delete_agenda" && deletedAgenda) && 
                        <>
                            <Typography variant="body1"><Translate id="pages.hospital.outpatients.confirm.SURE_DELETE_AGENDA" /></Typography>
                            {deletedAgenda!.name}
                            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                    <Translate id="general.cancel" />
                                </ButtonCancel>
                                <ButtonContinue onClick={() => callbackDeleteAgenda(deletedAgenda.uuid)} data-testid="continue-modal" color="green">
                                    <Translate id="general.continue" />
                                </ButtonContinue>
                            </Grid>
                        </>
                    } 
                    {
                        modalInfo.type === "delete_box_error" && 
                        <Typography variant="body1"><Translate id="pages.hospital.outpatients.confirm.ERROR_DELETE_BOX" /></Typography>
                    }
                    {
                        (modalInfo.type === "delete_box" && deletedBox) && 
                        <>
                        <Typography variant="body1"><Translate id="pages.hospital.outpatients.confirm.SURE_DELETE_BOX" /></Typography>
                        {deletedBox!.name}
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                <Translate id="general.cancel" />
                            </ButtonCancel>
                            <ButtonContinue onClick={() => callbackDeleteBox(deletedBox!.uuid)} data-testid="continue-modal" color="green">
                                <Translate id="general.continue" />
                            </ButtonContinue>
                        </Grid>
                        </>
                    } 
                    
                    </>      
                </Modal>
            )
        }
        return null;
    }
    function renderServices(){
        if(services.length > 0){
            return <>
                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                    {
                        services.map((service) => {
                            return (
                                <ListItem style={{backgroundColor:'white'}} >
                                    <ListItemText primary={`${service.description}`} color='primary' /> 
                                                                             
                                        {
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    editService(service.id);
                                                }}
                                                size="large">
                                            <IconGenerator type="edit" />
                                            </IconButton>
                                        }
                                        {
                                            <IconButton
                                                onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteService(service.id);
                                                    }}
                                                size="large">
                                                <IconGenerator type="delete" />
                                            </IconButton>
                                        }                                        
                                </ListItem>
                            );
                        })
                        
                    }
                </Grid>
            </>;
        }
    }
    function renderCore(){
        if(loading || agendas === null || loadingBoxes || loadingServices){
            return <Loader />
        }
        if(boxes.length === 0 || services.length === 0){
            return (
                <StartingOutpatients hasBoxes={boxes.length > 0} hasServices={services.length > 0} 
                    hasBillingInfo={billingInfo}
                    callbackAddBox={() => {setModalInfo({showModal:true, type:"box"})}}
                    callbackAddAgenda={addAgenda} callbackAddService={() => setModalInfo({showModal: true, type:"service"})}/>
            );
        }
        if(agendas !== null){
            const boxOrdered = boxes.sort((boxA, boxB) => { 
                const dateA = new Date(boxA.createdAt as Date);
                const dateB = new Date(boxB.createdAt as Date);
                return dateA.getTime() - dateB.getTime()});
            const elements:MainElementType[] = boxOrdered.map((box) => {
                return {
                    name: box.name,
                    uuid: box.uuid,
                    subElements: agendas.filter((agenda) => {
                        const boxAgenda:IBox = agenda.box as IBox;
                        return boxAgenda.uuid === box.uuid;
                    }).map((agenda) => {
                        return {
                            name: agenda.name,
                            uuid: agenda.uuid
                        }
                    })
                }
            })
            return (
                
                <TabsSherwood name='Outpatients' style={{  color: "white" }} labels={[translate("pages.hospital.outpatients.sections.boxes_and_agendas").toString(), translate("pages.hospital.outpatients.sections.prices").toString()]} >
                    <>
                        <Translate id="pages.hospital.outpatients.box.add_box" />: <ButtonAdd onClick={()=>setModalInfo({showModal:true, type:"box"})} />
                        <Accordion2Levels orderedMainElements={elements} deleteMainElementCallBack={(uuid) => deleteBox(uuid)} 
                            editSubElementCallBack={(uuid) =>{
                                editAgenda(uuid)
                            }} 
                            checkCanDeleteMainElement={(uuid) => true} 
                            deleteSubElementCallBack={(uuid) => deleteAgenda(uuid)}
                            addSubElementCallBack={(uuid) => addAgenda(uuid)}
                            configureSubElementCallBack={(uuid) => {
                                const nextUrl = HOSPITAL_ACTION_AGENDA_ROUTE.replace(":uuidAgenda", uuid).replace(":action", "edit")
                                history.push(nextUrl);
                            }}
                            viewSubElementCallBack={(uuid) => {
                                const nextUrl = HOSPITAL_AGENDA_ROUTE.replace(":uuidAgenda", uuid)
                                history.push(nextUrl);
                            }}
                            editMainElementCallBack={(uuid) => editBox(uuid)} checkCanDeleteSubElement={(uuid) => true} />
                            
                    </>
                    <>
                        {
                            renderServices()
                        }
                    </>
                </TabsSherwood>
                    
            );
        }
        
    }

    useEffect(() => {
        if(showSnackbar.severity === "success"){
            resetModal();
            setInitDataAgenda(initialAgendaInfo);
            setInitDataBox(initialBoxInfo);
            setTimeout(() => {
                setShowSnackbar({show:false});
            }, 2000);
            
        }
    }, [showSnackbar])

    
    return (
        <>  
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={true}
                autoHideDuration={2000}
                onClose={() => setShowSnackbar({show:false})}>
                    <div>
                        {
                            (showSnackbar.message && showSnackbar.severity) &&
                            <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                </div>
            </Snackbar>
            {renderCore()}
            {renderModal()}
        </>
    );
};
export const EditOutpatientsComponent = withLocalize(EditOutpatientsLocalized)

export default EditOutpatients;