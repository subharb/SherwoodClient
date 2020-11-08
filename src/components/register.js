import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Translate } from 'react-localize-redux';
import Modal from './general/modal';
import Header from './general/header';
import Form from '../components/general/form';
import { generateKey, encriptData, decryptData, isUserLoggedIn } from '../utils';
import Breadcrumb from './general/breadcrumb';
import styled from 'styled-components';
import { toggleLoading } from '../actions';
import successImage from '../img/7893-confetti-cannons.gif';
import { withRouter } from 'react-router-dom';

const SpanError = styled.span`
    color:red;
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
            label:"register.common.personal_info.name",
            shortLabel: "register.common.personal_info.name",
            validation : "notEmpty"
        },
        "surnames" : {
            required : true,
            type:"text",
            label:"register.common.personal_info.surnames",
            shortLabel: "register.common.personal_info.surnames",
            validation : "notEmpty"
        },
        "country" : {
            required : true,
            type:"select",
            defaultOption:{"text" : "register.common.personal_info.country", "value" : ""},
            options:[],
            option : {
                "value" : "id",
                "text" : "code"
            },
            optionsUrl: process.env.REACT_APP_API_URL+"/countries",
            label:"register.common.personal_info.country",
            shortLabel: "register.common.personal_info.country",
            validation : "notEmpty"
        }
    },
    "contact_info" : {
        "email":{
            required : true,
            type:"text",
            label:"register.common.contact_info.email",
            shortLabel: "register.common.contact_info.email",
            validation : "validEmail"
        },
        "phone" : {
            required : true,
            type:"text",
            label:"register.common.contact_info.phone",
            shortLabel: "register.common.contact_info.phone",
            validation : "validPhone"
        },
    },
    "password" : {
        "password":{
            required : true,
            type:"password",
            label:"register.common.password.password",
            shortLabel: "register.common.password.password",
            validation : "textMin6"
        },
        "repeat_password":{
            required : true,
            type:"password",
            label:"register.common.password.repeat_password",
            shortLabel: "register.common.password.repeat_password",
            validation : "equalTo",
            validationField: "password"
        },
    },
    "key_generation" : {
        "confirm":{
            required : true,
            type:"text",
            label:"register.common.key_generation.confirm",
            shortLabel: "register.key_generation.confirm",
            validation : "equalTo",
            validationValue: "register.common.key_generation.confirm"
        }
    }
}
class Register extends Component {
    constructor(props){
        super(props);
        this.iv = null;
        this.sections = props.match.params.type === "researcher" ?  ["personal_info", "contact_info", "password", "key_generation"] : ["password", "key_generation"];
        this.state = {selected:0, info : {}, key : null, success : false, errorMessage : null}

        this.generateKey = this.generateKey.bind(this);
        this.saveData = this.saveData.bind(this);
        this.continue = this.continue.bind(this);
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
            this.props.toggleLoading();
            //Trato los datos que voy a enviar
            delete tempState.info.repeat_password;
            const hashPassword = CryptoJS.SHA256(tempState.info.password).toString(CryptoJS.enc.Base64)
            //Hay que guardar tb el this.iv
            tempState.info.keyEncrypted = await encriptData(tempState.key, tempState.info.password);//await this.encodeKeyResearcher(tempState.info.password, this.state.key);
            tempState.info.password = hashPassword;
            console.log(JSON.stringify(tempState.info));
            let response = null
            
            if(this.props.match.params.type === "researcher"){
                response = await axios.post(process.env.REACT_APP_API_URL+'/researcher/register', tempState.info)
                            .catch(err => {console.log('Catch', err); return err;}); 
            }
            else if(this.props.match.params.type === "patient" && typeof this.props.match.params.uuidPatient !== undefined){
                response = await axios.put(process.env.REACT_APP_API_URL+'/patient/register/'+this.props.match.params.uuidPatient, tempState.info)
                            .catch(err => {console.log('Catch', err); return err;}); 
            }
            else{
                //Si no es ninguno de los dos algo raro pasa.
                throw "Error";
            }
         
            if(response.request.status === 200){
                tempState.success = true;
            }
            else{
                tempState.success = false;
                if(response.request.status === 401){
                    tempState.errorMessage = "email_error";
                }
                else if(response.request.status === 402){
                    tempState.errorMessage = "account_registered";
                }
            }
            this.props.toggleLoading();
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
    }
    continue(){
        console.log("Success!");
        this.setState({success : false});
        this.props.history.push("/"+this.props.match.params.type+"/login");
    }  
    render() {
        console.log("Register!");
        const currentSection  = this.sections[this.state.selected];
        
        let content = null;
        //Si no es key_generation fase
        if(this.sections[this.state.selected] !== "key_generation"){
            content = <Form fields={forms[currentSection]} callBackForm={this.saveData} />
        }
        else{
            if(this.sections[this.state.selected] === "key_generation" && this.state.key === null){
                this.generateKey(); 
            }
            content = [<ParaKey>{ this.state.key }</ParaKey>, <Form fields={forms[currentSection]} callBackForm={this.saveData} />];
        }

        return ([
            <Modal key="modal" open={this.state.success} title={<Translate id="register.common.success_title" />}
                    component={<SuccessContainer>
                                <ImageSuccess src={successImage} width="200" alt="Success!" />
                                <SuccessText><Translate id={`register.${this.props.match.params.type}.success_text`} /></SuccessText>
                                </SuccessContainer>} 
                    callBackForm={this.continue}/>,
            <Header isLoggedIn={isUserLoggedIn} key="header"/>,
            <div className="container" key="container">
                <Breadcrumb callBack={this.crumbSelected} selected={this.state.selected} stages={this.sections} />    
                <p><Translate id={`register.${this.props.match.params.type}.${currentSection}.explanation`} /></p>
                <div className="row">
                    <div className="col s5 offset-s4">
                        <div className="row">
                            { content }
                            {this.state.errorMessage && 
                                <SpanError><Translate id={`register.${this.props.match.params.type}.error.${this.state.errorMessage}`} /></SpanError>
                            }
                        </div>
                    </div>
                </div>
            </div>
        ])
    }
}

Register.propTypes = {
    
}

export default withRouter(connect(null, { toggleLoading })(Register))