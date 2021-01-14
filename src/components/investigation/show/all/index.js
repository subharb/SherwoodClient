import React from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import CardInvestigation from './card_investigation'
import { Link } from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux';
import Loader from '../../../Loader';
import { useInvestigations } from '../../../../hooks';
import {useQuery} from 'react-query';

function AllInvestigations(props){
    const {investigations, isLoading, error } = useInvestigations();
    
    if(isLoading){
        return <Loader />
    }
    else if(error){
        return "SE ha producido un error"
    }
    else{
        const filteredInvestigations = investigations.filter(inv => { 
        
            if(props.filter === "pending"){
                return inv.status === 2
            }
            if(props.filter === "ongoing"){
                return inv.status === 3
            }
            //Filtros de researcher
            if(props.filter === "draft"){
                return inv.status === 0
            }
            if(props.filter === "live"){
                return inv.status === 1
            }
            else return true
        });
    
        if(filteredInvestigations.length === 0){
            return (                
                <div>
                    <Translate id={`investigation.show.all.${props.typeUser}.no_investigations`} />
                    {props.typeUser === "researcher" && 
                    [
                        <Translate id="investigation.show.all.add_first_investigation" />,
                        <Link to="/investigation/create" className="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></Link>
                    ]
                    }
                    
                </div>
            );
        }
        else{
            return (
                <div className="row">
                {
                    filteredInvestigations.map(inves => {
                        return(
                            <CardInvestigation title={inves.name} key={inves.uuid}
                                description={inves.description}
                                status={inves.status}
                                textUrl={<Translate id="investigation.show.view_investigation" />}
                                url={`/investigation/show/${inves.uuid}`}/>
                        );
                    })
                }
                </div>)
        }
    }
}
AllInvestigations.propTypes = {
    initialData: PropTypes.object,
    typeUser: PropTypes.string,
    filter: PropTypes.number
}; 

export default withLocalize(AllInvestigations);
