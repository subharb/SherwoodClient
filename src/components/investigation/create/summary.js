import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from '../../general/modal';
import PreviewConsents from '../../consent/preview';
import styled from 'styled-components';
import { toogleLoading } from '../../../actions';
import successImage from '../../../img/7893-confetti-cannons.gif';

const SpanField = styled.span`
    font-weight:bold;
`;

const ResultContainer = styled.div`
    background-color:red;
`;

const SuccessContainer = styled.div`
    text-align:center;
`;
const SuccessComponent = (props) => {
    return(
    <SuccessContainer>
        <h4><Translate id="investigation.create.summary.success.title" /></h4>
        <div><img src={successImage} width="200" alt="Success!" /></div>
        <div><Translate id="investigation.create.summary.success.description" /></div>
        <button data-testid="continue" onClick={props.continue} type="submit" key="continue" id="continue" className="waves-effect waves-light btn"><Translate id="investigation.create.summary.success.continue" /></button>   
    </SuccessContainer>
    )
  }
class Summary extends Component {
    constructor(props){
        super(props);

        this.showConsents = this.showConsents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveForLater = this.saveForLater.bind(this);
        this.continueModal = this.continueModal.bind(this);
        this.state = {showConsents : false, showResult:false, result : 0}//Resultado 0, no enviado, 1 recibido y con error; 2 recibido y correcto
    }
    showConsents(){
        this.setState({showConsents:true});
    }
    modalComponent(){

        let component;
        switch(this.state.result){
            case 0:
                const filteredFields2 = this.props.investigation.survey.fields.filter(field => field["is_personal_data"].value);
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
    async saveForLater(){
        this.props.toogleLoading();
        const request = await axios.post(process.env.REACT_APP_API_URL+'/investigation', this.props.investigation,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
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
        this.props.toogleLoading();
        //this.setState({loading:false, error:error});
        
    }
    continueModal(){
        console.log("Continue!");
        this.props.history.push("/investigation");
    }
    render() {
        return([
            <Modal key="modal" open={this.state.showConsents}  
                component={this.modalComponent()} 
                closeCallBack={this.closeModal}
            />,
            <Modal key="modal" open={this.state.showResult}  
                component={<SuccessComponent title="Success!" continue ={this.continueModal} />} 
            />,
            <div key="content" className="row">
                <div className="col-12">
                    <h4><Translate id="investigation.create.summary.title" /></h4>
                    <p><Translate id="investigation.create.summary.explanation" /></p>
                    <p><SpanField><Translate id="investigation.create.summary.review_consents" ></Translate>:</SpanField> <button className="waves-effect waves-light btn lime" onClick={this.showConsents}>Ver consents</button></p>
                    <p><SpanField><Translate id="investigation.create.survey.name" ></Translate>:</SpanField> {this.props.investigation.survey.title}</p>
                    <p><SpanField><Translate id="investigation.create.survey.description" ></Translate>:</SpanField> {this.props.investigation.survey.description}</p>
                    <table id="survey-info" key="table-fields" className="striped">
                        <thead>
                        <tr>
                            {Object.keys(this.props.investigation.survey.fields[0]).map(key => {
                                console.log(key);
                                return (
                                    <th key={key}>{this.props.translate("investigation.table."+key)}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.investigation.survey.fields.map(field => {
                                return(
                                    <tr key={field.name.value}>
                                        <td>{field.is_personal_data.value ? this.props.translate("general.yes") : this.props.translate("general.no")}</td>
                                        <td>{field.name.value}</td>
                                        <td>{field.type.value}</td>
                                        <td>{field.question.value}</td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table> 
                    <Translate id="investigation.create.summary.patients" ></Translate>
                    <table id="survey-info" key="table-emails" className="striped">
                        <thead>
                        <tr>
                            <th key="email"><Translate id="investigation.create.summary.email" ></Translate></th>   
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.investigation.patientsEmail.map(email => {
                                return(
                                    <tr key={email}>
                                        <td>{email}</td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <button data-testid="publish-investigation" onClick={this.saveAndSend} type="button" key="publish-investigation" id="publish-investigation" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save_and_send")}<i className="material-icons right">send</i></button>
                <button data-testid="save-for-later-investigation" onClick={this.saveForLater} type="button" key="save-for-later-investigation" id="save-for-later-investigation" className="waves-effect waves-light btn lime right">{this.props.translate("investigation.create.save")}<i className="material-icons right">send</i></button>
            </div>
            ]
        );
    }
}

Summary.propTypes = {
    investigation : PropTypes.object
}

export default withRouter(withLocalize((connect(null, { toogleLoading })(Summary))));