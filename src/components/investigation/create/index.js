import React, { Component } from 'react'
import NewSurvey  from './new_survey';
import AddPatients from './add_patients';
import Summary from './summary';
import PreviewConsents from '../../consent/preview';
import AddConsents from './consent';
import styled from 'styled-components';

const Container = styled.div`
    padding:1rem;
`;
export default class NewInvestigation extends Component {
    constructor(props){
        super(props);
        
        this.addData = this.addData.bind(this);
        this.state = {step : 0, survey:{}, consents:{}, patientsEmail:[]}
        // this.state = {step:1, 
        //     survey: {
        //         title : "My first investigation",
        //         description: "My first description",
        //         fields : [
        //             {   "is_personal_data": true,
        //                 "name" : "name",
        //                 "type" : "text",
        //                 "question" :"¿cuál es su nombre?"
        //             },
        //             {   "is_personal_data": true,
        //                 "name" : "surnames",
        //                 "type" : "text",
        //                 "question" : "¿cuáles son sus apellidos"
        //             },   
        //             {   "is_personal_data": false,
        //                 "name" : "hemo",
        //                 "type" : "text",
        //                 "question" : "Hemoglobina"
        //             }
        //         ]}
        //     ,patientsEmail:[
        //         "david@sherwood.science",
        //         "Pedro.rodriguez@hotmail.com"
        //     ], 
        //     consents: {
        //         name: {
        //         value: 'Identification purposes',
        //         required: true,
        //         is_personal_data: true
        //         },
        //         surnames: {
        //         value: 'Identification purposes',
        //         required: true,
        //         is_personal_data: true
        //         },
        //         '1hgqrcsn1gv81fh52yd1z': { value: 'Store biological material', is_personal_data: false }
        //     }
        // }
    }
    addData(data){
        console.log("New Data!", JSON.stringify(data));
        let tempState = {...this.state};
        switch(this.state.step){
            case 0:
                tempState.survey = data;
                break;
            case 1:
                tempState.consents = data;
                break;
            case 2:
                tempState.patientsEmail = data;
                break;
            case 3:
                console.log("Send Information!");
                break;
            default:
                return "Something went wrong";
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
                const filteredFields = this.state.survey.fields.filter(field => field.is_personal_data === true);
                console.log("filteredFields", filteredFields);
                component = <AddConsents personalFields={filteredFields} callBackData={this.addData} />
                break;
            case 2:
                component = <AddPatients callBackData={this.addData} />
                break;
            case 3:
                component = <Summary investigation={this.state} />
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
