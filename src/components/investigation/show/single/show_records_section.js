import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBack, ButtonEdit, ButtonForward } from '../../../general/mini_components';
import { Card, Paper, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { Alert } from "@material-ui/lab";
import { Translate } from 'react-localize-redux';
import { HOSPITAL_PATIENT_SECTION } from '../../../../routes';
import File from '../../../general/File';
import SmartField from '../../../general/SmartFields';
import { isSmartField } from '../../../../utils';

/**
 * Component that shows all the records/submissions of a section of a patient in a survey
 */


const CardPadding = styled(Card)`
    padding:1rem;
    margin-bottom:1rem;
`;
const GridPadded = styled(Grid)`
    padding:0rem 0rem 1rem 1rem;
`;
const HeaderSection = styled.div`
    display:flex;

`;
export default function ShowRecordsSection(props) {
    let [indexSubmission, setIndexSubmission ] = useState(0);
    let [error, setError] = useState(false);

    function editSection(indexSubmission, uuidSection){
        const uuidSubmission = props.submissions[indexSubmission].id;
        props.callBackEditSubmission(uuidSubmission, uuidSection);
    }
    function renderValue(valueRecord, field){
        if(!valueRecord || !valueRecord.value){
            return <React.Fragment>
                {
                    props.section.fields.length > 1 &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                {
                    ["ict", "allergy", "background", "family-background", "treatment"].includes(field.type) &&
                    <Translate id="general.no" />
                }
                {
                    !["ict", "allergy", "background", "family-background", "treatment"].includes(field.type) &&
                    "-"
                }
            </React.Fragment>;
        }
        if(field.type === "textarea"){
            return(
            <React.Fragment>
                {
                    props.section.fields.length > 1 &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                <div dangerouslySetInnerHTML={{__html: valueRecord ? valueRecord.value : "-"}}></div>                    
            </React.Fragment>
            );
        }
        else if(valueRecord.surveyField.type === "file"){
            return <File key={valueRecord.id} mode="show" value={valueRecord.value} />
        }
        else if(isSmartField(valueRecord.surveyField.type)){
            return <SmartField type={valueRecord.surveyField.type} mode="show" 
                initialState={{listElements:valueRecord.value}}
                label={valueRecord.surveyField.label}  />
        }
        // else if(["treatment"].includes(valueRecord.surveyField.type)){
        //     return <MultipleTreatmentSelector type={valueRecord.surveyField.type} mode="show" 
        //         initialState={{listTreatments:valueRecord.value}}
        //         label={valueRecord.surveyField.label}  />
        // }
   
        else{
            return(<React.Fragment>
                { props.section.fields.length > 1 &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                <Typography variant="body2" gutterBottom>
                    { valueRecord.value }
                </Typography>
            </React.Fragment>
            );
        }
    }
   
    
    function renderSubmission(){
        const submission = props.submissions[indexSubmission];       
        
        return(
            <GridPadded container direction="column" spacing={3}>
                {
                    props.section.fields.sort((a,b) => a.order - b.order).map(field => {
                        const valueRecord = submission.surveyRecords.find(record => {
                            return field.id === record.surveyField.id
                        })
                        
                        return (
                            <Grid item xs={12}>
                                {
                                    renderValue(valueRecord, field)                                    
                                }
                                
                            </Grid>
                        )
                        
                        
                    })
                }
            </GridPadded>
        );
    }
    if(!props.submissions || error){
        return (
            <Alert mb={4} severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>
        );
    }
    else if(indexSubmission < props.submissions.length){
        const dateCreated = new Date(props.submissions[indexSubmission].createdAt);
        return (
            <CardPadding >
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        {
                            !props.noTitle &&
                            <HeaderSection>
                                <Typography variant="subtitle1" color="textPrimary" style={{ fontWeight: 600 }}>
                                    { props.section.name }
                                </Typography>
                                {
                                    ((dateCreated.getTime() + 86400000 > new Date().getTime()) || props.permissions === 4) && 
                                    <ButtonEdit onClick={() => editSection(indexSubmission, props.section.uuid)} />
                                }
                                
                            </HeaderSection>
                        }
                        
                    </Grid>
                    {
                        renderSubmission()
                    }
                    {
                        props.submissions.length > 1 &&
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                <Typography variant="body2" gutterBottom>
                                {
                                    `${indexSubmission+1} / ${props.submissions.length}`
                                }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ButtonBack disabled={indexSubmission === 0} onClick={() => setIndexSubmission(indexSubmission-1)}></ButtonBack>
                                <ButtonForward disabled={indexSubmission === props.submissions.length -1} onClick={() => setIndexSubmission(indexSubmission+1)}></ButtonForward>
                            </Grid>
                        </Grid>
                    }
                </Grid> 
            </CardPadding> 
        )
    }
    else{
        return(
            <CardPadding >
                <Grid container direction="column" >
                    <Grid item>
                        <Typography variant="subtitle1" color="textPrimary">
                            Section:{ props.section.name }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" gutterBottom>
                            No records available
                        </Typography>
                    </Grid>
                </Grid>
            </CardPadding>
        )   
    }
}

ShowRecordsSection.propTypes = {
    section: PropTypes.object,
    submissions: PropTypes.array
};