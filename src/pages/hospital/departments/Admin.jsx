import React, { useEffect, useMemo, useState } from 'react'
import * as types from "../../../constants";
import { connect, useDispatch } from 'react-redux';
import { Typography, Grid, Box, Alert, AppBar, Tabs, Tab, Snackbar } from '@mui/material';
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import Loader from '../../../components/Loader';
import { BoxBckgr, ButtonAdd, ButtonCancel, ButtonContinue, ButtonGrey, TypographyStyled } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Form from '../../../components/general/form';
import { EnhancedTable } from "../../../components/general/EnhancedTable";
import styled from 'styled-components';
import { yellow, green, red } from "@mui/material/colors";

import { useHistory } from "react-router-dom";
import { saveDepartmentAction, saveUpdateWardAction, assignUnitToResearcherAction, deleteWardAction, saveUnitAction, removeResearcherFromUnitAction, editDepartmentAction, deleteDepartmentAction, deleteUnitAction, editUnitAction } from '../../../redux/actions/hospitalActions';
import { useDepartments, useSnackBarState } from '../../../hooks';
import { HOSPITAL_WARD_ROUTE, HOSPITAL_WARD_SETTINGS_ROUTE } from '../../../routes/urls';
import { DepartmentAccordionModes, DepartmentsAccordion } from './DepartmentsAccordion';
import { FUNCTIONALITY } from '../../../constants/types';
import { a11yProps, TabPanel } from '../../components/Tabs';
import { ColourChip } from '../../../components/general/mini_components-ts';
import { ALL_ROLES, USER_ROLES } from '../../../components/investigation/share/user_roles';

const DEPARTMENT_FORM = {
    "uuid" : {
        required : false,
        name:"uuid",
        type:"hidden",
        label:"hospital.departments.forms.department.name",
        shortLabel: "hospital.departments.forms.department.name",
        validation : "textMin2"
    },
    "name":{
        required : true,
        name:"name",
        type:"text",
        label:"hospital.departments.forms.department.name",
        shortLabel: "hospital.departments.forms.department.name",
        validation : "textMin2"
    },
    "type":{
        required : true,
        name:"type",
        type:"select",
        label:"hospital.departments.forms.department.type",
        shortLabel: "hospital.departments.forms.department.type",
        options: [
            {
                value: "0",
                label: "hospital.departments.forms.types.medical"
            }, 
            {
                value: "1",
                label: "hospital.departments.forms.types.pharmacy"
            }, 
            {
                value: "2",
                label: "hospital.departments.forms.types.social"
            },
            {
                value: "3",
                label: "hospital.departments.forms.types.shoes"
            },
            {
                value: "4",
                label: "hospital.departments.forms.types.admin"
            }
        ]
    }
}

const UNIT_FORM = {
    "uuid" : {
        required : false,
        name:"uuid",
        type:"hidden",
        label:"hospital.departments.forms.department.name",
        shortLabel: "hospital.departments.forms.department.name",
        validation : "textMin2"
    },
    "name":{
        required : true,
        name:"name",
        type:"text",
        label:"hospital.departments.forms.unit.name",
        shortLabel: "hospital.departments.forms.unit.name",
        validation : "textMin2"
    }
}

const WARD_FORM = {
    "name":{
        required : true,
        name:"name",
        type:"text",
        label:"hospital.departments.forms.ward.name",
        shortLabel: "hospital.departments.forms.ward.name",
        validation : "textMin2"
    },
    "total":{
        required : true,
        name:"total",
        type:"text",
        label:"hospital.departments.forms.ward.beds",
        shortLabel: "hospital.departments.forms.ward.beds",
        validation : "number"
    },
    "male":{
        required : true,
        name:"male",
        type:"text",
        label:"hospital.departments.forms.ward.male",
        shortLabel: "hospital.departments.forms.ward.male",
        validation : "number"
    },
    "female":{
        required : true,
        name:"female",
        type:"text",
        label:"hospital.departments.forms.ward.female",
        shortLabel: "hospital.departments.forms.ward.female",
        validation : "number"
    }
}



