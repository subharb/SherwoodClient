import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate, withLocalize } from 'react-localize-redux';
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import axios from 'axios';
import { validateField } from '../../../utils';
import Form from '../../general/form';
import Modal from '../../general/modal';
import { toogleLoading } from '../../../actions';
import {DeleteHolder} from "../../general/mini_components";
import FieldSherwood from '../../general/FieldSherwood';

const FIELDS_FORM = {
    "is_personal_data":{
        required : false,
        type:"checkbox",
        label:"investigation.create.survey.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.survey.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.survey.choose",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.survey.choose", "value" : ""},
        options:[{"text" : "investigation.create.survey.type_text", "value" : "text"},
                {"text": "investigation.create.survey.type_number", "value" : "number"}, 
                {"text": "investigation.create.survey.type_date", "value" : "date"}]
                                        
    },
    "question" : {
        required : false,
        type:"text",
        label : "investigation.create.survey.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6"
    }
}

const FIELDS_INVESTIGATION = {
    "title":{
        required : false,
        type:"text",
        label:"investigation.create.survey.name",
        validation : "notEmpty",
        value: "TEST"
    },
    "description" : {
        required : true,
        type:"text",
        label:"investigation.create.survey.description",
        validation : "textMin2"
    }
}
/**
 * Component that renders the fields created and stores them in the server
 */
class CreateSurvey extends Component {
    
    constructor(props){
        super(props);

        this.addField = this.addField.bind(this);
        this.deleteField = this.deleteField.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.renderAddedFields = this.renderAddedFields.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //this.saveSurvey = this.saveSurvey.bind(this);
        let fields = []
        //Si se pasa por parametro una investigacion, la meto en el estado
        if(props.investigation){
            fields = props.investigation.survey.fields;
        }
        this.state = {fields : fields, addingField : false};
    }
    handleAddField(values){
        console.log("handleAddField", values);
        //Guardo el estado anterior
        let tempState = {...this.state};
        //Pongo a false el "addinField", para que desaparezca el formulario
        tempState.addingField = false;
        tempState.fields.push(values);

        this.setState(tempState);
    }
    closeModal(){
        console.log("Cerramos modal");
        this.setState({addingField : false});
    }
    addField(){
        if(!this.state.addingField){
            this.setState({addingField : true});
        }
    }
    /**
     * Function that deletes a field in the investigaton and updates this.state
     * 
     * @param {Object} field - Field to be validated
     * 
     */
    deleteField(field){
        console.log(field);
        //Recorro los campos ya añadidos y borro el que llega por parámetro
        let tempState = {...this.state};
        for(let i = 0; i < tempState.fields.length;i++){
            let aField = tempState.fields[i];
            if(aField === field){
                tempState.fields.splice(i, 1);
            }
        }
        this.setState(tempState);
    }

    renderAddedFields(){
        if(this.state.fields.length === 0){
            return <Translate id="investigation.create.survey.no_fields" />
        }
        else{
            return [<table key="table-fields" className="striped">
                        <thead>
                        <tr>
                            {Object.values(FIELDS_FORM).map(value => {
                                return (
                                    <th key={value.shortLabel}>{this.props.translate(value.shortLabel)}</th>
                                )
                            })}
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.fields.map(field => {
                                return(
                                    <tr key={field.name}>
                                        <td>{field.is_personal_data ? this.props.translate("general.yes") : this.props.translate("general.no")}</td>
                                        <td>{field.name}</td>
                                        <td>{field.type}</td>
                                        <td>{field.question}</td>
                                        <td><DeleteHolder onClick={() => this.deleteField(field)}><i className="material-icons">delete</i></DeleteHolder></td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>,
                    <button data-testid="save-investigation" type="submit" key="save-investigation" id="save-investigation" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save")}<i className="material-icons right">send</i></button>
            ]
        }
    }
    storeData(values){
        let surveyInfo = {...values};
        surveyInfo.fields = this.state.fields;
        this.props.callBackData(surveyInfo)
    }
    componentDidMount(){
        if(this.props.investigation){
            console.log("Hay props");
            this.props.initialize(this.props.investigation);
               
        }
    }
    render() {
        //Se ha enviado la info sin errores
        return([
            <Modal key="modal" open={this.state.addingField} 
                title={this.props.translate("investigation.create.survey.add_field")} 
                component={<Form fields={FIELDS_FORM} callBackForm={this.handleAddField} />} 
                closeCallBack={this.closeModal}
            />,
            <form key="form" className="form" onSubmit={this.props.handleSubmit(values => this.storeData(values))}  >
                <div key="content" className="row">
                    <div className="col-12">
                        <h4><Translate id="investigation.create.survey.title" /></h4>
                        <p><Translate id="investigation.create.survey.explanation" /></p>
                        <Field name="title" {...FIELDS_INVESTIGATION["title"]} component={FieldSherwood} />
                        <Field name="description"  {...FIELDS_INVESTIGATION["description"]} component={FieldSherwood} />
                        <Translate id="investigation.create.survey.add_field" />
                        <button data-testid="add-field" type="button"
                                className="add-field btn-floating btn-large waves-effect waves-light red" 
                                onClick={this.addField}><i className="material-icons">add</i>
                        </button>
                    </div>
                    <div>
                        { this.renderAddedFields() }
                    </div>
                </div>
            </form>
            ]
        );
        
    }
}
CreateSurvey.propTypes = {
    callBackData: PropTypes.func
}; 
function validate(values){
    const errors = {};

    Object.keys(FIELDS_INVESTIGATION).forEach(key => {
        console.log(key);
        const validation = validateField({value : values[key], validation:FIELDS_INVESTIGATION[key].validation, required:FIELDS_INVESTIGATION[key].required})
        if(!validation.result){
            errors[key] = validation.messageCode;
        }
    })
    return errors;
}
export default withLocalize(reduxForm({
    // a unique name for the form
    validate,
    form: 'newInvestigation'
  })(connect(null, { toogleLoading })(CreateSurvey)))