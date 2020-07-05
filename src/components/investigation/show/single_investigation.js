import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class SingleInvestigation extends Component {
    constructor(props){
        super(props);

        this.state = {investigation : null}
    }
    async componentDidMount(){  
        const request = await axios.get(process.env.REACT_APP_API_URL+'/investigation/'+this.props.uuid)
                .catch(err => {console.log('Catch', err); return err;}); 
        if(request.status === 200){
            //redirec a /login
            this.setState({investigation:request.data.investigation})
        }
            
    }
    render() {
        console.log(this.state.investigation);
        if(this.state.investigation === null){
            return "CARGANDO";
        }
        else{
            return (
                <div>
                    <p><Translate id="investigation.show.title" />: { this.state.investigation.title }</p>
                    <p><Translate id="investigation.show.date_created" />: { this.state.investigation.title }</p>
                    <p><Translate id="investigation.show.description" />: { this.state.investigation.description }</p>
                </div>
            )
        }
    }
}
SingleInvestigation.propTypes = {
    uuid: PropTypes.string
}; 
