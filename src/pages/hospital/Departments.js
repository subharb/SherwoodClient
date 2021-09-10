import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Card, CardContent, 
        Typography, Grid, Box, Chip, AppBar, Tabs, Tab, List, ListItem, ListItemText } from '@material-ui/core';
import { Alert, TabPanel } from "@material-ui/lab";
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import { decryptData, encryptData, generateKey } from '../../utils';
import Loader from '../../components/Loader';
import { BoxBckgr, ButtonAdd, ButtonContinue } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import Form from '../../components/general/form';
import { EnhancedTable } from "../../components/general/EnhancedTable";
import styled from 'styled-components';
import { yellow, green, blue, red, orange } from "@material-ui/core/colors";
import axios from '../../utils/axios';
import { useHistory } from "react-router-dom";
import { getSharedResearchersService, saveResearcherPermissions, getDepartmentsInstitution, getDepartmentsInstitutionService, saveDepartmentInstitutionService, assignDepartmentToResearcherService } from '../../services/sherwoodService';
import { ALL_ROLES, USER_ROLES } from '../../constants';
import { grayscale } from 'polished';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DEPARTMENT_FORM = {
    "name":{
        required : true,
        name:"name",
        type:"text",
        label:"investigation.share.researcher.name",
        shortLabel: "investigation.share.researcher.name",
        validation : "textMin2"
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

function ShareInvestigation(props) {
    
    const investigation = props.investigations.data && props.investigations.currentInvestigation ? props.investigations.currentInvestigation : null;
    const [error, setError] = useState(null);
    const [ addingDepartment, setAddingDepartment ] = useState(false);
    const [ newResearchers, setNewResearchers ] = useState(props.initialState && props.initialState.newResearchers ? props.initialState.newResearchers : []);
    const [showSendModal, setShowSendModal] = useState(false);
    const [ researchers, setResearchers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [tabSelector, setTabSelector] = useState(0);
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
    const [errorShare, setErrorShare] = useState(false);
    const [indexResearcherToEdit, setIndexResearcherToEdit] = useState(false);
    const [researcherToDelete, setResearcherToDelete] = useState(false);
    const history = useHistory();

    const CHANGE_DEPARTMENT_FORM = {
        "department":{
            required : true,
            type:"select",
            name:"department",
            label:"investigation.share.form.role",
            shortLabel: "investigation.share.form.role",
            validation : "notEmpty",
            defaultOption:{"text" : "investigation.create.edc.choose", "value" : "0"},
            options:departments.map(dep =>{
                return {"label" : dep.name, "value" :dep.uuid}
            })
        }
    }
    
    function shareInvestigation(){
        setShowSendModal(true)
    }
    function cancelShare(){
        setShowSendModal(false);
    }
    
    async function sendInvitations(){
        setShowSendModal(false);
        setIsLoadingDepartments(true);
        try{
            // const keyInvestigation = await generateKey();
            // const testRawKeyInvestigation = encryptData(keyInvestigation, localStorage.getItem("rawKeyResearcher"));
            // console.log(testRawKeyInvestigation);

            const rawKeyInvestigation = decryptData(investigation.keyResearcherInvestigation, localStorage.getItem("rawKeyResearcher"));
            const researchersWithKeys = newResearchers.map(researcher => {
                researcher.keyResearcherInvestigation = encryptData(rawKeyInvestigation, process.env.REACT_APP_DEFAULT_RESEARCH_PASSWORD);
                console.log(decryptData(researcher.keyResearcherInvestigation, process.env.REACT_APP_DEFAULT_RESEARCH_PASSWORD));
                return researcher;
            })
     
            const postObject = {listResearchers:researchersWithKeys};
            const request = await axios.post(process.env.REACT_APP_API_URL+'/researcher/investigation/'+props.investigations.currentInvestigation.uuid+'/share', postObject, { headers: {"Authorization" : localStorage.getItem("jwt")} })
            
            if(request.status === 200){
                console.log("Great");
                setResearchers(request.data.sharedResearchers);
                setNewResearchers([]);
            }
            else{
                setErrorShare(true);
            }
        }
        catch(error){
            console.log(error);
            setErrorShare(true);
        }
        setIsLoadingDepartments(false);
    }

    useEffect(()=>{
        async function getDepartmentsInstitution(uuidInstitution){
            setIsLoadingDepartments(true);
            const response = await getDepartmentsInstitutionService(uuidInstitution);
            setResearchers(response.researchers);
            setDepartments(response.departments)
            setIsLoadingDepartments(false);
        }
        if(props.investigations.data && props.investigations.currentInvestigation){
            getDepartmentsInstitution(props.investigations.currentInvestigation.institution.uuid);
        }
    }, [props.investigations])
    
    function removeResearcher(index){
        const copyResearchers = [...newResearchers];
        copyResearchers.splice(index, 1); 
        setNewResearchers(copyResearchers);
    }
    async function addDepartment(department){
        setAddingDepartment(false);
        setIsLoadingDepartments(true);
        const response = await saveDepartmentInstitutionService(props.investigations.currentInvestigation.institution.uuid, department);
        setIsLoadingDepartments(false);
        setDepartments((arr) =>arr.push(response.department));
    }
    function renderResearchers(){
        let content = null;
        if(researchers.length === 0){
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
    
            content = <EnhancedTable noSelectable titleTable={<Translate id="investigation.share.current_researchers" />}  
                        headCells={arrayHeader}
                        rows={researchers.map((researcher, idx) => {
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
                        actions={{"edit" : (index) => editAResearcher(index)}} 
        />
        }
        return (
            <Grid item  xs={12}>
                {content}
            </Grid>
        )
    }
    function deleteAResearcher(index){
        console.log("confirm to delete", researchers[index]);
    }
    async function editCallBack(values){
        console.log("Datos nuevos de researcher", values);
       
        setIsLoadingDepartments(true);
        const response = await assignDepartmentToResearcherService(researchers[indexResearcherToEdit].uuid, values.department);
        setIsLoadingDepartments(false);
        let copySharedResearchers = [...researchers];
        copySharedResearchers[indexResearcherToEdit].departments = response.departments;
        setResearchers(copySharedResearchers);
        setIndexResearcherToEdit(false);
    }
    function editAResearcher(index){
        console.log("confirm to edit", researchers[index]);
        let valuesForm = {};
        valuesForm["email"] = researchers[index]["email"];
        valuesForm["permissions"] = USER_ROLES[permissionsToRole(researchers[index]["permissions"])];
        console.log(valuesForm);
        setIndexResearcherToEdit(index);
    }
    function renderDepartments(){
        const columnsTable = ["department"];
            const arrayHeader = columnsTable.map(col => {
                return { id: col, alignment: "left", label: <Translate id={`investigation.share.researcher.department`} /> }
            }) 
            return (
                <div style={{width:'100%'}}>
                    {
                        departments.map(department => {
                            const researchersDepartment = researchers.filter(res => res.departments.find(dep => dep.name === department.name));
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
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    }
                    
                </div>
                
            )
            return <EnhancedTable noSelectable noHeader
                        headCells={arrayHeader}
                        rows={departments.map(dep => {return {department : dep.name}})} 
        />
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
    const handleChange = (event, newValue) => {
        setTabSelector(newValue);
    };
    if(props.investigations.loading || isLoadingDepartments){
        return <Loader />
    }
    else if(error || errorShare){
        return (
            <Alert mb={4} severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>
        );
    }
    return (
        <BoxBckgr color="text.primary" style={{color:"white"}}>
            <Helmet title={props.translate("investigation.share.title")} />
            <Modal key="modal" open={addingDepartment || (indexResearcherToEdit !== false)} 
                title={addingDepartment ? props.translate("hospital.departments.modal.title") : props.translate("investigation.share.edit_researcher")}>
                    {
                        indexResearcherToEdit !== false &&
                        <Form fields={CHANGE_DEPARTMENT_FORM} callBackForm={editCallBack}
                            initialData={researchers[indexResearcherToEdit]} 
                            closeCallBack={() => setIndexResearcherToEdit(false)}/>
                    }
                    {
                        addingDepartment &&
                        <Form fields={DEPARTMENT_FORM} callBackForm={addDepartment} 
                            closeCallBack={() => setAddingDepartment(false)}/>
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
                            onClick={() => setAddingDepartment(true)}></ButtonAdd>
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
                        
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabSelector} index={0} style={{width:'100%'}}>
                    {
                        renderResearchers()
                    }
                    </TabPanel>
                    <TabPanel value={tabSelector} index={1} style={{width:'100%'}}>
                    {
                        renderDepartments()
                    }
                    </TabPanel>
                    
                    
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}



const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations
    }
}

export default withLocalize(connect(mapStateToProps, null)(ShareInvestigation))