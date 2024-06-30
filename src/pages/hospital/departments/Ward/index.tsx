import { Avatar, Grid, List, Snackbar, FormControlLabel, Switch, Typography } from '@mui/material';
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
import { createBedAction, createStayPatientAction, deleteBedAction, resetHospitalAction, transferPatientAction, updateBedAction, updateOrderBedsAction } from '../../../../redux/actions/hospitalActions';
import { useDepartments, useSnackBarState } from '../../../../hooks';
import { getWardService } from '../../../../services';
import { Alert } from '@mui/material';
import { HOSPITAL_PATIENT } from '../../../../routes/urls';
import { patientFullName, sexNumberToString, yearsFromDate } from '../../../../utils/index.jsx';
import FormTSFunc, { FormValues } from '../../../../components/general/formTSFunction';
import TransferWardForm from './TransferWardForm';

export enum WardModes {
    Edit = "edit",
    AssignPatient = "assign-patient",
    View = "view"
}

export const BedButtonModes = {
    ...WardModes,
    Consult : "Consult"
};

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
        validation : "notEmpty"
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

interface PropsRouter extends LocalizeContextProps {
    departments:IDepartment[],
    investigations:any,
    hospital:any,
    patients:any,
    mode : WardModes,
    loading:boolean,
    admin:boolean
}

const WardRouter:React.FC<PropsRouter> = (props) => {
    const [ward, setWard] = useState<IWard | null>(null);
    const [uuidDepartment, setUuidDepartment] = useState<string | null>(null);
    const {departments, researchers} = useDepartments();
    const [department, setDepartment] = useState<IDepartment | null>(null);
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
            await(dispatch(updateBedAction(investigations.currentInvestigation.uuid, uuidDepartment, ward.uuid, bed)))
        }        
    }
    async function deleteCallBack(bed:IBed){
        if(ward){
            await(dispatch(deleteBedAction(investigations.currentInvestigation.uuid, uuidDepartment, ward.uuid, bed)))
        }
    }
    async function addCallBack(bed:IBed) {
        if(ward){
            await(dispatch(createBedAction(investigations.currentInvestigation.uuid, uuidDepartment, ward.uuid, bed)))
        }
    }
    async function saveOrderCallBack(bedsReorder:IBed[]){
        console.log("Reorder",bedsReorder);
        if(ward){
            await(dispatch(updateOrderBedsAction(investigations.currentInvestigation.uuid, uuidDepartment, ward.uuid, bedsReorder)))
        }
    }

    async function assignBedPatientCallBack(bedAssigned:IBed){
        console.log("bedAssigned",bedAssigned);
        if(ward && patient){
            await(dispatch(createStayPatientAction(investigations.currentInvestigation.uuid, uuidDepartment, ward.uuid, patient.uuid, bedAssigned.id)))
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
                const response = await(getWardService(investigations.currentInvestigation.uuid, uuidWard))
                console.log(response);
                setWard(response.ward);
                setUuidDepartment(response.ward.department.uuid)
            }
        }
        getWard();
    },[investigations])

    useEffect(() => {
        if(departments && departments.length > 0 && uuidDepartment){
            const department = departments.find((depart:IDepartment) => depart.uuid === uuidDepartment);
            if(department){
                const ward = department.wards.find((ward:IWard) => ward.uuid === uuidWard);
                if(ward){
                    setWard(ward);
                }
                setDepartment(department);
            }
        }
        
    },[departments])    
    
    return <Ward loading={props.loading} error={props.hospital.error} mode={props.mode} ward={ward} 
                departments={departments} department = {department}
                bedsProps={ward ? ward.beds : null} patient={patient} patients={props.patients.data ? props.patients.data[investigations.currentInvestigation.uuid] : []}
                editCallBack={editCallBack} deleteCallBack={deleteCallBack} 
                assignBedPatientCallBack = {assignBedPatientCallBack} resetErrorHospital={resetErrorHospital}
                saveOrderCallBack={saveOrderCallBack} addCallBack={addCallBack} goToPatientHistory={goToPatientHistory}
                viewCallBack={viewCallBack} translate={props.translate}
            />
}

const mapStateToProps = (state:any) =>{
    return {
        hospital : state.hospital,
        patients: state.patients,
        loading : state.hospital.loading || state.investigations.loading
    }
}

const WardRouterLocalized = withLocalize(connect(mapStateToProps, null)(WardRouter));
export { WardRouterLocalized };


