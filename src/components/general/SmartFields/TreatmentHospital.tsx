import React from 'react';
import props from '../../../theme/props';
import Form from '../form';

interface TreatmentHospitalProps {
    country : string
}

const FORM_CONTINUE = {
    "drug_selector":{
        required : false,
        type:"drug_selector",
        label:"Drug Selector",
        params : {
            chemicalComponent : true
        },
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "text":{
        required : false,
        type:"text",
        label:"Volume(ml)",
        shortLabel: "investigation.table.is_personal_data",
        validation : "number"
    }
}

const TreatmentHospital: React.FC<TreatmentHospitalProps> = ({ country }) => {
    return (
        <>
            <Form fields={FORM_CONTINUE} country={country}/>
        </>
    );
};

export default TreatmentHospital;
