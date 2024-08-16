import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Typography, Grid, Box, Chip, Snackbar } from '@mui/material';
import { Alert } from "@mui/lab";
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import { decryptData, encryptData } from '../../../utils/index.jsx';
import Loader from '../../Loader';
import { BoxBckgr, ButtonAdd, ButtonContinue, TypographyStyled } from '../../general/mini_components';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { EnhancedTable } from "../../general/EnhancedTable";
import styled from 'styled-components';
import { yellow, green, blue, red, orange, purple, grey } from "@mui/material/colors";
import axios from '../../../utils/axios';
import { useHistory } from "react-router-dom";
import { deleteResearcher, getSharedResearchersService, saveResearcherPermissions } from '../../../services';

import SectionHeader from '../../../pages/components/SectionHeader';
import UserRoles from './UserRoles';
import { useSnackBarState } from "../../../hooks"
import { ALL_ROLES, USER_ROLES } from './user_roles';
import { ColourChip } from '../../general/mini_components-ts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const optionsPermissions = Object.keys(USER_ROLES).map(keyRole => {
    return {"label" : "investigation.share.roles."+keyRole, "value" :USER_ROLES[keyRole]}
})

const RESEARCHER_FORM = {
    "email":{
        required : true,
        type:"text",
        name:"email",
        label:"investigation.share.form.email",
        shortLabel: "investigation.share.form.email",
        validation : "validEmail"
    },
    "permissions":{
        required : true,
        type:"select",
        name:"permissions",
        label:"investigation.share.form.role",
        shortLabel: "investigation.share.form.role",
        validation : "notEmpty",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : "0"},
        options:optionsPermissions
    },
} 

export const PermissionChip = withLocalize((props) => {
    const role = permissionsToRole(props.value);
    let colour = grey[500];
    switch(role){
        case "MEDICAL_DIRECTOR":
            colour = orange[900];
            break;
        case "DOCTOR": 
            colour = orange[700];            
            break;
        case "SOCIAL": 
            colour = orange[700];             
            break;
        case "PRIVATE_DOCTOR": 
            colour = orange[100];            
            break;
        case "DEPARTMENT_HEAD": 
            colour = orange[100];            
            break;
        case "STUDENT":
            colour = orange[500];
            break;
        case "NURSE":
            colour = orange[100];
            break;
        case "NURSE_FW":
            colour = orange[100];
            break;
        case "NURSE_MANAGER":
            colour = yellow[900];
            break;
        case "CARE_GIVER": 
            colour = blue[900];
            break;
        case "BUSINESS_MANAGER": 
            colour = blue[900];
            break;
        case "ADMIN": 
            colour = blue[500];            
            break;
        case "BUSINESS_ASSISTANT": 
            colour = blue[300];            
            break;
        case "LAB_MANAGER": 
            colour = yellow[900];            
            break;
        case "LAB_ASSISTANT": 
            colour = yellow[500];            
            break;
        case "SHERWOOD_STAFF": 
            colour = green[500];            
            break;
        case "PHARMACY_MANAGER": 
            colour = red[900];            
            break;
        case "PHARMACY_ASSITANT": 
            colour = red[700];            
            break;
        case "MAJOR": 
            colour = red[500];            
            break;
        case "NO_PERMISSIONS": 
            colour = purple[500];            
            break;
        default:
            return <ColourChip rgbcolor={colour} label={props.translate("investigation.share.roles.NO_PERMISSIONS")} />
    }
    return <ColourChip rgbcolor={colour} label={props.translate("investigation.share.roles."+role)}/>
})

