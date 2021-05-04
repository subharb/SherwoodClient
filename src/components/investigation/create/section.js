import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { validateField, FIELDS_FORM } from '../../../utils';
import styled from "styled-components";
import FieldSherwood from '../../general/FieldSherwood';
import Table from '../../general/table';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { reduxForm, Field } from 'redux-form';
import { ButtonAdd, ButtonSave, ButtonCancel  } from '../../general/mini_components';
import { Grid,
        Typography,
        DialogTitle, 
        DialogContent,
        DialogContentText,
        Button, TextField,DialogActions, Card, CardContent
    } from "@material-ui/core";
import PropTypes from 'prop-types';
import { EnhancedTable } from '../../general/EnhancedTable';

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
        label:"investigation.create.edc.required",
        shortLabel: "investigation.table.required",
        validation : "notEmpty"
    }
}


/**
 * A section of a EDC, each section contain several inputs and can be repeated during time or not.
 */
class Section extends Component{
    constructor(props){
        super(props);

        this.handleAddField = this.handleAddField.bind(this);
        this.toogleField = this.toogleField.bind(this);
        this.renderFields = this.renderFields.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.handleNewSection = this.handleNewSection.bind(this); 

        const initialState = { addingField: false, fields : [] }
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
    }
    handleNewSection(values){
        console.log("handleNewSection: "+JSON.stringify(values));
        if(this.state.fields.length === 0){
            alert("Faltan campos");
        }
        else{
            let newValues = Object.assign({}, values);
            newValues.fields = [...this.state.fields];
            console.log("handleNewSection:"+JSON.stringify(values));
            newValues.repeats = values.hasOwnProperty("repeats") ? values.repeats : false;
            this.props.callBackNewSection(newValues);
        }
    }
    deleteElement(index, element){
        console.log("Delete Field", index);
        let tempState = {...this.state};
        tempState[element].splice(index, 1);
        this.setState(tempState);
    }
    handleAddField(values){
        console.log("Nuevo field!", values);
        if(values.hasOwnProperty("type_options")){
            values["options"] = values.type_options;
        }
        values.validation = ["ict", "treatment", "allergy", "background", "family-background"].indexOf(values.type) !== -1 ? "arrayOrFalse" : "notEmpty";
        let tempState = {...this.state};
        tempState.fields.push(values);
        this.setState(tempState);
        this.toogleField();
    }
    toogleField(){
        let tempState = {...this.state};
        tempState.addingField = !tempState.addingField;
        this.setState(tempState);
    }
    closeModal(){
        let tempState = this.state;
        tempState.addingField = false;
        this.setState(tempState);
    }
    renderFields(){
        if(this.state.fields.length > 0){
            const arrayHeader = Object.keys(FIELDS_FORM).map(key => {
                const value = FIELDS_FORM[key];
                return { id: key, alignment: "right", label: <Translate id={value.shortLabel} /> }
            });
            const rows = this.state.fields.map(aField => {
                let tempSection = {}
                for(const keyField of Object.keys(FIELDS_FORM)){
                    const field = FIELDS_FORM[keyField];
                    if(field.type === "checkbox"){
                        tempSection[keyField] = aField[keyField] === true
                    }
                    else{
                        tempSection[keyField] = aField[keyField]
                    }
                }
                return tempSection;
            })
            return <EnhancedTable titleTable={<Translate id="investigation.create.edc.fields" />}  
                        headCells={arrayHeader}
                        rows={rows}
                        actions={{"delete" : (index) => this.deleteElement(index, "fields") }} 
                    />
        }
        else{
            return null;
        }        
    }
    componentDidMount(){
        if(this.props.initialData){
            console.log("Init Data");
            this.props.initialize(this.props.initialData); 
        }
    }
    render(){
        const title = this.props.initialData ? <Translate id="investigation.create.edc.section.edit_section" /> :  <Translate id="investigation.create.edc.section.new" />
        const saveText = this.props.initialData ? <Translate id="investigation.create.edc.section.edit_section" /> : <Translate id="investigation.create.edc.section.add" />
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Modal
                        open={this.state.addingField}
                        closeModal={this.closeModal}
                        title={this.props.translate("investigation.create.edc.add_field")}>
                            <Form fields={FIELDS_FORM} callBackForm={this.handleAddField} closeCallBack={this.closeModal} dataTestid="save-field" />
                    </Modal>
                </Grid>
                <Grid item container xs={12}>
                    <Card>
                        <CardContent>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="textPrimary">
                                    {
                                        title
                                    }
                                </Typography>
                                <form onSubmit={this.props.handleSubmit(values => this.handleNewSection(values))}>
                                    <Field type="text" name="name" label="name" required={true} component={FieldSherwood} />
                                    <div>
                                        <Field type="checkbox" name="repeats" label="repeats" component={FieldSherwood} />
                                    </div>
                                    <div style={{paddingTop:"40px"}}>
                                        <Typography variant="body2" color="textPrimary" component="span"> 
                                            <Translate id="investigation.create.edc.add_field" />
                                        </Typography>
                                        <ButtonAdd type="button" data-testid="add-field" onClick={this.toogleField}
                                            show={!this.state.addingField}>
                                        </ButtonAdd>  
                                    </div>  
                                    { this.renderFields() }
                                    <div style={{paddingTop:"40px"}}>
                                        <ButtonSave disabled={this.state.fields.length === 0} data-testid="add-section" type="submit">Add Section</ButtonSave>
                                        <ButtonCancel onClick={this.props.closeNewSection} data-testid="cancel-section" style={{marginLeft:'1rem'}}
                                            type="button">Cancel</ButtonCancel>
                                    </div>
                                </form>   
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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

Section.propTypes = {
    initialData: PropTypes.object,
    addNewSection: PropTypes.func.isRequired,
    closeNewSection: PropTypes.func.isRequired
};

export default withLocalize(reduxForm({
    validate : validate,
    form : 'section'
})(Section))
