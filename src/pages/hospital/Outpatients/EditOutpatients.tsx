import { Grid, Paper, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import Form from '../../../components/general/form';
import FormTSFunc, { FieldProps } from '../../../components/general/formTSFunction';
import { ButtonAdd } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { IAgenda, IBox, IDepartment, IOutpatientsInfo, IResearcher, SnackbarType } from '../../../constants/types';
import { useDepartments, useSnackBarState } from '../../../hooks';
import { getBoxesService, getServicesInvestigationService, saveAgendaService, saveBoxService } from '../../../services/agenda';
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
    const [agendas, setAgendas] = React.useState<IAgenda[]>([]);
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
                setShowSnackbar({show:true, message:err.message, severity:"error"})
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
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
                setShowSnackbar({show:true, message:err.message, severity:"error"})
            }) 
    }

    async function saveAgenda(agenda:IAgenda){
        setLoading(true);
        saveAgendaService(uuidInvestigation, agenda)
            .then(response => {
                setAgendas([...agendas, response.agenda]);
                setLoading(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.box.success", severity:"success"})
            })
            .catch(err => {
                setLoading(false);
                setShowSnackbar({show:true, message:err.message, severity:"error"})
            }) 
    }

    
    if(departments && outpatientsInfo){
        return <EditOutpatientsComponent setShowSnackbar={setShowSnackbar} showSnackbar={showSnackbar} 
                    loading={loading} departments={departments} boxes={boxes} services={services} researchers={researchers}
                    saveAgendaCallback={saveAgenda} outpatientsInfo={outpatientsInfo}
                    saveBoxCallback={saveBox}/>
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
    outpatientsInfo: IOutpatientsInfo,
    setShowSnackbar: (snackbar: SnackbarType) => void,
    saveBoxCallback: (box:IBox) => void
    saveAgendaCallback: (agenda:IAgenda) => void
}

const EditOutpatientsLocalized: React.FC<EditPropsComponent> = ({ boxes, showSnackbar, outpatientsInfo, setShowSnackbar, saveAgendaCallback, researchers, departments, loading, services, translate, saveBoxCallback }) => {
    const [addBox, setAddBox] = React.useState(false);
    const [addingAgenda, setAddingAgenda] = React.useState(false);
    const [modalInfo, setModalInfo] = React.useState({showModal: false, type:""});
    const [initDataAgenda, setInitDataAgenda] = React.useState({});
    const [agendas, setAgendas] = React.useState<IAgenda[]>([]);
    const [reseachersDepartment, setResearchersDepartment] = React.useState<IResearcher[]>([]);
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
                "name":{
                    required : true,
                    name:"name",
                    type:"text",
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
                    required : true,
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
        saveBoxCallback(box);
    }
    function saveAgenda(agenda:any){
        console.log(agenda);
        const turnStart = [agenda.turnStart.getHours(), agenda.turnStart.getMinutes()]
        const turnEnd = [agenda.turnEnd.getHours(), agenda.turnEnd.getMinutes()]
        
        const agendaPost:IAgenda = {...agenda};
        agendaPost.turn = [turnStart, turnEnd];
        saveAgendaCallback(agendaPost);
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
            setInitDataAgenda({department: boxSelected.department.uuid, otherStaff:[]});
            setModalInfo({showModal: true, type:"agenda"});
        }
        setModalInfo({showModal: true, type:"agenda"});
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
                            initialData={{type:0}} 
                            closeCallBack={() => resetModal()}/>
                    }       
                    {
                        modalInfo.type === "agenda" && 
                        <Form fields={CREATE_AGENDA_FORM} fullWidth={true} callBackForm={saveAgenda}
                            initialData={initDataAgenda} 
                            closeCallBack={() => resetModal()}/> 
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
                <Accordion2Levels orderedMainElements={elements} deleteMainElementCallBack={(uuid) => console.log("DELETE:"+uuid)} 
                    editSubElementCallBack={(uuid) => console.log("EDIT SUB"+uuid)} checkCanDeleteMainElement={(uuid) => true} 
                    deleteSubElementCallBack={(uuid) => console.log("DELETE SUB"+uuid)} addSubElementCallBack={(uuid) => addAgenda(uuid)}
                    editMainElementCallBack={(uuid) => console.log("EDIT"+uuid)} checkCanDeleteSubElement={(uuid) => true} />
                    
            </>
        );
    }

    useEffect(() => {
        if(showSnackbar.severity === "success"){
            resetModal();
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