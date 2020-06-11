import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Translate, withLocalize } from 'react-localize-redux';
import Modal from '../general/modal';

class Summary extends Component {
    render() {
        return([
            <Modal key="modal" open={false} 
                title={this.props.translate("investigation.create.survey.add_field")} 
                component={{}} 
                closeCallBack={this.closeModal}
            />,
            <div key="content" className="row">
                <div className="col-12">
                    <h4><Translate id="investigation.create.survey.title" /></h4>
                    <p><Translate id="investigation.create.survey.explanation" /></p>
                    <span><Translate id="investigation.create.survey.name" ></Translate>: {this.props.survey.title}</span>
                    <span><Translate id="investigation.create.survey.description" ></Translate>: {this.props.survey.description}</span>
                    <table id="survey-info" key="table-fields" className="striped">
                        <thead>
                        <tr>
                            {Object.keys(this.props.survey.fields[0]).map(key => {
                                console.log(key);
                                return (
                                    <th key={key}>{this.props.translate("investigation.create.table."+key)}</th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.survey.fields.map(field => {
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
                    <Translate id="investigation.create.survey.patients" ></Translate>
                    <table id="survey-info" key="table-emails" className="striped">
                        <thead>
                        <tr>
                            <th key="email"><Translate id="investigation.create.survey.email" ></Translate></th>
                                
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.patientsEmail.map(email => {
                                return(
                                    <tr key={email}>
                                        <td>{email}</td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <button data-testid="publish-investigation" onClick={this.props.saveAndSend} type="button" key="publish-investigation" id="publish-investigation" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save")}<i className="material-icons right">send</i></button>
                <button data-testid="save-for-later-investigation" onClick={this.props.saveForLater} type="button" key="save-for-later-investigation" id="save-for-later-investigation" className="waves-effect waves-light btn">{this.props.translate("investigation.create.save")}<i className="material-icons right">send</i></button>
            </div>
            ]
        );
    }
}

Summary.propTypes = {
    survey : PropTypes.object,
    patientsEmail : PropTypes.array,
    saveAndSend : PropTypes.func,
    saveForLater: PropTypes.func

}

export default withLocalize(Summary);