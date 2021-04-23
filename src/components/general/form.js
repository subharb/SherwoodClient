import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import FieldSherwood from './FieldSherwood';
import { validateField } from '../../utils/index';
import PropTypes from 'prop-types';
import { DeleteHolder, ButtonCancel, ButtonContinue, ButtonAdd } from '../../components/general/mini_components';


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

        this.renderOptions = this.renderOptions.bind(this);
        //Para guardar el estado de los extra fields con opciones, si mostrarlos o no
        this.state = {showOptions:{}}
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
    renderOptions(value){
        console.log("Fields", value.fields);
        if(!this.state.showOptions.hasOwnProperty(value.fields.name) || (this.state.showOptions[value.fields.name] === true)){
            return (
                <div className="">
                    <Translate id={value.label} />
                    <ButtonAdd type="button" onClick={() => value.fields.push("")} />
                    
                    <div className="container">
                        {value.fields.map((hobby, index) =>
                            <div className="row">
                                <Field
                                    size = "s12"
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
        else if(this.state.showOptions.hasOwnProperty(value.fields.name)){
            return(
                <button onClick={() => this.showOptions(value.fields.name)} 
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
        //Un field que habilita la apararición de otro field
        if(this.props.hasOwnProperty("valuesForm") && (this.props.fields[key].hasOwnProperty("activationValues") && this.props.valuesForm.hasOwnProperty(key) && this.props.fields[key].activationValues.includes(this.props.valuesForm[key]))){
            const extraField = {...this.props.fields[key].activatedFields[this.props.fields[key].activationValues.indexOf(this.props.valuesForm[key])]}; 
            if(extraField.type === "options"){
                return (
                    <div className="container">
                        <FieldArray name={key} {...extraField} key={key} component={this.renderOptions} />
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
                        console.log(this.props.typeValue);
                        if(this.props.fields[key].type !== "options"){
                            return (
                                <div className="row" key={key}>
                                    <Field name={key} {...this.props.fields[key]} 
                                        type={this.props.fields[key].type} label={this.props.fields[key].label} callBackMultiOptionSelected={(name, value) => this.props.change(name, value)}
                                        component={FieldSherwood} />
                                    {/* {
                                        this.renderExtraFields(key)
                                    } */}
                                </div>);
                        }
                    })}
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
        dictFields[fieldKey] = field
        
        // if(field.hasOwnProperty("slaves")){
        //     for(const slave of field.slaves){
        //         dictFields[slave.name] = slave;
        //     }
        // }
        
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