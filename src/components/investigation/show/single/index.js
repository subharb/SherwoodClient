import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import { fetchInvestigation, toggleLoading } from '../../../../actions';
import AcceptConsents from './accept_consents';
import SingleInvestigationResearcher from './single_investigation';

class SingleInvestigation extends Component {
    async componentDidMount(){  
        if(this.props.investigation === null){
            this.props.fetchInvestigation(this.props.uuid);
        }               
    }

    render() {
        console.log(this.props.investigation);
        if(this.props.investigation === null){
            return "CARGANDO";
        }
        else{
            if(localStorage.getItem('type') === "researcher"){
                return (
                    <SingleInvestigationResearcher investigation = { this.props.investigation} />
                )
            }
            else if(localStorage.getItem('type') === "patient"){
                return <AcceptConsents investigation={this.props.investigation} uuidInvestigation={this.props.uuid} />
            }
        }
    }
}
SingleInvestigation.propTypes = {
    uuid: PropTypes.string
}; 


function mapStateToProps(state, ownProps){
    if(state.investigations.hasOwnProperty(ownProps.uuid)){
        return{
            investigation : state.investigations[ownProps.uuid]
        }
    }
    else{
        return{
            investigation : null
        }
    }
    
}
export default withLocalize(connect(mapStateToProps, { fetchInvestigation, toggleLoading })(SingleInvestigation))