import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate, withLocalize } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
            return (
                <div>
                    <p><Translate id="investigation.show.title" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.date_created" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.description" />: { this.props.investigation.description }</p>
                    <p><Translate id="investigation.show.data" />:</p>
                    TABLA CON DATOS
                    <p><Translate id="investigation.show.consents" />:</p>
                    
                </div>
            )
        }
    }
}
SingleInvestigation.propTypes = {
    investigation: PropTypes.object
}; 

export default withLocalize(SingleInvestigation)
