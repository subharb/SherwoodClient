import React, { useEffect, useState } from 'react'
import { SIGN_IN_ROUTE } from '../../../routes';
import { connect } from 'react-redux';
import { Card, CardContent, 
        Typography, Grid, Box, Chip } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import { decryptData, encryptData, generateKey } from '../../../utils';
import Loader from '../../Loader';
import { BoxBckgr, ButtonAdd, ButtonContinue } from '../../general/mini_components';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { EnhancedTable } from "../../general/EnhancedTable";
import styled from 'styled-components';
import { yellow, green, blue, red, orange } from "@material-ui/core/colors";
import axios from '../../../utils/axios';
import { useHistory } from "react-router-dom";
import { getSharedResearchersService, saveResearcherPermissions } from '../../../services/sherwoodService';
import { ALL_ROLES, USER_ROLES } from '../../../constants';
import { grayscale } from 'polished';


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

export const ColourChip = styled(Chip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

export const PermissionChip = withLocalize((props) => {
    const role = permissionsToRole(props.value);
    let colour = null;
    switch(role){
        case "MEDICAL_DIRECTOR":
            colour = orange[900];
            break;
        case "DOCTOR": 
            colour = orange[700];            
            break;
        case "PRIVATE_DOCTOR": 
            colour = orange[100];            
            break;
        case "STUDENT":
            colour = orange[500];
            break;
        case "NURSE":
            colour = orange[100];
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
        case "NO_PERMISSIONS": 
            colour = red[500];            
            break;
        default:
            return <ColourChip size="small" label={props.translate("investigation.share.roles.no-permissions")} rgbcolor={colour} />
    }
    return <ColourChip size="small" label={props.translate("investigation.share.roles."+role)} rgbcolor={colour} />
})

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
    const [ addingResearcher, setAddingResearcher ] = useState(false);
    const [ newResearchers, setNewResearchers ] = useState(props.initialState && props.initialState.newResearchers ? props.initialState.newResearchers : []);
    const [showSendModal, setShowSendModal] = useState(false);
    const [ sharedResearchers, setSharedResearchers] = useState([]);
    const [isLoadingShare, setIsLoadingShare] = useState(false);
    const [errorShare, setErrorShare] = useState(false);
    const [indexResearcherToEdit, setIndexResearcherToEdit] = useState(false);
    const [researcherToDelete, setResearcherToDelete] = useState(false);
    const history = useHistory();
    
    function shareInvestigation(){
        setShowSendModal(true)
    }
    function cancelShare(){
        setShowSendModal(false);
    }
    
    async function sendInvitations(){
        setShowSendModal(false);
        setIsLoadingShare(true);
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
                setSharedResearchers(request.data.sharedResearchers);
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
                    open={showSendModal}
                    closeModal={cancelShare}
                    confirmAction={sendInvitations}
                    title={props.translate("investigation.share.confirm_dialog.title")}>
                        <Typography variant="body2" gutterBottom>
                            <Translate id="investigation.share.confirm_dialog.description" />
                        </Typography>
                    </Modal>,
                    <Grid container spacing={3}>
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
                                    actions={[{"type" : "delete", "func" : (index) => removeResearcher(index)}]}
                                />
                        </Grid>
                        <Grid item xs={12} >
                            <ButtonContinue onClick={shareInvestigation} data-testid="submit" spaceright={1} >
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
    }
    function addResearcher(researcher){
        setAddingResearcher(false);
        setNewResearchers(array => [...array, researcher]);
    }
    function renderPrevResearchers(){
        let content = null;
        if(sharedResearchers.length === 0){
            content = <Box mt={3}>
                            <Typography variant="body2" component="div" gutterBottom>
                                <Translate id="investigation.share.no_researchers_added" />
                            </Typography>
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
                        actions={[{"type" : "edit" , "func" : (index) => editAResearcher(index)}]} 
        />
        }
        return (
            <Grid item  xs={12}>
                {content}
            </Grid>
        )
    }
    function deleteAResearcher(index){
        console.log("confirm to delete", sharedResearchers[index]);
    }
    async function editCallBack(values){
        console.log("Datos nuevos de researcher", values);
        const permissions = {"permissions" : [{
            uuidResearcher : sharedResearchers[indexResearcherToEdit].uuid,
            role : values["permissions"]
        }]}
        setIsLoadingShare(true);
        const response = await saveResearcherPermissions(props.investigations.currentInvestigation.uuid, permissions);
        setIsLoadingShare(false);
        let copySharedResearchers = [...sharedResearchers];
        copySharedResearchers[indexResearcherToEdit].permissions = response.sharedResearchers[0].permissions;
        setSharedResearchers(copySharedResearchers);
        setIndexResearcherToEdit(false);
    }
    function editAResearcher(index){
        console.log("confirm to edit", sharedResearchers[index]);
        let valuesForm = {};
        valuesForm["email"] = sharedResearchers[index]["email"];
        valuesForm["permissions"] = USER_ROLES[permissionsToRole(sharedResearchers[index]["permissions"])];
        console.log(valuesForm);
        setIndexResearcherToEdit(index);
    }
    // useEffect(() => {
    //     async function fetchInvestigation(uuid){
    //         setIsLoadingInvestigation(true);
    //         const request = await axios.get(process.env.REACT_APP_API_URL+'/researcher/investigation/'+uuid, { headers: {"Authorization" : localStorage.getItem("jwt")} })
    //         if(request.status === 200){
    //             setSharedResearchers(request.data.investigation.sharedResearchers);
    //             setInvestigation(request.data.investigation);
    //         }
    //         else if(request.status === 401){
    //             props.history.push({
    //                 pathname: SIGN_IN_ROUTE,
    //                 state: { 
    //                     from: props.location.pathname
    //                 }
    //             })
                
    //         }
    //         setIsLoadingInvestigation(false);
    //     }
    //     if(investigation === null){
    //         fetchInvestigation(props.uuid);
    //     }
    //     else{
    //         setIsLoadingInvestigation(false);
    //     }
        
    // }, [])

    if(props.investigations.loading || isLoadingShare){
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
            <Modal key="modal" open={addingResearcher || (indexResearcherToEdit !== false)} 
                title={addingResearcher ? props.translate("investigation.share.add_researcher") : props.translate("investigation.share.edit_researcher")}>
                    {
                        indexResearcherToEdit !== false &&
                        <Form fields={RESEARCHER_FORM} fullWidth callBackForm={editCallBack}
                            initialData={sharedResearchers[indexResearcherToEdit]} 
                            closeCallBack={() => setIndexResearcherToEdit(false)}/>
                    }
                    {
                        addingResearcher &&
                        <Form fields={RESEARCHER_FORM} fullWidth callBackForm={addResearcher} 
                            closeCallBack={() => setAddingResearcher(false)}/>
                    }
            </Modal>
            <Grid container spacing={3}>
                <Grid item  xs={12}>
                    <Typography variant="h3" gutterBottom display="inline">
                        <Translate id="investigation.share.title" />
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={3}>
                    <Grid item xs={12} >
                        <Typography gutterBottom variant="h5" component="h2">
                            { investigation.name }
                        </Typography>
                    </Grid>
                    {
                        renderPrevResearchers()
                    }
                    <Grid item xs={12} >
                        <Typography variant="body2" component="div" gutterBottom>
                            <Translate id="investigation.share.add_researcher" />
                            <ButtonAdd disabled={addingResearcher} 
                                type="button" data-testid="add_researcher" 
                                onClick={() => setAddingResearcher(true)}></ButtonAdd>
                        </Typography>
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