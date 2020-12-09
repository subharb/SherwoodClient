import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { fetchInvestigation, toggleLoading } from '../../../../actions';
import AcceptConsents from './accept_consents';
import CreateInvestigation from '../../create/index';
import AddDataInvestigation from '../../fill/index';


class SingleInvestigation extends Component {
    async componentDidMount(){  
        if(this.props.investigation === null){
            //this.props.fetchInvestigation(this.props.uuid); 
        }               
    }

    render() {
        console.log(this.props.investigation);
        if(this.props.investigation === null){
            return "CARGANDO";
        }
        else{
            if(this.props.typeUser === "researcher"){
                if(this.props.investigation.status === 0){
                    return (
                        <CreateInvestigation initialData = {{investigation: this.props.investigation}} />
                    )
                }
                else if(this.props.investigation.status === 1){
                    return (
                        <AddDataInvestigation initialData = { this.props.investigation} />
                    )
                }
                
            }
            else if(this.props.typeUser === "patient"){
                return <AcceptConsents investigation={this.props.investigation} uuidInvestigation={this.props.uuid} />
            }
        }
    }
}

SingleInvestigation.propTypes = {
    typeUser: PropTypes.string,
    investigation: PropTypes.object,
    uuid: PropTypes.string
}

export default withLocalize(SingleInvestigation)