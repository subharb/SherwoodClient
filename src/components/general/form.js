import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import FieldSherwood from './FieldSherwood';
import { validateField } from '../../utils/index';
import PropTypes from 'prop-types';
import { DeleteHolder } from '../../components/general/mini_components';

 /**
 * Component that renders a form with the values passed by props
 * 
 * @param {Object} fields - Fields to be rendered
 * @param Boolean creating - If we are creating a form
 * 
 */
class Form extends Component {
    callBackForm(values){
        return this.props.callBackForm(values);
    }
    componentDidMount(){
        //Busco el campo DefaultValue para inicializar el form con esos valores
        let initData = {};
        Object.keys(this.props.fields).forEach(key => {
            if(this.props.fields[key].hasOwnProperty("defaultValue")){
                initData[key] = this.props.fields[key].defaultValue;
            }
            else if(this.props.fields[key].type === "checkbox"){
                initData[key] = false;
            }
        });
        this.props.initialize(initData)
    }
    renderOptions(value){
        console.log("Fields", value.fields);
        return (
            <div className="input-field">
                <Translate id={value.label} /> <button type="button" className="btn-floating btn-small waves-effect waves-light red" onClick={() => value.fields.push("")}><i className="material-icons">add</i></button>
                
                <div className="container">
                    {value.fields.map((hobby, index) =>
                        <div className="row">
                            <Field
                                size = "s6"
                                name={hobby}
                                type="text"
                                component={FieldSherwood}
                                label={`Option #${index + 1}`}/>
                            <DeleteHolder onClick={() => value.fields.remove(index)}>
                                <i className="material-icons">delete</i>
                            </DeleteHolder>
                        </div>
                    )}
                </div>
            </div>);
    }
    renderExtraFields(key){
        //Un field que habilita la apararición de otro field
        if(this.props.hasOwnProperty("valuesForm") && (this.props.fields[key].hasOwnProperty("activationValues") && this.props.valuesForm.hasOwnProperty(key) && this.props.fields[key].activationValues.includes(this.props.valuesForm[key]))){
            const extraField = {...this.props.fields[key].activatedFields[this.props.fields[key].activationValues.indexOf(this.props.valuesForm[key])]}; 
            if(extraField.type === "options"){
                return (
                    <div className="row">
                        <FieldArray name="options" {...extraField} component={this.renderOptions} />
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
        return(
            <form data-testid="form" className="form" onSubmit={this.props.handleSubmit(values => {alert(JSON.stringify(values));this.callBackForm(values)})}  >
                {Object.keys(this.props.fields).map(key => {
                    console.log(this.props.typeValue);
                    if(this.props.fields[key].type !== "options"){
                        return (
                            <div className="row" key={key}>
                                <Field name={key} {...this.props.fields[key]} 
                                    type={this.props.fields[key].type} label={this.props.fields[key].label} 
                                    component={FieldSherwood} />
                                {
                                    this.renderExtraFields(key)
                                }
                            </div>);
                    }
                    else{
                        //Si es de tipo options, muestro un boton para añadir opciones
                        return (
                            <div className="row" key={key}>
                                <FieldArray name={key} label={this.props.fields[key].label} {...this.props.fields[key]}  component={this.renderOptions} />
                            </div>);
                    }
                    
                })}
                <button data-testid="submit-form" type="submit" className="waves-effect waves-light btn">
                    {this.props.translate("investigation.create.save")}
                </button>
            </form>
        ) 
    }
}
Form.propTypes = {
    fields: PropTypes.object,
    callBackForm: PropTypes.func
  };

function validate(values, props){
    const errors = {};
    Object.keys(props.fields).forEach(key => {
        console.log(key+" : "+props.fields[key].validation+" "+values[key]);
        //Se puede comparar con otro valor del form si existe el campo validationField o con un valor que se pasa en validationValue
        const fieldValueCompare = props.fields[key].validationField ? values[props.fields[key].validationField] : props.fields[key].validationValue ? props.translate(props.fields[key].validationValue) : null;
        const validation = validateField({  
                                value : values[key], 
                                validation:props.fields[key].validation, 
                                required:props.fields[key].required
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


// Decorate with redux-form
Form = reduxForm({
    validate,
    form: 'form'  // a unique identifier for this form
  })(Form)
  
  // Decorate with connect to read form values
  const selector = formValueSelector('form') // <-- same as form name
  //Filtro los campos que activan otros campos
  //const activatingFields = this.props.fields.filter(filter => filter.hasOwnProperty("activationValues"));
  Form = connect(
    state => {
      // can select values individually
      const values = state.form.hasOwnProperty("form") ? state.form.form.values : {};      
      return {
        valuesForm :  values
      }
    }
  )(Form)


export default withLocalize(Form);