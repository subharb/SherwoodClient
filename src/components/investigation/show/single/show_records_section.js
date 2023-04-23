import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBack, ButtonEdit, ButtonForward } from '../../../general/mini_components';
import { Card, Paper, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { Alert } from "@material-ui/lab";
import { Translate, withLocalize } from 'react-localize-redux';
import { HOSPITAL_PATIENT_SECTION } from '../../../../routes';
import File from '../../../general/File';
import SmartField from '../../../general/SmartFields';
import { dateToFullDateString, fullDateFromPostgresString, getData, isSmartField, stringDatePostgresToDate } from '../../../../utils';
import { ALL_SMARTFIELDS_TYPES, MEDICAL_HISTORY_FIELDS } from '../../../../constants';
import { PERMISSION } from '../../../../constants/types';

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
function ShowRecordsSection(props) {
    //let [indexSubmission, setIndexSubmission ] = useState(0);
    let [error, setError] = useState(false);

    function editSection(uuidSection){
    
        props.callBackEditSubmission(props.idSubmission, uuidSection);
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
                    ALL_SMARTFIELDS_TYPES.includes(field.type) &&
                    <Translate id="general.no" />
                }
                {
                    !ALL_SMARTFIELDS_TYPES.includes(field.type) &&
                    "-"
                }
            </React.Fragment>;
        }
        if(field.type === "textarea" || MEDICAL_HISTORY_FIELDS.includes(field.type)){
            const value = MEDICAL_HISTORY_FIELDS.includes(field.type) ? valueRecord.value[0].medical_history_ai : valueRecord.value;
            const parsedValue = value.replace('<h1>','').replace('</h1>','').replace('<h2>','').replace('</h2>','');;
            return(
            <React.Fragment>
                {
                    props.section.fields.length > 1 &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                <div dangerouslySetInnerHTML={{__html: valueRecord ? parsedValue : "-"}}></div>                    
            </React.Fragment>
            );
        }
        else if(valueRecord.surveyField.type === "file"){
            return <File key={valueRecord.id} mode="show" value={valueRecord.value} />
        }
        else if(valueRecord.surveyField.type === "appointment"){
            const dateAppointment = stringDatePostgresToDate(valueRecord.value);
            return (
                <Typography variant="h6" color="textPrimary">
                    {field.name}: {dateAppointment.toLocaleString(props.activeLanguage.code,{
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                        })}
                </Typography>
            )
        }
        else if(valueRecord.surveyField.type === "multioption"){
            return valueRecord.value.map((record) => record.multioption).join(", ");
        }
        else if(isSmartField(valueRecord.surveyField.type)){
            return <SmartField type={valueRecord.surveyField.type} mode="show" 
                        initialState={{listElements:valueRecord.value}}
                        label={valueRecord.surveyField.label}  />
        }
        else if(typeof valueRecord.value.getMonth === 'function' ){
            return(<React.Fragment>
                { props.section.fields.length > 1 &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                <Typography variant="body2" gutterBottom>
                    { valueRecord.value.toISOString() }
                </Typography>
            </React.Fragment>
            );
        }   
        else if(valueRecord.surveyField.type === "date"){
            
            return (
                <React.Fragment>
                    { props.section.fields.length > 1 &&
                        <Typography variant="h6" color="textPrimary">
                            {field.name}: 
                        </Typography>
                    }
                    <Typography variant="body2" gutterBottom>
                        { fullDateFromPostgresString( props.activeLanguage.code, valueRecord.value) }
                    </Typography>
                </React.Fragment>
            )
        }
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
        if(props.records.length === 0){
            return (
                <GridPadded item>
                    <Grid item xs={12}>
                        <Typography variant="body2" gutterBottom>
                            No records available
                        </Typography>
                    </Grid>
                </GridPadded>
            )   
        }
        else{
            return(
                <GridPadded container direction="column" spacing={3}>
                    {
                        props.section.fields.sort((a,b) => a.order - b.order).map(field => {
                            const valueRecord = props.records.find(record => {
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
        
    }
    if(!props.records || error){
        return (
            <Alert mb={4} severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>
        );
    }
    else{
        const dateCreated = new Date(props.updatedAt);
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
                                    (props.forceEdit || ((dateCreated.getTime() + 86400000 > new Date().getTime()) && props.uuidResearcher === getData("uuid"))) && 
                                    <ButtonEdit onClick={() => editSection(props.section.uuid)} />
                                }
                            </HeaderSection>
                        }
                        
                    </Grid>
                    {
                        renderSubmission()
                    }
                    
                </Grid> 
            </CardPadding> 
        )
    }
    
}

ShowRecordsSection.propTypes = {
    section: PropTypes.object,
    submissions: PropTypes.array
};

export default withLocalize(ShowRecordsSection)