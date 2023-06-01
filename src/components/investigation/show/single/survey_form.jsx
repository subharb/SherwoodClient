import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { validateField, numberRecordsSection } from '../../../../utils/index.jsx';
import { templateField } from '../../../../utils/index.jsx';
import SuccessComponent from '../../../general/success_component';
import Modal from '../../../general/modal';
import { ButtonContinue } from '../../../general/mini_components';
import { Field, reduxForm, FormSection } from 'redux-form'
import FieldSherwood from '../../../general/FieldSherwood';
import { Translate } from 'react-localize-redux';

/***
 * 
 * Posible componente en desuso ELIMINAR
 */
/**
 * SurveySections se encarga de mostrar los formularios de cada sección. Si es longitudinal, verifica que no se haya enviado ya datos. Valida la info y si son correctos avisa
 * a survey/index de que todo es correcto
 */
class SurveySections extends Component {
    constructor(props){
        super(props);

        this.state = { success : false, survey: null, records:null}

        this.continueModal = this.continueModal.bind(this);
        this.saveSurvey = this.saveSurvey.bind(this);
    }
    async componentDidMount(){
        const response = await axios.get(import.meta.env.VITE_APP_API_URL+"/researcher/investigation/"+this.props.uuidInvestigation+"/record/"+this.props.patientId, { headers: {"Authorization" : localStorage.getItem("jwt")} })
                .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            this.setState({records:response.data.records});
        }
    }
    async saveSurvey(values){
        console.log("Values!", values);
        let postObj = {uuidPatient:values.uuidPatient};
        delete values.uuidPatient;
        postObj.record = values;
        const response = await axios.post(import.meta.env.VITE_APP_API_URL+'/researcher/investigation/'+this.props.uuidInvestigation+'/survey', postObj, { headers: {"Authorization" : localStorage.getItem("jwt")} })
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
        if(this.state.records === null){
            return "CARGANDO"
        }
        else{
            const filteredSections = this.props.sections.filter(section => {
                return section.repeats || (!section.repeats && numberRecordsSection(section, this.state.records) === 0)
            });
            return (
                <div className="container">
                    <form data-testid="form" className="form-group" onSubmit={this.props.handleSubmit(values => {this.props.callBackForm(values)})}  >
                        {
                            filteredSections.map(section => {
                                console.log(section.name);
                                return ([
                                    <div className="row" style={{paddingTop:'1rem'}}>
                                        <h5>{section.name}</h5>
                                    </div>,
                                    <div className="row">
                                        <FormSection name={section._id}>
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
                                        </FormSection>
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
}

function validate(values, props){
    const errors = {};
    props.sections.forEach(section => {
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

SurveySections = reduxForm({
    validate,
    form: 'form'  // a unique identifier for this form               
  })(SurveySections)

export default withRouter(SurveySections);