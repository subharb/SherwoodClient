import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import Header from './general/header';
import Form from '../components/general/form';
import Breadcrumb from './general/breadcrumb';
import styled from 'styled-components';

const FormContainer = styled.div`
    display:flex;
    justify-content:center;
`;

const forms = {
    "personal_info" : {
        "name":{
            required : true,
            type:"text",
            label:"register.personal_info.name",
            shortLabel: "register.personal_info.name",
            validation : "notEmpty"
        },
        "surnames" : {
            required : true,
            type:"text",
            label:"register.personal_info.surnames",
            shortLabel: "register.personal_info.surnames",
            validation : "notEmpty"
        },
        "country" : {
            required : true,
            type:"select",
            defaultOption:{"text" : "register.personal_info.country", "value" : ""},
            options:[{"text" : "investigation.create.survey.type_text", "value" : "text"},
                    {"text": "investigation.create.survey.type_number", "value" : "number"}, 
                    {"text": "investigation.create.survey.type_date", "value" : "date"}],
            label:"register.personal_info.surnames",
            shortLabel: "register.personal_info.surnames",
            validation : "notEmpty"
        }
    },
    "contact_info" : {
        "email":{
            required : true,
            type:"text",
            label:"register.personal_info.email",
            shortLabel: "register.personal_info.email",
            validation : "notEmpty"
        },
        "phone" : {
            required : true,
            type:"text",
            label:"register.personal_info.phone",
            shortLabel: "register.personal_info.phone",
            validation : "notEmpty"
        },
    },
    "key_generation" : {

    }
    
}
export default class Register extends Component {
    constructor(props){
        super(props);
        this.sections = ["personal_info", "contact_info", "key_generation"]
        this.state = {selected:0, info : {}}

        this.saveData = this.saveData.bind(this);
    }
    crumbSelected(index){
        console.log(`Index selected ${index}`);
    }
    saveData(data){
        let tempState = this.state;
        //Si es el último caso
        if(tempState.selected === this.sections.length){

        }
        else{
            tempState.info[this.sections[tempState.selected]] = data;
            tempState.selected++;
        }
        this.setState(tempState);

    }
    render() {
        const currentSection  = this.sections[this.state.selected];
        return ([
            <Header key="header"/>,
            <div class="container">
                <Breadcrumb callBack={this.crumbSelected} selected={this.state.selected} stages={["Personal Info", "Contact Info", "Key Generation"]} />    
                <p><Translate id={`register.${currentSection}.explanation`} /></p>
                <div className="row">
                    <div class="col s5 offset-s4">
                        <div className="row">
                            <Form fields={forms[currentSection]} callBackForm={this.saveData} />
                        </div>
                    </div>
                </div>
            </div>
        ]
        )
    }
}
