import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import FieldSherwood from './FieldSherwood';
import { validateField } from '../../utils/index';
import PropTypes from 'prop-types';
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
    renderOptions({ fields, meta: { touched, error } }){
        console.log("Fields", fields);
        return (
            <div>
                Options: <button type="button" className="btn-floating btn-small waves-effect waves-light red" onClick={() => fields.push("")}><i className="material-icons">add</i></button>
                {touched && error && <span>{error}</span>}
                <div className="container">
                    {fields.map((hobby, index) =>
                            <Field
                                name={hobby}
                                type="text"
                                component={FieldSherwood}
                                label={`Option #${index + 1}`}/>
                        
                    )}
                </div>
            </div>);
    }
    // //Para Mostrar más opciones si estoy creando formularios, por ehjemplo para añadir las opciones de checkbox, select y multiopción
    // callOnChange(event, newValue, previousValue, name, fields){
    //     console.log("Callback On change!", newValue);
    //     if(name === "type" && newValue === "dropdown"){
    //         //Mostramos las opciones(nombre, valor) del checkbox
            
    //     }
    // }
    render() {
        return(
            <form data-testid="form" className="form" onSubmit={this.props.handleSubmit(values => {alert(JSON.stringify(values));this.callBackForm(values)})}  >
                {Object.keys(this.props.fields).map(key => {
                    console.log(this.props.typeValue);
                    return (
                    <div className="row" key={key}>
                        <Field name={key} {...this.props.fields[key]} type={this.props.fields[key].type} label={this.props.fields[key].label} component={FieldSherwood} />
                        {
                            //Un field que habilita la apareción de otro field
                            (this.props.hasOwnProperty("valuesForm") && (this.props.fields[key].hasOwnProperty("activationValue") && this.props.valuesForm.hasOwnProperty(key) && this.props.valuesForm[key] === this.props.fields[key].activationValue)) &&
                            <FieldArray name="options" {...this.props.fields[key].activatedField} component={this.renderOptions} />
                        }
                       
                    </div>);
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
    form: 'form'  // a unique identifier for this form
    validate,
  })(Form)
  
  // Decorate with connect to read form values
  const selector = formValueSelector('form') // <-- same as form name
  //Filtro los campos que activan otros campos
  //const activatingFields = this.props.fields.filter(filter => filter.hasOwnProperty("activationValue"));
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