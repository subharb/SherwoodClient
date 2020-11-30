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
        const request = await axios.get(process.env.REACT_APP_API_URL+'/'+this.props.typeUser+'/investigation/all')
                .catch(err => {console.log('Catch', err); return err;}); 
        if(request.status === 200){
            //redirec a /login
            this.setState({investigations:request.data})
        }
        else if(request.status === 401){
            this.props.history.push(this.props.typeUser+"/login");
        } 
    }
    render() {
        if(this.state.investigations === null){
            return "CARGANDO...";
        }
        const filteredInvestigations = this.state.investigations.filter(inv => { 
            if(this.props.filter === "pending"){
                return inv.status === 2
            }
            if(this.props.filter === "ongoing"){
                return inv.status === 3
            }
            //Filtros de researcher
            if(this.props.filter === "draft"){
                return inv.status === 0
            }
            if(this.props.filter === "live"){
                return inv.status === 1
            }
            else return true
        });

        if(filteredInvestigations.length === 0){
            return (
                <div>
                    <Translate id={`investigation.show.all.${this.props.typeUser}.no_investigations`} />
                    {this.props.typeUser === "researcher" && 
                    [
                        <Translate id="investigation.show.all.add_first_investigation" />,
                        <Link to="/investigation/create" className="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></Link>
                    ]
                    }
                    
                </div>
            );
            
        }
        else{
            return filteredInvestigations.map(inves => {
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
    initialData: PropTypes.object,
    typeUser: PropTypes.string
}; 

export default withLocalize(AllInvestigations);
