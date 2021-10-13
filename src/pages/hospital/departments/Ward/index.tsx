import { Avatar, Grid, List, ListItem, FormControlLabel, Switch, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';

import { BoxBckgr, ButtonAdd, ButtonCancel, ButtonContinue, IconPatient } from '../../../../components/general/mini_components';

import { useParams, useHistory } from 'react-router-dom';
import BedButton from '../../../../components/general/BedButton';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import Modal from '../../../../components/general/modal';
import Form from '../../../../components/general/form';
import {Droppable, Draggable, SortableItem} from '../../../../components/general/Draggable-Droppable';
import {SortableContext} from '@dnd-kit/sortable';
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
  } from "@dnd-kit/core";
import { useEffect } from 'react';
import { IBed, IDepartment, IWard } from '../../../../constants/types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { deleteBedAction, updateBedAction } from '../../../../redux/actions/hospitalActions';
import { useDepartments } from '../../../../hooks';


interface Props {
    loading:boolean,
    ward:null | IWard,
    edit:boolean,
    editCallBack : (bed:IBed) => void,
    deleteCallBack : (bed:IBed) => void,
    reorderCallBack : (fromIndex:number, toIndex:number) => void
    addCallBack : (bed:IBed) => void,
    
}

const BED_FORM = {
    "id" : {
        required : true,
        name:"name",
        type:"hidden",
        label:"hidden",
        shortLabel: "hidden",
        validation : "textMin2"
    },
    "name":{
        required : true,
        name:"name",
        type:"text",
        label:"hospital.ward.bed.name",
        shortLabel: "hospital.ward.bed.name",
        validation : "textMin2"
    },
    "gender":{
        required : true,
        name:"gender",
        type:"select",
        label:"hospital.ward.bed.genre",
        shortLabel: "hospital.ward.bed.genre",
        validation : "number",
        options:[
            {value:0, label:"general.male"},
            {value:1, label:"general.female"},
            {value:2, label:"general.any"},
        ]
    },
    "active":{
        required : false,
        name:"active",
        type:"checkbox",
        label:"hospital.ward.bed.active",
        shortLabel: "hospital.ward.bed.active",
        validation : "textMin2"
    },
}

interface PropsRouter extends LocalizeContextProps{
    departments:IDepartment[],
    investigations:any,
    loading:boolean
}

const WardRouter:React.FC<PropsRouter> = (props) => {
    const [ward, setWard] = useState<IWard | null>(null);
    const [department, setDepartment] = useState<IDepartment | null>(null);
    const {departments, investigations} = useDepartments();

    const dispatch = useDispatch();
    let { uuidWard } = useParams<{uuidWard?: string}>();
    
    async function editCallBack(bed:IBed){
        
        if(ward){
            await(dispatch(updateBedAction(investigations.currentInvestigation.institution.uuid, department?.uuid, ward.uuid, bed)))
        }        
    }
    async function deleteCallBack(bed:IBed){
        if(ward){
            await(dispatch(deleteBedAction(investigations.currentInvestigation.institution.uuid, department?.uuid, ward.uuid, bed)))
        }
    }
    function reorderCallBack(toIndex:number, fromIndex:number){
        console.log(toIndex, fromIndex);
    }
    
    
    useEffect(() => {
        if(departments.length > 0){
            for(let i = 0; i < departments.length; i++){
                const department = departments[i];
                const indexWard = department.wards.findIndex((ward:IWard) => ward.uuid === uuidWard);
                if(indexWard !== -1){
                    setWard(department.wards[indexWard]);
                    setDepartment(department);
                    return;
                }
            }
        }
    },[departments])


    
    return <Ward loading={props.loading} edit={true} ward={ward}
                editCallBack={editCallBack} deleteCallBack={deleteCallBack} 
                reorderCallBack={(a, b)=>reorderCallBack(a, b)} addCallBack={addCallBack}
                />
}   

const mapStateToProps = (state:any) =>{
    return {
        hospital : state.hospital,
        loading : state.hospital.loading || state.investigations.loading
    }
}

const WardLocalized = withLocalize(connect(mapStateToProps, null)(WardRouter));
export { WardLocalized };

