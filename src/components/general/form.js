import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import { Field, reduxForm } from 'redux-form'
import FieldSherwood from '../FieldSherwood';
import { validateField } from '../../utils/index';

 /**
 * Component that renders a form with the values passed by props
 * 
 * @param {Object} fields - Fields to be rendered
 * 
 */
class Form extends Component {
  
    render() {
        return(
            <form onSubmit={this.props.handleSubmit(values => this.props.callBackForm(values))}  >
                {Object.keys(this.props.fields).map(key => {
                    return (
                    <div className="row" key={key}>
                        <Field name={key} {...this.props.fields[key]} type={this.props.fields[key].type} label={this.props.fields[key].label} component={FieldSherwood} />
                    </div>);
                })}
                <button className="waves-effect waves-light btn">
                    {this.props.translate("investigation.create.add_field")}
                </button>
            </form>
        ) 
    }
}


function validate(values, props){
    const errors = {};

    Object.keys(props.fields).forEach(key => {
        console.log(key);
        const validation = validateField({value : values[key], validation:props.fields[key].validation, required:props.fields[key].required})
        if(!validation.result){
            errors[key] = validation.messageCode;
        }
    })
    return errors;
}
export default withLocalize(reduxForm({
    // a unique name for the form
    validate,
    form: 'newField'
  })(Form))