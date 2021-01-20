import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Table from '../../general/table';
import DataCollection from './data_collection';
import { ButtonContinue, ButtonAdd, ButtonBack } from '../../general/mini_components';  
import { EnhancedTable } from '../../general/EnhancedTable';

/**
 * An EDC is a collection of data_collections
 */

const SECTION_FORM = {
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.data_collections.title",
        shortLabel: "investigation.create.edc.data_collections.title",
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

        this.toggleAddDataCollection = this.toggleAddDataCollection.bind(this);
        this.renderNewDataCollectionForm = this.renderNewDataCollectionForm.bind(this);
        this.renderDataCollections = this.renderDataCollections.bind(this);
        this.closeNewDataCollection = this.closeNewDataCollection.bind(this);
        this.submitData = this.submitData.bind(this);
        this.callBackNewDataCollection = this.callBackNewDataCollection.bind(this);
        
        const initialState = {surveys: [], addingDataCollection:false, editingIndexDataCollection:false}
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
    }
    renderDataCollections(){
        const AddButton= <ButtonAdd disabled={this.state.addingDataCollection || Number.isInteger(this.state.editingIndexDataCollection)} 
                            type="button" data-testid="add_data_collections" show={!this.state.addingDataCollection}  
                            onClick={this.toggleAddDataCollection}></ButtonAdd>
        if(this.state.surveys.length === 0){
            return [
                AddButton,
                <Translate id="investigation.create.edc.data_collections.none" />
            ]
        }
        else{
            const headCells =[{ id:"title", alignment: "right", label: <Translate id="investigation.create.edc.data_collections.name" />}, 
                                {id:"number_sections", alignment: "right", label: <Translate id="investigation.create.edc.data_collections.number_sections" />}
                            ]
         
            const rows = this.state.surveys.map(survey => {
                return { title : survey.name, number_sections : survey.sections.length};
            })
                    
            return(
                <div>
                    <EnhancedTable titleTable={<Translate id="investigation.create.edc.data_collections.title" />} rows={rows} headCells={headCells} 
                            actions = {{"delete" : (index) => this.deleteDataCollection(index)}} />
                    {AddButton}
                </div>)
        }
    }
    toggleAddDataCollection(){
        let tempState = {...this.state};
        tempState.addingDataCollection = !tempState.addingDataCollection;
        this.setState(tempState);
    }
    deleteDataCollection(index){
        let tempState = {...this.state};
        tempState.addingDataCollection = false;
        tempState.editingIndexDataCollection = false;
        tempState.surveys.splice(index, 1);
        this.setState(tempState);
    }
    editDataCollection(index, element){
        console.log("Edit DataCollection", index);
        let tempState = {...this.state};
        tempState.addingDataCollection = true;
        tempState.editingIndexDataCollection = index;
        this.setState(tempState);
    }
    callBackNewDataCollection(dataCollection){
        console.log("New section!", dataCollection);
        let tempState = {...this.state};
        tempState.addingDataCollection = false;
        tempState.editingIndexDataCollection = false;
        if(Number.isInteger(this.state.editingIndexDataCollection)){
            tempState.surveys[this.state.editingIndexDataCollection] = dataCollection;
        }
        else{
            tempState.surveys.push(dataCollection);
        }
        
        this.setState(tempState);

    }
    closeNewDataCollection(){
        console.log("closeNewDataCollection");
        let tempState = {...this.state};
        tempState.addingDataCollection = false;
        tempState.editingIndexDataCollection = false;
        this.setState(tempState);
    }
    renderNewDataCollectionForm(){
        const staticParams = {
            callBackNewDataCollection:this.callBackNewDataCollection,
            closeNewDataCollection:this.closeNewDataCollection
        }
        if(this.state.addingDataCollection){
            return (<DataCollection {...staticParams} />);
        }
        else if(Number.isInteger(this.state.editingIndexDataCollection)){
            return (<DataCollection initialData={this.state.surveys[this.state.editingIndexDataCollection]} 
                        {...staticParams}
                    />);
        }
        else{
            return null;
        }
    }
    submitData(){
        this.props.callBackData({surveys : this.state.surveys});
    }
    render(){
        
        if(this.state.addingDataCollection){
            return <DataCollection initialData={this.state.surveys[this.state.editingIndexDataCollection]} callBackData={this.callBackNewDataCollection} callBackStepBack={() => {this.toggleAddDataCollection()}}/>
        }
        else{
            return (
                <React.Fragment>
                    { this.renderDataCollections() }
                    <div className="row" style={{paddingTop:"20px"}}>
                        {
                            this.props.callBackStepBack && 
                            <ButtonBack spaceright={1} data-testid="back" onClick={this.props.callBackStepBack} ><Translate id="general.back"/></ButtonBack>
                        }
                        <ButtonContinue data-testid="save_surveys" disabled={this.state.surveys.length === 0} 
                            type="button" onClick={this.submitData}>
                                <Translate id="investigation.create.continue" />
                        </ButtonContinue>
                    </div>
                </React.Fragment>
            )
        }
        
    }
    
}


EDC.propTypes = {
    initialData: PropTypes.object,
    callBackData: PropTypes.func.isRequired
};


