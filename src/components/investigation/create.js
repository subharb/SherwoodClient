import React, { Component } from 'react'
import { Translate, withLocalize } from 'react-localize-redux';
import _ from 'lodash';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form'
import FieldSherwood from '../FieldSherwood';
import Form from '../general/form';
import Modal from '../general/modal';

const DeleteHolder = styled.div`
    display: flex;
    color:#E16580;
    cursor:pointer;
`;
const FIELDS = {
    "is_personal_data":{
        required : false,
        type:"checkbox",
        label:"investigation.create.personal_info",
        shortLabel: "investigation.table.is_personal_data",
        validation : "notEmpty"
    },
    "name" : {
        required : true,
        type:"text",
        label:"investigation.create.name_field",
        shortLabel: "investigation.table.name",
        validation : "textMin2"
    },
    "type" : {
        required : true,
        type:"select",
        validation : "notEmpty",
        label : "investigation.create.choose",
        shortLabel: "investigation.table.type",
        defaultOption:{"text" : "investigation.create.choose", "value" : ""},
        options:[{"text" : "investigation.create.type_text", "value" : "text"},
                {"text": "investigation.create.type_number", "value" : "number"}, 
                {"text": "investigation.create.type_date", "value" : "date"}]
                                        
    },
    "question" : {
        required : false,
        type:"text",
        label : "investigation.create.question_field",
        shortLabel: "investigation.table.question",
        validation : "textMin6", 
        size : "s6"
    }
}

class CreateInvestigation extends Component {
    constructor(props){
        super(props);

        this.addField = this.addField.bind(this);
        this.deleteField = this.deleteField.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.renderAddedFields = this.renderAddedFields.bind(this);
        this.state = {fields : [{name: "age", type:"number", question : "¿cuál es tu edad?"}], addingField : false, loading : false, error : false};
    }
    handleAddField(values){
        console.log("handleAddField", values);
        //Guardo el estado anterior
        let tempState = {...this.state};
        //Pongo a false el "addinField", para que desaparezca el formulario
        tempState.addingField = false;
        tempState.fields.push(values);
        //Vacío el form
        this.props.reset();

        this.setState(tempState);
    }
    addField(){
        if(!this.state.addingField){
            this.setState({addingField : true});
        }
    }
    /**
     * Function that deletes a field in the investigaton and updates this.state
     * 
     * @param {Object} field - Field to be validated
     * 
     */
    deleteField(field){
        console.log(field);
        //Recorro los campos ya añadidos y borro el que llega por parámetro
        let tempState = {...this.state};
        for(let i = 0; i < tempState.fields.length;i++){
            let aField = tempState.fields[i];
            if(aField === field){
                tempState.fields.splice(i, 1);
            }
        }
        this.setState(tempState);
    }
    renderAddedFields(){
        if(this.state.fields.length === 0){
            return <Translate id="investigation.create.no_fields" />
        }
        else{
            return [<table className="striped">
                        <thead>
                        <tr>
                            {Object.values(FIELDS).map(value => {
                                return (
                                    <th>{this.props.translate(value.shortLabel)}</th>
                                )
                            })}
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.fields.map(field => {
                                return(
                                    <tr>
                                        <td>{field.is_personal_data ? this.props.translate("general.yes") : this.props.translate("general.no")}</td>
                                        <td>{field.name}</td>
                                        <td>{field.type}</td>
                                        <td>{field.question}</td>
                                        <td><DeleteHolder onClick={() => this.deleteField(field)}><i class="material-icons">delete</i></DeleteHolder></td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>,
                    <button className="waves-effect waves-light btn">{this.props.translate("investigation.create.save")}<i class="material-icons right">send</i></button>
            ]
        }
    }
    render() {
        return([
        <Modal open={this.state.addingField} title={this.props.translate("investigation.create.add_field")} component={<Form fields={FIELDS} callBackForm={this.handleAddField} />} />,
            <div className="row">
                <div className="col-12">
                    <h3><Translate id="investigation.create.title" /></h3>
                    <p><Translate id="investigation.create.explanation" /></p>
                    <Translate id="investigation.create.add_field" />
                    <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.addField}><i className="material-icons">add</i></a>
                </div>
                <div>
                    { this.renderAddedFields() }
                </div>
            </div>
            ]
        );
    }
}

function validate(values){
    const errors = {};

    // Object.keys(FIELDS).forEach(key => {
    //     console.log(key);
    //     const validation = validateField({value : values[key], validation:FIELDS[key].validation, required:FIELDS[key].required})
    //     if(!validation.result){
    //         errors[key] = validation.messageCode;
    //     }
    // })
    return errors;
}
export default withLocalize(reduxForm({
    // a unique name for the form
    validate,
    form: 'newField'
  })(CreateInvestigation))
