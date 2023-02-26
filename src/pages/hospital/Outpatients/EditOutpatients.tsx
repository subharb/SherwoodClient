import { Grid, Paper, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Form from '../../../components/general/form';
import FormTSFunc, { FieldProps, FormValues } from '../../../components/general/formTSFunction';
import { ButtonAdd, ButtonCancel, ButtonContinue } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { IAgenda, IBox, IDepartment, IOutpatientsInfo, IResearcher, SnackbarType } from '../../../constants/types';
import { useAgendas, useDepartments, useSnackBarState } from '../../../hooks';
import { deleteAgendaAction, saveUpdateAgendaAction } from '../../../redux/actions/hospitalActions';
import { HOSPITAL_ACTION_AGENDA_ROUTE, HOSPITAL_AGENDA_ROUTE } from '../../../routes';
import { deleteAgendaService, deleteBoxService, getBoxesService, getServicesInvestigationService, saveAgendaService, saveBoxService, updateAgendaService, updateBoxService } from '../../../services/agenda';
import { researcherFullName } from '../../../utils';
import Accordion2Levels, { MainElementType } from '../../components/Accordion2Levels';
import { IService, IServiceInvestigation, ServiceType } from '../Service/types';


interface EditProps {
    uuidInvestigation:string,
    outpatientsInfo:IOutpatientsInfo | null,
    // boxes: IBox[],
    // researchers: IResearcher[],
    // services: any[],
}

const EditOutpatients: React.FC<EditProps> = ({ uuidInvestigation, outpatientsInfo }) => {
    const {departments, researchers} = useDepartments();
    const [boxes, setBoxes] = React.useState<IBox[]>([]);
    const {agendas} = useAgendas();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [services, setServices] = React.useState<IServiceInvestigation[]>([]);

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
        setLoading(true);
        getServicesInvestigationService(uuidInvestigation, ServiceType.CONSULTATION )
            .then(response => {
                setServices(response.servicesInvestigation);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setShowSnackbar({show:true, message:err.message, severity:"error"})
            }) 
    }, [uuidInvestigation]);

    async function saveBox(box:IBox){
        setLoading(true);
        saveBoxService(uuidInvestigation, box)
            .then(response => {
                setBoxes([...boxes, response.box]);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success.saved", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
                setShowSnackbar({show:true, message:err.message, severity:"error"})
            }) 
    }

    function updateBoxCallback(box:IBox){
        setLoading(true);
        updateBoxService(uuidInvestigation, box)
            .then(response => {
                const box = boxes.findIndex(b => b.uuid === response.box.uuid);
                boxes[box] = response.box;
                setBoxes([...boxes]);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success.updated", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
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
        setLoading(true);
        deleteBoxService(uuidInvestigation, uuidBox)
            .then(async(response) => {
                const box = boxes.findIndex(b => b.uuid === uuidBox);
                boxes.splice(box, 1);
                setBoxes([...boxes]);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success.deleted", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
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
                    loading={loading} departments={departments} boxes={boxes} services={services} researchers={researchers}
                    saveAgendaCallback={saveAgenda} outpatientsInfo={outpatientsInfo} callbackDeleteAgenda={deleteAgenda}
                    saveBoxCallback={saveBox} updateBoxCallback={updateBoxCallback} callbackDeleteBox={deleteBox}
                    updateAgendaCallback={updateAgenda}
                    />
    }
    else{
        return <Loader />
    }    
}

interface EditPropsComponent extends LocalizeContextProps {
    departments: IDepartment[],
    boxes: IBox[],
    services: IServiceInvestigation[],
    loading:boolean,
    researchers: IResearcher[],
    showSnackbar: SnackbarType,
    agendas: IAgenda[] | null,
    outpatientsInfo: IOutpatientsInfo,
    setShowSnackbar: (snackbar: SnackbarType) => void,
    saveBoxCallback: (box:IBox) => void
    saveAgendaCallback: (agenda:IAgenda) => void,
    callbackDeleteAgenda: (uuidAgenda:string) => void,
    updateBoxCallback: (box:IBox) => void,
    callbackDeleteBox: (uuidBox:string) => void,
    updateAgendaCallback: (agenda:IAgenda) => void
}

const EditOutpatientsLocalized: React.FC<EditPropsComponent> = ({ boxes, agendas, showSnackbar, outpatientsInfo, updateBoxCallback, callbackDeleteBox, callbackDeleteAgenda, setShowSnackbar, updateAgendaCallback, saveAgendaCallback, researchers, departments, loading, services, translate, saveBoxCallback }) => {
    const initialBoxInfo = {type:0};
    const initialAgendaInfo = {otherStaff:[]}
    const [deletedBox, setDeletedBox] = React.useState<IBox | null>(null);
    const [modalInfo, setModalInfo] = React.useState({showModal: false, type:""});
    const [initDataAgenda, setInitDataAgenda] = React.useState<FormValues>(initialAgendaInfo);
    const [initDataBox, setInitDataBox] = React.useState<FormValues>(initialBoxInfo);
    const [reseachersDepartment, setResearchersDepartment] = React.useState<IResearcher[]>([]);
    const [deletedAgenda, setDeletedAgenda] = React.useState<IAgenda | null>(null);

    const history = useHistory();

    let departmentOptions = departments.map((department) => {
        return {
            label: department.name,
            value: department.uuid
        }
    })
    departmentOptions.unshift({label: "pages.hospital.outpatients.box.no_department", value: "null"})

    const CREATE_BOX_FORM:{[key: string]: FieldProps} | {} = useMemo(() => {
        if(!departments){
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
                    options:[{label:translate("general.week_days.monday"), value:"M"},{label:translate("general.week_days.tuesday"), value:"T"},
                                {label:translate("general.week_days.wednesday"), value:"W"},{label:translate("general.week_days.thursday"), value:"R"},
                                {label:translate("general.week_days.friday"), value:"F"},{label:translate("general.week_days.saturday"), value:"S"},
                                {label:translate("general.week_days.sunday"), value:"U"}]
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
                        const reseachersDepartment = researchers.filter((researcher) => researcher.units.filter((unit) => unit.department.uuid === uuidDepartment).length > 0);
                        setResearchersDepartment(reseachersDepartment);

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
                            label: service.service.name,
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
    function editAgenda(uuidAgenda:string){
        const agendaSelected = agendas!.find((agenda) => agenda.uuid === uuidAgenda);
        if(agendaSelected){
            const turnStart = agendaSelected.turn[0];
            const turnEnd = agendaSelected.turn[1];
            const reseachersDepartment = researchers.filter((researcher) => researcher.units.filter((unit) => unit.department.uuid === agendaSelected.department?.uuid).length > 0);
            setResearchersDepartment(reseachersDepartment);
            
            const agendaEdit:FormValues = {
                    uuid:agendaSelected.uuid,
                    name:agendaSelected.name, slotsPerDay:agendaSelected.slotsPerDay, department:agendaSelected.department?.uuid, 
                    daysWeek:agendaSelected.daysWeek.map((day) =>{return {"multioption" : day}}),
                    turnStart: new Date(0,0,0, turnStart[0], turnStart[1]), turnEnd: new Date(0,0,0, turnEnd[0], turnEnd[1]),
                    principalResearcher: agendaSelected.principalResearcher?.uuid,
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
            setModalInfo({showModal: true, type:"box"});
        }
    }
    function deleteBox(uuidBox:string){
        const boxSelected = boxes.find((box) => box.uuid === uuidBox);
        if(boxSelected){
            setDeletedBox(boxSelected);
            setModalInfo({showModal: true, type:"delete_box"});
        }
    }
    function resetModal(){
        setModalInfo({showModal: false, type:""});
    }
    function addAgenda(uuidBox:string){
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
            const title = modalInfo.type === "box" ? translate("pages.hospital.outpatients.box.create") : translate("pages.hospital.outpatients.agenda.create");
            return(
                <Modal key="modal" medium size="sm" open={modalInfo.showModal} title={title} closeModal={() => resetModal()}>
                    <>
                    {
                        modalInfo.type === "box" && 
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
                        modalInfo.type === "agenda_error_appointments" && 
                        <Typography variant="body1">You can't delete an agenda that has appointments, cancel them first.</Typography>
                    } 
                    {
                        (modalInfo.type === "delete_agenda" && deletedAgenda) && 
                        <>
                        <Typography variant="body1">Are you sure you want to delete this agenda?</Typography>
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
                        (modalInfo.type === "delete_box" && deletedBox) && 
                        <>
                        <Typography variant="body1">Are you sure you want to delete this box?</Typography>
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
    function renderCore(){
        if(loading){
            return <Loader />
        }
        if(boxes.length === 0){
            return (
                <>
                    Add your first box: <ButtonAdd onClick={()=>setModalInfo({showModal:true, type:"box"})} />
                </>
            );
        }
        if(agendas !== null){
            const elements:MainElementType[] = boxes.map((box) => {
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
                <>
                    Box: <ButtonAdd onClick={()=>setModalInfo({showModal:true, type:"box"})} />
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