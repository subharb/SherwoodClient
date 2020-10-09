import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import styled from "styled-components";
import Modal from '../../general/modal';
import FieldSherwood from '../../general/FieldSherwood';
import { reduxForm, Field } from 'redux-form';
import Form from '../../general/form';
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

class Sections extends Component{
    constructor(props){
        super(props);

        this.addSection = this.addSection.bind(this);
        this.renderNewSectionForm = this.renderNewSectionForm.bind(this);
        this.renderSections = this.renderSections.bind(this);
        this.toogleField = this.toogleField.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        
        this.state = {sections: [], fields : [], addingSection:false, addingField : false};
    }
    
    renderSections(){
        if(this.state.sections.length === 0){
            return <Translate id="investigation.create.section.no_sections" />
        }
        else{
            return(
                <div>
                    {
                        this.state.sections.map(section => {
                            return section;
                        })
                    }
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
    renderNewSectionForm(){
        if(this.state.addingSection){
            return (
                <div className="card-panel">
                    <h6 className="teal-text lighten-1">
                        <Translate id="investigation.create.section.new_section" />
                    </h6>
                    <form onSubmit={this.props.handleSubmit(values => this.handleNewSection(values))} className="row text-center">
                        
                        <Field type="text" name="name" label="name" component={FieldSherwood} />
                        <Field type="checkbox" name="repeated" label="repeated" component={FieldSherwood} />
                        <div className="row">
                            Add field
                            <AddElementButton data-testid="add-field" hide={this.state.addingField} className="add-section btn-floating btn-small waves-effect waves-light red" onClick={this.toogleField} >
                                <i className="material-icons">add</i>
                            </AddElementButton>  
                        </div>  
                        <button className="btn waves-effect waves-light" type="submit">Submit</button>
                    </form>
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
    }
    render(){
        
        return (
            [<Modal key="modal" open={this.state.addingField} title={<Translate id="investigation.create.section.add_field" />}
                    component={<Form fields={FIELDS_FORM} callBackForm={this.handleAddField} />} 
                closeCallBack={this.closeModal} 
                    closeCallBack={this.closeModal} />,
                <div>
                    <h5 className="teal-text lighten-1">Step 3 > Create Sections</h5>
                    <blockquote>
                        <Translate id="investigation.create.section.intro" />
                    </blockquote>
                    <h6 className="teal-text lighten-1">
                        <Translate id="investigation.create.section.title" />
                    </h6>
                    <AddElementButton data-testid="add-sections" hide={this.state.addingSection} className="add-section btn-floating btn-large waves-effect waves-light red" onClick={this.addSection} ><i className="material-icons">add</i></AddElementButton>    
                    { this.renderNewSectionForm() }
                    { this.renderSections() }
                </div>
            ]
        )
    }
    
}


function validate(values){
    console.log("Validate");
    //console.log(values);
    const errors = {};
    
    // Object.keys(FIELDS).forEach(key => {
    //     console.log(key);
    //     const validation = validateField({value : values[key], validation:FIELDS[key].validation, required:FIELDS[key].required})
    //     if(!validation.result){
    //         errors[key] = validation.messageCode;
    //     }
    // })
    
    return errors;
}

export default reduxForm({
    validate : validate,
    form : 'sectionForm'
})(Sections)

