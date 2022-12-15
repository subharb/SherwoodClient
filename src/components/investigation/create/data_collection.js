import React, { Component } from 'react'
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { validateField } from '../../../utils';
import Table from '../../general/table';
import Section from './section';
import { ButtonSave, ButtonAdd, ButtonBack, ButtonContinue } from '../../general/mini_components'; 
import FieldSherwood from '../../general/FieldSherwood';
import { reduxForm, Field, submit, FormSection } from 'redux-form';
import { TextField, Grid, Container, Card, CardContent, Typography, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { EnhancedTable } from '../../general/EnhancedTable';
import OrderableTable from '../../general/OrderableTable';
import { CATEGORY_SURVEYS, TYPE_SURVEYS } from '../../../constants';
/**
 * An EDC is a collection of sections
 */

const SECTION_FORM = {
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.edc.section.section_name",
        shortLabel: "investigation.create.edc.section.section_name",
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
        this.renderNewSectionForm = this.renderSectionForm.bind(this);
        this.renderSections = this.renderSections.bind(this);
        this.closeNewSection = this.closeNewSection.bind(this);
        this.saveDataCollection = this.saveDataCollection.bind(this);
        this.callBackNewSection = this.callBackNewSection.bind(this);
        this.handleChangeUnit = this.handleChangeUnit.bind(this);
        this.hangleChangeTypeSurvey = this.hangleChangeTypeSurvey.bind(this);
        this.hangleChangeCategorySurvey = this.hangleChangeCategorySurvey.bind(this);
        this.changeName = this.changeName.bind(this);
        const initialState = {name:"", sections: [], addingSection:false, editingIndexSection:false, unit:props.initialData && props.initialData.unit ? props.initialData.unit.id : false, type : props.initialData && props.initialData.type, category : props.initialData && props.initialData.category}
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
    }
    changeName(e){
        let tempState = {...this.state};
        tempState.name = e.target.value;
        this.setState(tempState);
    }
    orderUpdate(dragDrop){
        console.log("Parent reorder");
        let tempState = {...this.state};
        const result = Array.from(tempState.sections);
        const [removed] = result.splice(dragDrop.source.index, 1);
        result.splice(dragDrop.destination.index, 0, removed);
        tempState.sections = result.map((section, index) => {section.order = index; return section;});
        this.setState(tempState);
    }
    renderSections(){
        const AddButton = <div><ButtonAdd disabled={this.state.addingSection || Number.isInteger(this.state.editingIndexSection)} 
                            type="button" data-testid="add-sections" show={!this.state.addingSection}  
                            onClick={this.addSection}></ButtonAdd>Add Section</div>
        if(this.state.sections.length === 0){
            return (
            <Grid item xs={12}>
                {AddButton}
                <Typography variant="body2" component="span" gutterBottom>
                    <Translate id="investigation.create.edc.section.none" />
                </Typography>
            </Grid>)
        }
        else{
            let arrayHeader = Object.keys(SECTION_FORM).map(key => {
                const value = SECTION_FORM[key]; 
                return { id: key, alignment: "left", label: <Translate id={value.shortLabel} /> }
            });
            arrayHeader.push({ id: "number_fields", alignment: "right", label: <Translate id="investigation.create.edc.number_fields" />});

            return(
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        {AddButton}
                    </Grid>
                    <Grid item xs={12}>
                        <OrderableTable droppableId="sections"
                            onDragEnd={(dragDrop) => this.orderUpdate(dragDrop)} noSelectable
                            titleTable={<Translate id="investigation.create.edc.data_collections.sections" />}  
                            headCells={arrayHeader}
                            rows={this.state.sections.sort((a, b) => a.order - b.order ).map((section, index) => {
                                let tempSection = {}
                                for(const keyField of Object.keys(SECTION_FORM)){
                                    const field = SECTION_FORM[keyField];
                                    if(field.type === "checkbox"){
                                        tempSection[keyField] = section[keyField] === true
                                    }
                                    else{
                                        tempSection[keyField] = section[keyField]
                                    }
                                    
                                }
                                tempSection["id"] = index;
                                return tempSection;
                            })}
                            actions={[{"type" : "delete", "func" : (index) => this.deleteSection(index, "sections")}, {"type" : "edit", "func" : (index) => this.editSection(index, "sections")}]}
                            />
                    </Grid>
                                        
                </Grid>)
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
            section.order =  tempState.sections.length;
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
    renderSectionForm(){
        const staticParams = {
            callBackNewSection:this.callBackNewSection,
            closeNewSection:this.closeNewSection
        }
        if(this.state.addingSection){
            return (
                <Grid item xs={12}>
                    <Section {...staticParams} />
                </Grid>);
        }
        else if(Number.isInteger(this.state.editingIndexSection)){
            return (
                <Grid item xs={12}>
                    <Section initialData={this.state.sections[this.state.editingIndexSection]} 
                        {...staticParams}
                    />
                </Grid>);
        }
        else{
            return null;
        }
    }

    saveDataCollection(values){
        if(this.state.sections.length > 0){
            this.props.callBackData({...this.state});
        }
    }
    componentDidMount(){
        if(this.props.initialData){
            this.props.initialize(this.props.initialData)
        }
    }
    handleChangeUnit(event){
        console.log(event.target.value);
        const tempState = {...this.state};
        tempState.unit = {id : event.target.value}
        this.setState(tempState);
    }
    hangleChangeTypeSurvey(event){
        console.log(event.target.value);
        const tempState = {...this.state};
        tempState.type =  event.target.value;
        this.setState(tempState);
    }
    hangleChangeCategorySurvey(event){
        console.log(event.target.value);
        const tempState = {...this.state};
        tempState.category =  event.target.value;
        this.setState(tempState);
    }
    renderUnits(){
        const units = [];
        this.props.departments.forEach((dep) => dep.units.forEach((unit) => {
            const unitInfo = {
                name:dep.name+" - "+unit.name,
                id:unit.id
            }
            units.push(unitInfo)
        }));
        return (
            <Grid item xs={12}>
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Unit: </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.unit ? this.state.unit.id : false }
                        label="Unit"
                        onChange={this.handleChangeUnit}
                    >
                        <MenuItem value={false}>Sin especificar</MenuItem>
                        {
                            units.map((unit) => {
                                return <MenuItem value={unit.id}>{unit.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
        )
    }
    renderType(){
        
        return (
            <>
            <Grid item xs={12}>
                <FormControl >
                    <InputLabel id="type_survey">Type: </InputLabel>
                    <Select
                        labelId="type_survey"
                        id="type_survey"
                        value={this.state.type}
                        label="Type"
                        onChange={this.hangleChangeTypeSurvey}
                    >
                        {
                            TYPE_SURVEYS.map((typeSurvey) => {
                                return <MenuItem value={typeSurvey.value}>{typeSurvey.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl >
                    <InputLabel id="category_survey">Category: </InputLabel>
                    <Select
                        labelId="category_survey"
                        id="category_survey"
                        value={this.state.category}
                        label="Category"
                        onChange={this.hangleChangeCategorySurvey}
                    >
                        {
                            CATEGORY_SURVEYS.map((categorySurvey) => {
                                return <MenuItem value={categorySurvey.value}>{categorySurvey.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Grid>
            </>
        )
    }
    render(){
        if(Number.isInteger(this.state.editingIndexSection) || this.state.addingSection){
            return (
                <Grid style={{ padding: 20 }} container key="container" spacing={3}>
                {
                    this.props.callBackData && 
                    <Grid item xs={12}>
                        <ButtonBack onClick={this.closeNewSection} />
                    </Grid>
                }
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="textPrimary">
                            { Number.isInteger(this.state.editingIndexSection) ?
                                <span>Editing {this.state.name} &gt; {this.state.sections[this.state.editingIndexSection].name}</span> : 
                                "New Section"
                            }
                            
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            <Translate id="investigation.create.edc.data_collections.intro" />
                        </Typography>
                        { this.renderSectionForm() }
                    </Grid>
                </Grid>
                )
        }
        else{
            return ( 
                <Grid style={{ padding: 20 }} container key="container" spacing={3}>
                {
                    this.props.callBackData && 
                    <Grid item xs={12}>
                        <ButtonBack onClick={this.props.callBackStepBack} />
                    </Grid>
                }
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textPrimary">
                        <Translate id="investigation.create.edc.data_collections.new"/>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        <Translate id="investigation.create.edc.data_collections.intro" />
                    </Typography>
                </Grid>
                
                <Grid item xs={12}>
                    <TextField label="name" name="name_data_collection" 
                        value={this.state.name} variant="outlined" onChange={this.changeName}/>    
                </Grid>

                {
                    this.renderType()
                }
                {
                    this.renderUnits()
                }
                
                { this.renderSections() }
                
            
                <Grid item xs={12}>
                    <ButtonSave id="data_collection" data-testid="save_data_collection" disabled={this.state.name.length === 0 || this.state.sections.length === 0} 
                        type="button" onClick={this.saveDataCollection}>
                            <Translate id="investigation.create.edc.data_collections.save" />
                    </ButtonSave>
                </Grid>
            </Grid>
            )
        }
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

