import React, { useEffect, useMemo } from 'react';
import ShowRecordsSection from '../../components/investigation/show/single/show_records_section';
import { filterRecordsFromSection } from '../../utils';
import { ISurvey } from '../../constants/types';
import Loader from '../../components/Loader';
import { getSubmissionPatientService } from '../../services';
import { useSelector } from 'react-redux';
import { get, isNumber } from 'lodash';

interface ShowSubmissionPatientProps {
    surveys:ISurvey[],
    forceEdit:boolean,
    submission?:any,
    idSubmission?:number,
    callBackEditSubmission: (idSubmission:number, uuidSection:string, submission:any) => void,
}

const ShowSingleSubmissionPatient: React.FC<ShowSubmissionPatientProps> = ({ surveys, forceEdit, submission, idSubmission, callBackEditSubmission }) => {
    const uuidInvestigation = useSelector((state:any) => state.investigations.currentInvestigation.uuid);
    
    const [submisionLocal, setSubmissionLocal] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(isNumber(idSubmission));
    
    const submissionCached = useMemo(() => {
        if(submission){
            return submission;
        }
        return submisionLocal;
    }, [submission, submisionLocal]);
    
    useEffect(() => {
        async function getSubmission() {
            setLoading(true);
            const sub = await getSubmissionPatientService(uuidInvestigation, idSubmission, false);
            setSubmissionLocal(sub.submission);
            setLoading(false);
        }
        if(idSubmission && !submission){
            getSubmission();   
        }    
    }, [idSubmission, submission]);
    
    if(loading){
        return <Loader />
    }
    return <ShowSingleSubmissionPatientView surveys={surveys} forceEdit={forceEdit} submission={submissionCached} 
                callBackEditSubmission={(idSubmission:number, uuidSection:string, submission:any) => callBackEditSubmission(idSubmission, uuidSection, submission)}  />
};
const ShowSingleSubmissionPatientView: React.FC<ShowSubmissionPatientProps> = ({ surveys, forceEdit, callBackEditSubmission, submission }) => {

    const currentSurvey = surveys.find((sur:ISurvey) => sur.uuid === submission.uuidSurvey);
    const recordsSection = Object.values(currentSurvey!.sections).sort((a:any,b:any) => a.order - b.order).map((section:any) => {
   
        const recordsSection = filterRecordsFromSection(submission, section.uuid);

        return(
            <ShowRecordsSection forceEdit={forceEdit}
                callBackEditSubmission={(idSubmission:number, uuidSection:string) => {
                    callBackEditSubmission(idSubmission, uuidSection, submission)
                }} 
                records={recordsSection} section={section} uuidResearcher = {submission.uuidResearcher ? submission.uuidResearcher : submission.researcher.uuid}
                idSubmission = {submission.id}
                updatedAt={submission.updatedAt}/>
        )
    });
    return (
        <>
            {recordsSection}
        </>
    );
};

export default ShowSingleSubmissionPatient;
