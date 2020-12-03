import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Form from '../../general/form';
import { templateField } from '../../../utils';
import SuccessComponent from '../../general/success_component';
import Modal from '../../general/modal';

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
        return this.props.initialData.sections.map(section => {
            console.log(section.name);
            return (
                <div>
                    <h5>{section.name}</h5>
                    <Form fields={section.fields} answeringMode callBackForm={this.saveSurvey} />
                </div>)
        });
        
    }
}
export default withRouter(SurveyForm);