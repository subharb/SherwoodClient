import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Table from '../../general/table';
import Section from './section';
import { ButtonContinue, ButtonAdd, ButtonBack } from '../../general/mini_components'; 

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

export default class EDC extends Component{
    constructor(props){
        super(props);

        this.addSection = this.addSection.bind(this);
        this.renderNewSectionForm = this.renderNewSectionForm.bind(this);
        this.renderSections = this.renderSections.bind(this);
        this.closeNewSection = this.closeNewSection.bind(this);
        this.submitData = this.submitData.bind(this);
        this.callBackNewSection = this.callBackNewSection.bind(this);
        
        const initialState = {sections: [], addingSection:false, editingIndexSection:false}
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
    }
    renderSections(){
        const AddButton= <ButtonAdd disabled={this.state.addingSection || Number.isInteger(this.state.editingIndexSection)} 
                            type="button" data-testid="add-sections" show={!this.state.addingSection}  
                            onClick={this.addSection}></ButtonAdd>
        if(this.state.sections.length === 0){
            return [
                AddButton,
                <Translate id="investigation.create.section.no_sections" />
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
    submitData(){
        this.props.callBackData({sections : this.state.sections});
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
                { this.renderSections() }
                { this.renderNewSectionForm() }
                <div className="row" style={{paddingTop:"20px"}}>
                    {
                        this.props.callBackStepBack && 
                        <ButtonBack spaceRight={true} data-testid="back" onClick={this.props.callBackStepBack} ><Translate id="general.back"/></ButtonBack>
                    }
                    <ButtonContinue disabled={this.state.sections.length === 0} 
                        type="button" onClick={this.submitData}>
                            <Translate id="investigation.create.continue" />
                    </ButtonContinue>
                </div>
            </div>
            
        )
    }
    
}


EDC.propTypes = {
    initialData: PropTypes.object,
    callBackData: PropTypes.func.isRequired
};


