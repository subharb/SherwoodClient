import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { BoxBckgr } from '../../components/general/mini_components';
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import Form  from '../../components/general/form';
import { usePatientsData } from '../../hooks';
import { EnhancedTable } from '../../components/general/EnhancedTable';

export default function SearchPatients(props) {
    const { decryptedPatientData, errorEncryption} = usePatientsData(props.investigation, props.investigation.patientsPersonalData);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showResults, setShowResults] = useState(false);
    let personalFieldsForm = {};

    props.personalFields.forEach(personalField => {
        personalFieldsForm[personalField] = {
            required : false,
            type:"text",
            label:"investigation.create.personal_data.fields."+personalField,
            shortLabel:"investigation.create.personal_data.fields."+personalField,
            validation : "notEmpty"
        }
    });
    function searchPatientCallBack(values){
        console.log(values);
        setShowResults(true);
        //Filtrar decryptedPatientData con values
        const filteredPatients = decryptedPatientData.filter(patient =>{
            let result = true;
            for(const keyValue of Object.keys(values)){
                const value = values[keyValue];
                if(value !== "" && !patient[keyValue].toLowerCase().includes(value.toLowerCase())){
                    result = false;
                }
            }
            return result;
        });
        setFilteredPatients(filteredPatients);
    }
    function renderCore(){
        if(!showResults){
            return (
                <Form fields={personalFieldsForm} callBackForm={searchPatientCallBack}/>
                );
        }
        else{
            if(filteredPatients.length === 0){
                return "No patients meet the criteria"
            }
            else{
                const headCells = props.personalFields.map(pField =>{
                    return { id:pField, alignment: "right", label: <Translate id={`investigation.create.personal_data.fields.${pField}`} /> }
                });
                const rows = filteredPatients.map(patient => {
                    let tempData = {}
                    for(const pField of props.personalFields){
                        tempData[pField] = patient[pField]
                    }
                    return tempData;
                })  
                return(
                    [
                        <EnhancedTable noHeader noSelectable headCells={headCells} rows={rows}/>,
                        <Button >Close</Button>
                    ]
                )
            }
        }
                    
    }
    return (
        <BoxBckgr color="text.primary" style={{padding:"1rem", color:"white"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{textAlign:"center"}}>
                    <Typography variant="h4" gutterBottom display="inline">
                        Search Patients
                    </Typography>
                </Grid>
            <Grid item xs={12}>
                <Box p={1}>
                    <Paper>
                    {
                    renderCore()
                    }     
                    </Paper>
                </Box>           
            </Grid>    
                
        </Grid>
        </BoxBckgr>
    )
}

SearchPatients.propTypes = {
    personalFields:PropTypes.array,
}

