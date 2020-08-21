import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Modal from '../../../general/modal';
import SuccessComponent from '../../../general/success_component';
import { Translate, withLocalize } from 'react-localize-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import FieldSherwood from '../../../general/FieldSherwood';
import { fieldLevelNotEmpty, fieldLevelmarkedCheckbox } from '../../../../utils';
import { toggleLoading } from '../../../../actions';


const ButtonHolder = styled.div`
    padding:1rem;
`;
const RowConsent = styled.div`
    margin-bottom:0rem;
`;

class AcceptConsents extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this); 
        this.continueModal = this.continueModal.bind(this);
        this.state = {success : false, loading:false, error:0}
    }
    saveConsents(data){
        console.log("Save Consents:", data);
    }
    async handleSubmit(values){
        console.log("handleSubmit", values);
        
        this.props.toggleLoading();
        
        const arrayKeys = Object.keys(values);

        let putObject = {};
        arrayKeys.forEach(key => {
            const idConsent = key.replace("_check", "");
            let tempValue = putObject[idConsent] ? putObject[idConsent] : {};
            if(key.includes("check")){
                tempValue["accepted"] = values[key]
            }
            else{
                tempValue["value"] = values[key]
            }
            putObject[idConsent] = tempValue
        });
        console.log(putObject);
        
        const request = await axios.put(process.env.REACT_APP_API_URL+'/patient/consents/'+this.props.uuidInvestigation, {consents:values})
        .catch(err => console.log('Catch', err)); 
    
        //Guardamos el token si la request fue exitosa
        console.log("Request", request);
        if(request.status === 200){
            console.log("Rquest!");
            this.setState({success:true});
        }
        else{
            this.setState({error:true});
        }
        this.props.toggleLoading();
    }
    continueModal(){
        console.log("Continue!");
        this.props.history.push("/investigation/show");
    }
    componentDidMount(){
        let initData = {};
        this.props.investigation.consents.map((consent, index) => {
            initData[consent.id+"_check"] = false;
        });
        this.props.initialize(initData);
    }
    render() {
        console.log("Render Accept Consents", this.state.success);
        const form = {};
        const templateField = {
            required : false,
            type:"text",
            label:"investigation.create.survey.personal_info",
            shortLabel: "investigation.table.is_personal_data",
            validation : "notEmpty"}
        for(let i = 0; i < this.props.investigation.consents.length; i++){
            const consent = this.props.investigation.consents[i];
            if(consent.is_personal_data){
                form[consent.name+"check"] = {...templateField };
                form[consent.name+"check"].label = consent.text;
            }
            form[consent.name] = {...templateField};
            form[consent.name].label = consent.name;
            form[consent.name].required = consent.required;
        }
        const handleSubmit = this.props.handleSubmit;
        return ([
                <Modal key="modal2" open={this.state.success}  
                    component={
                        <SuccessComponent title="investigation.show.accept_consents.success.title" 
                            description="investigation.show.accept_consents.success.description" 
                            successButtonText = "investigation.show.accept_consents.continue"
                            callBackContinue ={this.continueModal} />
                    } 
                />,
                <div key="container">

                    {this.state.success === true  && 
                        <span data-testid="resolved">success</span>
                    }
                    {this.state.error === true && 
                        <span data-testid="resolved">error</span>
                    }
                    <h5><Translate id="consent.title" /></h5>
                    <p><Translate id="investigation.show.title" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.description" />: { this.props.investigation.description }</p>
                    
                    <form key="form" className="form" onSubmit={handleSubmit(values => this.handleSubmit(values))} >    
                        {
                            this.props.investigation.consents.map((consent, index) => {
                            let content = null;
                                if(consent.is_personal_data){
                                    content = 
                                            <RowConsent key={index} className="row">
                                                <div className="col s10">{index+1}. {this.props.translate("consent.give_consent").replace("NAME", consent.name)} </div>
                                                <div className="col s2">
                                                    <Field name={consent.id+"_check"} data-testid={consent.id+"_check"} 
                                                            removeClass={true} type="checkbox" 
                                                            validate = {consent.required ? [fieldLevelmarkedCheckbox] : []} 
                                                            label="" component={FieldSherwood} />
                                                </div> 
                                                <div className="col s12">
                                                    <span>{this.props.translate("consent.consent_reason").replace("CONSENT", consent.text)}</span>
                                                </div>
                                                <div className="col s6">
                                                    <Field name={`${consent.id}`} data-testid={consent.id+"_check"} 
                                                            size="s12" type="text" validate = {consent.required ? [fieldLevelNotEmpty] : []} 
                                                             label={consent.name} component={FieldSherwood} />
                                                </div>
                                            </RowConsent>
                                }
                                else{
                                    content = 
                                            <RowConsent key={index} className="row">
                                                <div className="col s10">{index+1}. {this.props.translate("consent.consent_reason").replace("CONSENT", consent.text)} </div>
                                                <div className="col s2">
                                                    <Field name={consent.id+"_check"} data-testid={consent.id+"_check"} removeClass={true} type="checkbox" validate = {consent.required ? [fieldLevelmarkedCheckbox] : []} required = {consent.required} label="" component={FieldSherwood} />
                                                </div>
                                            </RowConsent>
                                }
                                return content
                            })
                        }
                        <ButtonHolder>
                            <button data-testid="save-consents" type="submit"
                                className="waves-effect waves-light btn">Save
                            </button>
                        </ButtonHolder>
                    </form>
                </div>
            ]
        )
    }
}
AcceptConsents.propTypes = {
    investigation: PropTypes.object
}; 

export default withRouter(withLocalize(reduxForm({
    // a unique name for the form
    form: 'AcceptConsents'
  }) (connect(null, { toggleLoading })(AcceptConsents))))
