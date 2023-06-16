import React, { Component } from 'react'

import { withRouter } from 'react-router-dom';
import { Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from '../../general/modal';
import Table from '../../general/table';
import styled from 'styled-components';
import { ALL_INVESTIGATIONS_ROUTE } from '../../../routes';
import {
    Edit as EditIcon,
} from "@mui/icons-material";

import SuccessComponent from '../../../components/general/success_component';
import { ButtonEdit, ButtonSave, ButtonBack } from '../../general/mini_components';
import { EnhancedTable } from '../../general/EnhancedTable';

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
                component = <ResultContainer title="Success!">Success!</ResultContainer>
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
        this.props.history.push(ALL_INVESTIGATIONS_ROUTE);
    }
    renderBasicInfo(){
        return Object.keys(this.props.initialData.basic_info).map(key =>{
                const tagsFree = typeof this.props.initialData.basic_info[key] === "string" ? this.props.initialData.basic_info[key].replace(/<[^>]+>/g, '') : "<blank>";
                return this.props.translate("investigation.create.edc."+key)+": "+tagsFree+", ";
            });
        
    }
    renderPersonalData(){
        const arrayPersonalFields = this.props.initialData.personalFields.map(personalField => {
            return this.props.translate(`investigation.create.personal_data.fields.${personalField.name}`);
        })
        return arrayPersonalFields.join(",");
    }
    render() {
        return [
            <Modal key="modal2" open={this.props.resultSave === 1}  >
                <SuccessComponent title="investigation.create.summary.success.title" 
                                description="investigation.create.summary.success.description" 
                                successButtonText = "investigation.create.summary.success.continue"
                                callBackContinue ={this.continueModal} />
            </Modal>,
            <React.Fragment>
                <Typography variant="h6" gutterBottom display="inline">
                    <Translate id="investigation.create.steps.basic_info" ></Translate>
                    <IconButton
                        aria-label="edit"
                        onClick={() => this.props.callBackToStep(0)}
                        size="large">
                        <EditIcon />
                    </IconButton>    
                </Typography>
                <Typography variant="body2" gutterBottom>
                {
                    this.renderBasicInfo()
                }
                </Typography>
                <Typography variant="h6" gutterBottom display="inline">
                    <Translate id="investigation.create.steps.personal_data" ></Translate>
                    <IconButton
                        aria-label="edit"
                        onClick={() => this.props.callBackToStep(1)}
                        size="large">
                        <EditIcon />
                    </IconButton>  
                </Typography>
                <Typography variant="body2" gutterBottom>
                {
                    this.renderPersonalData()
                }
                </Typography>
                <Typography variant="h6" gutterBottom display="inline">
                    <Translate id="investigation.create.steps.edc" ></Translate>
                    <IconButton
                        aria-label="edit"
                        onClick={() => this.props.callBackToStep(2)}
                        size="large">
                        <EditIcon />
                    </IconButton> 
                </Typography>
                <EnhancedTable noHeader noSelectable titleTable=""  
                    headCells={[{ id: "data_collection", alignment: "left", label: "Data Collections" }, 
                                { id: "n_sections", alignment: "left", label: "Number sections" },
                    ]}
                    rows={this.props.initialData.surveys.map(survey =>{
                        return {data_collection : survey.name, n_sections : survey.sections.length };
                    })}
                />
                <ButtonBack data-testid="cancel" spaceright={1} onClick={this.props.callBackStepBack} >{this.props.translate("general.back")}</ButtonBack>
                <ButtonSave data-testid="publish-investigation" spaceright onClick={()=>this.props.callBackSave(true)} type="button" key="publish-investigation" id="publish-investigation" >{this.props.translate("investigation.create.save_and_publish")}</ButtonSave>
                <ButtonSave data-testid="save-for-later-investigation" onClick={()=>this.props.callBackSave(false)} type="button" key="save-for-later-investigation" id="save-for-later-investigation" >{this.props.translate("investigation.create.save")}</ButtonSave>
            </React.Fragment>
            ];
    }
}

Summary.propTypes = {
    initialData : PropTypes.object,
    stepBack : PropTypes.func,
    resultSave : PropTypes.number,
    callBackSave : PropTypes.func
}

export default withRouter(withLocalize(Summary));