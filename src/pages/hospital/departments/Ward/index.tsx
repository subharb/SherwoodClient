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
import {rectSortingStrategy, SortableContext} from '@dnd-kit/sortable';
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
import { createBedAction, deleteBedAction, updateBedAction, updateOrderBedsAction } from '../../../../redux/actions/hospitalActions';
import { useDepartments } from '../../../../hooks';


interface Props {
    loading:boolean,
    ward:null | IWard,
    bedsProps:null | IBed[],
    edit:boolean,
    editCallBack : (bed:IBed) => void,
    deleteCallBack : (bed:IBed) => void,
    addCallBack : (bed:IBed) => void,
    saveOrderCallBack: (beds:IBed[]) => void
    
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
    async function addCallBack(bed:IBed) {
        if(ward){
            await(dispatch(createBedAction(investigations.currentInvestigation.institution.uuid, department?.uuid, ward.uuid, bed)))
        }
    }
    async function saveOrderCallBack(bedsReorder:IBed[]){
        console.log("Reorder",bedsReorder);
        if(ward){
            await(dispatch(updateOrderBedsAction(investigations.currentInvestigation.institution.uuid, department?.uuid, ward.uuid, bedsReorder)))
        }
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


    
    return <Ward loading={props.loading} edit={true} ward={ward} bedsProps={ward ? ward.beds : null}
                editCallBack={editCallBack} deleteCallBack={deleteCallBack} 
                saveOrderCallBack={saveOrderCallBack} addCallBack={addCallBack}
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

const Ward:React.FC<Props> = ({loading, bedsProps, ward, editCallBack, addCallBack, deleteCallBack, saveOrderCallBack}) => {
    const [isDropped, setIsDropped] = useState(false);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    
    const [reorder, setReorder] = useState(true);
    const [orderChanged, setOrderChanged] = useState(false);
    const [beds, setBeds] = useState<IBed[] | null>(null);
    const [draggedBedIndex, setDraggedBedIndex ] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [bedToEdit, setBedToEdit] = useState<IBed | null>(null);
    const [bedToDelete, setBedToDelete] = useState<IBed | null>(null);
    const [addingBed, setAddingBed] = useState(false);
    const [showNameError, setShowNameError] = useState(false);

    function checkNameBeds(bed:IBed){
        const foundBed = ward?.beds.find((aBed) => aBed.name === bed.name);
        if(foundBed){
            setShowNameError(true);
            return true;
        }

        return false;
    }
    function editCallBackForm(bed:IBed){
        if(!checkNameBeds(bed)){
            editCallBack(bed);
            resetModal();
        }
    }
    function addCallBackForm(bed:IBed){
        if(!checkNameBeds(bed)){
            addCallBack(bed);
            resetModal()
        }
    }
    function resetModal(){
        setShowModal(false);
        setBedToEdit(null);
        setBedToDelete(null);
        setAddingBed(false);
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
    function saveNewOrder(){
        if(beds){
            saveOrderCallBack(beds);
        }
        
    }
    function resetBeds(){
        console.log("Discard order")
        if(ward){
            setBeds(JSON.parse(JSON.stringify(bedsProps)));
        }
        setOrderChanged(false);
    }
    function orderUpdate(event:DragEndEvent){
        console.log("Drop the bomb", event);
        if(event && event.over && (event.over.id !== event.active.id)){
            if(beds){
                setDraggedBedIndex(-1);
                let bedsTemp = [...beds];
                bedsTemp[parseInt(event.active.id)].order = parseInt(event.over.id);
                bedsTemp[parseInt(event.over.id)].order = parseInt(event.active.id);
                setBeds(bedsTemp);
                setOrderChanged(true);
            }
            
        }
    }

    useEffect(() =>{
        resetBeds()
    }, [bedsProps]);
    if(loading || ward === null || beds === null){
        return <Loader />
    }
    else{
        const bedsSorted = beds.sort((a, b) => a.order - b.order);
        console.log(bedsProps);
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
                                externalError ={showNameError ? "hospital.ward.name-bed-error" : null}                           
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
                        {
                        orderChanged &&
                        <Grid item xs={12}>
                             <Typography variant="body2" gutterBottom>
                                <Translate id="hospital.ward.save-order" />
                             </Typography>
                             <ButtonCancel spaceright onClick={resetBeds}>
                                <Translate id="general.discard" />
                             </ButtonCancel>
                            <ButtonContinue onClick={() => saveOrderCallBack(beds)}>
                                <Translate id="general.save" />
                            </ButtonContinue>
                        </Grid>
                        }
                    </Grid>
                    {
                        !reorder && 
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
                    }
                    
                <DndContext 
                    sensors={sensors}
                    onDragStart={(event) => setDraggedBedIndex(parseInt(event.active.id))}
                    onDragEnd={orderUpdate}>
                    <SortableContext items={bedsSorted.map(bed => bed.order.toString())}
                        strategy={rectSortingStrategy}>
                        
                            {
                                bedsSorted.map((bed, index) => {
                                    if(reorder){
                                        return(
                                            <SortableItem
                                                key={index}
                                                id={index.toString()} >
                                                <BedButton name={bed.name} onClick={() => editBed(bed)}
                                                        type="edit" active={bed.active} deleteCallBack={(e:Event) => deleteBed(e, bed)}
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
                            
                    </SortableContext>
                    <DragOverlay adjustScale={true}>
                        {draggedBedIndex !== -1 ? (
                        <BedButton name={beds[draggedBedIndex].name} 
                            type="edit" active={beds[draggedBedIndex].active} 
                            gender={beds[draggedBedIndex].gender === 0 ? "male" : beds[draggedBedIndex].gender === 1 ? "female" : "any"} 
                        />) : null}
                    </DragOverlay>
                </DndContext>
            </Grid>
        </BoxBckgr>
        )
    }

}

export default Ward;