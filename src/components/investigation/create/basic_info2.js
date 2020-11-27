import React, { Component } from 'react';
import Form from '../../general/form';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';

const FIELDS_INVESTIGATION = {
    "name":{
        required : true,
        type:"text",
        label:"investigation.create.edc.name",
        validation : "textMin2",
        value: ""
    },
    "acronym":{
        required : true,
        type:"text",
        label:"investigation.create.edc.acronym",
        validation : "notEmpty",
        value: ""
    },
    "type":{
        required : true,
        type:"select",
        label:"investigation.create.edc.type",
        validation : "notEmpty",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options : [
                {"text" : "investigation.create.edc.type_study.audit", "value" : "audit"},
                {"text" : "investigation.create.edc.type_study.clinical_research_study", "value" : "clin_res"},
                {"text" : "investigation.create.edc.type_study.medical_device", "value" : "med_dev"},
                {"text" : "investigation.create.edc.type_study.clinical_trial", "value" : "clin_trial"}
            ],
        value: ""
    },
    "researcher":{
        required : true,
        type:"text",
        label:"investigation.create.edc.principal_researcher",
        validation : "textMin2",
        value: ""
    },
    "other_researcher":{
        required : true,
        type:"options",
        element:"text",//El tipo de cada una de las opciones
        label:"investigation.create.edc.other_researchers",
        validation : "textMin2",
        value: ""
    },
    "institution":{
        required : true,
        type:"text",
        label:"investigation.create.edc.institution",
        validation : "textMin2",
        value: ""
    },
    "contact":{
        required : true,
        type:"text",
        label:"investigation.create.edc.contact",
        validation : "textMin2",
        value: ""
    },
    "ethics_body":{
        required : true,
        type:"text",
        label:"investigation.create.edc.ethics_body",
        validation : "textMin2",
        value: ""
    },
    "reference_number_state":{
        required : true,
        type:"select",
        label:"investigation.create.edc.reference_number_state",
        validation : "notEmpty",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options : [
                {"text" : "investigation.create.edc.reference_number_state_type.not_applicable", "value" : 0},
                {"text" : "investigation.create.edc.reference_number_state_type.pending", "value" : 1},
                {"text" : "investigation.create.edc.reference_number_state_type.approved", "value" : 2},
            ],
        value: "",
        activationValues : ["2"],
        activatedFields:[
            {
                required : true,
                name : "reference_number",
                type:"text",
                label:"investigation.create.edc.reference_number",
                validation : "textMin2",
                value: ""
            }
        ]
    },
    
}

export default class BasicInfo2 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3><Translate id="investigation.create.edc.title" /></h3>
                </div>
                    <Form initialData={this.props.initialData} 
                        fields={FIELDS_INVESTIGATION} submitText = "investigation.create.continue"
                        cancelText = "investigation.create.back"
                        callBackForm={(values) => this.props.callBackBasicInfo(values)} />
            </div>
        )
    }
}

BasicInfo2.propTypes = {
    callBackBasicInfo : PropTypes.func.isRequired

}