import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Translate, withLocalize } from 'react-localize-redux';
import _ from 'lodash';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { toggleLoading } from '../../../actions';
import {DeleteHolder, EditConsent} from "../../general/mini_components";
import Table from '../../general/table';

const FIELDS_FORM = {
    "required":{
        required : false,
        type:"checkbox",
        label:"investigation.create.consent.is_required",
        shortLabel: "investigation.create.consent.is_required",
        validation : "notEmpty"
    },
    "consent":{
        required : true,
        type:"text",
        label:"investigation.create.consent.consent",
        shortLabel: "investigation.create.consent.consent",
        validation : "notEmpty"
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.consent.name",
        shortLabel: "investigation.create.consent.name",
        validation : "notEmpty",
        is_personal_data:true
    }
}

const PERSONAL_FORM = {
    "required":{
        required : false,
        type:"checkbox",
        label:"investigation.create.consent.is_required",
        shortLabel: "investigation.create.consent.is_required",
        validation : "notEmpty",
        defaultValue : true
    },
    "reason" : {
        required : true,
        type:"text",
        label:"investigation.create.consent.reason",
        shortLabel: "investigation.create.consent.reason",
        validation : "notEmpty",
        is_personal_data:true
    }
}

/**
 * Component that saves patients that want to be included in an investigation
 */
class AddConsents extends Component {
    constructor(props){
        super(props);

        this.currentFormModal = PERSONAL_FORM;
        this.handleConsent = this.handleConsent.bind(this);
        this.deleteConsent = this.deleteConsent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveConsents = this.saveConsents.bind(this);
        this.renderConsents = this.renderConsents.bind(this);
        this.addConsent = this.addConsent.bind(this);
        
        let consents = {};
        if(props.consents){
            consents = props.consents;
        }
        this.state = {addingConsent : false, consents : consents}
    }
    
    saveConsents(){
        console.log("saveconsent", this.state.consents);
        //Comprobar 
        this.props.callBackData(this.state.consents);
    }
    closeModal(){
        console.log("Cerramos modal");
        this.setState({addingConsent : false});
    }
    handleConsent(value){
        console.log("Callback handleConsent:", value);
        let tempState = {...this.state};
        //Estoy añadiendo un consentimiento de dato personal?
        console.log(this.currentFormModal.reason);
        let tempbObj = {};
        if(this.currentFormModal.hasOwnProperty("reason")){
            tempbObj = {value : value.reason, required: value.required, is_personal_data : true};
            tempState.consents[this.currentFormModal.reason.callBackParam] = tempbObj; 
        }
        else{
            tempbObj = {value : value.consent, is_personal_data : false};
            tempState.consents[value.name] = tempbObj; 
        }
        
        tempState.addingConsent = false;
        this.currentFormModal = null;
        this.setState(tempState);
    }
    deleteConsent(key){
        console.log("Delete ", key);
        let tempState = {...this.state};
        delete tempState.consents[key];
        this.setState(tempState);
    }
    addConsent(){
        this.currentFormModal = FIELDS_FORM;
        this.setState({addingConsent : true});

    }
    addReasonPersonal(field){
        this.currentFormModal = PERSONAL_FORM;
        this.currentFormModal.reason.callBackParam = field;
        this.setState({addingConsent : true});
    }
    renderPersonalDataReason(){
        console.log(this.props.personalFields);
        if(this.props.personalFields.length > 0){
            return <Table header={["investigation.create.consent.field", "investigation.create.consent.reason", "investigation.create.consent.required"]} 
                    values={this.props.personalFields.map((field, idx) => {
                        return [field.name, this.state.consents.hasOwnProperty(field.name) ? 
                            <div>{this.state.consents[field.name].value}<EditConsent onClick={() => this.addReasonPersonal(field.name)} className="material-icons">edit</EditConsent></div> : 
                            <button data-testid="add-personal-consent" className="add-personal-consent btn-floating btn-small waves-effect waves-light red" onClick={() => this.addReasonPersonal(field.name)} ><i className="material-icons">add</i></button>,
                            field.required
                        ]
                        
                    })}/>
        }
    }
    renderConsents(){
        console.log("RenderConsents");
        const nonPersonalConsents = {};
        Object.keys(this.state.consents).forEach(key => {
            const consent = this.state.consents[key];
            if(!consent.is_personal_data){
                nonPersonalConsents[key] = consent;
            }
        });
        console.log(nonPersonalConsents);
        if(!_.isEmpty(nonPersonalConsents)){
            return([
                <table key="table-fields" className="striped">
                    <thead>
                    <tr>
                        <th key="consent">{this.props.translate("investigation.create.consent.consent")}</th>
                        <th key="delete">{this.props.translate("general.delete")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(nonPersonalConsents).map((key) => {
                            const field = nonPersonalConsents[key];
                            return(
                                <tr key={key}>
                                    <td>{field.value}</td>
                                    <td><DeleteHolder data-testid="delete" onClick={() => this.deleteConsent(key)}><i className="material-icons">delete</i></DeleteHolder></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>,
            ]);
        }
    }
    render() {
        //El form se puede enviar si se han metido las razones de todos los datos personales, puede no haber más consentimientos
        const disableButton = this.props.personalFields.length > 0 && !this.props.personalFields.reduce((accumulator, pField) => {
            console.log("Reducing", pField);
            console.log(this.state.consents);
            return accumulator && this.state.consents.hasOwnProperty(pField.name);
        }, true);
        return ([
            <Modal key="modal" open={this.state.addingConsent} 
                title={this.props.translate("investigation.create.edc.add_field")} 
                component={<Form fields={this.currentFormModal} callBackForm={this.handleConsent} />} 
                closeCallBack={this.closeModal}
            />,
            <div key="container">
                <h4><Translate id="investigation.create.consent.title" /></h4>
                <p><Translate id="investigation.create.consent.explanation"/></p>
                {this.renderPersonalDataReason()}
                <p><Translate id="investigation.create.consent.other_consent"/>
                    <button data-testid="add-consent" className="add-consent btn-floating btn-large waves-effect waves-light red" onClick={this.addConsent} ><i className="material-icons">add</i></button>    
                </p>
                {this.renderConsents()}    
                <button data-testid="save-consents" disabled={disableButton} onClick={this.saveConsents} type="submit" key="save-consents" id="save-consents" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save")}<i className="material-icons right">send</i></button>          
                <button data-testid="cancel" onClick={this.props.stepBack} className="waves-effect waves-light btn red lighten-1 right">Back</button>
            </div>
        ])
    }
}

AddConsents.propTypes = {
    callBackData: PropTypes.func, 
    personalFields : PropTypes.array
}; 

function validate(values){
    const errors = {};

    // Object.keys(FIELDS_INVESTIGATION).forEach(key => {
    //     console.log(key);
    //     const validation = validateField({value : values[key], validation:FIELDS_INVESTIGATION[key].validation, required:FIELDS_INVESTIGATION[key].required})
    //     if(!validation.result){
    //         errors[key] = validation.messageCode;
    //     }
    // })
    return errors;
}
export default withLocalize(reduxForm({
    // a unique name for the form
    validate,
    form: 'addConsent'
  })(connect(null, { toggleLoading })(AddConsents)))
