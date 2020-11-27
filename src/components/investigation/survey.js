import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Form from '../general/form';
import { templateField } from '../../utils';
import SuccessComponent from '../../components/general/success_component';
import Modal from '../../components/general/modal';

class SurveyData extends Component {
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
        if(this.state.survey === null){
            return (
                <div>
                    CARGANDO
                </div>
            )
        }
        else{
            let formSurvey = {}
            const patientOptions = this.state.survey.patients.map(element => {
                return {text : element.name+" "+element.surnames, value:element.uuid}
            });
            formSurvey["uuidPatient"] = {
                type:"select",
                required : true,
                validation : "notEmpty",
                label : "investigation.create.edc.choose_patient",
                options:patientOptions,
                defaultOption:{"text" : "investigation.create.edc.choose", "value" : ""},
            }
            this.state.survey.survey.fields.forEach(element => {
                let field = {...templateField }
                field.label = element.question;
                field.required = element.required;
                formSurvey[element.name] = field;
            });
            
            
            return ([
                <Modal key="modal2" open={this.state.success}  
                component={<SuccessComponent title="investigation.create.summary.success.title" 
                                            description="investigation.create.summary.success.description" 
                                            successButtonText = "investigation.create.summary.success.continue"
                                            callBackContinue ={this.continueModal} />} 
            />,
            <div>
                <Form fields={formSurvey} callBackForm={this.saveSurvey} />
            </div>
            ]
            )
        }
        
    }
}
export default withRouter(SurveyData);