const StatusChip = withLocalize((props) => {
    switch(props.value.toString()){
        case "0":
            return <ColourChip size="small" rgbcolor={yellow[800]} label={props.translate("investigation.share.status.pending")} />
        case "1": 
            return <ColourChip size="small"rgbcolor={red[500]} label={props.translate("investigation.share.status.denied")} />
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

function ShareInvestigation(props) {
    
    const investigation = props.investigations.data && props.investigations.currentInvestigation ? props.investigations.currentInvestigation : null;
    const [error, setError] = useState(null);
    const [ addingResearcher, setAddingResearcher ] = useState(false);
    const [ newResearchers, setNewResearchers ] = useState(props.initialState && props.initialState.newResearchers ? props.initialState.newResearchers : []);
    const [ showModal, setShowModal] = useState(false);
    const [ sharedResearchers, setSharedResearchers] = useState([]);
    const [isLoadingShare, setIsLoadingShare] = useState(false);
    const [errorShare, setErrorShare] = useState(false);
    const [indexResearcherToEdit, setIndexResearcherToEdit] = useState(false);
    const [indexResearcherToDelete, setIndexResearcherToDelete] = useState(false);
    const [researcherToDelete, setResearcherToDelete] = useState([]);
    const [showingRoles, setShowingRoles] = useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const history = useHistory();
    
    function shareInvestigation(){
        setShowModal(true)
    }
    function resetModal(){
        console.log("Close modal2");
        setShowModal(false);
        setIndexResearcherToEdit(false);
        setAddingResearcher(false);
        setShowingRoles(false);
        setIndexResearcherToDelete(false)
    }
    async function sendInvitations(){
        setShowModal(false);
        setIsLoadingShare(true);
        try{
            // const keyInvestigation = await generateKey();
            // const testRawKeyInvestigation = encryptData(keyInvestigation, localStorage.getItem("rawKeyResearcher"));
            // console.log(testRawKeyInvestigation);

            const rawKeyInvestigation = decryptData(investigation.keyResearcherInvestigation, localStorage.getItem("rawKeyResearcher"));
            const researchersWithKeys = newResearchers.map(researcher => {
                researcher.keyResearcherInvestigation = encryptData(rawKeyInvestigation, import.meta.env.VITE_APP_DEFAULT_RESEARCH_PASSWORD);
                console.log(decryptData(researcher.keyResearcherInvestigation, import.meta.env.VITE_APP_DEFAULT_RESEARCH_PASSWORD));
                return researcher;
            })
     
            const postObject = {listResearchers:researchersWithKeys};
            const request = await axios.post(import.meta.env.VITE_APP_API_URL+'/researcher/investigation/'+props.investigations.currentInvestigation.uuid+'/share', postObject, { headers: {"Authorization" : localStorage.getItem("jwt")} })
            
            if(request.status === 200){
                setSharedResearchers(request.data.sharedResearchers);
                setNewResearchers([]);
                setShowSnackbar({show:true, message:"investigation.share.success", severity:"success"});
            }
            else{
                setShowSnackbar({show:true, message:"investigation.share.error.already_invited", severity:"error"});
            }
        }
        catch(error){
            console.log(error);
            setErrorShare(true);
        }
        setIsLoadingShare(false);
    }

    useEffect(()=>{
        async function getSharedResearchers(uuidInvestigation){
            setIsLoadingShare(true);
            const response = await getSharedResearchersService(uuidInvestigation);
            setSharedResearchers(response.sharedResearchers);
            setIsLoadingShare(false);
        }
        if(props.investigations.data && props.investigations.currentInvestigation){
            getSharedResearchers(props.investigations.currentInvestigation.uuid);
        }
    }, [props.investigations])
    
    function renderNewResearchers(){
        if(newResearchers.length === 0){
            return null;
        }
        else{
            return ([
                <Modal key="modal"
                    open={showModal}
                    closeModal={resetModal}
                    confirmAction={sendInvitations}
                    title={props.translate("investigation.share.confirm_dialog.title")}>
                        <Typography variant="body2" gutterBottom>
                            <Translate id="investigation.share.confirm_dialog.description" />
                        </Typography>
                    </Modal>,
                    <Grid container spacing={3} padding={3}>
                        <Grid item xs={12}>
                            <EnhancedTable titleTable={<Translate id="investigation.share.new_researchers" />}  noSelectable
                                    headCells={Object.keys(RESEARCHER_FORM).map(key => {
                                        return { id: key, alignment: "left", label: <Translate id={RESEARCHER_FORM[key].label} />}
                                    })}
                                    rows={newResearchers.map(researcher => {
                                        let tempSection = {}
                                        for(const keyField of Object.keys(RESEARCHER_FORM)){
                                            const field = RESEARCHER_FORM[keyField];
                                            if(field.type === "select"){
                                                tempSection[keyField] = <PermissionChip value={researcher.permissions}  />
                                            }
                                            else{
                                                tempSection[keyField] = researcher[keyField];
                                            }
                                        }
                                        return tempSection;
                                    })}
                                    // actions={[{"type" : "delete", "func" : (index) => removeResearcher(index)}]}
                                />
                        </Grid>
                        <Grid item xs={12} >
                            <ButtonContinue onClick={shareInvestigation} data-testid="submit" color="green" spaceright={1} >
                                <Translate id="investigation.share.share" />
                            </ButtonContinue>
                        </Grid>
                    </Grid>
            ]
            )
        }
    }
    function removeResearcher(index){
        const copyResearchers = [...newResearchers];
        copyResearchers.splice(index, 1); 
        setNewResearchers(copyResearchers);
        console.log("hey i there")
    }
    function addResearcher(researcher){
        resetModal();
        setNewResearchers(array => [...array, researcher]);
    }
    function renderPrevResearchers(){
        let content = null;
        if(sharedResearchers.length === 0){
            content = <Box mt={3}>
                            <TypographyStyled variant="body2" component="div" gutterBottom>
                                <Translate id="investigation.share.no_researchers_added" />
                            </TypographyStyled>
                        </Box>
        }
        else{
            const columnsTable = ["name", "status", "permissions"];
            const arrayHeader = columnsTable.map(col => {
                return { id: col, alignment: "left", label: <Translate id={`investigation.share.researcher.${col}`} /> }
            }) 
    
            content = <EnhancedTable noSelectable titleTable={<Translate id="investigation.share.current_researchers" />}  
                        headCells={arrayHeader}
                        rows={sharedResearchers.map((researcher, idx) => {
                            const name = researcher.name ? researcher.name+" "+researcher.surnames : researcher.email;

                            let row = {
                                    id:idx,
                                    name : name, 
                                    permissions : <PermissionChip value={researcher.permissions} />, 
                                    status : <StatusChip value={researcher.status}/>
                                }
                            
                            return row;
                        })}
                        actions={[{"type" : "edit" , "func" : (index) => editAResearcher(index)},
                            { "type": "delete", "check": (permissions) => permissions === sharedResearchers[index].permissions,
                            "func" : (index) => deleteAResearcher(index) }
                        ]} 
                        
        />
        }
        return (
            <Grid item  xs={12}>
                {content}
            </Grid>
        )
    }
    function renderModal(){
        let title;
        let modalProps = {};
        if(addingResearcher){
            title = props.translate("investigation.share.add_researcher");
        }
        else if(indexResearcherToEdit){
            title =  props.translate("investigation.share.edit_researcher");
        }
        else if(indexResearcherToDelete !== false){
            title =  props.translate("investigation.share.delete_researcher");
            modalProps = {
            confirmAction: handleDeleteResearcher,
            confirmButtonLabel: "general.delete",
            researcherToDelete: sharedResearchers[indexResearcherToDelete] 
        };
        }   
        else{
            title =  props.translate("investigation.share.info_roles");
           
        }
        
        return(
            <Modal key="modal" open={ showModal } 
                closeModal={resetModal}
                title={title}
                // confirmAction={handleDelete}
                // confirmAction={confirmAction}
                // confirmButtonLabel={confirmButtonLabel}
                {...modalProps}
                
                >
                    {
                        indexResearcherToEdit !== false &&
                        <Form fields={RESEARCHER_FORM} fullWidth callBackForm={editCallBack}
                            initialData={sharedResearchers[indexResearcherToEdit]} 
                            closeCallBack={resetModal}/>
                    }
                    {
                        
                        indexResearcherToDelete !== false &&
                        
                       <>
                    <Typography variant="body2" gutterBottom>
                        <Translate id="investigation.share.delete_Confirmation_user" />
                    </Typography>
                    
                </>      
                      
                    }
                    {
                        addingResearcher &&
                        <Form fields={RESEARCHER_FORM} fullWidth callBackForm={addResearcher} 
                            closeCallBack={resetModal}/>
                    }
                    {
                        showingRoles &&
                        <UserRoles />
                    }
            </Modal>
        )
    }

    async function handleDeleteResearcher() {
//        
            const response = await deleteResearcher(props.investigations.currentInvestigation.uuid,researcherToDelete.uuid);
            console.log("Response from delete user:", response);
            console.log("sharedResearchers",sharedResearchers)
            setSharedResearchers(prev => prev.filter((researcher) => researcher.uuid !== researcherToDelete.uuid));
            //filter by uuid
      
        resetModal();
    }
    // async function hideDeleteIcon(index) {
        
    // }

    async function deleteAResearcher(index) {
        console.log(`adasdasd ${sharedResearchers[index].name}`)

        console.log("Confirm to delete:", sharedResearchers[index]);
        const deleteResearcherUser = sharedResearchers[index];
        setIndexResearcherToDelete(true);//this state shows the delete buttons 
        setResearcherToDelete(deleteResearcherUser);
        setShowModal(true);
        //name of the researcher should be shown in modal
    }

    async function editCallBack(values){
        console.log("Datos nuevos de researcher", values);
        console.log("props ::", props);
        console.log("edit permision of users here check");
        const permissions = {"permissions" : [{
            uuidResearcher : sharedResearchers[indexResearcherToEdit].uuid,
            role : values["permissions"]
        
        }]}
        console.log("checking permissions", permissions)
        setIsLoadingShare(true);
        const response = await saveResearcherPermissions(props.investigations.currentInvestigation.uuid, permissions);
        setIsLoadingShare(false);
        let copySharedResearchers = [...sharedResearchers];
        copySharedResearchers[indexResearcherToEdit].permissions = response.sharedResearchers[0].permissions;
        setSharedResearchers(copySharedResearchers);
        resetModal()
    }


    function editAResearcher(index){
        
        console.log("index ::", index);
        console.log("confirm to edit", sharedResearchers[index]);
        let valuesForm = {};
        valuesForm["email"] = sharedResearchers[index]["email"];
        valuesForm["permissions"] = USER_ROLES[permissionsToRole(sharedResearchers[index]["permissions"])];
        console.log(valuesForm);
        setIndexResearcherToEdit(index);
        setShowModal(true);
    }
    function showInfo(){
        setShowingRoles(true);
        setShowModal(true);
    }

    if(props.investigations.loading || isLoadingShare){
        return <Loader />
    }
    return (
        <BoxBckgr color="text.primary" >
            <Helmet title={props.translate("investigation.share.title")} />
            {
                renderModal()
            }
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
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
            <Grid container spacing={3} padding={3}>
                <SectionHeader section="users" infoCallback={showInfo} />
                <Grid item container xs={12} spacing={3}>
                    <Grid item xs={12} >
                        <TypographyStyled gutterBottom variant="h5" component="h2">
                            { investigation.name }
                        </TypographyStyled>
                    </Grid>
                    {
                        renderPrevResearchers()
                    }
                    <Grid item xs={12} >
                        <TypographyStyled variant="body2" component="div" gutterBottom>
                            <Translate id="investigation.share.add_researcher" />
                            <ButtonAdd disabled={addingResearcher} 
                                type="button" data-testid="add_researcher" 
                                onClick={() => {
                                    setAddingResearcher(true);
                                    setShowModal(true);
                                }}></ButtonAdd>
                        </TypographyStyled>
                    </Grid>
                    {
                        renderNewResearchers()
                    }

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