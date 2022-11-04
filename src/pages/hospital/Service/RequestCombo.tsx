import React, { useEffect } from 'react';
import RequestForm from './RequestForm';
import RequestTable from './RequestTable';
import RequestTableComponent from './RequestTable';

interface RequestComboProps {
    serviceType: number;
    uuidPatient:string,
    uuidInvestigation:string,
    showForm:boolean,
}

const RequestCombo: React.FC<RequestComboProps> = ({ serviceType, uuidPatient, uuidInvestigation, showForm: showFormProps }) => {
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
        <RequestTable serviceType={serviceType} uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} />
    );
};

export default RequestCombo;
