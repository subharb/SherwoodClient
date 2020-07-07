import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import { generateKey } from '../utils';
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
            options:[],
            option : {
                "value" : "id",
                "text" : "code"
            },
            optionsUrl: process.env.REACT_APP_API_URL+"/countries",
            label:"register.personal_info.surnames",
            shortLabel: "register.personal_info.surnames",
            validation : "notEmpty"
        }
    },
    "contact_info" : {
        "email":{
            required : true,
            type:"text",
            label:"register.contact_info.email",
            shortLabel: "register.contact_info.email",
            validation : "validEmail"
        },
        "phone" : {
            required : true,
            type:"text",
            label:"register.contact_info.phone",
            shortLabel: "register.contact_info.phone",
            validation : "validPhone"
        },
    },
    "password" : {
        "password":{
            required : true,
            type:"password",
            label:"register.password.password",
            shortLabel: "register.password.password",
            validation : "textMin6"
        },
        "repeat_password":{
            required : true,
            type:"password",
            label:"register.password.repeat_password",
            shortLabel: "register.password.repeat_password",
            validation : "equalTo",
            validationField: "password"
        },
    }
    
}
export default class Register extends Component {
    constructor(props){
        super(props);
        this.sections = ["personal_info", "contact_info", "password", "key_generation"]
        this.state = {selected:2, info : {}}

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
    componentDidMount(){

    }
    render() {
        const currentSection  = this.sections[this.state.selected];
        
        return ([
            <Header key="header"/>,
            <div className="container" key="container">
                <Breadcrumb callBack={this.crumbSelected} selected={this.state.selected} stages={["Personal Info", "Contact Info", "Key Generation"]} />    
                <p><Translate id={`register.${currentSection}.explanation`} /></p>
                <div className="row">
                    <div className="col s5 offset-s4">
                        <div className="row">
                            {
                                generateKey(80)
                            }
                            <Form fields={forms[currentSection]} callBackForm={this.saveData} />
                        </div>
                    </div>
                </div>
            </div>
        ]
        )
    }
}
