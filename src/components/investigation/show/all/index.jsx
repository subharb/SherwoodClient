import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { answerRequest as answerRequestRemote, fetchInvestigations as fetchInvestigationsRemote} from '../../../../services';
import CardInvestigation from './card_investigation'
import { Link } from 'react-router-dom';
import { Translate, withLocalize } from 'react-localize-redux';
import Loader from '../../../Loader';
import { decryptData, encryptData } from '../../../../utils/index.jsx';
import { useHistory } from "react-router-dom";
import { Alert } from "@mui/lab";
import { Grid, Typography } from '@mui/material';
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
            //Desencriptamos la clave de la investigacion
            const investigation = investigations[index];
            const keyRawInvestigation = decryptData(investigation.keyResearcherInvestigation , import.meta.env.VITE_APP_DEFAULT_RESEARCH_PASSWORD);
            const keyInvestigationResearcher = encryptData(keyRawInvestigation, localStorage.getItem("rawKeyResearcher"));
            const testkeyRawInvestigation = decryptData(keyInvestigationResearcher, localStorage.getItem("rawKeyResearcher"));
            console.log(testkeyRawInvestigation);
            
            const response = await answerRequestRemote(investigations[index].uuid, value, keyInvestigationResearcher);
            if(response.status === 200){
                
                if(value === 2){
                    if (import.meta.env.VITE_APP_PRODUCT === "HOSPITAL") {
                        window.location.reload();
                    }
                    else{
                        history.push("/investigation/show/"+investigations[index].uuid);
                    }
                    
                }
                setAnswer(true);
            }
            else{
                setError(true);
            }
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
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
        return(
            <Grid container>
                <Grid item xs={12}>
                    <Loader />
                </Grid>
            </Grid>
        )
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
                                    permissions={inves.permissions}
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
