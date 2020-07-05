import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux';

class AllInvestigations extends Component {
    constructor(props){
        super(props);

        this.state = {investigations : null}
    }
    async componentDidMount(){  
        const request = await axios.get(process.env.REACT_APP_API_URL+'/investigation/all')
                .catch(err => {console.log('Catch', err); return err;}); 
        if(request.status === 200){
            //redirec a /login
            this.setState({investigations:request.data})
        }
        else if(request.status === 401){
            this.props.history.push("/login");
        } 
    }
    render() {
        if(this.state.investigations === null){
            return "CARGANDO...";
        }
        else if(this.state.investigations.length === 0){
            return "No hay investigaciones"
        }
        else{
            return this.state.investigations.map(inves => {
                return(
                    <div class="col s12 m6">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text">
                                <span class="card-title">{inves.title}</span>
                                <p>{inves.description}</p>
                                </div>
                                <div class="card-action">
                                <Link to={`/investigation/show/${inves.uuid}`}><Translate id="investigation.show.view_investigation" /></Link>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    }
}
AllInvestigations.propTypes = {
    
}; 

export default withLocalize(AllInvestigations);
