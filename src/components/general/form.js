import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import FieldSherwood from './FieldSherwood';
import { validateField } from '../../utils/index';
import PropTypes from 'prop-types';
import { DeleteHolder, ButtonCancel, ButtonContinue, ButtonAdd } from '../../components/general/mini_components';
import { Grid } from '@material-ui/core';


 /**
 * Component that renders a form with the values passed by props
 * 
 * @param {Object} fields - Fields to be rendered
 * @param Boolean creating - If we are creating a form
 * 
 */



  const required = (value) => (value ? undefined : "Required");
  const maxLength = (max) => (value) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
  const maxLength15 = maxLength(15);
  const number = (value) =>
    value && isNaN(Number(value)) ? "Must be a number" : undefined;
  const minValue = (min) => (value) =>
    value && value < min ? `Must be at least ${min}` : undefined;
  const minValue18 = minValue(18);
  const email = (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined;
  const tooOld = (value) =>
    value && value > 65 ? "You might be too old for this" : undefined;
  const aol = (value) =>
    value && /.+@aol\.com/.test(value)
      ? "Really? You still use AOL for your email?"
      : undefined;

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    console.log("renderField: " + label);
    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  };
const testSherwood = (value, key) => {
    console.log("Validamos "+key);
    return "ERRRORRR";
}
class Form extends Component {
    constructor(props){
        super(props);
        this.sherwoodValidation = this.sherwoodValidation.bind(this)
        this.renderOptions = this.renderOptions.bind(this);
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
    renderOptions(extraField){
        console.log("Fields", extraField.fields);
        console.log("value", extraField);
        if(!this.state.showOptions.hasOwnProperty(extraField.fields.name) || (this.state.showOptions[extraField.fields.name] === true)){
                if(extraField.type == "min_max"){
                    return (
                        [
                            <Grid item xs={6}>
                                <Field
                                    size = "s6"
                                    name="type_options[0]"
                                    type="text"
                                    component={FieldSherwood}
                                    label="Mínimo"/>
                            </Grid>,
                            <Grid item xs={6}>
                                <Field
                                    size = "s6"
                                    name="type_options[1]"
                                    type="text"
                                    component={FieldSherwood}
                                    label="Máximo"/>
                            </Grid>
                        ]
                    )
                }
                else{
                    return (
                        <div className="">
                            {
                                (extraField.type !== "min_max" || (extraField.type === "min_max" && extraField.fields.length < 2)) &&
                                [
                                    <Translate id={extraField.label} />,
                                    <ButtonAdd type="button" onClick={() => extraField.fields.push("")} />
                                ]
                            }
                            <div className="container">
                                {extraField.fields.map((hobby, index) =>{
                                    return(
                                        <div className="row">
                                            <Field
                                                size = "s12"
                                                name={hobby}
                                                type="text"
                                                component={FieldSherwood}
                                                label={`Option #${index + 1}`}/>
                                            <DeleteHolder onClick={() => extraField.fields.remove(index)}>
                                                <i className="material-icons">delete</i>
                                            </DeleteHolder>
                                        </div>
                                    )
                                }                                
                                )}
                            </div>
                        </div>);
                }
                
            
        }
        else if(this.state.showOptions.hasOwnProperty(extraField.fields.name)){
            return(
                <button onClick={() => this.showOptions(extraField.fields.name)} 
                    data-testid="save-option" type="button" className="waves-effect waves-light btn-small">
                    <i className="material-icons">open_in_full</i>
                </button>
            )
        }
        else{
            return null;
        }
    }
    renderExtraFields(key){
        //Un field que habilita la aparición de otro field
        if(this.props.hasOwnProperty("valuesForm") && (this.props.fields[key].hasOwnProperty("activationValues") && this.props.valuesForm.hasOwnProperty(key) && this.props.fields[key].activationValues.includes(this.props.valuesForm[key]))){
            const extraField = {...this.props.fields[key].activatedFields[this.props.fields[key].activationValues.indexOf(this.props.valuesForm[key])]}; 
            if(extraField.type === "options"){
                return (
                    <div className="container">
                        <FieldArray name={`${key}_options`} {...extraField} key={key} component={this.renderOptions} />
                    </div>
                )
            }
            else if(extraField.type === "min_max"){
                return(
                    <div className="container">
                        <FieldArray name={`${key}_options`} {...extraField} key={key} component={this.renderOptions} />
                    </div>
                ) 
            }
            else{
                return(
                    <div className="s6">
                        <Field name={key} {...extraField} type={extraField.type} label={extraField.label} component={FieldSherwood} />
                    </div>
                ) 
            }
        }
    }
    render() {
        const dataTestId = this.props.dataTestid ? "data-testid='"+this.props.dataTestid+"'": "";
        return(
            <div className="container">
                <form data-testid="form" className="form-group" onSubmit={this.props.handleSubmit(values => {this.callBackForm(values)})}  >
                    

                    {Object.keys(this.props.fields).map(key => {
                        return(
                            <Field
                                name={this.props.fields[key].name}
                                type={this.props.fields[key].type}
                                component={FieldSherwood}
                                key={key}
                                label={this.props.fields[key].label}
                                validate={[this.sherwoodValidation]}
                            />
                        );
                    })}
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