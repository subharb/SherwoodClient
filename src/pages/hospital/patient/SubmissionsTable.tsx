import React, { useState } from 'react';
import SurveyRecordsTable from '../SurveyRecordsTable';
import { EnhanceTableAction, IField, ISubmission, ISurvey } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import { CATEGORY_DEPARTMENT_PRESCRIPTIONS } from '../../../constants';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import Modal from '../../../components/general/modal';
import { DocumentPDF } from '../Document';
import SubmissionPDF from './SubmissionPDF';

interface SubmissionsTableProps {
    locale:string,
    fieldsSurvey?: IField[],
    surveys: ISurvey[],
    filteredRecords: ISubmission[],
    category: number,
    onSelectSubmission: (index:number) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ locale, surveys, category, fieldsSurvey, filteredRecords, 
                                                        onSelectSubmission }) => {
    const [showModalPrintPDF, setShowModalPrintPDF] = useState(false);
    const [submissionPrint, setSubmissionPrint] = useState<ISubmission | null>(null);
       
    function printSubmission(submission:ISubmission){
        setSubmissionPrint(submission);
        console.log("print submission "+JSON.stringify(submission));
        setShowModalPrintPDF(true);
    }
    function renderPDFModal(){
        const currentSurvey = surveys.find((survey) => survey.uuid === submissionPrint?.uuidSurvey);
        return(
            <Modal key="modal" fullWidth medium open={showModalPrintPDF} title="" closeModal={() => setShowModalPrintPDF(false)}>
                <DocumentPDF size='A4' name={""}>
                    <SubmissionPDF submission={submissionPrint!} currentSurvey={currentSurvey!} locale={locale} 
                        logoBlob={""} hospitalName={""} address={""} city={""} phone={""} email={""} />
                </DocumentPDF>
            </Modal>
        )
    }
    if(fieldsSurvey){
        return <SurveyRecordsTable fields={fieldsSurvey} submissions={filteredRecords} 
                    locale={locale}
                    onSelectSubmission={(index) => onSelectSubmission(index)}  />
    }
        
    let headCells = [{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "surveyName", alignment: "left", label: <Translate id="hospital.data-collection" />},
                        { id: "date", alignment: "left", label: "Date"}];
    let actions:EnhanceTableAction[] = [];
    if(category === CATEGORY_DEPARTMENT_PRESCRIPTIONS){
        actions = [{"type" : "pdf", "func" : (index) => printSubmission(filteredRecords[index])}]
    }
    return(
        <>
            {renderPDFModal()}
            <EnhancedTable noHeader noSelectable selectRow={(index:number) => onSelectSubmission(index)} 
            rows={filteredRecords.map((record, index) => {
                const dateCreatedString = record.createdAt ? new Date(record.createdAt).toISOString().slice(0, 16).replace('T', ' ') : "Unsincronized";
                return({id : index, researcher : record.researcher, surveyName : record.surveyName, date : dateCreatedString})
            })} headCells={headCells} 
                actions={actions} /> 
        </>
        
    )
    return (
        <>
            
        </>
    );
};

export default SubmissionsTable;
