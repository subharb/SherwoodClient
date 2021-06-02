import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import iconImages from "../../img/icons/images.png";
import iconLab from "../../img/icons/lab.png";
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import Form  from '../../components/general/form';
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../components/general/EnhancedTable';
import { HOSPITAL_PATIENT_DATACOLLECTION, } from '../../routes';
import Loader from '../../components/Loader';

import {
    useLocation
  } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchSubmissionsSurveyAction } from '../../redux/actions/submissionsActions';

export function TestsHome(props){
    let location = useLocation();
    if(location.pathname === "/images"){
        return <TestsHomeComponent type={1} {...props} />
    }
    else if(location.pathname === "/lab"){
        return <TestsHomeComponent type={2} {...props}/>
    }
    else return null;
}

export function TestsHomeComponent(props) {
    const [ surveyRecords, setSurveyRecords] = useState([]);
    const [surveyTests, setSurveyTests] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const patients = props.patients.data && props.investigations.currentInvestigation ? props.patients.data[props.investigations.currentInvestigation.uuid] : [];
    const submissionData = props.submissions.data && surveyTests && props.investigations.currentInvestigation ? props.submissions.data[props.investigations.currentInvestigation.uuid][surveyTests.uuid].submissions : [];
    const dispatch = useDispatch(); 
    const translations = ["patient", "medical-imaging", "laboratory"];

    function goToSubmission(index){
        console.log(surveyRecords[index]);
        const patient = surveyRecords[index].patient
        const nextUrl = HOSPITAL_PATIENT_DATACOLLECTION.replace(":uuidPatient", patient.uuid).replace(":action", "show").replace(":uuidDataCollection", surveyTests.uuid);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
    function renderCore(){
        if(surveyRecords.length === 0){
            return <Translate id={`pages.hospital.${translations[props.type]}.no-records`} />
        }
        else{
            return (<EnhancedTable noHeader noSelectable selectRow={(index) => goToSubmission(index)} 
                rows={surveyRecords.map((record, index) => {
                    const dateCreated = new Date(record.createdAt);
                    return({id : index, researcher : record.researcher, patient : `${record.patient.personalData.name} ${record.patient.personalData.surnames}`, date : dateCreated.toISOString().slice(0, 16).replace('T', ' ')})
                })} headCells={[{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "patient", alignment: "left", label: <Translate id="investigation.create.personal_data.fields.name" />},
                                { id: "date", alignment: "left", label: "Date"}]} />
            );
        }
    }
    useEffect(() => {
        async function fetchRecordsPatient(){
            const survey = props.investigations.currentInvestigation.surveys.find(sur => sur.type === props.type);
            setLoading(true);
            await dispatch(fetchSubmissionsSurveyAction(props.investigations.currentInvestigation.uuid, survey.uuid));
            setSurveyTests(survey);
            setLoading(false);
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
        
    }, [submissionData])

    if(!props.submissions.data || loading){
        return(<Loader />);
    }
    
    return (
        <React.Fragment>
            <Grid container spacing={6} >
                <Grid container alignItems="center" alignContent="center" item xs={12}>
                    <Grid xs={2} style={{textAlign:"right"}}>
                        <img src={props.type === 0 ? iconImages : iconLab } alt="images" width="40" />
                    </Grid>
                    <Grid xs={8}>
                        <Typography variant="h1" gutterBottom display="inline" style={{marginBottom:"0px", color:"white"}}>
                            <Translate id={`pages.hospital.${translations[props.type]}.title`} />
                        </Typography>
                    </Grid>   
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

TestsHome.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(TestsHome)