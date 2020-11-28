import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from '../../general/modal';
import Table from '../../general/table';
import styled from 'styled-components';
import { toggleLoading } from '../../../actions';
import SuccessComponent from '../../../components/general/success_component';
import { ButtonEdit, ButtonSave, ButtonBack } from '../../general/mini_components';

const SpanField = styled.span`
    font-weight:bold;
`;

const ResultContainer = styled.div`
    background-color:red;
`;

const BasicInfo = styled.div`
    font-style: italic;
    color:slategrey;
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
            // case 0:
            //     const filteredFields2 = [];//Object.values(this.props.investigation.consents).filter(consent => consent.is_personal_data);
            //     component = <PreviewConsents title={this.props.translate("investigation.create.edc.add_field")} consents={this.props.investigation.consents}  personalFields={filteredFields2} />
            //     break;
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
        let investigationInfo = {...this.props.initialData.basic_info };
        investigationInfo.survey = {...this.props.initialData.survey};
        
        console.log("Enviamos: "+JSON.stringify(investigationInfo));

        const request = await axios.post(process.env.REACT_APP_API_URL+'/researcher/investigation', investigationInfo,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
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
    renderBasicInfo(){
        return Object.keys(this.props.initialData.basic_info).map(key =>{
                return key+":"+this.props.initialData.basic_info[key]+", ";
            })
        
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
                    <SpanField><Translate id="investigation.create.steps.basic_info" ></Translate><ButtonEdit onClick={() => this.props.callBackToStep(0)}/></SpanField>
                    <BasicInfo >
                    {
                        this.renderBasicInfo()
                    }
                    </BasicInfo>
                    <SpanField><Translate id="investigation.create.steps.edc" ></Translate><ButtonEdit onClick={() => this.props.callBackToStep(1) }/></SpanField>
                    <Table header={Object.keys(this.props.initialData.survey.sections[0])} values={this.props.initialData.survey.sections.map(section =>{
                        return Object.values(section)
                    })}/> 
                    {/* <Table header={Object.keys(this.props.investigation.survey.personalData[0])} values={this.props.investigation.edc.personalData.map(field =>{
                        return Object.values(field)
                    })}/> */}
                    {/* <SpanField><Translate id="investigation.create.summary.survey" ></Translate></SpanField>
                    <Table header={Object.keys(this.props.initialData.edc.fields[0])} values={this.props.investigation.edc.fields.map(field =>{
                        return Object.values(field)
                    })}/>
                    <SpanField><Translate id="investigation.create.summary.patients" ></Translate></SpanField> */}
                    {/* <table id="survey-info" key="table-emails" className="striped">
                        <thead>
                        <tr>
                            <th key="email"><Translate id="investigation.create.summary.email" ></Translate></th>   
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.initialData.patients.map(patient => {
                                return(
                                    <tr key={patient.email}>
                                        <td>{patient.email}</td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table> */}
                </div>
                <ButtonBack data-testid="cancel" styles={{marginRight: '1rem'}} onClick={this.props.callBackStepBack} >{this.props.translate("general.back")}</ButtonBack>
                <ButtonSave data-testid="publish-investigation" styles={{marginRight: '1rem'}} onClick={()=>this.send(true)} type="button" key="publish-investigation" id="publish-investigation" >{this.props.translate("investigation.create.save_and_publish")}</ButtonSave>
                <ButtonSave data-testid="save-for-later-investigation" onClick={()=>this.send(false)} type="button" key="save-for-later-investigation" id="save-for-later-investigation" >{this.props.translate("investigation.create.save")}</ButtonSave>
            </div>
            ]
        );
    }
}

Summary.propTypes = {
    investigation : PropTypes.object,
    stepBack : PropTypes.func
}

export default withRouter(withLocalize((connect(null, { toggleLoading })(Summary))));