import React from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { isSmartField, PERSONAL_DATA_FIELDS, PERSONAL_FIELDS_FORM } from '../../../utils/index.jsx';
import { Field, reduxForm } from 'redux-form'
import { DragDropContext } from 'react-beautiful-dnd';
import { Component } from 'react';
import { CardContent, Card, Grid, Typography } from '@mui/material';
import { ButtonBack, ButtonContinue } from '../../general/mini_components';
import { EnhancedTable } from '../../general/EnhancedTable';
import AddField from './add_field';

let PERSONAL_DATA_CHECKBOXES = {}
class PersonalData extends Component{
    constructor(props){
        super(props);

        this.handleAddField = this.handleAddField.bind(this);
        this.callBackData = this.callBackData.bind(this);

        let availableFields = [];
        let selectedFields = [];
        let customFields = props.initialData ? [...props.initialData] : [];
        const arrayKeys = Object.keys(PERSONAL_DATA_FIELDS);
        for(let i = 0; i < arrayKeys.length; i++){
            const currentKey = arrayKeys[i];
            let personalField = {...PERSONAL_DATA_FIELDS[currentKey]};
        
            if(props.initialData && props.initialData.find(fi => fi.name === currentKey)){
                const initField = props.initialData.find(fi => fi.name === currentKey);
            
                // personalField.required = initField.required;
                // personalField.order = initField.order;
                personalField = {...initField}
                selectedFields.push(personalField);
                const initFieldIndex = customFields.findIndex(fi => fi.name === currentKey)
                customFields.splice(initFieldIndex, 1);
            }
            else{
                availableFields.push(personalField);
            }
        }
        customFields.forEach(elem => {
            selectedFields.push(elem);
        })
        
        // this.initData = {}
        // if(this.props.initialData){
        //     this.props.initialData.forEach(pField => {
        //         this.initData[pField.name] = true;
        //         selectedFields.push(pField);
        //     })
        // }

        this.state = {availableFields:availableFields, selectedFields:selectedFields}
    }
    componentDidMount(){
        this.props.initialize(this.initData)
    }
    callBackData(){
        // console.log("CallbackData!!", values);
        // let tempValues = []; 
        // for(const key of Object.keys(values)){
        //     if(values[key] === true){
        //         tempValues.push(PERSONAL_DATA_FIELDS[key]);
        //     }
        // }
        this.props.callBackData(this.state.selectedFields);
    }
    orderUpdate(dragDrop){
        console.log(dragDrop);
        let tempState = {...this.state};
        const source = Array.from(tempState[dragDrop.source.droppableId]);
        const destination = Array.from(tempState[dragDrop.destination.droppableId]);
        
        
        if(dragDrop.source.droppableId !== dragDrop.destination.droppableId){
            const [removed] = source.splice(dragDrop.source.index, 1);
            destination.splice(dragDrop.destination.index, 0, removed);
            tempState[dragDrop.source.droppableId] = source.map((elem, index) => {elem.order = index; return elem;});
        }
        else{
            const [removed] = destination.splice(dragDrop.source.index, 1);
            destination.splice(dragDrop.destination.index, 0, removed);
            // const [removed] = result.splice(dragDrop.source.index, 1);
            // result.splice(dragDrop.destination.index, 0, removed);
        }
        
        tempState[dragDrop.destination.droppableId] = destination.map((elem, index) => {elem.order = index; return elem;});
        //tempState[dragDrop.source.droppableId] = source.map((elem, index) => {elem.order = index; return elem;});
        this.setState(tempState);
    }
    changeCheckbox(id, param, value){
        console.log("El id "+id+", param "+param+" y el value "+value);
        let tempState = {...this.state};
        tempState.selectedFields[id][param] = value;
        this.setState(tempState);
    }
    handleAddField(values){
        console.log(values);
        if(values.hasOwnProperty("type_options")){
            values["options"] = values.type_options;
        }
        values.validation =  isSmartField(values.type) ? "arrayOrFalse" : "notEmpty";
        let tempState = {...this.state};
        values.order = tempState.selectedFields.length;
        tempState.selectedFields.push(values);
        this.setState(tempState);
    }
    render(){
        const rowsAvailable = this.state.availableFields.length === 0 ? [{ id :0, title : "no hay más campos disponibles"}] : this.state.availableFields.map((field, index) => { return { id :index, title : <Translate id={field.label} />}});
        const rowsSelected = this.state.selectedFields.length === 0 ? [{ id :0, title : "Arrastra aquí", required:""}] : this.state.selectedFields.sort((fieldA, fieldB) => fieldA.order - fieldB.order).map((field, index) => {return { id :index, title : this.props.translate(field.label).includes("translationId") ? field.label : <Translate id={field.label} />, required:field.required}});
        
        const headAvailable = [{ id:"title", alignment: "left", label: "name"} ];
        const headSelected = [{ id:"title", alignment: "left", label: "name"}, { id:"required", alignment: "left", label: "required"} ];
        return(    
            <Grid container xs={12} spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textPrimary" component="span"> 
                        Añadir campo personalizado
                    </Typography>
                    <AddField fields={PERSONAL_FIELDS_FORM} 
                        callBackForm={(field) => this.handleAddField(field)}/>
                </Grid>
                
                <DragDropContext
                        onDragEnd={(result) => this.orderUpdate(result)}>
                    <Grid item xs={6}>
                        <EnhancedTable droppableId="availableFields" miniTable noSelectable
                            titleTable="Available Personal Fields" rows={rowsAvailable} headCells={headAvailable} 
                            noFooter />
                    </Grid>
                    <Grid item xs={6}>
                        <EnhancedTable droppableId="selectedFields" miniTable noSelectable noFooter
                            titleTable="Selected Personal Fields" rows={rowsSelected} headCells={headSelected} 
                            callBackCheckbox={(id, param, value) => this.changeCheckbox(id, param, value)} />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            this.props.callBackStepBack && 
                            <ButtonBack spaceright={1} data-testid="back" onClick={this.props.callBackStepBack} ><Translate id="general.back"/></ButtonBack>
                        }
                        <ButtonContinue onClick={this.callBackData}>
                            <Translate id="investigation.create.continue" />
                        </ButtonContinue>
                    </Grid>
                </DragDropContext>
            </Grid>            
        )
        
    }
}

function validate(values, props){
    let errors = {};
    if(Object.keys(values).length === 0){
        errors["keys"] = "select at least one value";
    }
    // Object.keys(PERSONAL_DATA_CHECKBOXES).forEach(key => {
    //     console.log(key+" : "+PERSONAL_DATA_CHECKBOXES[key].validation+" "+values[key]);
    //     //Se puede comparar con otro valor del form si existe el campo validationField o con un valor que se pasa en validationValue
    //     const fieldValueCompare = PERSONAL_DATA_CHECKBOXES[key].validationField ? values[PERSONAL_DATA_CHECKBOXES[key].validationField] : PERSONAL_DATA_CHECKBOXES[key].validationValue ? props.translate(PERSONAL_DATA_CHECKBOXES[key].validationValue) : null;
    //     const validation = validateField({  
    //                             value : values[key], 
    //                             validation:PERSONAL_DATA_CHECKBOXES[key].validation, 
    //                             required:PERSONAL_DATA_CHECKBOXES[key].required
    //                         },
    //                         fieldValueCompare);
    //     if(!validation.result){
    //         errors[key] = validation.messageCode;
    //     }
    // });
    // //console.log(errors);
    return errors;
}
export default withLocalize(reduxForm({
    validate,
    form: 'personal_fields', // a unique identifier for this form
  })(PersonalData))