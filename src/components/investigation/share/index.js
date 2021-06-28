import React, { useEffect, useState } from 'react'
import { SIGN_IN_ROUTE } from '../../../routes';
import { Card, CardContent, 
        Typography, Grid, Box, Chip } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import { decryptData, encryptData, generateKey } from '../../../utils';
import Loader from '../../Loader';
import { ButtonAdd, ButtonContinue } from '../../general/mini_components';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { EnhancedTable } from "../../general/EnhancedTable";
import styled from 'styled-components';
import { yellow, green, blue, red } from "@material-ui/core/colors";
import axios from '../../../utils/axios';
import { useHistory } from "react-router-dom";

const RESEARCHER_FORM = {
    "email":{
        required : true,
        type:"text",
        label:"investigation.share.form.email",
        shortLabel: "investigation.share.form.email",
        validation : "validEmail"
    },
    "permission":{
        required : true,
        type:"select",
        label:"investigation.share.form.permission",
        shortLabel: "investigation.share.form.permission",
        validation : "notEmpty",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : "0"},
        options:[{"label" : "investigation.share.permissions.read_no_personal_data", "value" : "0"},
                {"label": "investigation.share.permissions.read_personal_data", "value" : "1"}, 
                {"label": "investigation.share.permissions.create_personal_data", "value" : "2"}]
    },
}

const ColourChip = styled(Chip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const PermissionChip = withLocalize((props) => {
    switch(props.value.toString()){
        case "0":
            return <ColourChip size="small" label={props.translate("investigation.share.permissions.read_no_personal_data")} rgbcolor={blue[500]} />
        case "1": 
            return <ColourChip size="small" label={props.translate("investigation.share.permissions.read_personal_data")} rgbcolor={yellow[500]} />
        default:
            return <ColourChip size="small" label={props.translate("investigation.share.permissions.create_personal_data")} rgbcolor={green[500]} />
    }
    
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

function ShareInvestigation(props) {
    const [isLoadingInvestigation, setIsLoadingInvestigation ] = useState(true);
    const [investigation, setInvestigation] = useState(props.initialState && props.initialState.investigation ? props.initialState.investigation : null);
    const [error, setError] = useState(null);
    const [ addingResearcher, setAddingResearcher ] = useState(false);
    const [ newResearchers, setNewResearchers ] = useState(props.initialState && props.initialState.newResearchers ? props.initialState.newResearchers : []);
    const [showSendModal, setShowSendModal] = useState(false);
    const [ sharedResearchers, setSharedResearchers] = useState(props.initialState && props.initialState.investigation ? props.initialState.investigation.sharedResearchers : []);
    const [isLoadingShare, setIsLoadingShare] = useState(false);
    const [errorShare, setErrorShare] = useState(false);
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
            const request = await axios.post(process.env.REACT_APP_API_URL+'/researcher/investigation/'+props.uuid+'/share', postObject, { headers: {"Authorization" : localStorage.getItem("jwt")} })
            
            if(request.status === 200){
                console.log("Great");
                setSharedResearchers(request.data.sharedResearchers);
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
                                        return { id: key, alignment: "right", label: <Translate id={`investigation.share.form.${key}`} />}
                                    })}
                                    rows={newResearchers.map(researcher => {
                                        let tempSection = {}
                                        for(const keyField of Object.keys(RESEARCHER_FORM)){
                                            const field = RESEARCHER_FORM[keyField];
                                            if(field.type === "select"){
                                                tempSection[keyField] = <PermissionChip value={researcher[keyField]} />
                                            }
                                            else{
                                                tempSection[keyField] = researcher[keyField];
                                            }
                                        }
                                        return tempSection;
                                    })}
                                    actions={{"delete" : (index) => removeResearcher(index)}} 
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
            const columnsTable = ["name", "status", "permission"];
            const arrayHeader = columnsTable.map(col => {
                return { id: col, alignment: "left", label: <Translate id={`investigation.share.researcher.${col}`} /> }
            }) 
    
            content = <EnhancedTable titleTable={<Translate id="investigation.share.current_researchers" />}  
                        headCells={arrayHeader}
                        rows={sharedResearchers.map(researcher => {
                            const name = researcher.name ? researcher.name+" "+researcher.surnames : researcher.email;

                            let row = {
                                    name : name, 
                                    permission : <PermissionChip value={researcher.permission} />, 
                                    status : <StatusChip value={researcher.status}/>
                                }
                            
                            return row;
                        })}
                        actions={{"delete" : (index) => deleteResearcher(index), "edit" : (index) => editResearcher(index)}} 
        />
        }
        return (
            <Grid item  xs={12}>
                {content}
            </Grid>
        )
    }
    function deleteResearcher(index){

    }
    function editResearcher(index){

    }
    useEffect(() => {
        async function fetchInvestigation(uuid){
            setIsLoadingInvestigation(true);
            const request = await axios.get(process.env.REACT_APP_API_URL+'/researcher/investigation/'+uuid, { headers: {"Authorization" : localStorage.getItem("jwt")} })
            if(request.status === 200){
                setSharedResearchers(request.data.investigation.sharedResearchers);
                setInvestigation(request.data.investigation);
            }
            else if(request.status === 401){
                this.props.history.push({
                    pathname: SIGN_IN_ROUTE,
                    state: { 
                        from: this.props.location.pathname
                    }
                })
                
            }
            setIsLoadingInvestigation(false);
        }
        if(investigation === null){
            fetchInvestigation(props.uuid);
        }
        else{
            setIsLoadingInvestigation(false);
        }
        
    }, [])

    if(isLoadingInvestigation || isLoadingShare){
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
        <React.Fragment>
            <Helmet title={props.translate("investigation.share.title")} />
            <Modal key="modal" open={addingResearcher} 
                title={props.translate("investigation.share.add_researcher")}>
                    <Form fields={RESEARCHER_FORM} callBackForm={addResearcher} 
                        closeCallBack={() => setAddingResearcher(false)}/>
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
        </React.Fragment>
    )
}
export default withLocalize(ShareInvestigation);