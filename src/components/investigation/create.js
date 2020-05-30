import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'
import { TextField, SelectField } from '../FieldSherwood';

class CreateInvestigation extends Component {
    constructor(props){
        super(props);

        this.addField = this.addField.bind(this);
        this.renderAddingField = this.renderAddingField.bind(this);
        this.renderAddedFields = this.renderAddedFields.bind(this);
        this.state = {fields : [], addingField : true, loading : false, error : false};
    }
    addField(){
        if(!this.state.addingField){
            this.setState({addingField : true});
        }
    }
    renderAddingField(){
        if(!this.state.addingField){
            return null;
        }
        else{
            return(
                <form>
                    <div className="row">
                        <div className="col s2">
                            <Translate id="investigation.create.name_field">Name of the field</Translate>
                        </div>
                        <div className="col s4">
                            <Field name="name_field" type="text" label="name" component={TextField} />
                        </div>
                    </div>,
                    <div className="row">
                        <div className="col s2">
                            <Translate id="investigation.create.type_field">Type of field</Translate>
                        </div>
                        <div className="col s4">
                            <Field name="type_field" type="select" label="type" defaultOption={{"text" : this.props.translate("investigation.create.choose"), value:""}}
                                options={[{"text" : this.props.translate("investigation.create.type_text"), "value" : "text"}, 
                                        {"text": this.props.translate("investigation.create.type_number"), "value" : "number"}, 
                                        {"text": this.props.translate("investigation.create.type_date"), "value" : "date"}]} 
                                        component={SelectField} />
                        </div>
                    </div>,
                    <div className="row">
                        <div className="col s2">
                            <Translate id="investigation.create.name_field">Question</Translate>
                        </div>
                        <div className="col s4">
                            <Field name="question_field" type="text" label="question" component={TextField} />
                        </div>
                    </div>,
                    <button className="waves-effect waves-light btn">Save</button>

                </form>
            ) 
        }
    }
    renderAddedFields(){
        if(this.state.fields.length === 0){
            return <Translate id="investigation.create.no_fields" />
        }
    }
    render() {
        return(
            <div className="row">
                <div className="col-12">
                    <h3><Translate id="investigation.create.title" /></h3>
                    <p><Translate id="investigation.create.explanation" /></p>
                    <Translate id="investigation.create.add_field" />
                    <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.addField}><i className="material-icons">add</i></a>
                </div>
                
                
                <div>
                    { this.renderAddingField() }
                </div>
                <div>
                    { this.renderAddedFields() }
                </div>
            </div>
        );
    }
}
export default withLocalize(reduxForm({
    // a unique name for the form
    form: 'newInvestigation'
  })(CreateInvestigation))
