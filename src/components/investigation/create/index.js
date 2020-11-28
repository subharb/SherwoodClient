import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BasicInfo  from './basic_info2';
import PISGenerator  from './PIS_generator';
import AddPatients from './add_patients';
import Summary from './summary';
import { fetchInvestigation } from '../../../actions';
import AddConsents from './consent';

import Breadcrumb from '../../general/breadcrumb';
import EDC from './edc';

const Container = styled.div`
    padding:1rem;
`;
class NewInvestigation extends Component {
    constructor(props){
        super(props);
        
        this.addData = this.addData.bind(this);
        this.stepBack = this.stepBack.bind(this);
        this.goToStep = this.goToStep.bind(this);
        
        this.steps = {
            basic_info : "investigation.create.steps.basic_info",
            edc : "investigation.create.steps.edc",
            // pis : "investigation.create.steps.patient_sheet",
            // consent : "investigation.create.steps.consents",
            summary : "investigation.create.steps.summary"
        }

        if(this.props.initialData){
            this.state = {...this.props.initialData};
            this.state.step = this.props.step;
        }
        else{
            this.state = {step : 0, investigation:{}}
        }
        
        // this.state = {step:1, 
        //     investigation : {
        //         title : "My first investigation",
        //         description: "My first description",
        //         survey: {
        //             fields : [  
        //                 {   "name" : "hemo",
        //                     "type" : "text",
        //                     "required" : true,
        //                     "question" : "Hemoglobina"
        //                 }
        //             ],
        //             personalData : [
        //                 {   
        //                 "name" : "name",
        //                 "required" : true,
        //                 "type" : "text",
        //                 "question" :"¿cuál es su nombre?"
        //             },
        //             {   
        //                 "name" : "surnames",
        //                 "required" : true,
        //                 "type" : "text",
        //                 "question" : "¿cuáles son sus apellidos"
        //             }, 
        //             ]}
        //         ,patients:[
        //             {"email" : "david@sherwood.science", 
        //                 "keyPatInvEncr" : "U2FsdGVkX18UwefjYdNNYrbOXGfhaosgCltu1Rf7YeALN4SA57aQbejaIP2iczRDOPzzu+WJuJQIon1giKE7uQ==", "tempKey" :"ffu2wyexjxbw6n3sn3tngh"},
        //             {"email" : "Pedro.rodriguez@hotmail.com",
        //                 "keyPatInvEncr" : "U2FsdGVkX1/h++4ISsIqAUMsgn6LByXuSlYe5XZLv/IDxPZVK2Sa404sfjyEz5RSubMxp3a5P2YDd5RtK2p/lA==", "tempKey" : "2h1n2cg3inci9irlqugur"}
        //         ], 
        //         consents: {
        //             name: {
        //             value: 'Identification purposes',
        //             required: true,
        //             is_personal_data: true
        //             },
        //             surnames: {
        //             value: 'Identification purposes',
        //             required: true,
        //             is_personal_data: true
        //             },
        //             store_material: { value: 'Store biological material', is_personal_data: false }
        //         }
        //     } 
        // }
    }
    addData(data){
        console.log("New Data!", JSON.stringify(data));
        let tempState = {...this.state};
        switch(this.state.step){
            case 0:
                tempState.investigation.basic_info = {...data};
                break;
            case 1:
                tempState.investigation.survey = data;
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
    stepBack(){
        
        let tempState = this.state;
        if(tempState.step > 0){
            tempState.step--;
        }
    
        this.setState(tempState);
    }
    goToStep(step){
        let tempState = this.state;
        if(step >= 0 && step < Object.values(tempState.investigation).length){
            tempState.step = step;
        }
    
        this.setState(tempState);
    }
    componentDidMount(){
        if(typeof this.props.uuid !== "undefined" && !this.props.investigation){
            this.props.fetchInvestigation(this.props.uuid);
        }
    }
    render() {
        console.log("Initial data:", this.props.initialData);
        let component = null;
        if(typeof this.props.uuid !== "undefined" && !this.props.investigation){
            return "CARGANDO";
        }
        switch(this.state.step){
            case 0:
                component = <BasicInfo initialData={ this.props.initialData ? this.props.initialData.investigation.basic_info : this.state.investigation.basic_info } 
                                callBackData={this.addData} />
                break;
            // case 1:
            //     component = <PISGenerator callBackData={this.addData} 
            //                     stepBack = {this.stepBack}/>
            //     break;
            // case 2:
            //     component = <AddConsents consents={ this.state.investigation.consents }  personalFields={this.state.investigation.basic_info.personalData} callBackData={this.addData} 
            //                     stepBack = {this.stepBack}/>
            //     break;
            case 1: 
                component = <EDC initialData={this.props.initialData.investigation.survey} callBackStepBack = {this.stepBack}  callBackData={this.addData} />
                break;
            // case 2:
            //     component = <AddPatients patients={ this.state.investigation.hasOwnProperty("patients") ? this.state.investigation.patients : false }  callBackData={this.addData} 
            //                     stepBack = {this.stepBack}/>
            //    break;
            case 2:
                component = <Summary initialData={ this.state.investigation } callBackStepBack = {this.stepBack} callBackToStep = {this.goToStep}  />
                break;
            default:
                component = "Something went wrong";
                break;
        }
        return(
            <div className="card">
                <Breadcrumb callBack={this.goToStep} selected={this.state.step} stages={Object.values(this.steps)} /> 
                <Container>
                    {component}
                </Container>
            </div>
        );
    }
}

NewInvestigation.propTypes = {
    uuid: PropTypes.string
}


function mapStateToProps(state, ownProps){
    if(state.investigations.hasOwnProperty(ownProps.uuid)){
        return{
            investigation : state.investigations[ownProps.uuid]
        }
    }
    else{
        return{
            investigation : null
        }
    }
    
}

export default connect(mapStateToProps, { fetchInvestigation})(NewInvestigation)