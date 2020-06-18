import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from '../general/modal';
import PreviewConsents from '../consent/preview';
import styled from 'styled-components';
import { toogleLoading } from '../../actions';

const SpanField = styled.span`
    font-weight:bold;
`;
class Summary extends Component {
    constructor(props){
        super(props);

        this.showConsents = this.showConsents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveForLater = this.saveForLater.bind(this);
        this.state = {showConsents : false}
    }
    showConsents(){
        this.setState({showConsents:true});
    }
    modalComponent(){
        const filteredFields2 = this.props.investigation.survey.fields.filter(field => field["is_personal_data"].value);
        let component = <PreviewConsents consents={this.props.investigation.consents}  personalFields={filteredFields2} />
        return component;
    }
    closeModal(){
        this.setState({showConsents:false});
    }
    async saveForLater(){
        this.props.toogleLoading();
        const request = await axios.post(process.env.REACT_APP_API_URL+'/investigation', this.props.investigation,  { headers: {"Authorization" : localStorage.getItem("jwt")} })
            .catch(err => {console.log('Catch', err); return err;}); 
        
        //Guardamos el token si la request fue exitosa
        let error = 0;
        if(request.status === 200){
            console.log("Success!")
        }
        else if(request.status === 401){
            localStorage.removeItem("jwt");
            error = 1;
        }
        this.props.toogleLoading();
        //this.setState({loading:false, error:error});
        
    }
    render() {
        return([
            <Modal key="modal" open={this.state.showConsents} 
                title={this.props.translate("investigation.create.survey.add_field")} 
                component={this.modalComponent()} 
                closeCallBack={this.closeModal}
            />,
            <div key="content" className="row">
                <div className="col-12">
                    <h4><Translate id="investigation.summary.title" /></h4>
                    <p><Translate id="investigation.summary.explanation" /></p>
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
                    <Translate id="investigation.summary.patients" ></Translate>
                    <table id="survey-info" key="table-emails" className="striped">
                        <thead>
                        <tr>
                            <th key="email"><Translate id="investigation.summary.email" ></Translate></th>   
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

export default withLocalize((connect(null, { toogleLoading })(Summary)));