import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { validateField, isSmartField } from '../../../utils';
import FieldSherwood from '../../general/FieldSherwood';
import Modal from '../../general/modal';
import Form from '../../general/form';
import { reduxForm, Field } from 'redux-form';
import { ButtonAdd, ButtonSave, ButtonCancel  } from '../../general/mini_components';
import { Grid,
        Typography
    } from "@material-ui/core";
import PropTypes from 'prop-types';
import OrderableTable from '../../general/OrderableTable';
import { MEDICAL_HISTORY_FIELDS } from '../../../constants';


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
        this.deleteField = this.deleteField.bind(this);
        this.getFormSection = this.getFormSection.bind(this);
        this.handleNewSection = this.handleNewSection.bind(this);
        const initialState = { addingField: false, fields : [], showTextarea:false }
        this.state = props.initialData ? Object.assign({}, initialState, props.initialData) : initialState;
        
    }

    getFormSection(){

        let FORM = {
            "encrypted":{
                name : "encrypted",
                required : false,
                type:"checkbox",
                label:"investigation.create.edc.personal_info",
                shortLabel: "investigation.table.is_personal_data",
                validation : "notEmpty"
            },
            "required":{
                name : "required",
                required : false,
                type:"checkbox",
                label:"investigation.create.edc.required",
                shortLabel: "investigation.table.required",
                validation : "notEmpty"
            },
            "name" : {
                name : "name",
                required : true,
                type:"text",
                label:"investigation.create.edc.name_field",
                shortLabel: "investigation.table.name",
                validation : "textMin2"
            },
            "type" : {
                name : "type",
                required : true,
                type:"select",
                validation : "notEmpty",
                label : "investigation.create.edc.choose",
                shortLabel: "investigation.table.type",
                defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
                options:[{"label" : "investigation.create.edc.type_text", "value" : "text"},
                        {"label": "investigation.create.edc.type_number", "value" : "number"},
                        {"label": "investigation.create.edc.checkbox", "value" : "checkbox"}, 
                        {"label": "investigation.create.edc.type_date", "value" : "date"},
                        {"label": "investigation.create.edc.textarea", "value" : "textarea"},
                        {"label": "investigation.create.edc.dropdown", "value" : "select"},
                        {"label": "investigation.create.edc.multioption", "value" : "multioption"},
                        {"label": "investigation.create.edc.autocomplete", "value" : "autocomplete"},
                        {"label": "investigation.create.edc.radio", "value" : "radio"},
                        {"label": "investigation.create.edc.evaluation", "value" : "evaluation"},
                        {"label": "investigation.create.edc.diagnosis", "value" : "ict"},
                        {"label": "investigation.create.edc.treatment", "value" : "treatment"},
                        {"label": "investigation.create.edc.treatment_regular", "value" : "treatment_regular"},
                        {"label": "investigation.create.edc.allergy", "value" : "allergy"},
                        {"label": "investigation.create.edc.background", "value" : "background"},
                        {"label": "investigation.create.edc.files", "value" : "file"},
                        {"label": "investigation.create.edc.family-background", "value" : "family-background"},
                        {"label": "investigation.create.edc.separator", "value" : "separator"},
                        {"label": "investigation.create.edc.text_blob", "value" : "text_blob"},
                        {"label": "investigation.create.edc.bmi", "value" : "bmi"},
                        {"label": "investigation.create.edc.edd", "value" : "edd"},
                        {"label": "investigation.create.edc.request_lab", "value" : "request_lab"},
                        {"label": "investigation.create.edc.request_img", "value" : "request_img"},
                        {"label": "investigation.create.edc.medical_history_ai", "value" : "medical_history_ai"},
                        {"label": "investigation.create.edc.medical_history_template", "value" : "medical_history_template"},
                        {"label": "investigation.create.edc.medical_history_template_fill", "value" : "medical_history_template_fill"},
                ],
                callBackOnChange: (optionSeleced) => {
                    console.log("Call back on change", optionSeleced);
                    if(MEDICAL_HISTORY_FIELDS.includes(optionSeleced)){
                        const tempState = {...this.state};
                        this.setState({...tempState, showTextarea:true});
                    }
                },
                activationValues : ["select", "multioption", "autocomplete", "radio", "evaluation"],
                activatedFields:{
                    "select" : {
                        required : true,
                        type:"options",
                        validation : "notEmpty",
                        label : "investigation.create.edc.choose",
                        shortLabel: "investigation.table.type"
                    },
                    "multioption" : {
                        required : true,
                        type:"options",
                        validation : "notEmpty",
                        label : "investigation.create.edc.choose",
                        shortLabel: "investigation.table.type"
                    },
                    "autocomplete" : {
                        required : true,
                        type:"options",
                        validation : "notEmpty",
                        label : "investigation.create.edc.choose",
                        shortLabel: "investigation.table.type"
                    },
                    "radio" : {
                        required : true,
                        type:"options",
                        validation : "notEmpty",
                        label : "investigation.create.edc.choose",
                        shortLabel: "investigation.table.type"
                    },
                    "evaluation" : {
                        required : true,
                        type:"options",
                        validation : "notEmpty",
                        label : "investigation.create.edc.choose",
                        shortLabel: "investigation.table.type"
                    }
                }                                        
            },
            "label" : {
                name : "label",
                required : false,
                type:"text",
                label : "investigation.create.edc.question_field",
                shortLabel: "investigation.table.question",
                validation : "textMin2", 
                size : "s6"
            }
        }
        if(this.state.showTextarea){
            FORM = {...FORM,
                "template" : {
                    required : true,
                    type:"textarea",
                    validation : "notEmpty",
                    label : "investigation.create.edc.choose",
                    shortLabel: "investigation.table.type"
                }
            }
        }
        return FORM;
    }
    deleteField(index){
        console.log("Delete Field", index);
        let tempState = {...this.state};
        tempState.fields.splice(index, 1);
        this.setState(tempState);
    }
    handleAddField(values){
        console.log("Nuevo field!", values);
        if(values.hasOwnProperty("type_options")){
            values["options"] = values.type_options;
        }
        values.validation =  isSmartField(values.type) ? "arrayOrFalse" : "notEmpty";
        let tempState = {...this.state};
        values.order = tempState.fields.length;
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
    orderUpdate(dragDrop){
        console.log("Parent reorder");
        let tempState = {...this.state};
        const result = Array.from(tempState.fields);
        const [removed] = result.splice(dragDrop.source.index, 1);
        result.splice(dragDrop.destination.index, 0, removed);
        tempState.fields = result.map((field, index) => {field.order = index; return field;});
        this.setState(tempState);
    }
    renderFields(){
        if(this.state.fields.length > 0){
            const FIELDS_FORM = this.getFormSection();
            const arrayHeader = Object.keys(FIELDS_FORM).map(key => {
                const value = FIELDS_FORM[key];
                return { id: key, alignment: "right", label: <Translate id={value.shortLabel} /> }
            });
            const rows = this.state.fields.sort((a, b) => a.order - b.order ).map((aField, index) => {
                let tempSection = {};
                
                for(const keyField of Object.keys(FIELDS_FORM)){
                    const field = FIELDS_FORM[keyField];
                    if(field.type === "checkbox"){
                        tempSection[keyField] = aField[keyField] === true;
                    }
                    else{
                        tempSection[keyField] = aField[keyField]
                    }
                
                
                }
                tempSection["id"] = index;
                return tempSection;
            })
            return(
                <OrderableTable onDragEnd={(result) => this.orderUpdate(result)}
                    orderUpdate={(dragDrop) => this.orderUpdate(dragDrop)} 
                    droppableId="droppable" noSelectable
                    titleTable={<Translate id="investigation.create.edc.fields" />}  
                    headCells={arrayHeader}
                    rows={rows}
                    actions={[{"type" : "delete", "func" : (index) => this.deleteField(index) }]} 
                />
            )
        }
        else{
            return null;
        }        
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
    callBack(field){
        this.toogleField(false);
        this.props.callBackForm(field);
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
        const FIELDS_FORM = this.getFormSection();
        return (
            
            <Grid item container xs={12}>
                <Modal id="modal"
                    open={this.state.addingField}
                    closeModal={this.toogleField}
                    title={<Translate id="investigation.create.edc.add_field" />}>
                        <Form fields={FIELDS_FORM} fullWidth callBackForm={(field) => this.handleAddField(field)} 
                            closeCallBack={this.toogleField} dataTestid="save-field" />
                </Modal>
                <Grid item xs={12}>
                    <form onSubmit={this.props.handleSubmit(values => this.handleNewSection(values))} >
                        <Field type="text" name="name" fullWidth label="name" required={true} component={FieldSherwood} />
                        <div>
                            <Field type="checkbox" name="repeats" label="repeats" component={FieldSherwood} />
                        </div> 
                        <div style={{paddingTop:"40px"}}>
                            <Typography variant="body2" color="textPrimary" component="span"> 
                                <Translate id="investigation.create.edc.add_field" />
                            </Typography>
                            <ButtonAdd type="button" data-testid="add-field" onClick={this.toogleField}
                        show={true}>
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
            </Grid>
            
        )
    }   
    
}

function submit(values, dispatch, props){
    console.log("Validate");
    console.log("handleNewSection: "+JSON.stringify(values));
    if(this.state.fields.length === 0){
        alert("Faltan campos");
    }
    else{
        let newValues = Object.assign({}, values);
        newValues.fields = [...this.state.fields];
        console.log("handleNewSection:"+JSON.stringify(values));
        newValues.repeats = values.hasOwnProperty("repeats") ? values.repeats : false;
        props.callBackNewSection(newValues);
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
    form : 'section',
    onSubmit: submit 
})(Section))



