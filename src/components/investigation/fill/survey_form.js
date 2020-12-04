import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { validateField } from '../../../utils/index';
import { templateField } from '../../../utils';
import SuccessComponent from '../../general/success_component';
import Modal from '../../general/modal';
import { ButtonContinue } from '../../general/mini_components';
import { Field, reduxForm } from 'redux-form'
import FieldSherwood from '../../general/FieldSherwood';
import { Translate } from 'react-localize-redux';

/**
 * SurveyForm se encarga de mostrar los formularios de cada sección, los valida y si son correctos avisa
 * a survey/index de que todo es correcto
 */
class SurveyForm extends Component {
    constructor(props){
        super(props);

        this.state = { success : false, survey: null}

        this.continueModal = this.continueModal.bind(this);
        this.saveSurvey = this.saveSurvey.bind(this);
    }
    async componentDidMount(){
        //Traigo las preguntas del survey
        const response = await axios.get(process.env.REACT_APP_API_URL+'/researcher/investigation/'+this.props.uuidInvestigation+'/survey')
                            .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            this.setState({survey : response.data });
        }
    }
    async saveSurvey(values){
        console.log("Values!", values);
        let postObj = {uuidPatient:values.uuidPatient};
        delete values.uuidPatient;
        postObj.record = values;
        const response = await axios.post(process.env.REACT_APP_API_URL+'/researcher/investigation/'+this.props.uuidInvestigation+'/survey', postObj)
        .catch(err => {console.log('Catch', err); return err;}); 

        if(response.request.status === 200){
            console.log("Success!");
            this.setState({success : true});
        }
    }
    continueModal(){
        this.props.history.push("/investigation/show/"+this.props.uuidInvestigation);
    }
    render() {
        return (
            <div className="container">
                <form data-testid="form" className="form-group" onSubmit={this.props.handleSubmit(values => {this.props.callBackForm(values)})}  >
                    {
                        this.props.initialData.sections.map(section => {
                            console.log(section.name);
                            return ([
                                <div className="row" style={{paddingTop:'1rem'}}>
                                    <h5>{section.name}</h5>
                                </div>,
                                <div className="row">
                                    {
                                        section.fields.map(field => {
                                            return(
                                                <div style={{marginRight:'1rem'}}>
                                                    <Field
                                                        size = "s6"
                                                        name={field.name}
                                                        type={field.type}
                                                        required={field.required}
                                                        component={FieldSherwood}
                                                        label={field.label}/>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </div>
                            ]
                            )
                        })
                    }
                    <div className="row" style={{paddingTop:'1rem'}}>
                        <ButtonContinue type="submit" data-testid={this.props.dataTestid} >
                            <Translate id="investigation.create.save" />
                        </ButtonContinue>
                    </div>
                </form>
            </div>
        )
    }
            
}

function validate(values, props){
    const errors = {};
    props.initialData.sections.forEach(section => {
        Object.keys(section.fields).forEach(key => {
            const field = {...section.fields[key]}
            console.log(key+" : "+field.validation+" "+values[key]);
            //Se puede comparar con otro valor del form si existe el campo validationField o con un valor que se pasa en validationValue
            const fieldValueCompare = field.validationField ? values[field.validationField] : field.validationValue ? props.translate(field.validationValue) : null;
            const validation = validateField({  
                                    value : values[key], 
                                    validation:field.validation, 
                                    required:field.required
                                },
                                fieldValueCompare);
            if(!validation.result){
                errors[key] = validation.messageCode;
            }
        })
    })
    //console.log(errors);
    return errors;
}

SurveyForm = reduxForm({
    validate,
    form: 'form'  // a unique identifier for this form               
  })(SurveyForm)

export default withRouter(SurveyForm);