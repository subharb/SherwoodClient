import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Loader from '../../../components/Loader';
import { fetchSubmissionsSurveyAction } from '../../../redux/actions/submissionsActions';
import { HOSPITAL_PATIENT_SUBMISSION } from '../../../routes/urls';
import { PERMISSION } from '../../../components/investigation/share/user_roles';

interface ServiceRecordsProps {
    submissions:any,
    patients:any,
    investigations:any,
    type:number
}

const ServiceRecords: React.FC<ServiceRecordsProps> = ({ submissions, patients, investigations, type }) => {
    const [ surveyRecords, setSurveyRecords] = useState<any[]>([]);
    const [surveyTests, setSurveyTests] = useState<null | any>(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const patientsInvestigation = patients.data && investigations.currentInvestigation ? patients.data[investigations.currentInvestigation.uuid] : [];
    const submissionData = submissions.data && surveyTests && investigations.currentInvestigation ? submissions.data[investigations.currentInvestigation.uuid][surveyTests.uuid].submissions : [];
    const dispatch = useDispatch(); 
    const translations = ["patient", "medical-imaging", "laboratory"];

    function goToSubmission(index:number){
        console.log(surveyRecords[index]);
        const patient = surveyRecords[index].patient;
        const nextUrl = HOSPITAL_PATIENT_SUBMISSION.replace(":uuidPatient", patient.uuid).replace(":action", "show").replace(":idSubmission", surveyRecords[index].id);
        console.log("Next url", nextUrl);
        history.push(nextUrl);
    }
 
    useEffect(() => {
        async function fetchRecordsPatient(){
            const survey = investigations.currentInvestigation.surveys.find((sur:any) => sur.type === type);
            setLoading(true);
            await dispatch(fetchSubmissionsSurveyAction(investigations.currentInvestigation.uuid, survey.uuid));
            setSurveyTests(survey);
            setLoading(false);
        }
        if(investigations.currentInvestigation){
            fetchRecordsPatient()
        }
    }, [investigations]);

    useEffect(() => {
        if(submissionData.length > 0){
            let tempSubmissions = submissionData.reduce((acc:any, val:any)=> {
                let tempDict:any = {};
                const researcher = val.researcher;
                tempDict.researcher = researcher.name+" "+researcher.surnames;
                tempDict.id = val.id;
                const patient = patientsInvestigation.find((pat:any) => pat.uuid === val.uuidPatient);
                tempDict.patient = patient;
                tempDict.createdAt = val.createdAt;

                return acc.concat(tempDict);
            }, []);
            tempSubmissions.sort((a:any, b:any) => {
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

    if(!submissions.data || loading){
        return(<Loader />);
    }
    
    if(surveyRecords.length === 0){
        return <Translate id={`pages.hospital.${translations[type]}.no-records`} />
    }
    else{
        const hasPersonalPermmissions = investigations.currentInvestigation.permissions.includes(PERMISSION.PERSONAL_ACCESS);
        const headerTable = hasPersonalPermmissions ?  [{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "patient", alignment: "left", label: <Translate id="investigation.create.personal_data.fields.name" />},
        { id: "date", alignment: "left", label: "Date"}] : [{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "idPatient", alignment: "left", label: <Translate id="investigation.create.personal_data.fields.name" />},
        { id: "date", alignment: "left", label: "Date"}]
        return (<EnhancedTable noHeader noSelectable selectRow={(index:number) => goToSubmission(index)} 
            rows={surveyRecords.map((record, index) => {
                const dateCreated = new Date(record.createdAt);
                const patientName = record.patient ? `${record.patient.personalData.name} ${record.patient.personalData.surnames}` : "";
                return hasPersonalPermmissions ? {id : index, researcher : record.researcher, patient : patientName, date : `${dateCreated.toLocaleDateString()} ${dateCreated.toLocaleTimeString()}`} : 
                {id : index, researcher : record.researcher, idPatient : record.patient.id, date : `${dateCreated.toLocaleDateString()} ${dateCreated.toLocaleTimeString()}`}
                
            })} headCells={headerTable} />
        );
    }
};

export default ServiceRecords;