const Ward:React.FC<Props> = ({loading, edit, ward, editCallBack, addCallBack, deleteCallBack, reorderCallBack}) => {
    const [isDropped, setIsDropped] = useState(false);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    
    const [reorder, setReorder] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bedToEdit, setBedToEdit] = useState<IBed | null>(null);
    const [bedToDelete, setBedToDelete] = useState<IBed | null>(null);
    const [addingBed, setAddingBed] = useState(false);

    function editCallBackForm(bed:IBed){
        
        editCallBack(bed);
        resetModal()
    }
    function addCallBackForm(bed:IBed){
        addCallBack(bed);
        resetModal()
    }
    function resetModal(){
        setShowModal(false);
        setBedToEdit(null);
        setBedToDelete(null);
    }
    function editBed(bed:IBed){
        setShowModal(true);
        setBedToEdit(bed);
    }
    function deleteBed(e:Event, bed:IBed){
        e.stopPropagation();
        setBedToDelete(bed);
        setShowModal(true);
    }
    function deleteCallBackForm(){
        if(bedToDelete){
            deleteCallBack(bedToDelete);
        }
        
        resetModal();
    }
    function orderUpdate(event:DragEndEvent){
        console.log("Drop the bomb", event);
        if(event && event.over){
            reorderCallBack(parseInt(event.active.id), parseInt(event.over.id));
        }
    }
    if(loading || ward === null){
        return <Loader />
    }
    else{
        const bedsSorted = ward.beds.sort((a, b) => a.order - b.order);
        return(
            <BoxBckgr color="text.primary" style={{padding:'1rem'}}>
                <Modal key="modal" open={showModal} closeModal={() => resetModal()}
                    title={bedToEdit ? <Translate id="hospital.ward.edit-bed" /> : addingBed ? <Translate id="hospital.ward.add-bed" /> : bedToDelete ? <Translate id="hospital.ward.delete-bed" /> : null}>
                        <div>
                        {
                            bedToEdit &&
                            <Form fields={BED_FORM} fullWidth callBackForm={editCallBackForm}
                                initialData={bedToEdit} 
                                closeCallBack={() => resetModal()}/>
                        }
                        {
                            addingBed &&
                            <Form fields={BED_FORM} fullWidth callBackForm={addCallBackForm}                                
                                closeCallBack={() => resetModal()}/>
                        }
                        {
                            bedToDelete &&
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        <Translate id="hospital.departments.delete-ward-prompt" />
                                    </Typography>
                                    <Typography variant="body2">
                                        {bedToDelete.name}
                                    </Typography> 
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                        <Translate id="general.cancel" />
                                    </ButtonCancel>
                                    <ButtonContinue onClick={deleteCallBackForm} data-testid="continue-modal" color="primary">
                                        <Translate id="general.continue" />
                                    </ButtonContinue>
                                </Grid>
                            </Grid>
                        }
                        </div>
                </Modal>
                <Typography variant="h3" gutterBottom display="inline" style={{color:"white"}}>
                    <Translate id="hospital.ward.title" />: {ward.name}
                </Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Switch
                                checked={reorder}
                                onChange={(e) => setReorder(e.target.checked)}
                                name="checkedA"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />}
                            label="Reorder or delete beds"
                        />  
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom display="inline">
                            <Translate id="hospital.ward.add-bed" />
                        </Typography>
                        <ButtonAdd disabled={addingBed} 
                            type="button" data-testid="add_researcher" 
                            onClick={() => {
                                setAddingBed(true);
                                setShowModal(true);
                            }} />
                    </Grid>
                <DndContext 
                    onDragEnd={orderUpdate}>
                    <SortableContext items={bedsSorted.map(bed => bed.order.toString())}>
                        <Droppable id="droppable">
                            {
                                bedsSorted.map((bed, index) => {
                                    if(reorder){
                                        return(
                                            <SortableItem
                                                key={index}
                                                id={index.toString()}>
                                                <BedButton name={bed.name} 
                                                    type="edit" active={bed.active}
                                                    gender={bed.gender === 0 ? "male" : bed.gender === 1 ? "female" : "any"} 
                                                />                                               
                                                </SortableItem>
                                        )
                                    }
                                    else{
                                        return(
                                        <BedButton name={bed.name} onClick={() => editBed(bed)}
                                            type="edit" active={bed.active} deleteCallBack={(e:Event) => deleteBed(e, bed)}
                                            gender={bed.gender === 0 ? "male" : bed.gender === 1 ? "female" : "any"} 
                                        /> 
                                        );
                                    }
                                })
                            } 
                            </Droppable>
                        </SortableContext>
                </DndContext>
            </Grid>
        </BoxBckgr>
        )
    }

}

export default Ward;