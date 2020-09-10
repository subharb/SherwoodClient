import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NewSurvey  from './new_survey';
import AddPatients from './add_patients';
import Summary from './summary';
import { fetchInvestigation } from '../../../actions';
import AddConsents from './consent';

const Container = styled.div`
    padding:1rem;
`;
class NewInvestigation extends Component {
    constructor(props){
        super(props);
        
        this.addData = this.addData.bind(this);
        this.stepBack = this.stepBack.bind(this);
        
        let investigation = { survey : {}, patients : [], consents : []};

        if(props.investigation){
            investigation = props.investigation;

        }
        this.state = {step : 0, investigation}
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
                tempState.investigation.title = data.title;
                tempState.investigation.description = data.description;
                tempState.investigation.survey.fields = data.fields;
                tempState.investigation.survey.personalData = data.personalData;
                break;
            case 1:
                tempState.consents = data;
                break;
            case 2:
                tempState.patients = data;
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
    componentDidMount(){
        if(typeof this.props.uuid !== "undefined" && !this.props.investigation){
            this.props.fetchInvestigation(this.props.uuid);
        }
    }
    render() {
        let component = null;
        if(typeof this.props.uuid !== "undefined" && !this.props.investigation){
            return "CARGANDO";
        }
        switch(this.state.step){
            case 0:
                component = <NewSurvey investigation={ this.props.investigation ? this.props.investigation : this.state.investigation } callBackData={this.addData} 
                                />
                break;
            case 1:
                component = <AddConsents consents={ this.state.investigation.consents }  personalFields={this.state.investigation.survey.personalData} callBackData={this.addData} 
                                stepBack = {this.stepBack}/>
                break;
            case 2:
                component = <AddPatients patients={ this.state.investigation.hasOwnProperty("patients") ? this.state.investigation.patients : false }  callBackData={this.addData} 
                                stepBack = {this.stepBack}/>
                break;
            case 3:
                component = <Summary investigation={ this.state.investigation }
                                stepBack = {this.stepBack} />
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