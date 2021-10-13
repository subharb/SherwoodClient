import { Avatar, Grid, List, ListItem, FormControlLabel, Switch, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';

import { BoxBckgr, ButtonCancel, ButtonContinue, IconPatient } from '../../../../components/general/mini_components';

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
import { connect } from 'react-redux';


interface Props {
    loading:boolean,
    ward:null | IWard,
    edit:boolean,
    editCallBack : (bed:IBed) => void,
    deleteCallBack : (bed:IBed) => void,
    reorderCallBack : (fromIndex:number, toIndex:number) => void
    
}

const BED_FORM = {
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
    loading:boolean
}

const WardRouter:React.FC<PropsRouter> = (props) => {
    const [ward, setWard] = useState<IWard | null>(null);

    let { uuidWard } = useParams<{uuidWard?: string}>();
    
    function editCallBack(bed:IBed){
        console.log(bed);
    }
    function deleteCallBack(bed:IBed){
        console.log(bed);
    }
    function reorderCallBack(toIndex:number, fromIndex:number){
        console.log(toIndex, fromIndex);
    }
    useEffect(() => {
        if(props.departments.length > 0){
            const allWards = props.departments.reduce((acc:IWard[], depar:IDepartment) => {
                acc = acc.concat(depar.wards);
                return acc;
            }, [])
            const findWard = allWards.find((ward:IWard) => ward.uuid === uuidWard);
            if(findWard){
                setWard(findWard);
            }
            
        }
    },[props.departments])
    return <Ward loading={props.loading} edit={true} ward={ward}
                editCallBack={editCallBack} deleteCallBack={deleteCallBack} 
                reorderCallBack={(a, b)=>reorderCallBack(a, b)}
                />
}   

const mapStateToProps = (state:any) =>{
    return {
        investigations : state.investigations,
        hospital : state.hospital,
        loading : state.hospital.loading || state.investigations.loading,
        departments : state.hospital.data ? state.hospital.data.departments : []
    }
}

const WardLocalized = withLocalize(connect(mapStateToProps, null)(WardRouter));
export { WardLocalized };

const Ward:React.FC<Props> = ({loading, edit, ward, editCallBack, deleteCallBack, reorderCallBack}) => {
    const [isDropped, setIsDropped] = useState(false);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    
    const [reorder, setReorder] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bedToEdit, setBedToEdit] = useState<IBed | null>(null);
    const [bedToDelete, setBedToDelete] = useState<IBed | null>(null);

    function editCallBackForm(bed:IBed){
        editCallBack(bed);
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
    function deleteCallBackForm(bed:IBed){
        deleteCallBack(bed);
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
                    title={<Translate id="hospital.ward.edit-bed" />}>
                        <div>
                        {
                            bedToEdit &&
                            <Form fields={BED_FORM} fullWidth callBackForm={editCallBackForm}
                                initialData={bedToEdit} 
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
                <FormControlLabel
                    control={<Switch
                        checked={reorder}
                        onChange={(e) => setReorder(e.target.checked)}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />}
                    label="Reorder or delete beds"
                />
                
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