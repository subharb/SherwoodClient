import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import { validateField } from '../../../utils';
import styled from "styled-components";
import FieldSherwood from '../../general/FieldSherwood';
import Table from '../../general/table';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { reduxForm, Field } from 'redux-form';
import { ButtonAdd, ButtonSave, ButtonCancel  } from '../../general/mini_components';
import PropTypes from 'prop-types';

const FIELDS_FORM = {
    "is_personal_data":{
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
        options:[{"text" : "investigation.create.edc.type_text", "value" : "text"},
                {"text": "investigation.create.edc.type_number", "value" : "number"},
                {"text": "investigation.create.edc.checkbox", "value" : "checkbox"}, 
                {"text": "investigation.create.edc.type_date", "value" : "date"},
                {"text": "investigation.create.edc.dropdown", "value" : "dropdown"},
                {"text": "investigation.create.edc.multioption", "value" : "multioption"}
        ],
        activationValues : ["dropdown", "multioption"],
        activatedFields:[
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            },
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type"
            }]
                                        
    },
    "question" : {
        required : false,
        type:"text",
        label : "investigation.create.edc.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6"
    }
}

const SECTION_FORM = {
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.sections.section",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "repeats":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    }
}


/**
 * A section of a EDC, each section contain several inputs and can be repeated during time or not.
 */
class Section extends Component{
    constructor(props){
        super(props);

        this.handleAddField = this.handleAddField.bind(this);
        this.toogleField = this.toogleField.bind(this);
        this.renderFields = this.renderFields.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.handleNewSection = this.handleNewSection.bind(this); 

        const initialState = { addingField: false, fields : [] }
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
    }
    handleNewSection(values){
        console.log("handleNewSection: "+JSON.stringify(values));
        if(this.state.fields.length === 0){
            alert("Faltan campos");
        }
        else{
            let newValues = Object.assign({}, values);
            newValues.fields = [...this.state.fields];
            console.log("handleNewSection:"+JSON.stringify(values));
            this.props.callBackNewSection(newValues);
        }
        
    }
    deleteElement(index, element){
        console.log("Delete Field", index);
        let tempState = {...this.state};
        tempState[element].splice(index, 1);
        this.setState(tempState);
    }
    handleAddField(values){
        console.log("Nuevo field!", values);
        let tempState = {...this.state};
        tempState.fields.push(values);
        this.setState(tempState);
        this.toogleField();
    }
    toogleField(){
        let tempState = {...this.state};
        tempState.addingField = !tempState.addingField;
        this.setState(tempState);
    }
    closeModal(){
        let tempState = this.state;
        tempState.addingField = false;
        this.setState(tempState);
    }
    renderFields(){
        if(this.state.fields.length > 0){
            const arrayHeader = Object.values(FIELDS_FORM).map(value => value.shortLabel);
            return <Table key="added_fields" header={arrayHeader} 
                values = {this.state.fields.map(field => {let arrayFields = Object.values(field);
                        
                        return arrayFields;
                    })} deleteCallBack={(index) => this.deleteElement(index, "fields") }/>
        }
        else{
            return null;
        }        
    }
    componentDidMount(){
        if(this.props.initialData){
            console.log("Init Data");
            this.props.initialize(this.props.initialData); 
        }
    }
    render(){
        const title = this.props.initialData ? <Translate id="investigation.create.section.edit_section" /> :  <Translate id="investigation.create.section.new_section" />
        const saveText = this.props.initialData ? <Translate id="investigation.create.section.edit_section" /> : <Translate id="investigation.create.section.add_section" />
        return (
            [<Modal key="modal" open={this.state.addingField} title={<Translate id="investigation.create.section.add_field" />}
            component={<Form fields={FIELDS_FORM} callBackForm={this.handleAddField} closeCallBack={this.closeModal} dataTestid="save-field" />} 
              />,
            <div className="card">
                <div className="card-body">
                    <h6 className="">
                        {
                            title
                        }
                        
                    </h6>
                    <form onSubmit={this.props.handleSubmit(values => this.handleNewSection(values))}>
                        <Field type="text" name="name" label="name" component={FieldSherwood} />
                        <div>
                            <Field type="checkbox" name="repeats" label="repeats" component={FieldSherwood} />
                        </div>
                        
                        
                        <div style={{paddingTop:"40px"}}>
                            Add field: 
                            <ButtonAdd type="button" data-testid="add-field" onClick={this.toogleField}
                                show={!this.state.addingField}>
                            </ButtonAdd>  
                        </div>  
                        { this.renderFields() }
                        <div style={{paddingTop:"40px"}}>
                            <ButtonSave disabled={this.state.fields.length === 0} data-testid="add-section" type="submit">Add Section</ButtonSave>
                            <ButtonCancel onClick={this.props.closeNewSection} data-testid="cancel-section" style={{marginLeft:'1rem'}}
                                type="button">Cancel</ButtonCancel>
                        </div>
                    </form>
                </div>
            </div>]
        )
    }   
    
}

function validate(values){
    console.log("Validate");
    //console.log(values);
    const errors = {};
    
    Object.keys(SECTION_FORM).forEach(key => {
        console.log(key);
        const validation = validateField({value : values[key], validation:SECTION_FORM[key].validation, required:SECTION_FORM[key].required})
        if(!validation.result){
            errors[key] = validation.messageCode;
        }
    });


    
    return errors;
}

Section.propTypes = {
    initialData: PropTypes.object,
    addNewSection: PropTypes.func.isRequired,
    closeNewSection: PropTypes.func.isRequired
};

export default reduxForm({
    validate : validate,
    form : 'edc'
})(Section)
