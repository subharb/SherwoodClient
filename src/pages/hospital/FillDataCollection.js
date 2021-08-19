import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import SectionForm from '../../components/general/SectionForm';
import PropTypes from 'prop-types';

export default function FillDataCollection(props) {
        
    function renderSection(){
        if(props.sectionSelected){
            return (<SectionForm initData={props.initData} key={props.sectionSelected.uuid} 
                country={props.investigation.country}
                fields={props.sectionSelected.fields.sort((a,b) => a.order - b.order)} 
                callBackSectionForm = {(values) => props.callBackDataCollection(values)}/>)
        }
        else{
            let fields = [];
            props.dataCollection.sections
                .sort((a,b) => a.order - b.order)
                .forEach((section, index) =>{
                    fields.push({
                        type:"separator",
                        label:section.name,
                        name:"separator_"+index,
                        required:false, 
                        validation: "notEmpty",
                        id:index
                    });
                    fields = fields.concat(section.fields);
            })
            return(
                <SectionForm initData={props.initData} key={props.dataCollection.uuid} 
                    country={props.investigation.country}
                    fields={fields} 
                    callBackSectionForm = {(values) => props.callBackDataCollection(values)}/>
            )
        }
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