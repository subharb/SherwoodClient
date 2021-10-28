import { Avatar, Grid, List, Snackbar, FormControlLabel, Switch, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader';

import { BoxBckgr, ButtonAdd, ButtonCancel, ButtonContinue, IconPatient } from '../../../../components/general/mini_components';

import { useParams, useHistory } from 'react-router-dom';
import { BedButtonEdit, BedButtonAssignBed, BedButtonViewPatient } from '../../../../components/general/BedButton';
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
import { IBed, IDepartment, IPatient, IWard } from '../../../../constants/types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createBedAction, createStayPatientAction, deleteBedAction, resetHospitalAction, updateBedAction, updateOrderBedsAction } from '../../../../redux/actions/hospitalActions';
import { useDepartments, useSnackBarState } from '../../../../hooks';
import { getWardService } from '../../../../services/sherwoodService';
import { Alert } from '@material-ui/lab';
import { HOSPITAL_PATIENT } from '../../../../routes';
import { sexNumberToString, yearsFromDate } from '../../../../utils';

export enum WardModes {
    Edit = "edit",
    AssignPatient = "assign-patient",
    View = "view"
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
    hospital:any,
    patients:any,
    mode : WardModes,
    loading:boolean
}

const WardRouter:React.FC<PropsRouter> = (props) => {
    const [ward, setWard] = useState<IWard | null>(null);
    const [uuidDepartment, setUuidDepartment] = useState<string | null>(null);
    const {departments, researchers} = useDepartments();
    const investigations = useSelector((state:any) => state.investigations);
    const [patient, setPatient] = useState<IPatient | undefined>(undefined);

    const dispatch = useDispatch();
    const history = useHistory();

    let { uuidWard } = useParams<{uuidWard?: string}>();
    let { uuidPatient } = useParams<{uuidPatient?: string}>();
    
    const mode = uuidPatient ? WardModes.AssignPatient : WardModes.Edit;

    function goToPatientHistory(){
        if(uuidPatient){
            history.push(HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient));
        }
    }
    function viewCallBack(uuidPatient:string){
        history.push(HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient));
    }
        
    async function editCallBack(bed:IBed){
        
        if(ward){
            await(dispatch(updateBedAction(investigations.currentInvestigation.institution.uuid, uuidDepartment, ward.uuid, bed)))
        }        
    }
    async function deleteCallBack(bed:IBed){
        if(ward){
            await(dispatch(deleteBedAction(investigations.currentInvestigation.institution.uuid, uuidDepartment, ward.uuid, bed)))
        }
    }
    async function addCallBack(bed:IBed) {
        if(ward){
            await(dispatch(createBedAction(investigations.currentInvestigation.institution.uuid, uuidDepartment, ward.uuid, bed)))
        }
    }
    async function saveOrderCallBack(bedsReorder:IBed[]){
        console.log("Reorder",bedsReorder);
        if(ward){
            await(dispatch(updateOrderBedsAction(investigations.currentInvestigation.institution.uuid, uuidDepartment, ward.uuid, bedsReorder)))
        }
    }

    async function assignBedPatientCallBack(bedAssigned:IBed){
        console.log("bedAssigned",bedAssigned);
        if(ward && patient){
            await(dispatch(createStayPatientAction(investigations.currentInvestigation.institution.uuid, uuidDepartment, ward.uuid, patient.uuid, bedAssigned.id)))
        }
    }
    
    function resetErrorHospital(){
        resetHospitalAction();
    }

    useEffect(() => {
        async function getWard(){
            if(!ward && investigations.data){
                const patient = props.patients.data[investigations.currentInvestigation.uuid].find((pat:IPatient) => pat.uuid === uuidPatient);
                setPatient(patient);
                const response = await(getWardService(investigations.currentInvestigation.institution.uuid, uuidWard))
                console.log(response);
                setWard(response.ward);
                setUuidDepartment(response.ward.department.uuid)
            }
        }
        getWard();
    },[investigations])

    useEffect(() => {
        if(departments.length > 0 && uuidDepartment){
            const ward = departments.find((depart:IDepartment) => depart.uuid === uuidDepartment).wards.find((ward:IWard) => ward.uuid === uuidWard);
            setWard(ward);
        }
        
    },[departments])    
    
    return <Ward loading={props.loading} error={props.hospital.error} mode={props.mode} ward={ward} 
                bedsProps={ward ? ward.beds : null} patient={patient} patients={props.patients.data ? props.patients.data[investigations.currentInvestigation.uuid] : []}
                editCallBack={editCallBack} deleteCallBack={deleteCallBack} 
                assignBedPatientCallBack = {assignBedPatientCallBack} resetErrorHospital={resetErrorHospital}
                saveOrderCallBack={saveOrderCallBack} addCallBack={addCallBack} goToPatientHistory={goToPatientHistory}
                viewCallBack={viewCallBack}
                />
}   

