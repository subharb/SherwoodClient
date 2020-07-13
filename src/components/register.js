import React, { Component } from 'react';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Translate } from 'react-localize-redux';
import Modal from './general/modal';
import Header from './general/header';
import Form from '../components/general/form';
import { generateKey, encriptData, decryptData } from '../utils';
import Breadcrumb from './general/breadcrumb';
import styled from 'styled-components';
import { toogleLoading } from '../actions';
import successImage from '../img/7893-confetti-cannons.gif';

const FormContainer = styled.div`
    display:flex;
    justify-content:center;
`;
const ParaKey = styled.p`

`;

const SuccessContainer = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
`;

const SuccessText = styled.div`
    padding:1rem;
`;

const ImageSuccess = styled.img`
    display: block;
    margin: 0 auto;
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
    },
    "key_generation" : {
        "confirm":{
            required : true,
            type:"text",
            label:"register.key_generation.confirm",
            shortLabel: "register.key_generation.confirm",
            validation : "equalTo",
            validationValue: "register.key_generation.confirm"
        }
    }
}
class Register extends Component {
    constructor(props){
        super(props);
        this.iv = null;
        this.sections = ["personal_info", "contact_info", "password", "key_generation"]
        this.state = {selected:0, info : {}, key : null, success : false}

        this.generateKey = this.generateKey.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    crumbSelected(index){
        console.log(`Index selected ${index}`); 
    }
    async encodeKeyResearcher(data, keyString){
        // Encrypt
        

        // let keyObj = await crypto.subtle.importKey(
        //     "jwk",
        //     {
        //         alg: "A256GCM",
        //         ext: true,
        //         k: keyString,
        //         key_ops: ["encrypt", "decrypt"],
        //         kty: "oct"
        //     },
        //     {
        //         "name":"AES-GCM",
        //         "length":256
        //     },
        //     true,
        //     ['encrypt','decrypt']
        // );
        // console.log(keyObj);
        // let enc = new TextEncoder();
        // let encoded = enc.encode(password);
        // // The iv must never be reused with a given key.
        // this.iv = window.crypto.getRandomValues(new Uint8Array(12));
        // let ciphertext = await window.crypto.subtle.encrypt(
        //     {
        //         name: "AES-GCM",
        //         iv: this.iv
        //     },
        //     keyObj,
        //     encoded
        // );
        // let buffer = new Uint8Array(ciphertext, 0, 5);
        // return buffer;
    }
    async saveData(data){
        let tempState = this.state;
        //Si es el último caso
        if(tempState.selected === this.sections.length -1){
            this.props.toogleLoading();
            //Trato los datos que voy a enviar
            delete tempState.info.repeat_password;
            const hashPassword = CryptoJS.SHA256(tempState.info.password).toString(CryptoJS.enc.Base64)
            tempState.info.key = await encriptData(tempState.key, tempState.info.password);//await this.encodeKeyResearcher(tempState.info.password, this.state.key);
            tempState.info.password = hashPassword;
            //Hay que guardar tb el this.iv
            console.log(JSON.stringify(tempState.info));
            tempState.success = true;
        }
        else{
            tempState.info = data;
            tempState.selected++;
        }
        this.setState(tempState);

    }
    async generateKey(){
        
        const researcherKey = await generateKey();
        console.log("researcherKey", researcherKey);
        this.setState({key:researcherKey});

        

        // const decrypted = await decryptData(encriptedData, "12345");

        // console.log("decrypted", decrypted);

        
        // // Decrypt
        

        // 'my message'
        

        // return originalText;
    }
    continue(){
        console.log("Success!");
    }
    render() {
        const currentSection  = this.sections[this.state.selected];
        
        let content = null;
        //Si es una de las 3 primeras secciones
        if(this.state.selected < 3){
            content = <Form fields={forms[currentSection]} callBackForm={this.saveData} />
        }
        else{
            if(this.sections[this.state.selected] === "key_generation" && this.state.key === null){
                this.generateKey(); 
            }
            content = [<ParaKey>{ this.state.key }</ParaKey>, <Form fields={forms[currentSection]} callBackForm={this.saveData} />];
        }

        return ([
            <Modal key="modal" open={this.state.success} title={<Translate id="register.key_generation.success_title" />}
                    component={<SuccessContainer>
                                <ImageSuccess src={successImage} width="200" alt="Success!" />
                                <SuccessText><Translate id="register.key_generation.success_text" /></SuccessText>
                                </SuccessContainer>} 
                    callBackForm={this.continue}/>,
            <Header key="header"/>,
            <div className="container" key="container">
                <Breadcrumb callBack={this.crumbSelected} selected={this.state.selected} stages={["Personal Info", "Contact Info", "Key Generation"]} />    
                <p><Translate id={`register.${currentSection}.explanation`} /></p>
                <div className="row">
                    <div className="col s5 offset-s4">
                        <div className="row">
                            { content }
                        </div>
                    </div>
                </div>
            </div>
        ]
        )
    }
}

export default (connect(null, { toogleLoading })(Register))