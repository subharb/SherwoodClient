import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import { validateField } from '../../../utils';
import styled from "styled-components";
import FieldSherwood from '../../general/FieldSherwood';
import Table from '../../general/table';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

const FIELDS_FORM = {
    "is_personal_data":{
        required : false,
        type:"checkbox",
        label:"investigation.create.survey.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "required":{
        required : false,
        type:"checkbox",
        label:"investigation.create.survey.required",
        shortLabel: "investigation.table.required",
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
                {"text": "investigation.create.survey.checkbox", "value" : "checkbox"}, 
                {"text": "investigation.create.survey.type_date", "value" : "date"},
                {"text": "investigation.create.survey.dropdown", "value" : "dropdown"},
                {"text": "investigation.create.survey.multioption", "value" : "multioption"}
        ],
        activationValues : ["dropdown", "multioption"],
        activatedFields:[
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.survey.choose",
                shortLabel: "investigation.table.type"
            },
            {
                required : true,
                type:"options",
                validation : "notEmpty",
                label : "investigation.create.survey.choose",
                shortLabel: "investigation.table.type"
            }]
                                        
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
        label:"investigation.create.survey.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    }
}

const AddElementButton = styled.button`
    display:${props => props.hide ? "none" : "auto" };
`; 

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
        this.state = props.initialData ? {...props.initialData} : { addingField: false, fields : [] }
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
            component={<Form fields={FIELDS_FORM} callBackForm={this.handleAddField} closeCallBack={this.closeModal} />} 
              />,
            <div className="container">
                <div className="card-panel">
                    <h6 className="teal-text lighten-1">
                        {
                            title
                        }
                        
                    </h6>
                    <form onSubmit={this.props.handleSubmit(values => this.handleNewSection(values))} className="row">
                        <Field type="text" name="name" label="name" component={FieldSherwood} />
                        <Field type="checkbox" name="repeats" label="repeats" component={FieldSherwood} />
                        
                        <div style={{paddingTop:"40px"}}>
                            Add field: 
                            <AddElementButton type="button" data-testid="add-field" onClick={this.toogleField}
                                hide={this.state.addingField} className="add-section btn-floating btn-small waves-effect waves-light red" >
                                <i className="material-icons">add</i>
                            </AddElementButton>  
                        </div>  
                        { this.renderFields() }
                        <div style={{paddingTop:"40px"}}>
                            <button disabled={this.state.fields.length === 0} className="btn waves-effect waves-light" type="submit">Add Section</button>
                            <button onClick={this.props.closeNewSection} className="btn waves-effect waves-light red lighten-1 ml-6" 
                                type="button">Cancel</button>
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
