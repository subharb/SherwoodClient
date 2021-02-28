
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Grid, Typography, Paper } from '@material-ui/core';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { postRecordPatient, fetchRecordsPatientAllSurveys } from '../../services/sherwoodService';
import Loader from '../../components/Loader';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGrey, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import { useParams } from 'react-router-dom';
import { yearsFromDate, daysFromDate } from '../../utils';
import FillDataCollection from './FillDataCollection';
import ShowRecordsSection from '../../components/investigation/show/fill/show_records_section'
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";
import { usePatientsData } from '../../hooks';


function Patient(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false);
    const [patient, setPatient] = useState(null);
    const [surveyRecords, setSurveyRecords] = useState([]);
    const [showDataCollections, setShowDataCollections] = useState(false);
    const [indexMedicalNote, setIndexMedicalNote] = useState(null);
    const [dataCollectionSelected, setDataCollectionSelected] = useState(null);
    const [newRecords, setNewRecords] = useState(0);
    
    let { idPatient } = useParams();


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
                    id_section:dataCollectionSelected.sections[0]._id,
                    answers:data
                }
                ]
            }
            const response = await postRecordPatient(postObj, props.investigations[0].uuid, idPatient, dataCollectionSelected._id);
            setLoading(false);
            setSaved(true);
            setNewRecords(c => c +1);
            setTimeout(() => {
                setDataCollectionSelected(null);
                setSaved(false)
              }, 1000);
              
            
        }
        catch(error){
            console.log(error);
            setLoading(false);
            setError(true);
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
            const dataCollection = props.investigations[0].surveys.find(dataCol => {
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
                    return({researcher : record.researcher.name+" "+ record.researcher.surnames, surveyName : record.surveyName, date : dateCreated.toISOString().split('T')[0]})
                })} headCells={[{ id: "researcher", alignment: "right", label: "Researcher"}, { id: "surveyName", alignment: "right", label: "DataCollection"},
                                { id: "date", alignment: "right", label: "Date"}]} />
            )
        }
    }
    useEffect(() => {
        async function fetchRecordsPatient(){
            try{
                setLoading(true);
                const response = await fetchRecordsPatientAllSurveys(props.investigations[0].uuid, idPatient);
                //Ordeno los records cronologicamente
                let records = [];
                for(const survey of response.surveys){
                    for(const record of survey.records){
                        record.surveyID = survey.id;
                        record.surveyName = survey.surveyName;
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
        if(props.investigations.length !== 0){
            fetchRecordsPatient()
        }
    }, [newRecords, props.investigations])
    
    useEffect(() => {
        
        //Find current patient
        if(props.investigations.length !== 0){
            const tempPatient = props.investigations[0].patientsPersonalData.find(patient =>{
                return(patient.id === idPatient);
            });
            setPatient(tempPatient);
        }
    }, [props.investigations])
    if(error){
        return(
            <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
                <Alert mb={4} severity="error">
                    <Translate id="investigation.share.error.description" />
                </Alert>
            </BoxBckgr>
        )
    }
    else if(props.investigations.length === 0 || !patient){
        return <Loader />
    }
    return (
        
        <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
            <Modal isTransparent={true} open={showDataCollections || loading || saved} closeModal={() => setShowDataCollections(false)}>
                {
                    saved &&
                    <CheckCircleOutlineSvg style={{ color: "green",fontSize: 80 }}/>
                }
                { showDataCollections && 
                    <Grid container spacing={3} >
                    {
                        props.investigations[0].surveys.map(dataCollection => {
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
                                {patient.personalData.name} {patient.personalData.surnames}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                                ID: {patient.id}
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

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations
    }
}
export default connect(mapStateToProps, null)(Patient)