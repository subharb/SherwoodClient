import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate, withLocalize } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '../../../general/table';
import PendingConsents from './accept_consents';

const ButtonHolder = styled.div`
    padding:1rem;
`;
const RowConsent = styled.div`
    margin-bottom:0rem;
`;

class SingleInvestigation extends Component {
    
    render() {
        if(this.props.investigation.status === 0){
            return (
                <div>
                    <p><Translate id="investigation.show.title" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.date_created" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.description" />: { this.props.investigation.description }</p>
                    <Link to={`/investigation/edit/${this.props.uuid}`}><button className="waves-effect waves-light btn lime" ><i className="material-icons">edit</i></button></Link>
                </div>
            )
        }
        else{
            const headerTable = this.props.investigation.consents.map(consent => {return consent.value});
            const valuesTable = Object.values(this.props.investigation.patientConsents).map(row => {
                return row.map(dict => {
                    if(dict.value === null){
                        return dict.accepted;
                    }
                    return dict.value
                })
            })
            return (
                <div>
                    <p><Translate id="investigation.show.title" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.date_created" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.description" />: { this.props.investigation.description }</p>
                    <p><Translate id="investigation.show.data" />:</p>
                    TABLA CON DATOS
                    <Link to={`/investigation/add/${this.props.uuid}`}><button data-testid="add-data" className="add-data btn-floating btn-large waves-effect waves-light red" ><i className="material-icons">add</i></button></Link>
                    <p><Translate id="investigation.show.patient_consents" />:</p>
                    <Table header={headerTable} 
                            values={valuesTable} />
                    
                </div>
            )
        }
    }
}
SingleInvestigation.propTypes = {
    investigation: PropTypes.object
}; 

export default withLocalize(SingleInvestigation)
