
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Grid, Typography, Paper } from '@material-ui/core';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { postSubmissionPatientAction } from '../../redux/actions/submissionsPatientActions';
import { fetchSubmissionsPatientInvestigationAction } from '../../redux/actions/submissionsPatientActions';
import Loader from '../../components/Loader';
import { BoxBckgr, IconPatient, ButtonAdd, ButtonGrey, CheckCircleOutlineSvg } from '../../components/general/mini_components';
import Modal from '../../components/general/modal';
import { useParams } from 'react-router-dom';
import { yearsFromDate, daysFromDate } from '../../utils';
import FillDataCollection from './FillDataCollection';
import ShowRecordsSection from '../../components/investigation/show/single/show_records_section'
import { Translate } from 'react-localize-redux';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";


function Patient(props) {
    const [loading, setLoading] = useState(props.initialState ? props.initialState.loading : false)
    const [error, setError] = useState(props.initialState ? props.initialState.error : false)
    const [saved, setSaved] = useState(props.initialState ? props.initialState.saved : false);
    
    const [surveyRecords, setSurveyRecords] = useState([]);
    const [showDataCollections, setShowDataCollections] = useState(false);
    const [indexMedicalNote, setIndexMedicalNote] = useState(null);
    const [dataCollectionSelected, setDataCollectionSelected] = useState(null);
    const [newRecords, setNewRecords] = useState(0);
    const dispatch = useDispatch();
    let { uuidPatient } = useParams();

    //const surveyRecords = props.patientsSubmissions.data && props.patientsSubmissions.data[uuidPatient] ? props.patientsSubmissions.data[uuidPatient] : [];
    const patient = props.investigations.data ? props.investigations.data[0].patientsPersonalData.find(patient =>{
        return(patient.uuid === uuidPatient);
    }) : null;
    

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
        
        console.log(data);

        const postObj = {submission : [
            {
                uuid_section:dataCollectionSelected.sections[0].uuid,
                answers:data
            }
            ]
        }
        await dispatch(postSubmissionPatientAction(postObj, props.investigations.data[0].uuid, uuidPatient, dataCollectionSelected.uuid));
        setDataCollectionSelected(null);
        
    }
    function renderCore(){
        if(dataCollectionSelected !== null){
            return(
                <FillDataCollection key={dataCollectionSelected.uuid} dataCollection={dataCollectionSelected}
                patientId={props.patientId} investigation={props.investigation} callBackDataCollection={(values) => saveRecord(values)}/>
            )
        }
        else if(indexMedicalNote !== null){
            const dataCollection = props.investigations.data[0].surveys.find(dataCol => {
                if(dataCol.uuid === surveyRecords[indexMedicalNote].surveyUUID){
                    return dataCol;
                }
            })
            const recordsSelected = surveyRecords[indexMedicalNote].surveyRecords;
            const dateCreated = new Date(surveyRecords[indexMedicalNote].createdAt)
            const sectionSubmission = dataCollection.sections.find(section => {
                return section.uuid === surveyRecords[indexMedicalNote].surveyRecords[0].surveySection.uuid
            })
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
                        <ShowRecordsSection noTitle submissions={[surveyRecords[indexMedicalNote]]} section={sectionSubmission} />
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
                    const dateCreated = new Date(record.createdAt);
                    return({researcher : record.researcher.name+" "+ record.researcher.surnames, surveyName : record.surveyName, date : dateCreated.toISOString().slice(0, 16).replace('T', ' ')})
                })} headCells={[{ id: "researcher", alignment: "right", label: "Researcher"}, { id: "surveyName", alignment: "right", label: "DataCollection"},
                                { id: "date", alignment: "right", label: "Date"}]} />
            )
        }
    }
    useEffect(() => {
        async function fetchRecordsPatient(){
            await dispatch(fetchSubmissionsPatientInvestigationAction(props.investigations.data[0].uuid, uuidPatient));
        }
        if(props.investigations.data){
            fetchRecordsPatient()
        }
    }, [newRecords, props.investigations])
    useEffect(() => {
        if(props.patientsSubmissions.data){
            let tempSubmissions = props.patientsSubmissions.data[uuidPatient].reduce((acc, val)=> {
                val.submissions = val.submissions.map(sub=>{
                    sub.surveyName = val.surveyName; 
                    sub.surveyUUID = val.uuid; 
                    return sub;
                });

                return acc.concat(val.submissions)
            }, []);
            tempSubmissions.sort((a, b) => {
                const aDate = new Date(a.createdAt);
                const bDate = new Date(b.createdAt);
                if(aDate.getTime() > bDate.getTime()){
                    return -1
                }
                else{
                    return 1;
                }
            });
            setSurveyRecords(tempSubmissions);
        }
        
    }, [props.patientsSubmissions])
    if(error){
        return(
            <BoxBckgr color="text.primary" style={{padding:"1rem"}}>
                <Alert mb={4} severity="error">
                    <Translate id="investigation.share.error.description" />
                </Alert>
            </BoxBckgr>
        )
    }
    else if(props.investigations.loading || props.patientsSubmissions.loading){
        return <Loader />
    }
    else{
        let years = yearsFromDate(parseInt(patient.personalData.birthdate));
        let stay = daysFromDate(props.dateIn);

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
                            props.investigations.data[0].surveys.map(dataCollection => {
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
                                    ID: {patient.uuid}
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
    
}

const mapStateToProps = (state) =>{
    return {
        investigations : state.investigations,
        patientsSubmissions:state.patientsSubmissions
    }
}
export default connect(mapStateToProps, null)(Patient)