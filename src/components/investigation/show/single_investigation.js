import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-localize-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchInvestigation } from '../../../actions';

class SingleInvestigation extends Component {
    constructor(props){
        super(props);

        this.state = {investigation : null}
    }
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
            return (
                <div>
                    <p><Translate id="investigation.show.title" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.date_created" />: { this.props.investigation.title }</p>
                    <p><Translate id="investigation.show.description" />: { this.props.investigation.description }</p>
                    <Link to={`/investigation/edit/${this.props.uuid}`}><button className="waves-effect waves-light btn lime" ><i className="material-icons">edit</i></button></Link>
                </div>
            )
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

export default connect(mapStateToProps, { fetchInvestigation})(SingleInvestigation)