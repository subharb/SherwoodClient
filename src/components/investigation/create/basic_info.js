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
import { toggleLoading } from '../../../actions';
import {DeleteHolder} from "../../general/mini_components";
import FieldSherwood from '../../general/FieldSherwood';
import Table from '../../general/table';

const FIELDS_FORM = {
    "encrypted":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "required":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.edc.choose",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
        options:[{"label" : "investigation.create.edc.type_text", "value" : "text"},
                {"label": "investigation.create.edc.type_number", "value" : "number"}, 
                {"label": "investigation.create.edc.type_date", "value" : "date"}]
                                        
    },
    "label" : {
        required : false,
        type:"text",
        label : "investigation.create.edc.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6"
    }
}

const FIELDS_INVESTIGATION = {
    "title":{
        required : false,
        type:"text",
        label:"investigation.create.edc.name",
        validation : "notEmpty",
        value: "TEST"
    },
    "description" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.description",
        validation : "textMin2"
    }
}
/**
 * Component that renders the fields created and stores them in the server
 */
class BasicInfo extends Component {
    
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
        if(props.investigation.edc.fields){
            fields = props.investigation.edc.fields;
        }
        this.state = { fields : fields, personalData: [], addingField : false };
    }
    handleAddField(values){
        console.log("handleAddField", values);
        //Guardo el estado anterior
        let tempState = {...this.state};
        //Pongo a false el "addinField", para que desaparezca el formulario
        tempState.addingField = false;
        //No quiero guardar el field tal cual viene de redux form, tiene demasiada informacion
        let newField = { 
                        required:values.required,
                        name : values.name, 
                        type:values.type,
                        question:values.question,
                    }
        if(values.encrypted){
            tempState.personalData.push(newField);
        }
        else{
            tempState.fields.push(newField);
        }

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
    renderPersonalFields(){
        if(this.state.personalData.length === 0){
            return <Translate id="investigation.create.edc.no_fields" />
        }
        else{
            const tempForm = {...FIELDS_FORM};
            delete tempForm.is_personal_data;
            const arrayHeader = Object.values(tempForm).map(value => value.shortLabel);
            //return this.state.personalData.map(element => <div key={element.name}>{element.question}</div>);
            return [<h5>Personal Fields</h5>,<Table key="added_fields" header={arrayHeader} 
                    values = {this.state.personalData.map(field => {let arrayFields = Object.values(field);
                    arrayFields.push(<DeleteHolder onClick={() => this.deleteField(field)}><i className="material-icons">delete</i></DeleteHolder>)
                    return arrayFields;
                })} />
            ]
        }
    }
    renderAddedFields(){
        if(this.state.fields.length === 0){
            return <Translate id="investigation.create.edc.no_fields" />
        }
        else{
            //Filtro si es un campo personal y añado el de borrar
            const tempForm = {...FIELDS_FORM};
            delete tempForm.is_personal_data;
            const arrayHeader = Object.values(tempForm).map(value => value.shortLabel);
            arrayHeader.push("delete");
            return [<h5>Fields</h5>,
                    <Table key="added_fields" header={arrayHeader} 
            values = {this.state.fields.map(field => {let arrayFields = Object.values(field);
                    arrayFields.push(<DeleteHolder onClick={() => this.deleteField(field)}><i className="material-icons">delete</i></DeleteHolder>)
                    return arrayFields;
                })} />]
        }
    }
    storeData(values){
        let surveyInfo = {...values};
        surveyInfo.fields = this.state.fields;
        surveyInfo.personalData = this.state.personalData;
        this.props.callBackData(surveyInfo)
    }
    componentDidMount(){
        if(this.props.investigation){
            console.log("Hay props");
            this.props.initialize(this.props.investigation);
        }
    }
    render() {
  
        return([
            <Modal key="modal" open={this.state.addingField} 
                title={this.props.translate("investigation.create.edc.add_field")} 
                component={<Form fields={FIELDS_FORM} callBackForm={this.handleAddField} />} 
                closeCallBack={this.closeModal}
            />,
            <form key="form" className="form" onSubmit={this.props.handleSubmit(values => this.storeData(values))}  >
                <div key="content" className="row">
                    <div className="col-12">
                        <h4><Translate id="investigation.create.edc.title" /></h4>
                        <p><Translate id="investigation.create.edc.explanation" /></p>
                        <Field name="title" {...FIELDS_INVESTIGATION["title"]} component={FieldSherwood} />
                        <Field name="description"  {...FIELDS_INVESTIGATION["description"]} component={FieldSherwood} />
                        <Translate id="investigation.create.edc.add_field" />
                        <button data-testid="add-field" type="button"
                                className="add-field btn-floating btn-large waves-effect waves-light red" 
                                onClick={this.addField}><i className="material-icons">add</i>
                        </button>
                    </div>
                    <div>
                        { this.renderAddedFields() }
                    </div>
                    <div>
                        { this.renderPersonalFields() }
                    </div>
                    {(this.state.personalData.length > 0 || this.state.fields.length > 0) &&
                        <button data-testid="save-investigation" type="submit" key="save-investigation" 
                                id="save-investigation" className="waves-effect waves-light btn">
                                {this.props.translate("investigation.create.save")}<i className="material-icons right">send</i>
                        </button>
                    }
                    
                </div>
            </form>
            ]
        );
        
    }
}
BasicInfo.propTypes = {
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
  })(connect(null, { toggleLoading })(BasicInfo)))