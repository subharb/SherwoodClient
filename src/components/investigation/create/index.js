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
        let survey = {};
        let consents = {};
        let patients = [];

        if(props.investigation){
            survey = props.investigation.survey;
            consents = props.investigation.consents;
            patients = props.investigation.patients
        }
        //this.state = {step : 0, survey, consents, patients}
        this.state = {step:2, 
            survey: {
                title : "My first investigation",
                description: "My first description",
                fields : [
                    {   "is_personal_data": true,
                        "name" : "name",
                        "type" : "text",
                        "question" :"¿cuál es su nombre?"
                    },
                    {   "is_personal_data": true,
                        "name" : "surnames",
                        "type" : "text",
                        "question" : "¿cuáles son sus apellidos"
                    },   
                    {   "is_personal_data": false,
                        "name" : "hemo",
                        "type" : "text",
                        "question" : "Hemoglobina"
                    }
                ]}
            ,patients:[
                {"email" : "david@sherwood.science", 
                   "keyPatientEncr" : "U2FsdGVkX18UwefjYdNNYrbOXGfhaosgCltu1Rf7YeALN4SA57aQbejaIP2iczRDOPzzu+WJuJQIon1giKE7uQ==", "tempKey" :"ffu2wyexjxbw6n3sn3tngh"},
                {"email" : "Pedro.rodriguez@hotmail.com",
                    "keyPatientEncr" : "U2FsdGVkX1/h++4ISsIqAUMsgn6LByXuSlYe5XZLv/IDxPZVK2Sa404sfjyEz5RSubMxp3a5P2YDd5RtK2p/lA==", "tempKey" : "2h1n2cg3inci9irlqugur"}
            ], 
            consents: {
                name: {
                value: 'Identification purposes',
                required: true,
                is_personal_data: true
                },
                surnames: {
                value: 'Identification purposes',
                required: true,
                is_personal_data: true
                },
                '1hgqrcsn1gv81fh52yd1z': { value: 'Store biological material', is_personal_data: false }
            }
        }
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
                component = <NewSurvey investigation={ this.props.investigation ? this.props.investigation : null } callBackData={this.addData} />
                break;
            case 1:
                const filteredFields = this.state.survey.fields.filter(field => field.is_personal_data === true);
                console.log("filteredFields", filteredFields);
                component = <AddConsents consents={ this.state.consents}  personalFields={filteredFields} callBackData={this.addData} />
                break;
            case 2:
                component = <AddPatients patients={ this.state.patients }  callBackData={this.addData} />
                break;
            case 3:
                component = <Summary investigation={ this.state } />
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