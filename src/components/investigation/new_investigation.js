import React, { Component } from 'react'
import NewSurvey  from './new_survey';
import AddPatients from './add_patients';
import Summary from './summary';

export default class NewInvestigation extends Component {
    constructor(props){
        super(props);
        
        this.addData = this.addData.bind(this);

        this.state = {step:0, survey:{}, patientsEmail:[]}
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
        switch(this.state.step){
            case 0:
                return <NewSurvey callBackData={this.addData} />
            case 1:
                return <AddPatients callBackData={this.addData} />
            case 2:
                return <Summary survey={this.state.survey} 
                            patientsEmail={this.state.patientsEmail} 
                            callBackData={this.addData} 
                            saveAndSend={this.saveAndSend}
                            saveForLater={this.saveForLater}
                        />
            default:
                return "Something went wrong"
        }
        
    }
}
