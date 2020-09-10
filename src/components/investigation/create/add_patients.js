import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//NO HACE FALTA; USO FORM
import { reduxForm } from 'redux-form';
import { Translate, withLocalize } from 'react-localize-redux';
import { generateKey, encriptData } from '../../../utils';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { toggleLoading } from '../../../actions';
import {DeleteHolder} from "../../general/mini_components";

const FIELDS_FORM = {
    "email":{
        required : true,
        type:"text",
        label:"investigation.create.add_patients.email",
        shortLabel: "investigation.create.add_patients.email",
        validation : "validEmail"
    }
}

/**
 * Component that saves patients that want to be included in an investigation
 */
class AddPatients extends Component {
    constructor(props){
        super(props);

        this.addPatientEmail = this.addPatientEmail.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.renderPatients = this.renderPatients.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.savePatients = this.savePatients.bind(this);
        
        let patients = [];
        if(props.patients){
            patients = props.patients;
        }
        this.state = {addingPatient : false, patients : patients}
    }
    
    savePatients(){
        console.log("savePatients",this.state.patients);
        this.props.callBackData(this.state.patients);
    }
    addPatientEmail(){
        console.log("Nuevo paciente!");
        
        this.setState({addingPatient : true});
    }
    closeModal(){
        console.log("Cerramos modal");
        this.setState({addingPatient : false});
    }
    async handleAddField(value){
        console.log("Callback:", value);
        const patientRawKey = await generateKey();
        
        const tempKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const keyPatInvEncr = await encriptData(patientRawKey, tempKey);
        let tempState = {...this.state};
        tempState.patients.push({
            email:value.email,
            keyPatInvEncr : keyPatInvEncr,
            tempKey : tempKey
        });
        console.log("keyPatInvEncr", keyPatInvEncr);
        console.log("tempKey", tempKey);
        tempState.addingPatient = false;
        this.setState(tempState);
    }
    deleteEmail(index){
        console.log("Delete ", index);
        let tempState = {...this.state};
        tempState.patients.splice(index, 1);
        this.setState(tempState);
    }
    renderPatients(){
        if(this.state.patients.length > 0){
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
                        this.state.patients.map((field, idx) => {
                            return(
                                <tr key={field.email}>
                                    <td>{field.email}</td>
                                    <td><DeleteHolder data-testid="delete" onClick={() => this.deleteEmail(idx)}><i className="material-icons">delete</i></DeleteHolder></td>
                                </tr>)
                        })
                    }
                    </tbody>
                </table>,
                <button data-testid="save-patients" onClick={this.savePatients} type="submit" key="save-patients" id="save-patients" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save")}<i className="material-icons right">send</i></button>,
                <button data-testid="cancel" onClick={this.props.stepBack} className="waves-effect waves-light btn red lighten-1 right">Back</button>
                ]);
        }
    }
    render() {
        return ([
            <Modal key="modal" open={this.state.addingPatient} 
                title={this.props.translate("investigation.create.survey.add_field")} 
                component={<Form fields={FIELDS_FORM} callBackForm={this.handleAddField} />} 
                closeCallBack={this.closeModal}
                />,
            <div key="container">
                <h4><Translate id="investigation.create.add_patients.title" /></h4>
                <p><Translate id="investigation.create.add_patients.explanation" /></p>
                <button data-testid="add-email" className="add-email btn-floating btn-large waves-effect waves-light red" onClick={this.addPatientEmail} ><i className="material-icons">add</i></button>    
                {this.renderPatients()}              
            </div>
        ])
    }
    
}

AddPatients.propTypes = {
    callBackData: PropTypes.func
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
    form: 'newInvestigation'
  })(connect(null, { toggleLoading })(AddPatients)))
