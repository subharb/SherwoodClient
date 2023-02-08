import { Grid, Paper, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { useDispatch } from 'react-redux';
import Form from '../../../components/general/form';
import { ButtonAdd } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { IAgenda, IBox, IDepartment, IResearcher, SnackbarType } from '../../../constants/types';
import { useDepartments, useSnackBarState } from '../../../hooks';
import { getBoxesService, saveBoxService } from '../../../services/agenda';
import Accordion2Levels, { MainElementType } from '../../components/Accordion2Levels';


interface EditProps {
    uuidInvestigation:string
    // boxes: IBox[],
    // researchers: IResearcher[],
    // services: any[],
}

const EditOutpatients: React.FC<EditProps> = ({ uuidInvestigation }) => {
    const {departments} = useDepartments();
    const [boxes, setBoxes] = React.useState<IBox[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();

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
    if(departments){
        return <EditOutpatientsComponent setShowSnackbar={setShowSnackbar} showSnackbar={showSnackbar} loading={loading} departments={departments} boxes={boxes} researchers={[]} services={[]}
            saveBoxCallback={saveBox}/>
    }
    else{
        return <Loader />
    }    
    
}

interface EditPropsComponent extends LocalizeContextProps {
    departments: IDepartment[],
    boxes: IBox[],
    researchers: IResearcher[],
    services: any[],
    loading:boolean,
    showSnackbar: SnackbarType,
    setShowSnackbar: (snackbar: SnackbarType) => void,
    saveBoxCallback: (box:IBox) => void,
}

const EditOutpatientsLocalized: React.FC<EditPropsComponent> = ({ boxes, showSnackbar, setShowSnackbar, departments, loading, researchers, services, translate, saveBoxCallback }) => {
    const [addBox, setAddBox] = React.useState(false);
    const [addAgenda, setAddAgenda] = React.useState(false);
    const [modalInfo, setModalInfo] = React.useState({showModal: false, type:""});
    
    const [agendas, setAgendas] = React.useState<IAgenda[]>([]);
    

    const CREATE_BOX_FORM = useMemo(() => {
        if(!departments){
            return {}
        }
        else{
            let departmentOptions = departments.map((department) => {
                return {
                    label: department.name,
                    value: department.uuid
                }
            })
            departmentOptions.unshift({label: "pages.hospital.outpatients.box.no_department", value: "null"})
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
    const CREATE_AGENDA_FORM = useMemo(() => {
        if(!boxes){
            return {}
        }
        else{
            return {
                "name":{
                    required : true,
                    name:"name",
                    type:"text",
                    label:"general.name",
                    shortLabel: "general.name",
                    validation : "textMin2"
                },
                "box":{
                    required : true,
                    type:"select",
                    name:"box",
                    label:"pages.hospital.outpatients.box.title",
                    shortLabel:"pages.hospital.outpatients.box.title",
                    validation : "notEmpty",
                    defaultOption:{"text" : "investigation.create.edc.choose", "value" : "0"},
                    options:boxes.map((box) => {
                        return {
                            label: box.name,
                            value: box.uuid
                        }
                    })
                },
                "durationFirstVisit":{
                    required : true,
                    name:"durationFirstVisit",
                    type:"text",
                    label:"pages.hospital.outpatients.agenda.duration",
                    shortLabel: "pages.hospital.outpatients.agenda.duration",
                    validation : "number"
                },
                "slotsPerDay":{
                    required : true,
                    name:"slotsPerDay",
                    type:"text",
                    label:"pages.hospital.outpatients.agenda.slotsPerDay",
                    shortLabel: "pages.hospital.outpatients.agenda.slotsPerDay",
                    validation : "number"
                },
                "principalResearcher":{
                    required : true,
                    type:"select",
                    name:"principalResearcher",
                    label:"pages.hospital.outpatients.agenda.doctor",
                    shortLabel:"pages.hospital.outpatients.agenda.doctor",
                    validation : "notEmpty",
                    options:researchers.map((box) => {
                        return {
                            label: box.name,
                            value: box.uuid
                        }
                    })
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
                            label: service.name,
                            value: service.id
                        }
                    })
                },
        }       
           
        }
    }, [boxes, researchers, services])
    
    function saveBox(box:IBox){
        console.log(box);
        saveBoxCallback(box);
    }
    function saveAgenda(agenda:IAgenda){
        console.log(agenda);
    }

    function resetModal(){
        setModalInfo({showModal: false, type:""});
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
                        <Form fields={CREATE_AGENDA_FORM} fullWidth callBackForm={saveAgenda}
                            initialData={{type:0}} 
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
                Box: <ButtonAdd onClick={()=>setAddBox(true)} />
                <Accordion2Levels orderedMainElements={elements} deleteMainElementCallBack={(uuid) => console.log(uuid)} 
                    editSubElementCallBack={(uuid) => console.log(uuid)} checkCanDeleteMainElement={(uuid) => true} 
                    deleteSubElementCallBack={(uuid) => console.log(uuid)} addSubElementCallBack={(uuid) => console.log(uuid)}
                    editMainElementCallBack={(uuid) => console.log(uuid)} checkCanDeleteSubElement={(uuid) => true} />
                    
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