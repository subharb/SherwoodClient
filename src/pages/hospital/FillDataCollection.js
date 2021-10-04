import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import SectionForm from '../../components/general/SectionForm';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

export default function FillDataCollection(props) {
        
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
                country={props.investigation.country}
                fields={fields} 
                callBackSectionForm = {(values) => props.callBackDataCollection(values)}/>
        )
        
    }
    return (
        <React.Fragment>
            <Grid container  spacing={3}>
                <Grid item container xs={12} spacing={3} style={{color:"white", padding:"1rem"}}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>
                            {props.dataCollection.name}
                        </Typography>
                    </Grid>
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
    /** Callback function from parent */
    callBackDataCollection: PropTypes.func.isRequired,
  };