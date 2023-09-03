import React, { useEffect } from 'react';
import SectionForm from '../../components/general/SectionForm';
import { IDepartment } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { postSubmissionPatientAction, updateSubmissionPatientAction } from '../../redux/actions/submissionsPatientActions';
import Loader from '../../components/Loader';
import { usePrevious } from '../../hooks';

interface FillSurveyProps {
    idSubmission?:number,
    sectionSelected?:number,
    sections:any[],
    uuid: string,
    initData?:any,
    country:string,
    uuidInvestigation:string,
    uuidPatient:string,
    requestServiceId?:string,
    nameSurvey?:string,
    typeSurvey?:string,
    department?:IDepartment,
    alterSubmitButton?: (button:JSX.Element) => JSX.Element,
    callBackDataCollectionSaved?: () => void
    callBackDataCollectionSavedWithData?:(data:any) => void
}

const FillSurvey: React.FC<FillSurveyProps> = ({ sectionSelected, uuid, sections, initData, 
                                                idSubmission, requestServiceId, nameSurvey,
                                                country, uuidInvestigation, uuidPatient, department, typeSurvey,
                                                alterSubmitButton, callBackDataCollectionSaved, callBackDataCollectionSavedWithData }) => {
    const [loading, setLoading] = React.useState(false);

    const submissionsSurvey = useSelector((state:any) => {
        console.log(state);
        if(state.patientsSubmissions.data && state.patientsSubmissions.data[uuidPatient] && state.patientsSubmissions.data[uuidPatient][uuid]){
            return state.patientsSubmissions.data[uuidPatient][uuid].submissions
        }
        return [];
        });
    const prevSubmissionsSurvey = usePrevious(submissionsSurvey, true);
    const dispatch = useDispatch();

    let fields:any[] = [];
    let sectionsSurvey = []
    if(sectionSelected){
        sectionsSurvey = [sectionSelected];
    }
    else{
        sectionsSurvey = sections;
    }

    useEffect(() => {
        const oldSubmissions = !prevSubmissionsSurvey ? [] : prevSubmissionsSurvey;
        if(submissionsSurvey.length !== oldSubmissions.length && callBackDataCollectionSavedWithData){
            const lastSubmission = submissionsSurvey[submissionsSurvey.length - 1];
            callBackDataCollectionSavedWithData(lastSubmission);
        }
    }, [submissionsSurvey]);

    useEffect(() => {
        console.log("FillSurvey");
    }, []);

    async function saveRecords(data:any, buttonSubmitted:string){
        setLoading(true);
        let postObj:{
            uuidSurvey: string;
            uuid_patient: string;
            id: number | undefined;
            surveyRecords: {[key:string]:string}[];
            requestInfo?: {
                requestId: number;
                completeRequest: boolean;
            };
        } =  {
            uuidSurvey:uuid, 
            uuid_patient:uuidPatient,
            id:idSubmission,
            surveyRecords:[]
        }
        if(requestServiceId){
            postObj = {
                uuidSurvey:uuid, 
                uuid_patient:uuidPatient,
                id:idSubmission,
                surveyRecords:[],
                requestInfo: {
                    requestId:parseInt(requestServiceId), 
                    completeRequest:buttonSubmitted === "button2"
                },
            }
        }
        
        data.forEach((fieldData:any) => {
            //const sectionField = dataCollectionSelected.sections.find(section => section.fields.find(aField => aField.id === fieldData.surveyField.id));
            postObj.surveyRecords.push(fieldData); 
        });
        
        if(idSubmission){
            // Si hay initData, estamos actualizando
            await dispatch(updateSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, uuid, nameSurvey, idSubmission));
        }
        else{
            await dispatch(postSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, uuid, nameSurvey, typeSurvey));
        }
        if(callBackDataCollectionSaved){
            callBackDataCollectionSaved();
        }
        
        setLoading(false);
        
    }
    
    sectionsSurvey.sort((a,b) => a.order - b.order)
        .forEach((section, index) =>{
            let  sectionFields = [...section.fields.sort((a:any,b:any) => a.order - b.order)]
    
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
    if(loading){
        return <Loader />
    }
    return(
        <SectionForm key={uuid} initData={initData}
            country={country} uuidInvestigation={uuidInvestigation}
            fields={fields} uuidPatient={uuidPatient} department={department}
            uuidSurvey = {uuid} alterSubmitButton={alterSubmitButton}
            callBackSectionForm = {(values:any, buttonSubmitted:any) => saveRecords(values, buttonSubmitted)}/>
    )
   
};

export default FillSurvey;
