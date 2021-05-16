import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import iconImages from "../../img/icons/images.png";
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import Form  from '../../components/general/form';
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { HOSPITAL_PATIENT, HOSPITAL_PATIENT_DATACOLLECTION, } from '../../routes';
import Loader from '../../components/Loader';
import { decryptPatientsData } from '../../utils'; 
import PatientsTable from '../../components/general/PatientsTable';
import { Alert } from '@material-ui/lab';
import { ButtonBack } from '../../components/general/mini_components';
import { connect } from 'react-redux';
import { fetchSubmissionsSurveyAction } from '../../redux/actions/submissionsActions';

let personalFieldsForm = {};

function Images(props) {
    const [ surveyRecords, setSurveyRecords] = useState([]);
    const [surveyImages, setSurveyImages] = useState(null);
    const history = useHistory();

    const patients = props.patients.data && props.investigations.currentInvestigation ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    const submissionData = props.submissions.data && surveyImages && props.investigations.currentInvestigation ? props.submissions.data[props.investigations.currentInvestigation.uuid][surveyImages.uuid].submissions : [];
    const dispatch = useDispatch(); 

    function goToSubmission(index){
        console.log(surveyRecords[index]);
        const patient = surveyRecords[index].patient
        const nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidPatient", patient.uuid).replace(":action", "show").replace(":uuidDataCollection", surveyImages.uuid);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function renderCore(){
        return (<EnhancedTable noHeader noSelectable selectRow={(index) => goToSubmission(index)} 
                rows={surveyRecords.map((record, index) => {
                    const dateCreated = new Date(record.createdAt);
                    return({id : index, researcher : record.researcher, patient : `${record.patient.personalData.name} ${record.patient.personalData.surnames}`, date : dateCreated.toISOString().slice(0, 16).replace('T', ' ')})
                })} headCells={[{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "patient", alignment: "left", label: <Translate id="investigation.create.personal_data.fields.name" />},
                                { id: "date", alignment: "left", label: "Date"}]} />
        );
    }
    useEffect(() => {
        async function fetchRecordsPatient(){
            const survey = props.investigations.currentInvestigation.surveys.find(sur => sur.type === 1);
            setSurveyImages(survey);
            await dispatch(fetchSubmissionsSurveyAction(props.investigations.currentInvestigation.uuid, survey.uuid));
        }
        if(props.investigations.currentInvestigation){
            fetchRecordsPatient()
        }
    }, [props.investigations]);

    useEffect(() => {
        if(submissionData.length > 0){
            let tempSubmissions = submissionData.reduce((acc, val)=> {
                let tempDict = {};
                const researcher = val.researcher;
                tempDict.researcher = researcher.name+" "+researcher.surnames;

                const patient = patients.find(pat => pat.uuid === val.patient.uuid);
                tempDict.patient = patient;
                tempDict.createdAt = val.createdAt;

                return acc.concat(tempDict);
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
        
    }, [props.submissions])

    if(!props.submissions.data){
        return(<Loader />);
    }
    return (
        <React.Fragment>
            <Grid container spacing={6} >
                <Grid item xs={12} style={{display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}>
                    <img src={iconImages} alt="images"/>
                    <Typography variant="h1" gutterBottom display="inline" style={{marginBottom:"0px"}}>
                        <Translate id="pages.hospital.medical-imaging.title" />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                        {
                        renderCore()
                        }     
                </Grid>         
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {
        investigations:state.investigations,
        submissions:state.submissions,
        patients:state.patients
    }
}

Images.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(Images)