const mapStateToProps = (state:any) =>{
    return {
        hospital : state.hospital,
        patients: state.patients,
        loading : state.hospital.loading || state.investigations.loading
    }
}

const WardLocalized = withLocalize(connect(mapStateToProps, null)(WardRouter));
export { WardLocalized };


interface Props {
    loading:boolean,
    ward:null | IWard,
    error:number | null,
    bedsProps:null | IBed[],
    mode:WardModes,
    patient?:IPatient,
    patients?:IPatient[],
    editCallBack : (bed:IBed) => void,
    deleteCallBack : (bed:IBed) => void,
    addCallBack : (bed:IBed) => void,    
    saveOrderCallBack: (beds:IBed[]) => void,
    assignBedPatientCallBack ?: (bed:IBed) => void,
    resetErrorHospital: () => void,
    goToPatientHistory:() => void,
    viewCallBack:(uuidPatient:string) => void,
    
}

const Ward:React.FC<Props> = ({loading, bedsProps, ward, mode, patient, error, patients,
                        editCallBack, addCallBack, deleteCallBack, saveOrderCallBack, assignBedPatientCallBack, 
                        resetErrorHospital, goToPatientHistory, viewCallBack}) => {
    const [isDropped, setIsDropped] = useState(false);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const [showSnackbar, setShowSnackbar] = useSnackBarState();

    const [reorder, setReorder] = useState(false);
    const [orderChanged, setOrderChanged] = useState(false);
    const [beds, setBeds] = useState<IBed[]>([]);
    const [draggedBedIndex, setDraggedBedIndex ] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [bedToEdit, setBedToEdit] = useState<IBed | null>(null);
    const [bedToDelete, setBedToDelete] = useState<IBed | null>(null);
    const [bedToAssign, setBedToAssign] = useState<IBed | null>(null);
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

    function assignBedPatient(bed:IBed){
        console.log(bed);
        setBedToAssign(bed);
        setShowModal(true);
    }
    

    function assignBedPatientConfirm(){
        if(assignBedPatientCallBack && bedToAssign){
            assignBedPatientCallBack(bedToAssign);
        }
        
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
    function deleteBed(bed:IBed){
        
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
        if(ward && bedsProps){
            setBeds([...bedsProps]);
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
    function renderBedButton(bed:IBed){
        let buttonBed = null;
        switch(mode){
            case WardModes.AssignPatient:
                buttonBed = <BedButtonAssignBed name={bed.name} 
                                active={bed.active} 
                                stay={bed.stay} 
                                gender={sexNumberToString(bed.gender)} 
                                onClickCallBack={() => assignBedPatient(bed)}
                            /> 
            break;
            case WardModes.Edit:
                buttonBed = <BedButtonEdit name={bed.name} onClickCallBack={() => editBed(bed)}
                                active={bed.active} deleteCallBack={() => deleteBed(bed)}
                                gender={sexNumberToString(bed.gender)} 
                            /> 
            break;
            case WardModes.View:
                const currentPatient = bed.stay && patients ? patients.find((pat:IPatient) => pat.uuid === bed.stay.patientInvestigation.uuid) : null;
                const personalData = currentPatient ? currentPatient.personalData : null;
                const gender = personalData ? personalData.sex : sexNumberToString(bed.gender); 
                let stayDays = null;
                let ageYears = null;
                if(bed.stay){
                    var date1 = new Date(bed.stay.dateIn);
                    var date2 = new Date();
                    var Difference_In_Time = date2.getTime() - date1.getTime();
                    stayDays = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
            
                    ageYears = yearsFromDate(personalData?.birthdate)
                }
                
                buttonBed = <BedButtonViewPatient patient={personalData} gender={gender} 
                                active={bed.active} name={bed.name} stay={stayDays} age={ageYears}
                                onClickCallBack={currentPatient ? () => viewCallBack(currentPatient.uuid) : undefined}
                            />
            break;
        }
         return buttonBed;                           
    }
    function renderSettingControls(){
        if(mode === WardModes.Edit){
            return (
                <Grid container item xs={12}>
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
                </Grid>
                
            )
        }
        else if(mode === WardModes.AssignPatient){
            return(
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant="body2" >
                            Name:{ patient?.personalData.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Surnames:{ patient?.personalData.surnames}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom display="inline">
                            <Translate id="hospital.ward.select-bed" />
                        </Typography>
                    </Grid>
                    
                </Grid>
            )
        }
    }
    async function resetSnackBar(){
        setShowSnackbar({show:false});
        resetErrorHospital()
    }
    useEffect(()=>{
        if(bedToAssign && error){
            let messageSnackBar = "";
                switch(error){
                    case 1:
                        messageSnackBar = "hospital.ward.error.bed-not-exist";
                        break;
                    case 2:
                        messageSnackBar = "hospital.ward.error.bed-assigned";
                        break;
                    case 3:
                        messageSnackBar = "hospital.ward.error.patient-not-exist";
                        break;
                    case 4:
                        messageSnackBar = "hospital.ward.error.patient-already-hospitalized";
                        break;
                    default:
                        messageSnackBar = "hospital.ward.error.default"
                }
                    
                setShowSnackbar({show:true, severity: "error", message : messageSnackBar});
            
        }
        resetModal();
    }, [error])

    useEffect(() =>{
        
        if(bedToAssign && !error){
            setShowSnackbar({show:true, severity: "success", message : "hospital.ward.assign-bed-success"});
            setBedToAssign(null);
            goToPatientHistory()
        }
        resetBeds();
        resetModal();
    }, [bedsProps]);
    if(loading || ward === null || beds === null){
        return <Loader />
    }
    else{
        let bedsSorted = beds.sort((a, b) => a.order - b.order);
        if(mode === WardModes.AssignPatient){
            bedsSorted = bedsSorted.filter((bed) => bed.active === true);
        }
        console.log(bedsProps);
        
        return(
            <BoxBckgr color="text.primary" style={{padding:'1rem'}}>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open={showSnackbar.show}
                    autoHideDuration={2000}
                    onClose={resetSnackBar}>
                        <div>
                            {
                                (showSnackbar.message && showSnackbar.severity) &&
                                <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                    <Translate id={showSnackbar.message} />
                                </Alert>
                            }
                        </div>
                        
                        
                </Snackbar>
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
                        {
                            bedToAssign && 
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        <Translate id="hospital.ward.assign-bed-ward-prompt" />
                                    </Typography>
                                    <Typography variant="body2">
                                        {bedToAssign.name}
                                    </Typography> 
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                        <Translate id="general.cancel" />
                                    </ButtonCancel>
                                    <ButtonContinue onClick={assignBedPatientConfirm} data-testid="continue-modal" color="primary">
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
                    {
                        renderSettingControls()
                    }
                    
                <DndContext 
                    sensors={sensors}
                    onDragStart={(event) => setDraggedBedIndex(parseInt(event.active.id))}
                    onDragEnd={orderUpdate}>
                    <SortableContext items={bedsSorted.map(bed => bed.order.toString())}
                        strategy={rectSortingStrategy}>
                        
                            {
                                bedsSorted.map((bed, index) => {
                                    const bedButtonElement = renderBedButton(bed)
                                    if(reorder){
                                        return(
                                            <SortableItem
                                                key={index}
                                                id={index.toString()} >
                                                {
                                                    bedButtonElement
                                                }
                                                </SortableItem>
                                                
                                        )
                                    }
                                    else{
                                        return(bedButtonElement);
                                        
                                    }
                                })
                            } 
                            
                    </SortableContext>
                    <DragOverlay adjustScale={true}>
                        {draggedBedIndex !== -1 ? (
                        <BedButtonEdit name={beds[draggedBedIndex].name} 
                            active={beds[draggedBedIndex].active} deleteCallBack={() => console.log()}
                            gender={sexNumberToString(beds[draggedBedIndex].gender)} 
                        />) : null}
                    </DragOverlay>
                </DndContext>
            </Grid>
        </BoxBckgr>
        )
    }

}

export default Ward;