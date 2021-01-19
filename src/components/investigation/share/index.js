import React, { useEffect, useState } from 'react'
import { Card, CardContent, 
        Typography, Grid, Box, Chip } from '@material-ui/core';
import { Translate, withLocalize } from 'react-localize-redux';
import Helmet from "react-helmet";
import { useInvestigation } from '../../../hooks';
import Loader from '../../Loader';
import { ButtonAdd, ButtonContinue } from '../../general/mini_components';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { EnhancedTable } from "../../general/EnhancedTable";
import styled from 'styled-components';
import { yellow, green, blue } from "@material-ui/core/colors";

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
        options:[{"text" : "investigation.share.permissions.read_no_personal_data", "value" : "0"},
                {"text": "investigation.share.permissions.read_personal_data", "value" : "1"}, 
                {"text": "investigation.share.permissions.create_personal_data", "value" : "2"}]
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
    switch(props.value){
        case "0":
            return <ColourChip size="small" label={props.translate("investigation.share.permissions.read_no_personal_data")} rgbcolor={blue[500]} />
        case "1": 
            return <ColourChip size="small" label={props.translate("investigation.share.permissions.read_personal_data")} rgbcolor={yellow[500]} />
        default:
            return <ColourChip size="small" label={props.translate("investigation.share.permissions.create_personal_data")} rgbcolor={green[500]} />
    }
    
})

function ShareInvestigation(props) {
    const { isLoading, error, investigation } = useInvestigation(props.uuid);
    const [ addingResearcher, setAddingResearcher ] = useState(false);
    const [ researchers, setResearchers ] = useState(props.initialState ? props.initialState.researchers_to_share : []);

    function renderResearchers(){
        if(researchers.length === 0){
            return(
                <Box mt={3}>
                    <Typography variant="body2" component="div" gutterBottom>
                        <Translate id="investigation.share.no_researchers_added" />
                    </Typography>
                </Box>
            ) 
        }
        else{
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <EnhancedTable titleTable={<Translate id="investigation.share.researchers" />}  noSelectable
                                headCells={Object.keys(RESEARCHER_FORM).map(key => {
                                    return { id: key, alignment: "right", label: <Translate id={`investigation.share.form.${key}`} />}
                                })}
                                rows={researchers.map(researcher => {
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
                        <ButtonContinue type="submit" data-testid="submit" spaceRight={true} >
                            <Translate id="investigation.share.share" />
                        </ButtonContinue>
                    </Grid>
                </Grid>
            )
        }
    }
    function removeResearcher(index){
        setResearchers(r => {
            r.splice(index, 1); 
            return r;
        });
    }
    function addResearcher(researcher){
        setAddingResearcher(false);
        setResearchers(array => [...array, researcher]);
    }
    if(isLoading){
        return <Loader />
    }
    else if(error){
        return "Error";
    }
    return (
        <React.Fragment>
            <Modal key="modal" open={addingResearcher} 
                title={props.translate("investigation.share.add_researcher")}>
                    <Form fields={RESEARCHER_FORM} callBackForm={addResearcher} 
                        closeCallBack={() => setAddingResearcher(false)}/>
            </Modal>
            <Helmet title={props.translate("investigation.share.title")} />
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
                    <Grid item xs={12} >
                        <Typography variant="body2" component="div" gutterBottom>
                            <Translate id="investigation.share.add_researcher" />
                            <ButtonAdd disabled={addingResearcher} 
                                type="button" data-testid="add_researcher" 
                                onClick={() => setAddingResearcher(true)}></ButtonAdd>
                        </Typography>
                    </Grid>
                    {
                        renderResearchers()
                    }

                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default withLocalize(ShareInvestigation);