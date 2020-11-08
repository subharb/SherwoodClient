import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import styled from "styled-components";
import Modal from '../../general/modal';
import FieldSherwood from '../../general/FieldSherwood';
import { reduxForm, Field } from 'redux-form';
import Form from '../../general/form';
import { validateField } from '../../../utils';
import Table from '../../general/table';


/**
 * A form can have several sections, sections are a group of inputs that can repeat during time or not
 */
const AddElementButton = styled.button`
    display:${props => props.hide ? "none" : "auto" };
`; 


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

class Sections extends Component{
    constructor(props){
        super(props);

        this.addSection = this.addSection.bind(this);
        this.renderNewSectionForm = this.renderNewSectionForm.bind(this);
        this.renderSections = this.renderSections.bind(this);
        this.toogleField = this.toogleField.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        
        this.state = {sections: [], fields : [], addingSection:false, addingField : false};
        //this.state = {sections: [{"name" : "Analítica" , "repeats" : true, fields : [{"is_personal_data" : true, "required" : true, "name" : "leucocitos" , "type" : "select", "question": "Valor leucocitos"}]}], fields : [], addingSection:false, addingField : false};
    }
    renderSections(){
        if(this.state.sections.length === 0){
            return <Translate id="investigation.create.section.no_sections" />
        }
        else{
            let arrayHeader = Object.values(SECTION_FORM).map(value => value.shortLabel);
            arrayHeader.push("fields");
            return(
                <div>
                    <Table key="added_fields" header={arrayHeader} 
                        values = {this.state.sections.map(section => {let arrayFields = Object.values(section);
                                return arrayFields;
                    })} deleteCallBack={(index) => this.deleteElement(index, "sections")}/>
                </div>)
        }
    }
    addSection(){
        let tempState = {...this.state};
        tempState.addingSection = true;
        this.setState(tempState);
    }
    toogleField(){
        let tempState = {...this.state};
        tempState.addingField = !tempState.addingField;
        this.setState(tempState);
    }
    deleteElement(index, element){
        console.log("Delete Field", index);
        let tempState = {...this.state};
        tempState[element].splice(index, 1);
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
    renderNewSectionForm(){
        if(this.state.addingSection){
            return (
                <div className="container">
                    <div className="card-panel">
                        <h6 className="teal-text lighten-1">
                            <Translate id="investigation.create.section.new_section" />
                        </h6>
                        <form onSubmit={this.props.handleSubmit(values => this.handleNewSection(values))} className="row">
                            <Field type="text" name="name" label="name" component={FieldSherwood} />
                            <Field type="checkbox" name="repeats" label="repeats" component={FieldSherwood} />
                            <Field type="select" name="field_type" label="Field" component={FieldSherwood} />
                            
                            <div style={{paddingTop:"40px"}}>
                                Add field: 
                                <AddElementButton type="button" data-testid="add-field" hide={this.state.addingField} className="add-section btn-floating btn-small waves-effect waves-light red" onClick={this.toogleField} >
                                    <i className="material-icons">add</i>
                                </AddElementButton>  
                            </div>  
                            { this.renderFields() }
                            <div style={{paddingTop:"40px"}}>
                                <button disabled={this.state.fields.length === 0} className="btn waves-effect waves-light" type="submit">Submit</button>
                                <button className="btn waves-effect waves-light red lighten-1 ml-6" type="submit">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        else{
            return null;
        }
    }
    handleAddField(values){
        console.log("Nuevo field!", values);
        let tempState = {...this.state};
        tempState.fields.push(values);
        this.setState(tempState);
        this.toogleField();

    }
    handleNewSection(values){
        console.log("Got a section!", values);
        let tempState = {...this.state};
        values.fields = this.state.fields;
        let newSection = values;
        tempState.fields = [];
        tempState.sections.push(newSection);
        tempState.addingSection = false;
        this.setState(tempState);
        this.props.reset();
    }
    render(){
        
        return (
            [<Modal key="modal" open={this.state.addingField} title={<Translate id="investigation.create.section.add_field" />}
                    component={<Form fields={FIELDS_FORM} callBackForm={this.handleAddField} />} 
                    closeCallBack={this.closeModal}  />,
                <div key="container" >
                    <h5 className="teal-text lighten-1">Step 3 > Create Sections</h5>
                    <blockquote>
                        <Translate id="investigation.create.section.intro" />
                    </blockquote>
                    <h6 className="teal-text lighten-1">
                        <Translate id="investigation.create.section.title" />
                    </h6>
                    <AddElementButton type="button" data-testid="add-sections" hide={this.state.addingSection} className="add-section btn-floating btn-large waves-effect waves-light red" onClick={this.addSection} ><i className="material-icons">add</i></AddElementButton>    
                    { this.renderNewSectionForm() }
                    { this.renderSections() }
                    <div className="row" style={{paddingTop:"20px"}}>
                        <button disabled={this.state.sections.length === 0} className="btn waves-effect waves-light" type="button" onClick={this.props.callBackData}>Submit</button>
                    </div>
                </div>
            ]
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
    })
    
    return errors;
}

export default reduxForm({
    validate : validate,
    form : 'sectionForm'
})(Sections)