const StatusChip = withLocalize((props) => {
    switch(props.value.toString()){
        case "0":
            return <ColourChip size="small" rgbcolor={yellow[500]} label={props.translate("investigation.share.status.pending")}/>
        case "1": 
            return <ColourChip size="small" rgbcolor={red[500]} label={props.translate("investigation.share.status.denied")} />
        default:
            return <ColourChip size="small" rgbcolor={green[500]} label={props.translate("investigation.share.status.accepted")} />
    }
    
})

function permissionsToRole(permissions){
    if(permissions.length === 0){
        return "NO_PERMISSIONS";
    }
    let roleFound = false;
    const keyRolesArray = Object.keys(ALL_ROLES);
    let index = 0;
    while(!roleFound && index < keyRolesArray.length){
        const keyRole = keyRolesArray[index];
        const rolePermissions = ALL_ROLES[keyRole];
        const containsAll = rolePermissions.every(arr2Item => permissions.includes(arr2Item)) && (rolePermissions.length === permissions.length)
        
        if(containsAll){
            return keyRole;
        }
        else{
            index++;
        }
    }
    
}

function DepartmentsRouter(props){
    const investigation = props.investigations.data && props.investigations.currentInvestigation ? props.investigations.currentInvestigation : null;
    const {departments, researchers} = useDepartments();

    const dispatch = useDispatch();
    const history = useHistory();

    async function editDepartmentCallBack(newDepartmentDetails){
        await dispatch(editDepartmentAction(props.investigations.currentInvestigation.uuid, newDepartmentDetails));
    }
    async function deleteDepartmentCallBack(newDepartmentDetails){
        await dispatch(deleteDepartmentAction(props.investigations.currentInvestigation.uuid, newDepartmentDetails));
    }
    async function saveDepartmentCallBack(department){
        await dispatch(saveDepartmentAction(props.investigations.currentInvestigation.uuid, department));
    }
    async function addWardCallBack(wardInfo, uuidDepartmentAddWard){
        await dispatch(saveUpdateWardAction(props.investigations.currentInvestigation.uuid, uuidDepartmentAddWard, wardInfo));
    }

    async function deleteUnitCallBack(uuidUnit){
        await dispatch(deleteUnitAction(props.investigations.currentInvestigation.uuid, uuidUnit));
    }
    async function editUnitCallBack(editingUnit){
        await dispatch(editUnitAction(props.investigations.currentInvestigation.uuid, editingUnit));
    }
    function settingsCallBack(ward){
        const nextUrl = HOSPITAL_WARD_SETTINGS_ROUTE.replace(":uuidWard", ward.uuid);
        history.push(nextUrl);
    }
    function viewWardCallBack(ward){
        const nextUrl = HOSPITAL_WARD_ROUTE.replace(":uuidWard", ward.uuid);
        history.push(nextUrl);
    }
    
    async function saveUnitCallBack(uuidDepartment, unit){       
        await dispatch(saveUnitAction(props.investigations.currentInvestigation.uuid, uuidDepartment, unit));
        
    }
    async function editCallBack(uuid, department){       
        await dispatch(assignUnitToResearcherAction(props.investigations.currentInvestigation.uuid, uuid, department));
    }
    async function deleteReseacherFromUnitCallBack(researcherUnitDelete){       
        await dispatch(removeResearcherFromUnitAction(props.investigations.currentInvestigation.uuid, researcherUnitDelete));
    }
    async function deleteWardCallBack(uuidDepartmentAddWard, wardToDelete){
        await dispatch(deleteWardAction(props.investigations.currentInvestigation.uuid, uuidDepartmentAddWard, wardToDelete.uuid));
    }
    async function resetError(){
        await dispatch({
            type:types.HOSPITAL_RESET_ERROR
        })
    }
    return <DepartmentLocalized admin={props.admin} investigation={investigation} loading={props.loading}
                departments={departments} researchers={researchers} hospitalError={props.hospital.error}
                saveDepartmentCallBack={saveDepartmentCallBack} 
                addWardCallBack={addWardCallBack} settingsCallBack={settingsCallBack}
                editCallBack={editCallBack} deleteWardCallBack={deleteWardCallBack}
                viewWardCallBack={viewWardCallBack} saveUnitCallBack={saveUnitCallBack}
                resetError={resetError} deleteReseacherFromUnitCallBack={deleteReseacherFromUnitCallBack}
                editDepartmentCallBack={editDepartmentCallBack} deleteDepartmentCallBack={deleteDepartmentCallBack}
                deleteUnitCallBack={deleteUnitCallBack} editUnitCallBack={editUnitCallBack}
            />
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        hospital : state.hospital,
        loading : state.hospital.loading || state.investigations.loading
    }
}

