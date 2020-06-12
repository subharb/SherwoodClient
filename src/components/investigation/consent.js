import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Translate, withLocalize } from 'react-localize-redux';
import FieldSherwood from '../FieldSherwood';
import Modal from '../general/modal';
import Form from '../general/form';
import { toogleLoading } from '../../actions';
import {DeleteHolder} from "../general/mini_components";

const FIELDS_FORM = {
    "consentment":{
        required : true,
        type:"text",
        label:"investigation.create.consentment.consentment",
        shortLabel: "investigation.create.consentment.consentment",
        validation : "notEmpty"
    }
}

/**
 * Component that saves patients that want to be included in an investigation
 */
class AddConsents extends Component {
    constructor(props){
        super(props);

        this.handleConsent = this.handleConsent.bind(this);

        this.deleteConsent = this.deleteConsent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveConsents = this.saveConsents.bind(this);
        
        this.state = {addingConsentment : false, consents : []}
    }
    
    saveConsents(){
        console.log("saveConsentment", this.state.consents);
        this.props.callBackData(this.state.patientsEmail);
    }
    addConsentment(){
        console.log("Nuevo consentimiento!");
        this.setState({addingConsentment : true});
    }
    closeModal(){
        console.log("Cerramos modal");
        this.setState({addingConsentment : false});
    }
    handleConsent(value){
        console.log("Callback:", value);
        let tempState = {...this.state};
        tempState.patientsEmail.push(value.email);
        tempState.addingConsentment = false;
        this.setState(tempState);
    }
    deleteConsent(index){
        console.log("Delete ", index);
        let tempState = {...this.state};
        tempState.consents.splice(index, 1);
        this.setState(tempState);
    }
    renderPersonalDataReason(){
        console.log(this.props.personalFields);
    }
    renderConsents(){
        if(this.props.fields.length > 0){
            return([
                <table key="table-fields" className="striped">
                    <thead>
                    <tr>
                        <th key="email">{this.props.translate("investigation.create.add_patients.email")}</th>
                        <th key="delete">{this.props.translate("general.delete")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.patientsEmail.map((field, idx) => {
                            return(
                                <tr key={field}>
                                    <td>{field}</td>
                                    <td><DeleteHolder data-testid="delete" onClick={() => this.deleteEmail(idx)}><i className="material-icons">delete</i></DeleteHolder></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>,
                <button data-testid="save-patients" onClick={this.saveConsents} type="submit" key="save-patients" id="save-patients" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save")}<i className="material-icons right">send</i></button>
                ]);
        }
    }
    render() {
        return ([
            <Modal key="modal" open={this.state.addingConsentment} 
                title={this.props.translate("investigation.create.survey.add_field")} 
                component={<Form fields={FIELDS_FORM} callBackForm={this.handleConsent} />} 
                closeCallBack={this.closeModal}
            />,
            <div key="container">
                <h4><Translate id="investigation.create.consentment.title" /></h4>
                <p><Translate id="investigation.create.consentment.explanation"/></p>
                <p><Translate id="investigation.create.consentment.personal_data"/></p>
                {this.renderPersonalDataReason()}
                <button data-testid="add-email" className="add-email btn-floating btn-large waves-effect waves-light red" onClick={this.addPatientEmail} ><i className="material-icons">add</i></button>    
                {this.renderConsents()}              
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
    form: 'addConsentment'
  })(connect(null, { toogleLoading })(AddConsents)))
