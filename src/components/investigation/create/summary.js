import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from '../../general/modal';
import Table from '../../general/table';
import styled from 'styled-components';

import SuccessComponent from '../../../components/general/success_component';
import { ButtonEdit, ButtonSave, ButtonBack } from '../../general/mini_components';

const TitleSection = styled.span`
    font-weight:bold;
`;

const ResultContainer = styled.div`
    background-color:red;
`;

const InfoSection = styled.div`
    font-style: italic;
    color:slategrey;
`;

class Summary extends Component {
    constructor(props){
        super(props);

        this.showConsents = this.showConsents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.continueModal = this.continueModal.bind(this);
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
    
    continueModal(){
        console.log("Continue!");
        this.props.history.push("/investigation/show");
    }
    renderBasicInfo(){
        return Object.keys(this.props.initialData.basic_info).map(key =>{
                return key+":"+this.props.initialData.basic_info[key]+", ";
            })
        
    }
    renderPersonalData(){
        const arrayPersonalFields = this.props.initialData.personal_data.map(personalField => {
            return this.props.translate(`investigation.create.personal_data.fields.${personalField}`);
        })
        return arrayPersonalFields.join(",");
    }
    render() {
        return([
            <Modal key="modal2" open={this.props.resultSave === 1}  
                component={<SuccessComponent title="investigation.create.summary.success.title" 
                                description="investigation.create.summary.success.description" 
                                successButtonText = "investigation.create.summary.success.continue"
                                callBackContinue ={this.continueModal} />} 
            />,
            <div key="content" className="row">
                <div className="col-12">
                    <h4><Translate id="investigation.create.summary.title" /></h4>
                    <p><Translate id="investigation.create.summary.explanation" /></p>
                    <TitleSection>
                        <Translate id="investigation.create.steps.basic_info" ></Translate><ButtonEdit onClick={() => this.props.callBackToStep(0)}/>
                    </TitleSection>
                    <InfoSection >
                    {
                        this.renderBasicInfo()
                    }
                    </InfoSection>
                    <TitleSection>
                        <Translate id="investigation.create.steps.personal_data" ></Translate><ButtonEdit onClick={() => this.props.callBackToStep(1) }/>
                    </TitleSection>
                    <InfoSection >
                    {
                        this.renderPersonalData()
                    }
                    </InfoSection>
                    <TitleSection>
                        <Translate id="investigation.create.steps.edc" ></Translate><ButtonEdit onClick={() => this.props.callBackToStep(2) }/>
                    </TitleSection>
                    <Table header={["Data Collections", "Number sections"]} values={this.props.initialData.surveys.map(survey =>{
                        return [survey.name, survey.sections];
                    })}/> 
                </div>
                <ButtonBack data-testid="cancel" spaceRight={true} onClick={this.props.callBackStepBack} >{this.props.translate("general.back")}</ButtonBack>
                <ButtonSave data-testid="publish-investigation" spaceRight onClick={()=>this.props.callBackSave(true)} type="button" key="publish-investigation" id="publish-investigation" >{this.props.translate("investigation.create.save_and_publish")}</ButtonSave>
                <ButtonSave data-testid="save-for-later-investigation" onClick={()=>this.props.callBackSave(false)} type="button" key="save-for-later-investigation" id="save-for-later-investigation" >{this.props.translate("investigation.create.save")}</ButtonSave>
            </div>
            ]
        );
    }
}

Summary.propTypes = {
    initialData : PropTypes.object,
    stepBack : PropTypes.func,
    resultSave : PropTypes.number,
    callBackSave : PropTypes.func
}

export default withRouter(withLocalize(Summary));