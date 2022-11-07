import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import FieldSherwood from './FieldSherwood';
import { validateField } from '../../utils/index';
import PropTypes from 'prop-types';
import { DeleteHolder, ButtonCancel, ButtonContinue, ButtonAdd } from '../../components/general/mini_components';
import { Grid, Paper, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

 /**
 * Component that renders a form with the values passed by props
 * 
 * @param {Object} fields - Fields to be rendered
 * @param Boolean creating - If we are creating a form
 * 
 */

class Form extends Component {
    constructor(props){
        super(props);

        this.renderFields= this.renderFields.bind(this);
        this.sherwoodValidation = this.sherwoodValidation.bind(this)
        
        //Para guardar el estado de los extra fields con opciones, si mostrarlos o no
        this.state = {showOptions:{}}
    }
    sherwoodValidation(value, allValues, propsForm, key){
        if(this.props.fields[key]){
            const fieldValueCompare = this.props.fields[key].validationField ? value : this.props.fields[key].validationValue ? this.props.translate(this.props.fields[key].validationValue) : null;
            const valueField = this.props.fields[key].type === "textarea" && typeof value !== "undefined" ? value.replace(/<[^>]+>/g, '') : value;
            const validationFunc = this.props.fields[key].validation ? this.props.fields[key].validation : "notEmpty";
            const validation = validateField({  
                                    value : valueField, 
                                    validation:validationFunc, 
                                    required:this.props.fields[key].required
                                },
                                fieldValueCompare);

            return validation.result ? undefined : validation.messageCode;
            
        }
        else{
            return undefined;
        }
    }
    callBackForm(values){
        //Filtro los que sean undefined
        let tempValues = {}
        Object.keys(values).forEach(key => {
            if(typeof values[key] !== "undefined"){
                tempValues[key] = values[key]
            }
        })
        return this.props.callBackForm(tempValues);
    }
    componentDidMount(){
        //Busco el campo DefaultValue para inicializar el form con esos valores
        let initData = {};
        Object.keys(this.props.fields).forEach(key => {
            if(this.props.initialData){
                initData[key] = this.props.initialData[key];
            }
            else{
                if(this.props.fields[key].hasOwnProperty("defaultValue")){
                    initData[key] = this.props.fields[key].defaultValue;
                }
                else if(this.props.fields[key].type === "checkbox"){
                    initData[key] = false;
                }
            }
            
        });
        this.props.initialize(initData)
    }
    showOptions(key){
        let tempState = this.state;
        tempState.showOptions[key] = true;
        this.setState(tempState);
    }
    closeOptions(key){
        let tempState = this.state;
        tempState.showOptions[key] = false;
        this.setState(tempState);
    }
    
    renderExtraFields(key){
        //Un field que habilita la aparición de otro field
       
        // const {input, activationValues, activatedFields} = {...this.props.fields[key]};

        // if(activationValues && activatedFields){
            
            
        //         return (
        //             <div className="container">
        //                 <FieldArray name={`${key}_options`} key={key} component={this.renderOptions} />
        //             </div>
        //         )
            
        // }
    }
    renderFields(){
        
        let fieldsMarkup = [];
        let currentSection = [];
        let pastInput = [];
        Object.keys(this.props.fields).map((key, index) => {
            if(this.props.fields[key].type !== "options"){
                if(this.props.fields[key].type === "title_section"){
                    if(currentSection.length > 0){
                        fieldsMarkup.push(
                            <Paper elevation={3} style={{padding:"1rem", marginTop:'1rem'}} >
                                {currentSection}
                            </Paper>
                        );
                    }
                    currentSection = [];
                }
                currentSection.push(
                    <Grid item xs={this.props.numberColumns === 2 ? 6 :12}>
                        <Field
                            name={this.props.fields[key].name ? this.props.fields[key].name : key}
                            type={this.props.fields[key].type}
                            component={FieldSherwood}
                            key={key}
                            uuidSurvey={this.props.uuidSurvey}
                            uuidPatient={this.props.uuidPatient}
                            uuidInvestigation={this.props.uuidInvestigation}
                            hideTitle = { currentSection.length === 1 }
                            fullWidth={this.props.fullWidth}
                            country={this.props.country}
                            label={this.props.fields[key].label}
                            validate={[this.sherwoodValidation]}
                            {...this.props.fields[key]}
                        />
                        {
                            this.renderExtraFields(key)
                        }
                    </Grid>
                    );
                
                
                if(index === Object.keys(this.props.fields).length -1){
                    fieldsMarkup.push(
                        <Paper elevation={3} style={{padding:"1rem", marginTop:'1rem'}} >
                            <Grid container>
                            {currentSection}
                            </Grid>
                        </Paper>
                    );
                }
            }
            
        })
        return fieldsMarkup;
    }
    render() {
        const dataTestId = this.props.dataTestid ? "data-testid='"+this.props.dataTestid+"'": "";
        return(
            <div className="container">
                <form data-testid="form" className="form-group" onSubmit={this.props.handleSubmit(values => {this.callBackForm(values)})}  >
                    {
                        this.renderFields()
                    }
                    {/* {Object.keys(this.props.fields).map(key => {
                        console.log(this.props.typeValue);
                        if(this.props.fields[key].type !== "options"){
                            return (
                                <div className="row" key={key}>
                                    <Field name={key} {...this.props.fields[key]} country={this.props.country}
                                        type={this.props.fields[key].type} label={this.props.fields[key].label} 
                                        callBackMultiOptionSelected={(name, value) => this.props.change(name, value)}
                                        component={renderField} />
                                    {
                                        this.renderExtraFields(key)
                                    }
                                </div>);
                        }
                    })} */}
                    {
                        this.props.externalError &&
                        <Typography variant="body2" style={{color:"#e53e3e"}}>
                            <Translate id={this.props.externalError} />
                        </Typography> 
                    }
                    <div style={{paddingTop:"1rem"}}>
                        <ButtonContinue type="submit" data-testid={this.props.dataTestid} spaceright={1} >
                            { this.props.submitText ?  this.props.translate(this.props.submitText) : this.props.translate("investigation.create.save")}
                        </ButtonContinue>
                        {this.props.closeCallBack &&
                            <ButtonCancel data-testid="cancel" onClick={this.props.closeCallBack}>
                                { this.props.cancelText ?  this.props.translate(this.props.cancelText) : this.props.translate("general.cancel")}
                            </ButtonCancel>
                        } 
                    </div>
                </form>
            </div>
            
        ) 
    }
}
Form.propTypes = {
    fields: PropTypes.object,
    callBackForm: PropTypes.func
  };

function validate(values, props){
    const errors = {};
    const dictFields = {};
    for(const fieldKey in props.fields){
        const field = props.fields[fieldKey];
        dictFields[fieldKey] = field;
    }
  
    Object.keys(dictFields).forEach(key => {
        console.log(key+" : "+dictFields[key].validation+" "+values[key]);
        //Se puede comparar con otro valor del form si existe el campo validationField o con un valor que se pasa en validationValue
        const fieldValueCompare = dictFields[key].validationField ? values[dictFields[key].validationField] : dictFields[key].validationValue ? props.translate(dictFields[key].validationValue) : null;
        const valueField = dictFields[key].type === "textarea" && typeof values[key] !== "undefined" ? values[key].replace(/<[^>]+>/g, '') : values[key];
        const validationFunc = dictFields[key].validation ? dictFields[key].validation : "notEmpty";
        const validation = validateField({  
                                value : valueField, 
                                validation:validationFunc, 
                                required:dictFields[key].required
                            },
                            fieldValueCompare);
        if(!validation.result){
            errors[key] = validation.messageCode;
        }
    });
    //console.log(errors);
    return errors;
}
Form.propTypes = {
    fields : PropTypes.object,
    creating: PropTypes.bool
}


// // Decorate with redux-form
// Form = reduxForm({
//     validate,
//     form: 'form'  // a unique identifier for this form               
//   })(Form)
  
//   // Decorate with connect to read form values
//   const selector = formValueSelector('form') // <-- same as form name
//   //Filtro los campos que activan otros campos
//   //const activatingFields = this.props.fields.filter(filter => filter.hasOwnProperty("activationValues"));
//   Form = connect(
//     state => {
//       // can select values individually
//       const values = state.form.hasOwnProperty("form") ? state.form.form.values : {};      
//       return {
//         valuesForm :  values
//       }
//     }
//   )(Form)

  export default reduxForm({
    form: 'form', // a unique identifier for this form
    // validate,
  })(withLocalize(Form))

//export default withLocalize(Form);