import React, { Component } from 'react'
import axios from 'axios';
import Form from '../general/form';
import { templateField } from '../../utils';

export default class SurveyData extends Component {
    constructor(props){
        super(props);

        this.state = { survey : null}
    }
    async componentDidMount(){
        //Traigo las preguntas del survey
        const response = await axios.get(process.env.REACT_APP_API_URL+'/researcher/investigation/'+this.props.uuidInvestigation+'/survey')
                            .catch(err => {console.log('Catch', err); return err;}); 
        if(response.request.status === 200){
            this.setState({survey : response.data });
        }
    }
    saveSurvey(values){
        console.log("Values!", values);
    }
    render() {
        if(this.state.survey === null){
            return (
                <div>
                    CARGANDO
                </div>
            )
        }
        else{
            let formSurvey = {}
            this.state.survey.survey.fields.forEach(element => {
                let field = {...templateField }
                field.label = element.question;
                field.required = element.required;
                formSurvey[element.name] = field;
            });
            const patientOptions = this.state.survey.patients.map(element => {
                return element.name+" "+element.surnames
            });
            formSurvey["patient"] = {
                options:[{"text" : "investigation.create.survey.type_text", "value" : "text"},
                {"text": "investigation.create.survey.type_number", "value" : "number"}, 
                {"text": "investigation.create.survey.type_date", "value" : "date"}]
            }
            
            return (
                <div>
                    <Form fields={formSurvey} callBackForm={this.saveSurvey} />
                </div>
            )
        }
        
    }
}
