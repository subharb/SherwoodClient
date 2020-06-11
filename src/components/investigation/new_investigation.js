import React, { Component } from 'react'
import NewSurvey  from './new_survey';
import AddPatients from './add_patients';
import Summary from './summary';
import styled from 'styled-components';

const Container = styled.div`
    padding:1rem;
`;
export default class NewInvestigation extends Component {
    constructor(props){
        super(props);
        
        this.addData = this.addData.bind(this);

        this.state = {step:2, 
            survey: {
            title : "My first investigation",
            description: "My first description",
            fields : [
                {   "is_personal_data":{
                        value:true,
                        label:"investigation.create.survey.personal_info",
                        shortLabel: "investigation.table.is_personal_data",
                        
                    },
                    "name" : {
                        value : "name",
                        label:"investigation.create.survey.name_field",
                        shortLabel: "investigation.table.name",
                    },
                    "type" : {
                        value:"text",
                        label : "investigation.create.survey.choose",
                        shortLabel: "investigation.table.type"                                                
                    },
                    "question" : {
                        value : "¿cuál es su nombre",
                        label : "investigation.create.survey.question_field",
                        shortLabel: "investigation.table.question",
                    }
                },
                {   "is_personal_data":{
                        value:true,
                        label:"investigation.create.survey.personal_info",
                        shortLabel: "investigation.table.is_personal_data",
                        
                    },
                    "name" : {
                        value : "surnames",
                        label:"investigation.create.survey.name_field",
                        shortLabel: "investigation.table.name",
                    },
                    "type" : {
                        value:"text",
                        label : "investigation.create.survey.choose",
                        shortLabel: "investigation.table.type"                                                
                    },
                    "question" : {
                        value : "¿cuáles son sus apellidos",
                        label : "investigation.create.survey.question_field",
                        shortLabel: "investigation.table.question",
                    }
                },
                {   "is_personal_data":{
                        value:false,
                        label:"investigation.create.survey.personal_info",
                        shortLabel: "investigation.table.is_personal_data",
                    },
                    "name" : {
                        value : "hemo",
                        label:"investigation.create.survey.name_field",
                        shortLabel: "investigation.table.name",
                    },
                    "type" : {
                        value:"text",
                        label : "investigation.create.survey.choose",
                        shortLabel: "investigation.table.type"                                                
                    },
                    "question" : {
                        value : "Hemoglobina",
                        label : "investigation.create.survey.question_field",
                        shortLabel: "investigation.table.question",
                    }
                }
            ]}
            , patientsEmail:[
                "david@sherwood.science",
                "Pedro.rodriguez@hotmail.com"
            ]}
    }
    addData(data){
        console.log("New Data!", data);
        let tempState = {...this.state};
        switch(this.state.step){
            case 0:
                tempState.survey = data;
                break;
            case 1:
                tempState.patientsEmail = data
                break;
            case 2:
                console.log("Send Information!");
                break;
            default:
                return "Something went wrong"
        }
        tempState.step++;

        this.setState(tempState);
    }
    render() {
        let component = null;
        switch(this.state.step){
            case 0:
                component = <NewSurvey callBackData={this.addData} />
                break;
            case 1:
                component = <AddPatients callBackData={this.addData} />
                break;
            case 2:
                component = <Summary survey={this.state.survey} 
                            patientsEmail={this.state.patientsEmail} 
                            callBackData={this.addData} 
                            saveAndSend={this.saveAndSend}
                            saveForLater={this.saveForLater}
                        />
                break;
            default:
                component = "Something went wrong";
                break;
        }
        return(
            <Container>
                {component}
            </Container>
        );
        
    }
}
