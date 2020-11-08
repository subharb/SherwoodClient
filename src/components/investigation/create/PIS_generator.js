import React, { Component } from 'react';
import Form from '../../general/form';
import { Translate, withLocalize } from 'react-localize-redux';

const FIELDS_PIS= {
    "pis_version":{
        required : true,
        type:"text",
        label:"investigation.create.pis.pis_version",
        validation : "textMin2",
        value: ""
    },
    "pis_date":{
        required : true,
        type:"date",
        label:"investigation.create.pis.date",
        validation : "notEmpty",
        value: ""
    },
    "participants_age":{
        required : true,
        type:"select",
        label: "investigation.create.pis.participants_age",
        validation : "notEmpty",
        defaultOption:{"text" : "investigation.create.survey.choose", "value" : ""},
        options : [
                {"text" : "investigation.create.pis.ages.adult", "value" : "18+"},
                {"text" : "investigation.create.pis.ages.children11-16", "value" : "11-16"},
                {"text" : "investigation.create.pis.ages.children5-10", "value" : "5-10"},
                {"text" : "investigation.create.pis.ages.children<5", "value" : "5-"},
                {"text" : "investigation.create.pis.ages.healthy_volunteers", "value" : "5-"},
            ],
        value: ""
    },
    "introduction":{
        required : true,
        type:"textarea",
        label:"investigation.create.pis.introduction",
        validation : "notEmpty"
    }
}

export default class BasicInfo2 extends Component {
    saveInfo(values){
        console.log("Basic Info Filled!", values);
    }
    render() {
        return (
            <div>
                <h1><Translate id="investigation.create.pis.title" /></h1>
                <blockquote>
                    <Translate id="investigation.create.pis.intro" options={{ renderInnerHtml: true }}></Translate>
                </blockquote>
                <Form fields={FIELDS_PIS} callBackForm={this.saveInfo} />
            </div>
        )
    }
}
