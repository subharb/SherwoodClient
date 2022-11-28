import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import SectionForm from '../../components/general/SectionForm';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { useDispatch, useSelector } from "react-redux";
import { postSubmissionPatientAction, updateSubmissionPatientAction } from '../../redux/actions/submissionsPatientActions';

export default function FillDataCollection(props) {
    const dispatch = useDispatch();

    async function saveRecords(data, buttonSubmitted){
        let postObj =  {
            uuidSurvey:props.dataCollection.uuid, 
            uuid_patient:props.uuidPatient,
            id:props.idSubmission,
            researcher: props.researcher,
            surveyRecords:[]
        }
        if(props.requestServiceId){
            postObj = {
                uuidSurvey:props.dataCollection.uuid, 
                uuid_patient:props.uuidPatient,
                id:props.idSubmission,
                researcher: props.researcher,
                surveyRecords:[],
                requestInfo: {
                    requestId:parseInt(props.requestServiceId), 
                    completeRequest:buttonSubmitted === "button1"
                },
            }
        }
        
        data.forEach(fieldData => {
            //const sectionField = dataCollectionSelected.sections.find(section => section.fields.find(aField => aField.id === fieldData.surveyField.id));
            postObj.surveyRecords.push(fieldData);
            
        });
       
        
        if(props.idSubmission){
            // Si hay initData, estamos actualizando
            await dispatch(updateSubmissionPatientAction(postObj, props.uuidInvestigation, props.uuidPatient, props.dataCollection.uuid, props.dataCollection.name, props.idSubmission));
        }
        else{
            //setIndexSection(-1);
            
            console.log(data);
            await dispatch(postSubmissionPatientAction(postObj, props.uuidInvestigation, props.uuidPatient, props.dataCollection.uuid, props.dataCollection.name, props.dataCollection.type));

            
        }

        props.callBackDataCollection()
    }
        
    function renderSection(){
        
        let fields = [];
        let sections = []
        if(props.sectionSelected){
            sections = [props.sectionSelected];
        }
        else{
            sections = props.dataCollection.sections;
        }
        
        sections.sort((a,b) => a.order - b.order)
            .forEach((section, index) =>{
                let  sectionFields = [...section.fields.sort((a,b) => a.order - b.order)]
                
                
                if((sectionFields.length === 1 || sectionFields[0].label === section.name)&& sectionFields[0].type !== "textarea"){
                    sectionFields[0].label = `general.default-label.${sectionFields[0].type}`
                }
                sectionFields.unshift({
                    type:"title_section",
                    label:section.name,
                    name:"title_section_"+index,
                    required:false, 
                    validation: "notEmpty",
                    id:index
                });
                fields = fields.concat(sectionFields);
        })      
        return(
            <SectionForm initData={props.initData} key={props.dataCollection.uuid} 
                country={props.country} uuidInvestigation={props.uuidInvestigation}
                fields={fields} uuidPatient={props.uuidPatient}
                uuidSurvey = {props.dataCollection.uuid} alterSubmitButton={props.alterSubmitButton}
                callBackSectionForm = {(values, buttonSubmitted) => saveRecords(values, buttonSubmitted)}/>
        )
        
    }
    
    return (
        <React.Fragment>
            <Grid container  spacing={3}>
                <Grid item container xs={12} spacing={3} style={{color:"white", padding:"1rem"}}>
                    {
                        !props.hideCollectionName && 
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                {props.dataCollection.name}
                            </Typography>
                        </Grid>
                    }
                    
                    <Grid item xs={12}>
                        {
                            renderSection()
                        }
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

FillDataCollection.propTypes = {
    sectionSelected : PropTypes.object,
    /** Data Collection */
    dataCollection: PropTypes.object.isRequired,
    hideCollectionName:PropTypes.bool,
    requestServiceId:PropTypes.number,
    country:PropTypes.string,
    researcher:PropTypes.object,
    uuidPatient:PropTypes.string,
    uuidInvestigation:PropTypes.string,
    initData:PropTypes.object,
    alterSubmitButton:PropTypes.string,
    idSubmission:PropTypes.number,
    /** Callback function from parent */
    callBackDataCollection: PropTypes.func.isRequired,
  };