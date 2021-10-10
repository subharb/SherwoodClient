import React, { useEffect, useState } from 'react'
import * as types from "../../constants";
import { connect, useDispatch } from 'react-redux';
import { Card, CardContent, 
        Typography, Grid, Box, Chip, AppBar, Tabs, Tab, List, ListItem, ListItemText, Snackbar, Button } from '@material-ui/core';
import { Alert, TabPanel } from "@material-ui/lab";
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import { decryptData, encryptData, generateKey } from '../../utils';
import Loader from '../../components/Loader';
import { BoxBckgr, ButtonAdd, ButtonCancel, ButtonContinue, ButtonGrey } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import Form from '../../components/general/form';
import { EnhancedTable } from "../../components/general/EnhancedTable";
import styled from 'styled-components';
import { yellow, green, blue, red, orange } from "@material-ui/core/colors";
import { ALL_ROLES, USER_ROLES } from '../../constants';
import { useHistory } from "react-router-dom";


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WardForm from './departments/Ward/WardForm';
import { saveDepartmentAction, saveUpdateWardAction, getDepartmentsInstitutionAction, assignDepartmentToResearcherAction, deleteWardAction } from '../../redux/actions/hospitalActions';
import { useSnackBarState } from '../../hooks';

const DEPARTMENT_FORM = {
    "name":{
        required : true,
        name:"name",
        type:"text",
        label:"hospital.departments.forms.department.name",
        shortLabel: "hospital.departments.forms.department.name",
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


export const ColourChip = styled(Chip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;



const StatusChip = withLocalize((props) => {
    switch(props.value.toString()){
        case "0":
            return <ColourChip size="small" label={props.translate("investigation.share.status.pending")} rgbcolor={yellow[500]} />
        case "1": 
            return <ColourChip size="small" label={props.translate("investigation.share.status.denied")} rgbcolor={red[500]} />
        default:
            return <ColourChip size="small" label={props.translate("investigation.share.status.accepted")} rgbcolor={green[500]} />
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

function Departments(props) {
    
    const investigation = props.investigations.data && props.investigations.currentInvestigation ? props.investigations.currentInvestigation : null;
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [ addingDepartment, setAddingDepartment ] = useState(false);
    const [ uuidDepartmentAddWard, setUuidDepartmentAddWard ] = useState(false);
    const [ wardToEdit, setWardToEdit ] = useState(false);
    const [ wardToDelete, setWardToDelete ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const [ showOptions, setShowOptions ] = useState(false);
    const [ newResearchers, setNewResearchers ] = useState(props.initialState && props.initialState.newResearchers ? props.initialState.newResearchers : []);

    
    const [tabSelector, setTabSelector] = useState(0);
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
    const [errorShare, setErrorShare] = useState(false);
    const [indexResearcherToEdit, setIndexResearcherToEdit] = useState(false);

    const dispatch = useDispatch();
    
    const history = useHistory();

    const CHANGE_DEPARTMENT_FORM = {
        "department":{
            required : true,
            type:"select",
            name:"department",
            label:"hospital.departments.department",
            shortLabel: "hospital.departments.department",
            validation : "notEmpty",
            defaultOption:{"text" : "investigation.create.edc.choose", "value" : "0"},
            options:props.departments.map(dep =>{
                return {"label" : dep.name, "value" :dep.uuid}
            })
        }
    }
    
    async function addDepartment(department){
        setAddingDepartment(false);
        setIsLoadingDepartments(true);
        await dispatch(saveDepartmentAction(props.investigations.currentInvestigation.institution.uuid, department));

    }
    async function addWard(ward){
        
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
        await dispatch(saveUpdateWardAction(props.investigations.currentInvestigation.institution.uuid, uuidDepartmentAddWard, wardInfo));
    }

    async function editWard(ward, uuidDepartment){
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

    function deleteWardConfirm(ward, uuidDepartment){
        setUuidDepartmentAddWard(uuidDepartment);
        setWardToDelete(ward);
        setShowModal(true);
    }

    async function deleteWard(){
        await dispatch(deleteWardAction(props.investigations.currentInvestigation.institution.uuid, uuidDepartmentAddWard, wardToDelete.uuid));
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
            const columnsTable = ["name", "department"];
            const arrayHeader = columnsTable.map(col => {
                return { id: col, alignment: "left", label: <Translate id={`investigation.share.researcher.${col}`} /> }
            }) 
            const actions = (props.departments.length === 0) ? null : {"edit" : (index) => editAResearcher(index)}
            content = <EnhancedTable noSelectable titleTable={<Translate id="investigation.share.current_researchers" />}  
                        headCells={arrayHeader}
                        rows={props.researchers.map((researcher, idx) => {
                            const name = researcher.name ? researcher.name+" "+researcher.surnames : researcher.email;

                            let row = {
                                    id:idx,
                                    name : name, 
                                    department: researcher.departments.map((dep, index) => {
                                        if(index === 0){
                                            return dep.name
                                        }
                                        return ", "+dep.name
                                    }),
                                    status : <StatusChip value={researcher.status}/>
                                }
                            
                            return row;
                        })}
                        actions={actions} 
        />
        }
        return (
            <Grid item  xs={12}>
                {content}
            </Grid>
        )
    }

    async function editCallBack(values){
        console.log("Datos nuevos de researcher", values);
       
        await dispatch(assignDepartmentToResearcherAction(props.researchers[indexResearcherToEdit].uuid, values.department));
        
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
    function renderDepartment(department, type){
        if(type === "departments"){
            const researchersDepartment = props.researchers.filter(res => res.departments.find(dep => dep.name === department.name));
            return (
                <List component="nav" aria-label="main mailbox folders">
                {
                    (researchersDepartment.length > 0)&& 
                    researchersDepartment.map(res => {
                        return(
                            <ListItem button>
                                <ListItemText primary={`${res.name} ${res.surnames}`} />
                            </ListItem>
                        )
                    })
                }
                {
                    (researchersDepartment.length === 0)&& 
                    <ListItem button>
                        <ListItemText primary={<Translate id="hospital.departments.no-doctors"></Translate>} />
                    </ListItem>
                }
                </List>
                )
        }
        else{
            const AddWardButton = <ButtonAdd disabled={uuidDepartmentAddWard} 
                                type="button" data-testid="add_researcher" 
                                onClick={() => {
                                    setUuidDepartmentAddWard(department.uuid);
                                    setShowModal(true);
                                }}></ButtonAdd>
            if(department.wards.length === 0){
                return [
                    AddWardButton,
                    <ListItemText primary={<Translate id="hospital.departments.no-wards"></Translate>} />
                ]
            }
            else{
                const wardsDepartment = department.wards.map((ward, index) => {
                    const bedsInfo = {
                        total:ward.beds.length,
                        male:ward.beds.filter(bed => bed.gender === 0).length,
                        female:ward.beds.filter(bed => bed.gender === 1).length
                    }
                    return (<WardForm name={ward.name} beds={bedsInfo} 
                                editCallBack = {() => editWard(ward, department.uuid)}
                                deleteCallBack = {() => deleteWardConfirm(ward, department.uuid)}
                                />)
                })
                return [
                    AddWardButton,
                    wardsDepartment
                ]
                
            }
        }   
        
    }
    function renderDepartments(type){
       
        return (
            <div style={{width:'100%'}}>
                
                {
                    props.departments.length > 0 &&
                    props.departments.sort((a,b) => a.name.localeCompare(b.name)).map(department => {
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography >{ department.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                        {
                                            renderDepartment(department, type)
                                        }
                                    
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
                {
                    props.departments.length === 0 &&
                    <Translate id="hospital.departments.no-departments" />
                }
                
            </div>
                
            )
            
    }
    function resetModal(){
        setShowModal(false);
        setAddingDepartment(false);
        setIndexResearcherToEdit(false);
        setShowOptions(false);
        setUuidDepartmentAddWard(false);
        setWardToEdit(false);
        setWardToDelete(false);
    }
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box p={3}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
    async function resetSnackBar(){
        setShowSnackbar({show:false});
        await dispatch({
            type:types.HOSPITAL_RESET_ERROR
        })
    }
    useEffect(()=>{
        if(wardToDelete || wardToEdit || addingDepartment){
            setShowSnackbar({show:true, severity: "success", message : "hospital.departments.action-success"});
        }
        resetModal();
    }, [props.departments, props.researchers])

    useEffect(()=>{
        if(props.hospital.error){
            let message;
            let severity;
            if(wardToEdit){
                switch(props.hospital.error){
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
                message = "register.researcher.error.general";
                severity = "error";
            }
            else{
                message = "register.researcher.error.general";
                severity = "error";
            }
            setShowSnackbar({show:true, severity: severity, message : message});
        }
    }, [props.hospital.error])
    
    useEffect(()=>{
        async function getDepartments(uuidInstitution){
            await dispatch(
                getDepartmentsInstitutionAction(uuidInstitution)
            ); 
        }
        if(props.investigations.data && props.investigations.currentInvestigation){
            getDepartments(props.investigations.currentInvestigation.institution.uuid)
        }
    }, [props.investigations])

    const handleChange = (event, newValue) => {
        setTabSelector(newValue);
    };
    if(!props.investigations.data || props.loading){
        return <Loader />
    }
    return (
        <BoxBckgr color="text.primary" style={{color:"white"}}>
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
                        wardToDelete &&
                        <Grid container>
                             <Grid item xs={12}>
                                <Typography variant="h6" component="div" gutterBottom>
                                    <Translate id="hospital.departments.delete-ward-prompt" />
                                </Typography>
                                <span style={{fontWeight:'bold'}}>{wardToDelete.name}</span>
                             </Grid>
                             <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                    <Translate id="general.cancel" />
                                </ButtonCancel>
                                <ButtonContinue onClick={deleteWard} data-testid="continue-modal" color="primary">
                                    <Translate id="general.continue" />
                                </ButtonContinue>
                            </Grid>
                        </Grid>
                    }
                    {
                        indexResearcherToEdit !== false &&
                        <Form fields={CHANGE_DEPARTMENT_FORM} fullWidth callBackForm={editCallBack}
                            initialData={props.researchers[indexResearcherToEdit]} 
                            closeCallBack={() => resetModal()}/>
                    }
                    {
                        addingDepartment &&
                        <Form fields={DEPARTMENT_FORM} fullWidth callBackForm={addDepartment} 
                            closeCallBack={() => resetModal()}/>
                    }

                    {
                        (uuidDepartmentAddWard && !wardToDelete) &&
                        <Form fields={WARD_FORM} fullWidth callBackForm={addWard} 
                            initialData={wardToEdit}
                            closeCallBack={() => resetModal()}/>
                    }
                    {
                        showOptions &&
                        <Grid container spacing={3} style={{textAlign:"center"}}>
                            <Grid item xs={12}>
                                <ButtonGrey onClick={()=> {
                                    setAddingDepartment(true);
                                    setShowOptions(false);
                                }} data-testid="select-hospital" >Add Department</ButtonGrey>
                            </Grid>
                        </Grid>                        
                    }
            </Modal>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid item xs={6} >
                        <Typography variant="h3" gutterBottom display="inline">
                            <Translate id="hospital.departments.title" />
                        </Typography>
                        <ButtonAdd disabled={addingDepartment} 
                            type="button" data-testid="add_researcher" 
                            onClick={() => {
                                setShowModal(true);
                                setShowOptions(true)
                            }}></ButtonAdd>
                    </Grid>
                </Grid>
                <Grid item container xs={12} spacing={3}>
                    <Grid item xs={12} >
                        <Typography gutterBottom variant="h5" component="h2">
                            { investigation.name }
                        </Typography>
                    </Grid>
                    <AppBar position="static">
                        <Tabs value={tabSelector} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Users" {...a11yProps(0)} />
                        <Tab label="Departments" {...a11yProps(1)} />
                        <Tab label="In Patients" {...a11yProps(1)} />
                        
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabSelector} index={0} style={{width:'100%'}}>
                    {
                        renderResearchers()
                    }
                    </TabPanel>
                    <TabPanel value={tabSelector} index={1} style={{width:'100%'}}>
                    {
                        renderDepartments("departments")
                    }
                    </TabPanel>
                    <TabPanel value={tabSelector} index={2} style={{width:'100%'}}>
                    {
                        renderDepartments("wards")
                    }
                    </TabPanel>
                    
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}



const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        hospital : state.hospital,
        loading : state.hospital.loading || state.investigations.loading,
        departments : state.hospital.data ? state.hospital.data.departments : [],
        researchers : state.hospital.data ? state.hospital.data.researchers : [],
    }
}

export default withLocalize(connect(mapStateToProps, null)(Departments))