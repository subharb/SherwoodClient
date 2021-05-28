import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import { Grid, List, ListItem, ListItemIcon, ListItemText, RootRef, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Table from '../../general/table';
import DataCollection from './data_collection';
import { ButtonContinue, ButtonAdd, ButtonBack } from '../../general/mini_components';  
import { EnhancedTable } from '../../general/EnhancedTable';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
        this.toggleOrder = this.toggleOrder.bind(this);
        const initialState = {surveys: [], addingDataCollection:false, editingIndexDataCollection:false, ordering:false}
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
    }
    getItemStyle(isDragging, draggableStyle){
        // styles we need to apply on draggables
        return {...draggableStyle,
            ...(isDragging && {
            background: "rgb(235,235,235)"
        })}
    }
    getListStyle(isDraggingOver){
        //background: isDraggingOver ? 'lightblue' : 'lightgrey',
    }
    onDragEnd(result){
        console.log(result);
    }
    orderUpdate(dragDrop){
        console.log("Parent reorder");
        let tempState = {...this.state};
        const result = Array.from(tempState.surveys);
        const [removed] = result.splice(dragDrop.source.index, 1);
        result.splice(dragDrop.destination.index, 0, removed);
        tempState.surveys = result;
        this.setState(tempState);
    }
    renderDataCollections(){
        const AddButton= <ButtonAdd disabled={this.state.addingDataCollection || Number.isInteger(this.state.editingIndexDataCollection)} 
                            type="button" data-testid="add_data_collections" show={!this.state.addingDataCollection}  
                            onClick={this.toggleAddDataCollection}></ButtonAdd>
        if(this.state.surveys.length === 0){
            return (<Grid item xs={12}>
                { AddButton }
                <Typography variant="body2" gutterBottom component="span">
                    <Translate id="investigation.create.edc.data_collections.none" />
                </Typography>
                
            </Grid>)
        }
        else{
            const headCells =[{ id:"title", alignment: "right", label: <Translate id="investigation.create.edc.data_collections.name" />}, 
                                {id:"number_sections", alignment: "right", label: <Translate id="investigation.create.edc.data_collections.number_sections" />}
                            ]
         
            const rows = this.state.surveys.map((survey, index) => {
                return { id :index, title : survey.name, number_sections : survey.sections.length};
            })
                
            if(!this.state.reordering){
                return([
                    <Grid item xs={12}>
                        <EnhancedTable orderUpdate={(result) => this.orderUpdate(result)} titleTable={<Translate id="investigation.create.edc.data_collections.title" />} rows={rows} headCells={headCells} 
                                actions = {{"delete" : (index) => this.deleteDataCollection(index), "edit" : (index) => this.editDataCollection(index)}} />
                    
                    </Grid>,
                    <Grid item xs={12}>
                        {AddButton}
                        <Typography variant="body2" gutterBottom component="span">
                            <Translate id="investigation.create.edc.data_collections.new" />
                        </Typography> 
                    </Grid>
                ]
                )
            }
            else{
                return (
                    <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <RootRef rootRef={provided.innerRef}>
                            <List style={this.getListStyle(snapshot.isDraggingOver)}>
                              {rows.map((item, index) => (
                                <Draggable key={item.id} draggableId={`item-${item.id}`} index={index}>
                                  {(provided, snapshot) => (
                                    <ListItem
                                        innerRef={provided.innerRef}
                                      ContainerComponent="li"
                                      ContainerProps={{ ref: provided.innerRef }}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={this.getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                      )}
                                    >
                                      <ListItemIcon>
                                        <DragIndicatorIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={item.title}
                                      />
                                      
                                    </ListItem>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </List>
                          </RootRef>
                        )}
                        </Droppable>
                    </DragDropContext>
                );
            }
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
    toggleOrder(){
        const tempState = {...this.state};
        tempState.reordering = !tempState.reordering;
        this.setState(tempState);
    }
    render(){
        
        if(this.state.addingDataCollection){
            return <DataCollection initialData={this.state.surveys[this.state.editingIndexDataCollection]} 
                    callBackData={this.callBackNewDataCollection} callBackStepBack={() => {this.toggleAddDataCollection()}}/>
        }
        else{
            return (
                <Grid container spacing={3}>
                        <button onClick={this.toggleOrder}>{this.state.reordering ? "Finish reorder" : "Set order"}</button>
                        { this.renderDataCollections() }
                    
                    <Grid item xs={12}>
                        {
                            this.props.callBackStepBack && 
                            <ButtonBack spaceright={1} data-testid="back" onClick={this.props.callBackStepBack} ><Translate id="general.back"/></ButtonBack>
                        }
                        <ButtonContinue data-testid="save_surveys" disabled={this.state.surveys.length === 0} 
                            type="button" onClick={this.submitData}>
                                <Translate id="investigation.create.continue" />
                        </ButtonContinue>
                    </Grid>
                </Grid>
            )
        }
        
    }
    
}


EDC.propTypes = {
    initialData: PropTypes.object,
    callBackData: PropTypes.func.isRequired
};


