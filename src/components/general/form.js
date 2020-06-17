import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { Field, reduxForm } from 'redux-form'
import FieldSherwood from '../FieldSherwood';
import { validateField } from '../../utils/index';
import PropTypes from 'prop-types';
 /**
 * Component that renders a form with the values passed by props
 * 
 * @param {Object} fields - Fields to be rendered
 * 
 */
class Form extends Component {
    callBackForm(values){
        console.log("CALLBACK!"); 
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
    render() {
        return(
            <form data-testid="form" className="form" onSubmit={this.props.handleSubmit(values => this.callBackForm(values))}  >
                {Object.keys(this.props.fields).map(key => {
                    return (
                    <div className="row" key={key}>
                        <Field name={key} {...this.props.fields[key]} type={this.props.fields[key].type} label={this.props.fields[key].label} component={FieldSherwood} />
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
        const validation = validateField({value : values[key], validation:props.fields[key].validation, required:props.fields[key].required})
        if(!validation.result){
            errors[key] = validation.messageCode;
        }
    });
    console.log(errors);
    return errors;
}
export default withLocalize(reduxForm({
    // a unique name for the form
    validate,
    form: 'newField'
  })(Form))