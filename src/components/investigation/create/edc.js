import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import styled from "styled-components";
import PropTypes from 'prop-types';
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

export default class EDC extends Component{
    constructor(props){
        super(props);

        this.addSection = this.addSection.bind(this);
        this.renderNewSectionForm = this.renderNewSectionForm.bind(this);
        this.renderSections = this.renderSections.bind(this);
        this.closeNewSection = this.closeNewSection.bind(this);
        this.submitData = this.submitData.bind(this);
        this.callBackNewSection = this.callBackNewSection.bind(this);
        
        this.state = props.initialState ? props.initialState : {sections: [], addingSection:false, editingIndexSection:false};
        //this.state = {sections: [{"name" : "Analítica" , "repeats" : true, fields : [{"is_personal_data" : true, "required" : true, "name" : "leucocitos" , "type" : "select", "question": "Valor leucocitos"}]}], fields : [], addingSection:false, addingField : false};
    }
    renderSections(){
        const AddButton = <AddElementButton disabled={this.state.addingSection || Number.isInteger(this.state.editingIndexSection)} type="button" data-testid="add-sections" hide={this.state.addingSection} className="add-section btn-floating btn-small waves-effect waves-light red" onClick={this.addSection} ><i className="material-icons">add</i></AddElementButton>
        if(this.state.sections.length === 0){
            return [
                AddButton,
                <Translate id="investigation.create.section.no_sections" />
            ]
        }
        else{
            let arrayHeader = Object.values(SECTION_FORM).map(value => value.shortLabel);
            arrayHeader.push("fields");
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
        this.props.callBackData([...this.state.sections]);
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
                    <button disabled={this.state.sections.length === 0} className="btn waves-effect waves-light" type="button" 
                        onClick={this.submitData}>Submit</button>
                </div>
            </div>
            
        )
    }
    
}


EDC.propTypes = {
    initialState: PropTypes.object,
    callBackData: PropTypes.func.isRequired
};