interface Props extends LocalizeContextProps{
    loading:boolean,
    ward:null | IWard,
    error:number | null,
    bedsProps:null | IBed[],
    mode:WardModes,
    patient?:IPatient,
    patients?:IPatient[],
    inModule?:boolean,
    departments:IDepartment[],
    department:IDepartment | null,
    editCallBack ?: (bed:IBed) => void,
    deleteCallBack ?: (bed:IBed) => void,
    addCallBack ?: (bed:IBed) => void,    
    saveOrderCallBack ?: (beds:IBed[]) => void,
    assignBedPatientCallBack ?: (bed:IBed) => void,
    resetErrorHospital?: () => void,
    goToPatientHistory?:() => void,
    viewCallBack?:(uuidPatient:string) => void,
    transferPatientCallBack?:(uuidCurrentDepartment:string, uuidCurrentWard:string, idCurrentBed:number, uuidDepartmentDestination:string, uuidWardDestination:string, uuidPatient:string) => void
}

interface PropsView extends Omit<Props, "editCallBack" | "deleteCallBack" | "addCallBack"  | "saveOrderCallBack" | "assignBedPatientCallBack" | "saveOrderCallBack" >{
    
}


enum ModalAction{
    ASSIGNED_BED_PATIENT = "ASSIGNED_BED_PATIENT",
    DELETE_BED = "DELETE_BED",
    EDIT_BED = "EDIT_BED",
    ERROR_DELETE_BED = "ERROR_DELETE_BED",
    ADD_BED = "ADD_BED",
    TRANSFER_PATIENT = "TRANSFER_PATIENT"
}

export const WardView :React.FC<PropsView> = (props) => <WardLocalized {...props} mode={WardModes.View} />


