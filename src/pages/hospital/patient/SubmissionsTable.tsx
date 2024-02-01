import React, { useState } from 'react';
import SurveyRecordsTable from '../SurveyRecordsTable';
import { EnhanceTableAction, IField, IPatient, ISubmission, ISurvey } from '../../../constants/types';
import { Translate } from 'react-localize-redux';
import { CATEGORY_DEPARTMENT_PRESCRIPTIONS } from '../../../constants';
import * as types from "../../../constants";
import Modal from '../../../components/general/modal';
import { DocumentPDF } from '../Document';
import SubmissionPDF from './SubmissionPDF';
import { Typography } from '@mui/material';
import { HOSPITAL_BILLING_EDIT } from '../../../routes/urls';
import { LinkStyled } from '../../../components/general/mini_components';
import { Link } from 'react-router-dom';
import { BillingInfo } from '../Billing/types';
import SubmissionsTableSelector from './SubmissionsTableSelector';
import { EnhancedTable } from '../../../components/general/EnhancedTable';

interface SubmissionsTableProps {
    locale:string,
    fieldsSurvey?: IField[],
    surveys: ISurvey[],
    records: ISubmission[],
    category: number,
    patient:IPatient,
    billingInfo: BillingInfo | null,
    onSelectSubmission: (index:number) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ locale, surveys, patient, billingInfo, category, fieldsSurvey, records, 
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
        if(!billingInfo){
            return(
                <Modal key="modal" fullWidth medium open={showModalPrintPDF} title="" closeModal={() => setShowModalPrintPDF(false)}>
                    <Typography variant='body2'><Translate id="pages.hospital.patient.fill_billing_info" />, <Link to={HOSPITAL_BILLING_EDIT}><Translate id="general.here" /></Link></Typography>
                </Modal>
            )
        }
        else if(currentSurvey){
            return(
                <Modal key="modal" fullWidth medium open={showModalPrintPDF} title="" closeModal={() => setShowModalPrintPDF(false)}>
                    <DocumentPDF size='A4' name={currentSurvey?.name}>
                        <SubmissionPDF submission={submissionPrint!} currentSurvey={currentSurvey!} locale={locale} 
                            patient={patient}
                            logoBlob={billingInfo.logoBlob} hospitalName={billingInfo.hospitalName} address={billingInfo.address} 
                            city={billingInfo.city} phone={billingInfo.phone} email={billingInfo.email} />
                    </DocumentPDF>
                </Modal>
            )
        }
        
    }
    if(surveys.length > 0 && [types.CATEGORY_DEPARTMENT_NURSE, types.CATEGORY_DEPARTMENT_NURSE_FW].includes(surveys[0].category)){
        return <SubmissionsTableSelector surveys={surveys} records={records} 
                    locale={locale} billingInfo={billingInfo}
                    onSelectSubmission={(index) => onSelectSubmission(index)}  />
    }
        
    let headCells = [{ id: "researcher", alignment: "left", label: <Translate id="hospital.doctor" />}, { id: "surveyName", alignment: "left", label: <Translate id="hospital.data-collection" />},
                        { id: "date", alignment: "left", label: "Date"}];
    let actions:EnhanceTableAction[] = [];
    if(category === CATEGORY_DEPARTMENT_PRESCRIPTIONS){
        actions = [{"type" : "pdf", "func" : (index) => printSubmission(records[index])}]
    }
    return(
        <>
            {renderPDFModal()}
            <EnhancedTable noHeader noSelectable selectRow={(index:number) => onSelectSubmission(index)} 
                rows={records.map((record, index) => {
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
