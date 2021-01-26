import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { answerRequest as answerRequestRemote, fetchInvestigations as fetchInvestigationsRemote} from '../../../../services/sherwoodService';
import CardInvestigation from './card_investigation'
import { Link } from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux';
import Loader from '../../../Loader';
import { useInvestigations } from '../../../../hooks';
import {useQuery} from 'react-query';
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Grid, Typography } from '@material-ui/core';
import { ButtonAdd } from "../../../general/mini_components";

function AllInvestigations(props){
    const [investigations, setInvestigations] = useState(props.initialState && props.initialState.investigations ? props.initialState.investigations : null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answer, setAnswer] = useState(null);
    const history  = useHistory();

    async function answerRequest(index, value){
        try{
            setIsLoading(true);
            const response = await answerRequestRemote(investigations[index].uuid, value);
            if(response.status === 200){
                setAnswer(true);
                history.push("/investigation/show/"+investigations[index].uuid);
                //Sería interesante redirigir a la nueva investigación
            }
            else{
                setError(true);
            }
            setIsLoading(false);
        }
        catch(error){
            setError(true);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        async function fetchInvestigations(){
            try{
                setIsLoading(true);
                const response = await fetchInvestigationsRemote();
                if(response.status === 200){
                    setInvestigations(response.investigations);
                }
                else{
                    setError(true);
                }
                setIsLoading(false);
            }
            catch(error){
                setError(true);
                setIsLoading(false);
            }
        }
        if(!investigations || answer){
            fetchInvestigations();
        }
        else{
            setIsLoading(false);
        }
    }, [answer])
    if(isLoading){
        return <Loader />
    }
    else if(error){
        return(
            <Alert mb={4} severity="error">
                An error happened while saving your answer, please try again later
            </Alert>
        )
    }
    else{
        const filteredInvestigations = investigations.filter(inv => { 
        
            // if(props.filter === "pending"){
            //     return inv.shareStatus === 0
            // }
            // if(props.filter === "ongoing"){
            //     return inv.status === 3
            // }
            //Filtros de researcher
            if(props.filter === "draft"){
                return inv.status === 0
            }
            if(props.filter === "live"){
                return inv.status === 1
            }
            if(props.filter === "pending"){
                return inv.shareStatus === 0
            }
            else return true
        });
    
        if(filteredInvestigations.length === 0){
            return (       
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="textPrimary">
                            <Translate id={`investigation.show.all.researcher.no_investigations`} />
                        </Typography>
                    </Grid>
                    {(props.filter !== "pending") && 
                    [
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" color="textPrimary">
                                <Translate id="investigation.show.all.researcher.add_first_investigation" />
                                <Link to="/investigation/create" className="btn-floating btn-large waves-effect waves-light red">
                                    <ButtonAdd type="button" />
                                </Link>
                            </Typography>
                        </Grid>
                    ]
                    }
                </Grid>         
            );
        }
        else{
            return (
                <Grid container>
                    {
                    filteredInvestigations.map((inves, index) => {
                        return(
                            <Grid item xs={12}>
                                <CardInvestigation title={inves.name} key={inves.uuid}
                                    index={index}
                                    uuid={inves.uuid}
                                    description={inves.description}
                                    status={inves.status}
                                    answerRequest={inves.shareStatus === 0 ? answerRequest : null}
                                    shareStatus={inves.shareStatus}
                                    hostResearcher={inves.hostResearcher}
                                    textUrl={<Translate id="investigation.show.view_investigation" />}
                                    />
                            </Grid>
                        );
                    })
                }
                </Grid>
                )
        }
    }
}
AllInvestigations.propTypes = {
    initialData: PropTypes.object,
    typeUser: PropTypes.string,
    filter: PropTypes.number
}; 

export default withLocalize(AllInvestigations);
