import React from 'react'
import { Translate } from 'react-localize-redux';
import Form from '../../general/form';

const PERSONAL_DATA_FIELDS = {
    "name" : {
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_data.fields.name",
        shortLabel:"investigation.create.personal_data.fields.name",
        validation : "textMin2"
    },
    "surname" : {
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_data.fields.surname",
        shortLabel:"investigation.create.personal_data.fields.surname",
        validation : "textMin2"
    },
    "address" : {
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_data.fields.address",
        shortLabel:"investigation.create.personal_data.fields.address",
        validation : "textMin2"
    },
    "health_id" : {
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_data.fields.health_id",
        shortLabel:"investigation.create.personal_data.fields.health_id",
        validation : "textMin2"
    },
    "national_id" : {
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_data.fields.national_id",
        shortLabel:"investigation.create.personal_data.fields.national_id",
        validation : "textMin2"
    },
    "email" : {
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_data.fields.email",
        shortLabel:"investigation.create.personal_data.fields.email",
        validation : "textMin2"
    },
    "phone" : {
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_data.fields.phone",
        shortLabel:"investigation.create.personal_data.fields.phone",
        validation : "textMin2"
    }
}

export default function PersonalData(props) {
    function callBackData(values){
        console.log("CallbackData!", values);
        let tempValues = Object.keys(values).filter(key => {
            return values[key] === true;
        });
        props.callBackData(tempValues);
    }
    return (
        <div className="container">
                <div className="row">
                    <h3><Translate id="investigation.create.personal_data.title" /></h3>
                </div>
                <div className="row">
                    <p>
                        <Translate id="investigation.create.personal_data.intro" />
                    </p>
                </div>
                <div>
                    <Form initialData={props.initialData} 
                            fields={PERSONAL_DATA_FIELDS} submitText = "investigation.create.continue"
                            cancelText = "investigation.create.back"
                            callBackForm={(values) => callBackData(values)} />
                </div>
        </div>
    )
}
