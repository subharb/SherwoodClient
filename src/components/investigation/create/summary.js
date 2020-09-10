import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from '../../general/modal';
import PreviewConsents from '../../consent/preview';
import styled from 'styled-components';
import { toggleLoading } from '../../../actions';
import SuccessComponent from '../../../components/general/success_component';
import Table from '../../../components/general/table';

const SpanField = styled.span`
    font-weight:bold;
`;

const ResultContainer = styled.div`
    background-color:red;
`;


class Summary extends Component {
    constructor(props){
        super(props);

        this.showConsents = this.showConsents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.send = this.send.bind(this);
        this.continueModal = this.continueModal.bind(this);
        this.state = {showConsents : false, showResult:false, result : 0}
        //Resultado 0, no enviado, 1 recibido y con error; 2 recibido y correcto
    }
    showConsents(){
        this.setState({showConsents:true});
    }
    modalComponent(){
        let component;
        switch(this.state.result){
            case 0:
                const filteredFields2 = [];//Object.values(this.props.investigation.consents).filter(consent => consent.is_personal_data);
                component = <PreviewConsents title={this.props.translate("investigation.create.survey.add_field")} consents={this.props.investigation.consents}  personalFields={filteredFields2} />
                break;
            case 1:
                component = "error!";
                break;
            case 2:
                component = <ResultContainer title="Suecess!">Success!</ResultContainer>
                break;
            default:
                component = "Unexpected";
                break;
        }
        
        return component;
    }
    closeModal(){
        this.setState({showConsents:false});
    }
    async send(consents){
        this.props.toggleLoading();
        let investigationInfo = {...this.props.investigation };
        investigationInfo.sendConsents = consents;
        console.log("Enviamos: "+JSON.stringify(investigationInfo));

        const request = await axios.post(process.env.REACT_APP_API_URL+'/investigation', investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .catch(err => {console.log('Catch', err); return err;}); 
        
        let error = 0;
        if(request.status === 200){
            console.log("Success!");

            this.setState({showResult:true, result:2});
        }
        else if(request.status === 401){
            localStorage.removeItem("jwt");
            error = 1;
            this.setState({showResult:true, result:1});
        }
        this.props.toggleLoading();
        
        
    }
    continueModal(){
        console.log("Continue!");
        this.props.history.push("/investigation/show");
    }
    render() {
        return([
            <Modal key="modal1" open={this.state.showConsents}  
                component={this.modalComponent()} 
                closeCallBack={this.closeModal}
            />,
            <Modal key="modal2" open={this.state.showResult}  
                component={<SuccessComponent title="investigation.create.summary.success.title" 
                                            description="investigation.create.summary.success.description" 
                                            successButtonText = "investigation.create.summary.success.continue"
                                            callBackContinue ={this.continueModal} />} 
            />,
            <div key="content" className="row">
                <div className="col-12">
                    <h4><Translate id="investigation.create.summary.title" /></h4>
                    <p><Translate id="investigation.create.summary.explanation" /></p>
                    <p><SpanField><Translate id="investigation.create.summary.review_consents" ></Translate>:</SpanField> <button className="waves-effect waves-light btn lime" onClick={this.showConsents}>Ver consents</button></p>
                    <p><SpanField><Translate id="investigation.create.survey.name" ></Translate>:</SpanField> {this.props.investigation.survey.title}</p>
                    <p><SpanField><Translate id="investigation.create.survey.description" ></Translate>:</SpanField> {this.props.investigation.survey.description}</p>
                    <Translate id="investigation.create.summary.personal_data" ></Translate>
                    <Table header={Object.keys(this.props.investigation.survey.personalData[0])} values={this.props.investigation.survey.personalData.map(field =>{
                        return Object.values(field)
                    })}/>
                    <SpanField><Translate id="investigation.create.summary.survey" ></Translate></SpanField>
                    <Table header={Object.keys(this.props.investigation.survey.fields[0])} values={this.props.investigation.survey.fields.map(field =>{
                        return Object.values(field)
                    })}/>
                    <SpanField><Translate id="investigation.create.summary.patients" ></Translate></SpanField>
                    <table id="survey-info" key="table-emails" className="striped">
                        <thead>
                        <tr>
                            <th key="email"><Translate id="investigation.create.summary.email" ></Translate></th>   
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.investigation.patients.map(patient => {
                                return(
                                    <tr key={patient.email}>
                                        <td>{patient.email}</td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <button data-testid="publish-investigation" onClick={()=>this.send(true)} type="button" key="publish-investigation" id="publish-investigation" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save_and_send")}<i className="material-icons right">send</i></button>
                <button data-testid="save-for-later-investigation" onClick={()=>this.send(false)} type="button" key="save-for-later-investigation" id="save-for-later-investigation" className="waves-effect waves-light btn lime left">{this.props.translate("investigation.create.save")}<i className="material-icons left">send</i></button>
                <button data-testid="cancel" onClick={this.props.stepBack} className="waves-effect waves-light btn red lighten-1 right">Back</button>
            </div>
            ]
        );
    }
}

Summary.propTypes = {
    investigation : PropTypes.object
}

export default withRouter(withLocalize((connect(null, { toggleLoading })(Summary))));