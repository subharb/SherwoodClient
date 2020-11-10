import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import styled from "styled-components";
import Modal from '../../general/modal';
import FieldSherwood from '../../general/FieldSherwood';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { validateField } from '../../../utils';
import Table from '../../general/table';
import Section from './section';


/**
 * An EDC is a collection of sections
 */
const AddElementButton = styled.button`
    display:${props => props.hide ? "none" : "auto" };
`; 

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
        this.closeNewSection = this.closeNewSection.bind(this);
        
        
        
        this.state = props.initialState ? props.initialState : {sections: [], addingSection:false, editingIndexSection:false};
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
                    })} deleteCallBack={(index) => this.deleteElement(index, "sections")} editCallBack={(index) => this.editSection(index, "sections")}/>
                </div>)
        }
    }
    addSection(){
        let tempState = {...this.state};
        tempState.addingSection = true;
        this.setState(tempState);
    }
    editSection(index, element){
        console.log("Edit Section", index);
        let tempState = {...this.state};
        tempState.addingSection = false;
        tempState.editingIndexSection = index;
        this.setState(tempState);
    }
    addNewSection(section){
        alert(section);
    }
    closeNewSection(){
        console.log("closeNewSection");
        let tempState = {...this.state};
        tempState.addingSection = false;
        tempState.editingIndexSection = false;
        this.setState(tempState);
    }
    renderNewSectionForm(){
        const staticParams = {
            addNewSection:this.addNewSection,
            closeNewSection:this.closeNewSection
        }
        if(this.state.addingSection){
            return (<Section {...staticParams} />);
        }
        else if(Number.isInteger(this.state.editingIndexSection)){
            return (<Section initialData={this.state.sections[this.state.editingIndexSection]} 
                        {...staticParams}
                    />);
        }
        else{
            return null;
        }
    }

    handleNewSection(values){
        console.log("Got a section!", values);
        let tempState = {...this.state};
        let newSection = values;
        tempState.sections.push(newSection);
        tempState.addingSection = false;
        this.setState(tempState);
        this.props.reset();
    }
    render(){
        
        return (
      
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

Section.propTypes = {
    initialState: PropTypes.object,
    callBackData: PropTypes.func.isRequired
};
export default reduxForm({
    validate : validate,
    form : 'edc'
})(Sections)

