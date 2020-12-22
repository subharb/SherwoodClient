import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { validateField } from '../../../utils';
import Table from '../../general/table';
import Section from './section';
import { ButtonSave, ButtonAdd, ButtonBack, ButtonContinue } from '../../general/mini_components'; 
import FieldSherwood from '../../general/FieldSherwood';
import { reduxForm, Field, submit, FormSection } from 'redux-form';
import { TextField } from '@material-ui/core';
/**
 * An EDC is a collection of sections
 */

const SECTION_FORM = {
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.section_name",
        shortLabel: "investigation.create.edc.section_name",
        validation : "textMin2"
    },
    "repeats":{
        required : false,
        type:"checkbox",
        label:"investigation.create.edc.repeats",
        shortLabel: "investigation.create.edc.repeats",
        validation : "notEmpty"
    }
}

class DataCollection extends Component{
    constructor(props){
        super(props);

        this.addSection = this.addSection.bind(this);
        this.renderNewSectionForm = this.renderNewSectionForm.bind(this);
        this.renderSections = this.renderSections.bind(this);
        this.closeNewSection = this.closeNewSection.bind(this);
        this.handleNewDataCollection = this.handleNewDataCollection.bind(this);
        this.callBackNewSection = this.callBackNewSection.bind(this);
        this.changeName = this.changeName.bind(this);
        const initialState = {name:"", sections: [], addingSection:false, editingIndexSection:false}
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
    }
    changeName(e){
        let tempState = {...this.state};
        tempState.name = e.target.value;
        this.setState(tempState);
    }
    renderSections(){
        const AddButton= <ButtonAdd disabled={this.state.addingSection || Number.isInteger(this.state.editingIndexSection)} 
                            type="button" data-testid="add-sections" show={!this.state.addingSection}  
                            onClick={this.addSection}></ButtonAdd>
        if(this.state.sections.length === 0){
            return [
                AddButton,
                <Translate id="investigation.create.edc.section.none" />
            ]
        }
        else{
            let arrayHeader = Object.values(SECTION_FORM).map(value => value.shortLabel);
            arrayHeader.push("investigation.create.edc.number_fields");
            return(
                <div>
                    <Table key="added_fields" header={arrayHeader} 
                        values = {this.state.sections.map(section => {let arrayFields = Object.values(section);
                                return arrayFields;
                    })} deleteCallBack={(index) => this.deleteSection(index, "sections")} editCallBack={(index) => this.editSection(index, "sections")}/>
                    {AddButton}
                </div>)
        }
    }
    addSection(){
        let tempState = {...this.state};
        tempState.addingSection = true;
        this.setState(tempState);
    }
    deleteSection(index){
        let tempState = {...this.state};
        tempState.addingSection = false;
        tempState.editingIndexSection = false;
        tempState.sections.splice(index, 1);
        this.setState(tempState);
    }
    editSection(index, element){
        console.log("Edit Section", index);
        let tempState = {...this.state};
        tempState.addingSection = false;
        tempState.editingIndexSection = index;
        this.setState(tempState);
    }
    callBackNewSection(section){
        console.log("New section!", section);
        let tempState = {...this.state};
        tempState.addingSection = false;
        tempState.editingIndexSection = false;
        if(Number.isInteger(this.state.editingIndexSection)){
            tempState.sections[this.state.editingIndexSection] = section;
        }
        else{
            tempState.sections.push(section);
        }
        this.setState(tempState);

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
            callBackNewSection:this.callBackNewSection,
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

    handleNewDataCollection(values){
        if(this.state.sections.length > 0){
            this.props.callBackData({name : values["name"], sections : this.state.sections});
        }
    }
    componentDidMount(){
        if(this.props.initialData){
            this.props.initialize(this.props.initialData)
        }
        
    }
    render(){
        
        return (
                <div key="container" >
                    {
                        this.props.callBackData && 
                        <ButtonBack onClick={this.props.callBackStepBack} />
                    }
                <h5 className="teal-text lighten-1"><Translate id="investigation.create.edc.data_collections.title"/></h5>
                <blockquote>
                    <Translate id="investigation.create.edc.data_collections.intro" />
                </blockquote>
                <h6 className="teal-text lighten-1">
                    <Translate id="investigation.create.edc.data_collections.title" />
                </h6>
                <TextField label="name" name="name_data_collection" value={this.state.name} variant="outlined" onChange={this.changeName}/>
                    
                { this.renderSections() }
                { this.renderNewSectionForm() }
            
                <div className="row" style={{paddingTop:"20px"}}>
                    <ButtonSave id="data_collection" data-testid="save_data_collection" disabled={this.state.name.length === 0 || this.state.sections.length === 0} 
                        type="button" onClick={() => this.props.callBackData({name:this.state.name, sections : this.state.sections})}>
                            <Translate id="investigation.create.edc.data_collections.save" />
                    </ButtonSave>
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
    });


    
    return errors;
}

DataCollection.propTypes = {
    initialData: PropTypes.object,
    callBackData: PropTypes.func.isRequired
};

export default reduxForm({
    validate : validate,
    form : 'data_collection'
})(DataCollection)

