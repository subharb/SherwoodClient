import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonEdit } from '../../../general/mini_components';
import { Card, Typography, Grid } from '@mui/material';
import styled from 'styled-components';
import { Alert } from "@mui/lab";
import { Translate, withLocalize } from 'react-localize-redux';
import File from '../../../general/File';
import SmartField from '../../../general/SmartFields';
import { fullDateFromPostgresString, getData, isSmartField, stringDatePostgresToDate } from '../../../../utils/index.jsx';
import { ALL_SMARTFIELDS_TYPES, MEDICAL_HISTORY_FIELDS } from '../../../../constants';
import Multioption from '../../../general/Multioption';

/**
 * Component that shows all the records/submissions of a section of a patient in a survey
 */


const CardPadding = styled(Card)`
    padding:1rem;
    margin-bottom:1rem;
`;
const GridPadded = styled(Grid)`
    padding:${props => (props.padding ? '0rem 0rem 1rem 1rem' : '0rem')};
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

    function renderValue(valueRecord, field, hideField = false){
        const showField = props.section.fields.length > 1 && !hideField;
        if(!valueRecord || !valueRecord.value){
            return(
            <Grid item paddingLeft={3}>
                {
                    showField &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                {
                    ALL_SMARTFIELDS_TYPES.includes(field.type) &&
                    <Typography variant="body2">
                        <Translate id="general.no" />
                    </Typography>
                }
                {
                    !ALL_SMARTFIELDS_TYPES.includes(field.type) &&
                    "-"
                }
            </Grid>)
        }
        if(field.type === "textarea" || MEDICAL_HISTORY_FIELDS.includes(field.type)){
            const value = MEDICAL_HISTORY_FIELDS.includes(field.type) ? valueRecord.value[0].medical_history_ai : valueRecord.value;
            const parsedValue = value.replace('<h1>','').replace('</h1>','').replace('<h2>','').replace('</h2>','');;
            return(
            <Grid item paddingLeft={3}>
                {
                    showField &&
                    <Typography variant="h6" color="textPrimary" fontWeight='800'>
                        {field.name}: 
                    </Typography>
                }
                <Typography variant="body2">
                    <div dangerouslySetInnerHTML={{__html: valueRecord ? parsedValue : "-"}}></div>                    
                </Typography>
            </Grid>
            );
        }
        else if(valueRecord.surveyField.type === "file"){
            return <File key={valueRecord.id} mode="show" value={valueRecord.value}
                    label={field.name}  />
        }
        else if(valueRecord.surveyField.type === "appointment"){
            const dateAppointment = stringDatePostgresToDate(valueRecord.value);
            return (
                <Grid item paddingLeft={3}>
                <Typography variant="h6" color="textPrimary">
                    <Translate id="general.date" />: {dateAppointment.toLocaleString(props.activeLanguage.code,{
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                        })}
                </Typography>
                </Grid>
            )
        }
        else if(valueRecord.surveyField.type === "multioption"){
            return (<Multioption mode="show" label= {field.name} options={field.options} value={valueRecord.value} />);
        }
        else if(isSmartField(valueRecord.surveyField.type)){
            return(
                <Grid item paddingLeft={3}>
                    <SmartField type={valueRecord.surveyField.type} mode="show" 
                        initialState={{listElements:valueRecord.value}} printMode={props.printMode}
                        label={valueRecord.surveyField.label}  />
                </Grid>)
        }
        else if(typeof valueRecord.value.getMonth === 'function' ){
            return(
                <Grid item paddingLeft={3}>
                { showField &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                <Typography variant="body2" gutterBottom>
                    { valueRecord.value.toISOString() }
                </Typography>
            </Grid>
            );
        }   
        else if(valueRecord.surveyField.type === "date"){
            
            return (
                <Grid item paddingLeft={3}>
                    { showField &&
                        <Typography variant="h6" color="textPrimary">
                            {field.name}: 
                        </Typography>
                    }
                    <Typography variant="body2" gutterBottom>
                        { fullDateFromPostgresString( props.activeLanguage.code, valueRecord.value) }
                    </Typography>
                </Grid>   
            )
        }
        else{
            return(
                <Grid item paddingLeft={3}>
                { showField &&
                    <Typography variant="h6" color="textPrimary">
                        {field.name}: 
                    </Typography>
                }
                <Typography variant="body2" gutterBottom>
                    { valueRecord.value }
                </Typography>
            </Grid>
            );
        }
    }
   
    
    function renderSubmission(){
        if(props.records.length === 0){
            return (
                <GridPadded container padding={!props.printMode}>
                    <Grid item xs={12}>
                        <Grid item paddingLeft={3}>
                            <Typography variant="body2" gutterBottom>
                                No records available
                            </Typography>
                        </Grid>
                    </Grid>
                </GridPadded>
            )   
        }
        else{
            return(
                <GridPadded container padding={!props.printMode} direction="column" spacing={3}>
                    {
                        props.section.fields.sort((a,b) => a.order - b.order).map(field => {
                            const valueRecord = props.records.find(record => {
                                return field.id === record.surveyField.id
                            })
                            
                            return (
                                <Grid item xs={12}>
                                    {
                                        renderValue(valueRecord, field, field.name === props.section.name)                                    
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
            <CardPadding padding={props.printMode}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        {
                            !props.noTitle &&
                            <HeaderSection>
                                <Typography variant="subtitle1" color="textPrimary" style={{ fontWeight: 600 }}>
                                    { props.section.name }
                                </Typography>
                                {
                                    (!props.printMode && (props.forceEdit || ((dateCreated.getTime() + 86400000 > new Date().getTime()) && props.uuidResearcher === getData("uuid")))) && 
                                    <ButtonEdit color="primary" onClick={() => editSection(props.section.uuid)} />
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
    submissions: PropTypes.array,
    forceEdit: PropTypes.bool,
    printMode: PropTypes.bool,
    callBackEditSubmission: PropTypes.func,
    records: PropTypes.array,
    uuidResearcher: PropTypes.string,
    idSubmission: PropTypes.number,
    updatedAt: PropTypes.string,
};

export default withLocalize(ShowRecordsSection)