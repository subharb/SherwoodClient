import React from 'react';
import SectionForm from '../../components/general/SectionForm';
import { IDepartment } from '../../constants/types';
import { useDispatch } from 'react-redux';
import { postSubmissionPatientAction, updateSubmissionPatientAction } from '../../redux/actions/submissionsPatientActions';

interface FillSurveyProps {
    idSubmission?:number,
    sectionSelected?:number,
    sections:any[],
    uuid: string,
    initData?:any,
    country:string,
    uuidInvestigation:string,
    uuidPatient:string,
    researcher:any,
    requestServiceId?:string,
    nameSurvey?:string,
    typeSurvey?:string,
    department?:IDepartment,
    alterSubmitButton?: (button:JSX.Element) => JSX.Element,
    callBackDataCollectionSaved: () => void
}

const FillSurvey: React.FC<FillSurveyProps> = ({ sectionSelected, uuid, sections, initData, 
                                                idSubmission, researcher, requestServiceId, nameSurvey,
                                                country, uuidInvestigation, uuidPatient, department, typeSurvey,
                                                alterSubmitButton, callBackDataCollectionSaved }) => {
    const dispatch = useDispatch();

    let fields:any[] = [];
    let sectionsSurvey = []
    if(sectionSelected){
        sectionsSurvey = [sectionSelected];
    }
    else{
        sectionsSurvey = sections;
    }

    async function saveRecords(data, buttonSubmitted){
        let postObj:{
            uuidSurvey: string;
            uuid_patient: string;
            id: number | undefined;
            surveyRecords: never[];
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
        
        data.forEach(fieldData => {
            //const sectionField = dataCollectionSelected.sections.find(section => section.fields.find(aField => aField.id === fieldData.surveyField.id));
            postObj.surveyRecords.push(fieldData); 
        });
        
        if(idSubmission){
            // Si hay initData, estamos actualizando
            await dispatch(updateSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, uuid, nameSurvey, idSubmission));
        }
        else{
            //setIndexSection(-1);
            
            console.log(data);
            await dispatch(postSubmissionPatientAction(postObj, uuidInvestigation, uuidPatient, uuid, nameSurvey, typeSurvey));

            
        }

        callBackDataCollectionSaved()
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
    return(
        <SectionForm initData={initData} key={uuid} 
            country={country} uuidInvestigation={uuidInvestigation}
            fields={fields} uuidPatient={uuidPatient} department={department}
            uuidSurvey = {uuid} alterSubmitButton={alterSubmitButton}
            callBackSectionForm = {(values:any, buttonSubmitted:any) => saveRecords(values, buttonSubmitted)}/>
    )
   
};

export default FillSurvey;