const Ward:React.FC<Props> = ({loading, bedsProps, ward, mode, patient, error, patients, inModule, departments,
                        department,
                        editCallBack, addCallBack, deleteCallBack, saveOrderCallBack, assignBedPatientCallBack, 
                        resetErrorHospital, goToPatientHistory, viewCallBack, transferPatientCallBack}) => {
    const [isDropped, setIsDropped] = useState(false);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const [showSnackbar, setShowSnackbar] = useSnackBarState();

    const [reorder, setReorder] = useState(false);
    const [orderChanged, setOrderChanged] = useState(false);
    const [beds, setBeds] = useState<IBed[]>([]);
    const [draggedBedIndex, setDraggedBedIndex ] = useState(-1);
    const [showModal, setShowModal] = React.useState<{show:boolean, action?:ModalAction}>({show:false});

    const [bedToEdit, setBedToEdit] = useState<IBed | null>(null);
    const [bedToDelete, setBedToDelete] = useState<IBed | null>(null);
    const [bedFromTransfer, setBedFromTransfer] = useState<IBed | null>(null);
    const [patientToTransfer, setPatientToTransfer ] = useState<IPatient | null>(null);
    const [bedToAssign, setBedToAssign] = useState<IBed | null>(null);
    const [addingBed, setAddingBed] = useState(false);
    const [showNameError, setShowNameError] = useState(false);

    function checkNameBeds(bed:IBed){
        const foundBed = ward?.beds.find((aBed, i) => (aBed.name === bed.name && typeof bed.id === undefined) || (aBed.name === bed.name && bed.id !== aBed.id));
        if(foundBed){
            setShowNameError(true);
            return true;
        }

        return false;
    }

    function assignBedPatient(bed:IBed){
        console.log(bed);
        setBedToAssign(bed);
        setShowModal({show:true, action:ModalAction.ASSIGNED_BED_PATIENT});
    }
    

    function assignBedPatientConfirm(){
        if(assignBedPatientCallBack && bedToAssign){
            assignBedPatientCallBack(bedToAssign);
        }
        
    }
    function editCallBackForm(bed:FormValues){
        const convertedBed: IBed = {
            id: bed.id as number,
            name: bed.name as string,
            gender: bed.gender as number,
            active: bed.active as boolean,
            order: bed.order as number,
        };
    
        if (!checkNameBeds(convertedBed) && editCallBack) {
            editCallBack(convertedBed);
        }
        
    }
    function addCallBackForm(bed:FormValues){
        const convertedBed: IBed = {
            id: bed.id as number,
            name: bed.name as string,
            gender: bed.gender as number,
            active: bed.active as boolean,
            order: bed.order as number,
        };
        if(!checkNameBeds(convertedBed) && addCallBack){
            addCallBack(convertedBed);
            resetModal()
        }
    }

    function resetModal(){
        console.log("Reset modal");
        setShowModal({show:false});
        setBedToEdit(null);
        setBedToDelete(null);
        setAddingBed(false);
    }
    function editBed(bed:IBed){
        if(bed.stays.length === 0){
            setShowModal({show:true, action:ModalAction.EDIT_BED});
            setBedToEdit(bed);
        }
        else{
            setShowSnackbar({show:true, severity: "warning", message : "hospital.ward.error.bed-edit-assigned"});
        }
    }
    function deleteBed(bed:IBed){
        if(bed.stays.filter((stay:any) => stay.dateOut === null).length === 0){
            setBedToDelete(bed);
            setShowModal({show:true, action:ModalAction.DELETE_BED});
        }
        else{
            setShowSnackbar({show:true, severity: "warning", message : "hospital.ward.error.delete_busy_bed"});
        }
        
    }

    function transferPatient(uuidPatient:string, currentBed:IBed){
        console.log("Transfer patient", uuidPatient);
        const patientToTransfer = patients!.find((pat:IPatient) => pat.uuid === uuidPatient);
        if(patientToTransfer){
            setPatientToTransfer(patientToTransfer);
            setShowModal({show:true, action:ModalAction.TRANSFER_PATIENT});
            setBedFromTransfer(currentBed);
        }

    }

    function deleteCallBackForm(){
        if(bedToDelete && deleteCallBack){
            deleteCallBack(bedToDelete);
        }
    }
    function saveNewOrder(){
        if(beds && saveOrderCallBack){
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
        const liveStays = bed.stays.filter((stay:any) => stay.dateOut === null);
        const currentStay = liveStays.length > 0 ? liveStays[0] : null;
        const currentPatient = currentStay && patients ? patients.find((pat:IPatient) => pat.uuid === currentStay.patientInvestigation.uuid) : null;
        const personalData = currentPatient ? currentPatient.personalData : null;
        const gender = personalData ? personalData.sex : sexNumberToString(bed.gender); 
                
        let stayDays = undefined;
        let ageYears = null;
        let hasStay:boolean = false;
        let sex = "";
        if(currentStay){
            var date1 = new Date(currentStay.dateIn);
            var date2 = new Date();
            var Difference_In_Time = date2.getTime() - date1.getTime();
            stayDays = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
            hasStay = true;
            ageYears = yearsFromDate(personalData?.birthdate);
            sex = personalData!.sex;
        }
        switch(mode){
            case WardModes.AssignPatient:
                buttonBed = <BedButtonAssignBed name={bed.name} 
                                patient={personalData}
                                active={bed.active} 
                                showPersonalData={hasStay}
                                stayDays={stayDays}
                                gender={sex} 
                                onClickCallBack={() => assignBedPatient(bed)}
                            /> 
            break;
            case WardModes.Edit:
                buttonBed = <BedButtonEdit name={bed.name} onClickCallBack={() => editBed(bed)}
                                active={bed.active} deleteCallBack={() => deleteBed(bed)}
                                gender={sexNumberToString(bed.gender)} showPersonalData={hasStay} patient={personalData}
                            /> 
            break;
            case WardModes.View:
                buttonBed = <BedButtonViewPatient patient={personalData} gender={gender} showPersonalData={hasStay}
                                active={bed.active} name={bed.name} stayDays={stayDays} age={ageYears}
                                onTransferCallBack={ (currentPatient && transferPatient) ? () => transferPatient(currentPatient.uuid, bed) : undefined}
                                onClickCallBack={(  currentPatient && viewCallBack) ? () => viewCallBack(currentPatient.uuid) : undefined}
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
                            label={<Translate id="hospital.ward.reorder" />}
                        />  
                        {
                        (orderChanged && saveOrderCallBack) &&
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
                                    setShowModal({show:true, action:ModalAction.ADD_BED})}} />
                            
                        </Grid>
                    }
                </Grid>
                
            )
        }
        else if(mode === WardModes.AssignPatient){
            return(
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        {
                            patient?.personalData.health_id && 
                            <Typography variant="body2" >
                                <Translate id="investigation.create.personal_data.fields.health_id" />:{ patient?.personalData.health_id}
                            </Typography>
                        }
                        {
                            !patient?.personalData.health_id && 
                            <Typography variant="body2" >
                                <Translate id="investigation.create.personal_data.fields.uuid" />:{ patient?.id}
                            </Typography>
                        }
                        <Typography variant="body2" >
                            <Translate id="investigation.create.personal_data.fields.name" />:{ patient?.personalData.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            <Translate id="investigation.create.personal_data.fields.surnames" />:{ patient?.personalData.surnames}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            <Translate id="investigation.create.personal_data.fields.sex" />:{ patient?.personalData.sex}
                        </Typography>
                        <Typography variant="body2">
                            <Translate id="hospital.analytics.graphs.age.table-title" />: {yearsFromDate(patient?.personalData.birthdate)}    
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
        if(resetErrorHospital){
            resetErrorHospital()
        }
        
    }
    useEffect(()=>{
        if(error){
            let messageSnackBar = "";
            if(bedToAssign){
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
            }
            else if(bedToDelete){
                switch(error){
                    case 1:
                        messageSnackBar = "hospital.ward.error.bed_is_busy";
                        break;
                    default:
                        messageSnackBar = "hospital.ward.error.default"
                }                
            }
            setShowSnackbar({show:true, severity: "error", message : messageSnackBar});
            resetModal();
        }
        
        
    }, [error])

    useEffect(() =>{
        
        if(bedToAssign && !error){
            setShowSnackbar({show:true, severity: "success", message : "hospital.ward.assign-bed-success"});
            setBedToAssign(null);
            if(goToPatientHistory){
                goToPatientHistory()
            } 
        }
        else if(bedToEdit && !error){
            setShowSnackbar({show:true, severity: "success", message : "hospital.ward.bed-update-success"});
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
        
        const bedsList = bedsSorted.map((bed, index) => {
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
   
        return(
            <BoxBckgr style={{padding:'1rem' }} defaultStyles={inModule} >
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
                <Modal key="modal" open={showModal.show} closeModal={() => resetModal()}
                    title={bedToEdit ? <Translate id="hospital.ward.edit-bed" /> : addingBed ? <Translate id="hospital.ward.add-bed" /> : bedToDelete ? <Translate id="hospital.ward.delete-bed" /> : null}>
                        <div>
                        {
                            bedToEdit &&
                            <FormTSFunc fields={BED_FORM} fullWidth callBackForm={editCallBackForm}
                                initialData={bedToEdit ? {...bedToEdit} as FormValues : undefined}
                                closeCallBack={() => resetModal()}/>
                        }
                        {
                            addingBed &&
                            <FormTSFunc fields={BED_FORM} fullWidth callBackForm={addCallBackForm}   
                                externalError ={showNameError ? "hospital.ward.error.name-bed-error" : undefined}                           
                                closeCallBack={() => resetModal()}/>
                        }
                        {
                            bedToDelete &&
                            <Grid container >
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        <Translate id="hospital.ward.delete-bed-prompt" />
                                    </Typography>
                                    <Typography variant="body2">
                                        {bedToDelete.name}
                                    </Typography> 
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="red" spaceright={1}>
                                        <Translate id="general.cancel" />
                                    </ButtonCancel>
                                    &nbsp;
                                    <ButtonContinue onClick={deleteCallBackForm} data-testid="continue-modal" color="green">
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
                                    &nbsp;
                                    <ButtonContinue onClick={assignBedPatientConfirm} data-testid="continue-modal" color="green">
                                        <Translate id="general.continue" />
                                    </ButtonContinue>
                                </Grid>
                            </Grid>
                        }
                        {
                            patientToTransfer && 
                            <TransferWardForm departments={departments} currentWard={ward.uuid!}
                                patientToTransfer = {patientToTransfer} currentDepartment={department!.uuid!}
                                resetModal={resetModal} 
                                transferWardConfirm={(uuidDepartmentDestination, uuidWardDestination) => {
                                    console.log("uuidDepartmentDestination", uuidDepartmentDestination);
                                    console.log("uuidWardDestination", uuidWardDestination);
                                    console.log("uuidCurrentDepartment", department!.uuid);
                                    console.log("patientToTransfer!.uuid", patientToTransfer!.uuid);
                                    transferPatientCallBack(department!.uuid!, ward.uuid!, bedFromTransfer!.id, uuidDepartmentDestination, uuidWardDestination, patientToTransfer!.uuid)
                                }} />
                        }
                        </div>
                </Modal>
                
                {
                    !inModule &&
                    <Typography variant="h3" gutterBottom display="inline">
                        {ward.name}
                    </Typography>
                }
        
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
                                bedsList
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
const WardLocalized = withLocalize(Ward);
export default WardLocalized;