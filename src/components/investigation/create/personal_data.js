import React from 'react'
import { Translate } from 'react-localize-redux';
import { PERSONAL_DATA_FIELDS } from '../../../utils';
import { validateField } from '../../../utils';
import { Field, reduxForm } from 'redux-form'
import FieldSherwood from '../../general/FieldSherwood';
import { Component } from 'react';
import { CardContent, Card } from '@material-ui/core';
import { ButtonBack, ButtonContinue } from '../../general/mini_components';

let PERSONAL_DATA_CHECKBOXES = {}
class PersonalData extends Component{
    constructor(props){
        super(props);
        const arrayKeys = Object.keys(PERSONAL_DATA_FIELDS);
        for(let i = 0; i < arrayKeys.length; i++){
            const currentKey = arrayKeys[i];
            let personalField = {...PERSONAL_DATA_FIELDS[currentKey]};
            personalField.type = "checkbox";
            PERSONAL_DATA_CHECKBOXES[currentKey] = personalField;
        }
        this.initData = {}
        if(this.props.initialData){
            this.props.initialData.forEach(pField => {
                this.initData[pField] = true;
            })
        }
    }
    componentDidMount(){
        this.props.initialize(this.initData)
    }
    callBackData(values){
        console.log("CallbackData!", values);
        let tempValues = Object.keys(values).filter(key => {
            return values[key] === true;
        });
        this.props.callBackData(tempValues);
    }
    render(){
        return(    
            <Card>
                <CardContent>
                    <form data-testid="form" onSubmit={this.props.handleSubmit(values => {this.callBackData(values)})}  >
                        {
                            Object.keys(PERSONAL_DATA_CHECKBOXES).map(key =>{
                                return(
                                    <div className="row" key={key}>
                                        <Field name={key} {...PERSONAL_DATA_CHECKBOXES[key]} 
                                            type={PERSONAL_DATA_CHECKBOXES[key].type} label={PERSONAL_DATA_CHECKBOXES[key].label}
                                            component={FieldSherwood} />
                                    </div>
                                    );
                            })
                        }
                        <div className="row" style={{paddingTop:"20px"}}>
                            {
                                this.props.callBackStepBack && 
                                <ButtonBack spaceright={1} data-testid="back" onClick={this.props.callBackStepBack} ><Translate id="general.back"/></ButtonBack>
                            }
                            <ButtonContinue type="submit">
                                    <Translate id="investigation.create.continue" />
                            </ButtonContinue>
                        </div>
                    </form>
                </CardContent>
            </Card>
            
        )
        
    }
}

function validate(values, props){
    const errors = {};
    Object.keys(PERSONAL_DATA_CHECKBOXES).forEach(key => {
        console.log(key+" : "+PERSONAL_DATA_CHECKBOXES[key].validation+" "+values[key]);
        //Se puede comparar con otro valor del form si existe el campo validationField o con un valor que se pasa en validationValue
        const fieldValueCompare = PERSONAL_DATA_CHECKBOXES[key].validationField ? values[PERSONAL_DATA_CHECKBOXES[key].validationField] : PERSONAL_DATA_CHECKBOXES[key].validationValue ? props.translate(PERSONAL_DATA_CHECKBOXES[key].validationValue) : null;
        const validation = validateField({  
                                value : values[key], 
                                validation:PERSONAL_DATA_CHECKBOXES[key].validation, 
                                required:PERSONAL_DATA_CHECKBOXES[key].required
                            },
                            fieldValueCompare);
        if(!validation.result){
            errors[key] = validation.messageCode;
        }
    });
    //console.log(errors);
    return errors;
}
export default reduxForm({
    validate,
    form: 'personal_fields', // a unique identifier for this form
  })(PersonalData)