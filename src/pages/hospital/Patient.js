
import React, { useState, useEffect } from 'react'
import { Grid, Typography, Paper } from '@material-ui/core';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { postRecordPatient, fetchRecordsPatientAllSurveys } from '../../services/sherwoodService';
import Loader from '../../components/Loader';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGrey, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import { yearsFromDate, daysFromDate } from '../../utils';
import FillDataCollection from './FillDataCollection';
import ShowRecordsSection from '../../components/investigation/show/fill/show_records_section'
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";


export default function Patient(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false)
    const [surveyRecords, setSurveyRecords] = useState([]);
    const [showDataCollections, setShowDataCollections] = useState(false);
    const [indexMedicalNote, setIndexMedicalNote] = useState(null);
    const [dataCollectionSelected, setDataCollectionSelected] = useState(null);
    const [newRecords, setNewRecords] = useState(0);
    let years = yearsFromDate(props.dateOfBirth);
    let stay = daysFromDate(props.dateIn);
    
    function fillDataCollection(dataCollection){
        setShowDataCollections(false);
        setDataCollectionSelected(dataCollection);
    }
    function selectRecord(index){
        console.log("Row seleccionado ", surveyRecords[index]);
        setIndexMedicalNote(index);
    }
    async function saveRecord(data){
        //No iteramos por secciones porque en modo hospital se supone que solo habrá una sección
        try{
            console.log(data);
            setLoading(true);
            const postObj = {submission : [
                {
                    id_section:props.dataCollection.sections[0]._id,
                    answers:data
                }
                ]
            }
            const response = await postRecordPatient(postObj, props.investigation.uuid, props.patientId, dataCollectionSelected._id);
            setLoading(false);
            setSaved(true);
            setNewRecords(c => c +1);
            setTimeout(() => {
                setSaved(false)
              }, 1000);
              
            
        }
        catch(error){
            setLoading(false);
            setError(true);
        }
        
    }
    function renderMedicalNote(){
        if(indexMedicalNote !== null){
            
            
        }
        else{
            return null;    
        }
        
            
    }
    function renderCore(){
        if(dataCollectionSelected !== null){
            return(
                <FillDataCollection key={dataCollectionSelected._id} dataCollection={dataCollectionSelected}
                patientId={props.patientId} investigation={props.investigation} callBackDataCollection={(values) => saveRecord(values)}/>
            )
        }
        else if(indexMedicalNote !== null){
            const dataCollection = props.dataCollections.find(dataCol => {
                if(dataCol._id === surveyRecords[indexMedicalNote].surveyID){
                    return dataCol;
                }
            })
            const recordSelected = surveyRecords[indexMedicalNote].record;
            const dateCreated = new Date(recordSelected.created_At)
            return (
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="body2" gutterBottom>
                        {surveyRecords[indexMedicalNote].researcher.name+" "+ surveyRecords[indexMedicalNote].researcher.surnames}
                    </Typography>
                </Grid>
                <Grid xs={6}>
                    <Typography variant="body2" gutterBottom>
                        { dateCreated.toISOString().split('T')[0] }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        dataCollection.sections.map(section => {
                            return <ShowRecordsSection noTitle submissions={surveyRecords[indexMedicalNote].record.submission} section={section} />
                        })
                    }
                </Grid>
            </Grid>)
        }
        else if(surveyRecords.length === 0){
            return "No medical notes yet"
        }
        else{
            return(
                <EnhancedTable noHeader noSelectable selectRow={(index) => selectRecord(index)} 
                rows={surveyRecords.map(record => {
                    const dateCreated = new Date(record.record.created_At);
                    return({researcher : record.researcher.name+" "+ record.researcher.surnames, date : dateCreated.toISOString().split('T')[0]})
                })} headCells={[{ id: "researcher", alignment: "right", label: "Researcher"}, 
                                { id: "date", alignment: "right", label: "Date"}]} />
            )
        }
    }
    useEffect(() => {
        async function fetchRecordsPatient(){
            try{
                setLoading(true);
                const response = await fetchRecordsPatientAllSurveys(props.investigation.uuid, props.patientId);
                //Ordeno los records cronologicamente
                let records = [];
                for(const survey of response.surveys){
                    for(const record of survey.records){
                        record.surveyID = survey.id;
                        records.push(record);
                    }
                    
                }
                records.sort((a, b) => {
                    const aDate = new Date(a.record.created_At);
                    const bDate = new Date(b.record.created_At);
                    return (aDate.getTime() > bDate.getTime())
                });
                setSurveyRecords(records);
                setLoading(false);
            }
            catch(error){
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }
        fetchRecordsPatient()
    }, [newRecords])
    
    if(error){
        return(
            <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
                <Alert mb={4} severity="error">
                    <Translate id="investigation.share.error.description" />
                </Alert>
            </BoxBckgr>
        )
    }
    return (
        
        <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
            <Modal open={showDataCollections || loading || saved} closeModal={() => setShowDataCollections(false)}>
                 {
                    loading &&
                    <Loader />
                }
                {
                    saved &&
                    <CheckCircleOutlineSvg style={{ color: "green",fontSize: 80 }}/>
                }
                { showDataCollections && 
                    <Grid container spacing={3} >
                    {
                        props.dataCollections.map(dataCollection => {
                            return(
                                <Grid item xs={12} style={{textAlign:"center"}}>
                                    <ButtonGrey onClick={() => fillDataCollection(dataCollection)}>{dataCollection.name}</ButtonGrey>
                                </Grid>
                            )
                        })
                    }
                    </Grid>
                }
            </Modal>
            <Grid container style={{backgroundColor:"white"}} spacing={3}>
                <Grid item container xs={12}>
                    <Grid item container xs={3} >
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {props.number}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <IconPatient gender={props.gender} />
                        </Grid>
                    </Grid>
                    <Grid item container xs={4}>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {props.name} {props.surnames}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                ID: {props.patientID}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {years} years
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                {stay} days
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={5}  justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <ButtonAdd onClick={() => setShowDataCollections(!showDataCollections)} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        renderCore()
                    }
                </Grid>
            </Grid>
        </BoxBckgr>
    )
}
