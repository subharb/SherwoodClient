import React, { useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import Form from '../../../components/general/form';
import { ButtonAdd } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import { IAgenda, IBox, IDepartment, IResearcher } from '../../../constants/types';


interface EditProps extends LocalizeContextProps {
    departments: IDepartment[],
    boxes: IBox[],
    researchers: IResearcher[],
    services: any[],
}

const EditOutpatientsLocalized: React.FC<EditProps> = ({ departments, researchers, services, translate }) => {
    const [addBox, setAddBox] = React.useState(false);
    const [addAgenda, setAddAgenda] = React.useState(false);
    const [modalInfo, setModalInfo] = React.useState({showModal: false, type:""});
    const [boxes, setBoxes] = React.useState<IBox[]>([]);
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
            departmentOptions.unshift({label: "pages.hospital.outpatients.box.no_department", value: ""})
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
                    label:"",
                },
                "department":{
                    required : true,
                    type:"select",
                    name:"department",
                    label:"pages.hospital.outpatients.box.select_department",
                    shortLabel:"pages.hospital.outpatients.box.select_department",
                    validation : "notEmpty",
                    defaultOption:{"text" : "investigation.create.edc.choose", "value" : "0"},
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
    }
    function saveAgenda(agenda:IAgenda){
        console.log(agenda);
    }

    function resetModal(){
        setModalInfo({showModal: false, type:""});
    }
    function renderModal(){
        const title = modalInfo.type === "box" ? translate("pages.hospital.outpatients.box.create") : translate("pages.hospital.outpatients.agenda.create");
        return(
            <Modal key="modal" medium size="sm" open={modalInfo.showModal} title={title} closeModal={() => resetModal()}>
                <>
                {
                    modalInfo.type === "box" && 
                    <Form fields={CREATE_BOX_FORM} fullWidth callBackForm={saveBox}
                        initialData={{}} 
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
    function renderCore(){
        if(boxes.length === 0){
            return (
                <>
                    Add your first box: <ButtonAdd onClick={()=>setModalInfo({showModal:true, type:"box"})} />
                    Agenda : <ButtonAdd disable={boxes.length === 0} onClick={()=>setModalInfo({showModal:true, type:"agenda"})}  />
                </>
            );
        }
        return (
            <>
                Box: <ButtonAdd onClick={()=>setAddBox(true)} />
                Agenda : <ButtonAdd disable={boxes.length === 0} onClick={()=>setModalInfo({showModal:true, type:"agenda"})}  />
            </>
        );
    }

    return (
        <>
            {renderCore()}
            {renderModal()}
        </>
    );
};
const EditOutpatients = withLocalize(EditOutpatientsLocalized)
export default EditOutpatients;
