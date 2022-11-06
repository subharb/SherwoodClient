import React, { useEffect } from 'react';
import { ISurvey } from '../../../constants/types';
import RequestForm from './RequestForm';
import RequestTable from './RequestTable';
import RequestTableComponent from './RequestTable';

interface RequestComboProps {
    serviceType: number;
    uuidPatient:string,
    uuidInvestigation:string,
    showForm:boolean,
    surveys:ISurvey[],
    encryptionData:{
        encryptedKeyUsed:number,
        keyResearcherInvestigation:string,
        permissions:any[],
        personalFields:any[],
    }
    
}

const RequestCombo: React.FC<RequestComboProps> = ({ serviceType, uuidPatient,surveys,  uuidInvestigation, showForm: showFormProps, encryptionData }) => {
    const [showForm, setShowForm] = React.useState(Boolean(showFormProps));

    useEffect(() => {
        setShowForm(Boolean(showFormProps));
    },[showFormProps]);

    function flipToRequestTable(){
        setShowForm(false);
    }
    if(showForm){
        return <RequestForm serviceType={serviceType} uuidPatient={uuidPatient} 
                    uuidInvestigation={uuidInvestigation} callBackRequestFinished={flipToRequestTable}/>
    }
    return (
        <RequestTable serviceType={serviceType} encryptionData={encryptionData} showActions={false}
            surveys = {surveys} fillPending={false}
            uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} callBackRequestEdit={() => console.log("callBackSurveySelected")} />
    );
};

export default RequestCombo;