const CustomTab = styled(Tab)(({ theme }) => ({
    color: theme.palette.primary.color, // set the color using the primary color from the theme
    "&.MuiTab-textColorPrimary.Mui-selected": {
        color: theme.palette.primary.color,// set the color of the selected tab using the secondary color from the theme
    },
    selected: {},
    '&.PrivateTabIndicator-colorSecondary-144': {
        backgroundColor: theme.palette.primary.color, // set the color of the indicator using the secondary color from the theme
    },
  }));



export default connect(mapStateToProps, null)(DepartmentsRouter)

function Departments(props) {
    
    //const investigation = props.investigation.data && props.investigations.currentInvestigation ? props.investigations.currentInvestigation : null;
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [ addingDepartment, setAddingDepartment ] = useState(false);
    const [ editingDepartment, setEditingDepartment ] = useState(false);
    const [ deletingDepartment, setDeletingDepartment ] = useState(false);
    const [ changingResearcherUnit, setChangingResearcherUnit ] = useState(false);
    const [ uuidDepartmentAddWard, setUuidDepartmentAddWard ] = useState(false);
    const [ editingUnit, setEditingUnit ] = useState(false);
    const [ deletingUnit, setDeletingUnit ] = useState(false);
    const [ wardToEdit, setWardToEdit ] = useState(false);
    const [ wardToDelete, setWardToDelete ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ showOptions, setShowOptions ] = useState(false);
    const [ departmentToAddUnit, setDepartmentToAddUnit ] = useState(false);
    const [ confirmingDeleteUnitResearcher, setConfirmingDeleteUnitResearcher] = useState(false);

    //Sino es admin que salga el de in patients
    const [tabSelector, setTabSelector] = useState(props.admin ? 0 : 2);
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);

    const [indexResearcherToEdit, setIndexResearcherToEdit] = useState(false);


    const CHANGE_DEPARTMENT_FORM = useMemo(() => {
        if(!props.departments){
            return {}
        }
        else{
            return {
                "unit":{
                    required : true,
                    type:"select",
                    name:"unit",
                    label:"hospital.departments.forms.unit.name",
                    shortLabel:"hospital.departments.forms.unit.name",
                    validation : "notEmpty",
                    defaultOption:{"text" : "investigation.create.edc.choose", "value" : "0"},
                    options:props.departments.reduce((previousValue, dep) => {
                        const unitsInfo = dep.units.filter((unitF) => {
                            return (indexResearcherToEdit !== false && !props.researchers[indexResearcherToEdit].units.find((unitRes) => unitF.uuid === unitRes.uuid))
                        }).map(unit =>{
                                return {"label" : dep.name+" - "+unit.name, "value" :unit.uuid}
                        })
                        return [...previousValue, ...unitsInfo]
                    }, [])
            }
        }       
        }
    }, [props.departments, indexResearcherToEdit, props.researchers])

    const REMOVE_RESEARCHER_FORM = {
        "name":{
            required : true,
            name:"name",
            type:"hidden",
            label:props.translate("hospital.departments.forms.remove-researcher.confirm").replace("%X", confirmingDeleteUnitResearcher ? confirmingDeleteUnitResearcher.researcher.name+" "+confirmingDeleteUnitResearcher.researcher.surnames : ""),
            shortLabel: "hospital.departments.forms.unit.name",
            validation : "textMin2"
        }
    }
    
    async function addDepartment(department){
        resetModal();
        setIsLoadingDepartments(true);
        props.saveDepartmentCallBack(department)
    }

    function editDepartment(uuidDepartment){
        setEditingDepartment(uuidDepartment);
        setShowModal(true);
    }

    function deleteDepartment(department){
        setDeletingDepartment(department);
        setShowModal(true);
    }

    function deletedDepartment(){
        resetModal();
        props.deleteDepartmentCallBack(deletingDepartment);
    }

    function deletedUnit(){
        resetModal();
        props.deleteUnitCallBack(deletingUnit.uuid);
    }

    function editedDepartment(newDepartmentDetails){
        console.log(newDepartmentDetails)
        resetModal();
        setIsLoadingDepartments(true);
        props.editDepartmentCallBack(newDepartmentDetails);
    }

    function editedUnit(newUnitDetails){
        resetModal();
        setIsLoadingDepartments(true);
        props.editUnitCallBack(newUnitDetails);
    }

    function addWard(uuidDepartment){
        setUuidDepartmentAddWard(uuidDepartment);
        setShowModal(true);
    }

    function addWardCallBack(ward){
        const wardInfo = {
            name:ward.name,
            beds:{
                total: parseInt(ward.total),
                male: parseInt(ward.male),
                female: parseInt(ward.female),
                numerical : "numerical"
            }
        }
        if(wardToEdit){
            wardInfo.uuid = wardToEdit.uuid;
        }
        props.addWardCallBack(wardInfo, uuidDepartmentAddWard);
    }
    function editUnit(unit){
        setEditingUnit(unit);
        setShowModal(true);
    }
    async function editWard(ward, uuidDepartment, editWardCallBack){
        if(editWardCallBack === 0){
            setUuidDepartmentAddWard(uuidDepartment);
            setWardToEdit({
                name:ward.name,
                uuid:ward.uuid,
                total:ward.beds.length,
                male:ward.beds.filter(bed => bed.gender === 0).length,
                female:ward.beds.filter(bed => bed.gender === 1).length,
            });
            setShowModal(true);
        }
        else{
            setShowSnackbar({show:true, severity: "warning", message : "hospital.departments.no-edit-ward"});
        }
    }

    function handleDeleteFromUnit(unitResearcher){
        setShowModal(true);
        setConfirmingDeleteUnitResearcher(unitResearcher);
    }

    function deleteUnitConfirm(unit, hasResearchers){
        if(hasResearchers){
            setShowSnackbar({show:true, severity: "warning", message : "hospital.departments.errors.has-researchers"});
        }
        else{
            setDeletingUnit(unit);
            setShowModal(true);
        }
    }

    function deleteWardConfirm(ward, uuidDepartment){
        console.log("Borrar sala?");
        const hasPatients = ward.beds.reduce((acc, bed) => {
            return acc || bed.stays.filter((stay) => stay.dateOut === null).length > 0
        }, false)
        if(hasPatients){
          
            setShowSnackbar({show:true, severity: "warning", message : "hospital.ward.error.ward-patient-bed"});
        }
        else{
            setUuidDepartmentAddWard(uuidDepartment);
            setWardToDelete(ward);
            setShowModal(true);
        }        
    }

    async function changeResearcherUnit(values){
        console.log("Datos nuevos de researcher", values);
        setChangingResearcherUnit(true);
        props.editCallBack(props.researchers[indexResearcherToEdit].uuid, values.unit)
    }
    
    function renderResearchers(){
        let content = null;
        if(props.researchers.length === 0){
            content = <Box mt={3}>
                            <Typography variant="body2" component="div" gutterBottom>
                                <Translate id="investigation.share.no_researchers_added" />
                            </Typography>
                        </Box>
        }
        else{
            const columnsTable = ["name", "units"];
            const arrayHeader = columnsTable.map(col => {
                return { id: col, alignment: "left", label: <Translate id={`investigation.share.researcher.${col}`} /> }
            }) 
            const actions = (props.departments.length === 0) ? [] : [{"type" : "edit", "func" : (index) => editAResearcher(index) }];
            content = <EnhancedTable noSelectable titleTable={<Translate id="investigation.share.current_researchers" />}  
                        headCells={arrayHeader}
                        rows={props.researchers.map((researcher, idx) => {
                            const name = researcher.name ? researcher.name+" "+researcher.surnames : researcher.email;

                            let row = {
                                    id:idx,
                                    name : name, 
                                    units: researcher.units.map((unit, index) => {
                                        return <ColourChip size="small" rgbcolor={green[500]} onDelete={() => handleDeleteFromUnit({unit, researcher})} label={`${unit.department.name} - ${unit.name}`}/>
                                    }),
                                    status : <StatusChip value={researcher.status}/>
                                }
                            
                            return row;
                        })}
                        actions={actions} 
        />
        }
        return (
            <Grid item xs={12}>
                {content}
            </Grid>
        )
    }

    function editAResearcher(index){
        console.log("confirm to edit", props.researchers[index]);
        let valuesForm = {};
        valuesForm["email"] = props.researchers[index]["email"];
        valuesForm["permissions"] = USER_ROLES[permissionsToRole(props.researchers[index]["permissions"])];
        console.log(valuesForm);
        setIndexResearcherToEdit(index);
        setShowModal(true);
    }
    
    function addingUnit(uuidDepartment){
        setShowModal(true);
        setDepartmentToAddUnit(uuidDepartment);
    }

    function addUnit(unit){
        //setDepartmentToAddUnit(false);
        setIsLoadingDepartments(true);
        props.saveUnitCallBack(departmentToAddUnit, unit)
    }

    function renderContentModal(){
        if(wardToDelete){
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="div" gutterBottom>
                            <Translate id="hospital.departments.delete-ward-prompt" />
                        </Typography>
                        <Typography variant="body2" style={{fontWeight:'bold'}} component="div" gutterBottom>
                            {wardToDelete.name}
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:'1rem'}}>
                        <ButtonCancel onClick={resetModal} data-testid="cancel-modal"  spaceright={1}>
                            <Translate id="general.cancel" />
                        </ButtonCancel>
                        <ButtonContinue onClick={() => props.deleteWardCallBack(uuidDepartmentAddWard, wardToDelete)} data-testid="continue-modal" color="green">
                            <Translate id="general.continue" />
                        </ButtonContinue>
                    </Grid>
                </Grid>
            )
        }
        else if(indexResearcherToEdit !== false){
            return (
                <Form fields={CHANGE_DEPARTMENT_FORM} fullWidth callBackForm={changeResearcherUnit}
                    initialData={props.researchers[indexResearcherToEdit]} 
                    closeCallBack={() => resetModal()}/>
            )
        }
        else if(addingDepartment){
            return (
                <Form fields={DEPARTMENT_FORM} fullWidth callBackForm={addDepartment} 
                    closeCallBack={() => resetModal()}/>
            )
        }
        else if(editingDepartment){
            return (
                <Form fields={DEPARTMENT_FORM} fullWidth callBackForm={editedDepartment} 
                    initialData={editingDepartment}
                    closeCallBack={() => resetModal()}/>
            )
        }
        else if(editingUnit){
            return (
                <Form fields={UNIT_FORM} fullWidth callBackForm={editedUnit} 
                    initialData={editingUnit}
                    closeCallBack={() => resetModal()}/>
            )
        }
        else if(deletingDepartment){
            if(deletingDepartment.units.length > 0 || deletingDepartment.wards.length > 0){
                const question = props.translate("hospital.departments.forms.remove-department.cannot_remove");
                return(
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div" gutterBottom>
                                {question}
                            </Typography>                        
                        </Grid>
                            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                <Translate id="general.cancel" />
                            </ButtonCancel>
                        </Grid>
                    </Grid>
                )
            }
            else{
                const question = props.translate("hospital.departments.forms.remove-department.confirm").replace("%X", deletingDepartment.name);
                return(
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div" gutterBottom>
                                {question}
                            </Typography>                        
                        </Grid>
                            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                <Translate id="general.cancel" />
                            </ButtonCancel>
                            <ButtonContinue onClick={() => deletedDepartment(deletingDepartment)} data-testid="continue-modal" color="primary">
                                <Translate id="general.continue" />
                            </ButtonContinue>
                        </Grid>
                    </Grid>
                )
            }
        } 
        else if(deletingUnit){
            const question = props.translate("hospital.departments.forms.remove-unit.confirm").replace("%X", deletingUnit.name);
            return(
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="div" gutterBottom>
                            {question}
                        </Typography>                        
                    </Grid>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                        <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                            <Translate id="general.cancel" />
                        </ButtonCancel>
                        <ButtonContinue onClick={() => deletedUnit(deletingUnit)} data-testid="continue-modal" color="primary">
                            <Translate id="general.continue" />
                        </ButtonContinue>
                    </Grid>
                </Grid>
            )
        } 
        else if(confirmingDeleteUnitResearcher){
            const question = props.translate("hospital.departments.forms.remove-researcher.confirm").replace("%X", confirmingDeleteUnitResearcher ? confirmingDeleteUnitResearcher.researcher.name+" "+confirmingDeleteUnitResearcher.researcher.surnames : "").
                                replace("%Y", confirmingDeleteUnitResearcher.unit.name);
            return(
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="div" gutterBottom>
                            {question}
                        </Typography>                        
                    </Grid>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                        <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                            <Translate id="general.cancel" />
                        </ButtonCancel>
                        <ButtonContinue onClick={() => props.deleteReseacherFromUnitCallBack(confirmingDeleteUnitResearcher)} data-testid="continue-modal" color="primary">
                            <Translate id="general.continue" />
                        </ButtonContinue>
                    </Grid>
                </Grid>
            )
        }   
        else if(departmentToAddUnit){
            return (
                <Form fields={UNIT_FORM} fullWidth callBackForm={addUnit} 
                    closeCallBack={() => resetModal()}/>
            )
        }
        else if( (uuidDepartmentAddWard && !wardToDelete)){
            return (
                <Form fields={WARD_FORM} fullWidth callBackForm={addWardCallBack} 
                    initialData={wardToEdit}
                    closeCallBack={() => resetModal()}/>
            )
        }
        else if(showOptions){
            return (
                <Grid container spacing={3} style={{textAlign:"center"}}>
                    <Grid item xs={12}>
                        <ButtonGrey onClick={()=> {
                            setAddingDepartment(true);
                            setShowOptions(false);
                        }} data-testid="select-hospital" >Add Department</ButtonGrey>
                    </Grid>
                </Grid> 
            )
        }

        
    }
    function resetModal(){
        setDepartmentToAddUnit(false);
        setShowModal(false);
        setAddingDepartment(false);
        setIndexResearcherToEdit(false);
        setShowOptions(false);
        setUuidDepartmentAddWard(false);
        setWardToEdit(false);
        setWardToDelete(false);
        setChangingResearcherUnit(false);
        setEditingDepartment(false);
        setEditingUnit(false);
        setConfirmingDeleteUnitResearcher(false);
        setDeletingUnit(false);
        setDeletingDepartment(false);
    }
    
    async function resetSnackBar(){
        setShowSnackbar({show:false});
        props.resetError()
    }

    useEffect(()=>{
        if(wardToDelete || uuidDepartmentAddWard || addingDepartment || changingResearcherUnit || departmentToAddUnit || confirmingDeleteUnitResearcher){
            setShowSnackbar({show:true, severity: "success", message : "hospital.departments.action-success"});
        }
        setTimeout(() => {
            resetModal();
        }, 0);
    }, [props.departments, props.researchers])

    useEffect(()=>{
        if(props.hospitalError){
            let message;
            let severity;
            if(wardToEdit){
                switch(props.hospitalError){
                    case 4:
                        message = "hospital.departments.errors.ward-same-name";
                        severity = "warning";
                        break;
                    case 2:
                        message = "hospital.departments.errors.bad-configuration";
                        severity = "warning";
                        break;
                    default:
                        message = "register.researcher.error.general";
                        severity = "error";
                }
                
                
            }
            else if(wardToDelete){
                if(props.hospitalError === 400){
                    message = "hospital.ward.error.ward-patient-bed";
                    severity = "error";
                }
                else{
                    message = "register.researcher.error.general";
                    severity = "error";
                }
            }
            else{
                message = "register.researcher.error.general";
                severity = "error";
            }
            setTimeout(() => {
                resetModal();
            }, 0);
            setShowSnackbar({show:true, severity: severity, message : message});
        }
    }, [props.hospitalError])

    const handleChange = (event, newValue) => {
        setTabSelector(newValue);
    };
    if(!props.investigation || props.loading || !props.departments){
        return <Loader />
    }
    else if(!props.investigation.functionalities.includes(FUNCTIONALITY.HOSPITALIZATION) && !props.admin){
        return "No tiene nada que ver"
    }
    return (
        <BoxBckgr>
            <Helmet title={props.translate("investigation.share.title")} />
            <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    open={showSnackbar.show}
                    autoHideDuration={2000}
                    onClose={resetSnackBar}>
                        {
                            showSnackbar.message && 
                            <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                        
                </Snackbar>
            <Modal key="modal" open={showModal} closeModal={() => resetModal()}
                title={addingDepartment ? props.translate("hospital.departments.modal.title") : indexResearcherToEdit !== false  ? props.translate("investigation.share.edit_researcher") : wardToDelete ? props.translate("pages.hospital.confirm-patient.title") : uuidDepartmentAddWard ? props.translate("hospital.departments.forms.ward.title") : props.translate("hospital.departments.modal.title")}>
                    {
                        renderContentModal()
                    }
            </Modal>
            <Grid container padding={2}>
                <Grid container item xs={12} justifyContent="space-between" >
                    <Grid item xs={6} >
                        <TypographyStyled variant="h3" gutterBottom display="inline">
                            <Translate id="hospital.departments.title" />
                        </TypographyStyled>
                        {
                            props.admin &&
                            <ButtonAdd disabled={addingDepartment} style={{marginLeft:'0.5rem'}}
                                color="primary"
                                type="button" data-testid="add_researcher" 
                                onClick={() => {
                                    setShowModal(true);
                                    setAddingDepartment(true);
                                }} />
                        }
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3}>
                    <Grid item xs={12} >
                        <TypographyStyled gutterBottom variant="h5" component="h2">
                            { props.investigation.name }
                        </TypographyStyled>
                    </Grid>
                    {
                        props.departments.length > 0 &&

                        
                            <Tabs textColor="primary" indicatorColor="primary" value={tabSelector} onChange={handleChange} aria-label="simple tabs example">
                            { 
                                props.admin &&
                                [
                                    <CustomTab  label={<Translate id="hospital.departments.users" />} {...a11yProps(0)} />,
                                    <CustomTab label={<Translate id="hospital.departments.departments" />} {...a11yProps(1)} />
                                ]
                                
                            }
                            {
                                props.investigation.functionalities.includes(FUNCTIONALITY.HOSPITALIZATION) &&
                                <CustomTab label={<Translate id="hospital.departments.inpatients" />} {...a11yProps(1)} />
                            }
                            </Tabs>
                        
                    }
                    {
                        (!props.admin && props.departments.length === 0) &&
                        <Grid item xs={12} >
                            <Translate id="hospital.departments.no-my-departments" />    
                        </Grid>
                        
                    }
                    {
                        props.admin &&
                        <React.Fragment>
                            <TabPanel value={tabSelector} index={0} style={{width:'100%'}}>
                            {
                                renderResearchers()
                            }
                            </TabPanel>
                            <TabPanel value={tabSelector} index={1} style={{width:'100%'}}>
                                <DepartmentsAccordion mode={DepartmentAccordionModes.Researchers } researchers={props.researchers}
                                    departments={props.departments} uuidDepartmentAddWard={uuidDepartmentAddWard}
                                    permissions={props.investigation.permissions} addUnitCallBack={(uuidDepartment)=>addingUnit(uuidDepartment)}
                                    editDepartmentCallBack={editDepartment} deleteDepartmentCallBack={deleteDepartment}
                                    editUnitCallBack={editUnit} deleteUnitCallBack={deleteUnitConfirm}
                                />
                            </TabPanel>
                        </React.Fragment>
                    }
                    
                    <TabPanel value={tabSelector} index={2} style={{width:'100%'}}>
                        <DepartmentsAccordion mode={ props.admin ? DepartmentAccordionModes.Wards : DepartmentAccordionModes.WardSelection} researchers={props.researchers}
                            departments={props.departments.filter((department)=> department.type === 0)} uuidDepartmentAddWard={uuidDepartmentAddWard}
                            permissions={props.investigation.permissions} 
                            editWardCallBack={editWard} deleteWardConfirmCallBack={deleteWardConfirm}
                            addWardCallBack={props.admin ? addWard : null} settingsWardCallBack={props.settingsCallBack}
                            viewWardCallBack={props.viewWardCallBack} selectWardCallBack={props.viewWardCallBack}
                            />
                    </TabPanel>
                    
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}

export const DepartmentLocalized = withLocalize(Departments);


