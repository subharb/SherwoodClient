import { CircularProgress, Grid, TextField, Typography } from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import styled from 'styled-components';
import { ButtonAccept, FieldWrapper } from './mini_components';

const ContainerOptions = styled.div`
    position:absolute;
    background-color:white;
    z-index:1000;
    padding:1rem;
    height:10rem;
    overflow:auto;
`;

const Option = styled.div`
    cursor:pointer;
`;

interface Props extends LocalizeContextProps{
    error:boolean,
    label:string,
    params:{ [country: string]: string },
    freeSolo:boolean,
    getOptionsResponse:(option:any) => any, 
    remoteSearch:(...args: any[])  => Promise<any>,
    getOptionLabel:(option:{name:string}) => string,
    onValueSelected?:(option:any) => void
}
const MIN_LENGTH_SEARCH:number = 3;

const AutocompleteSherwood = (props:Props) => {
    const [searchTerm, setSearchterm] = useState("");
    const [errorSearch, setErrorSearch] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [optionSelected, setOptionSelected] = useState(false);

    async function changeInput(value:string){
        setOptionSelected(false);
        setSearchterm(value);
    }
    function onOptionSelected(index:number, term:string){
        setSearchterm(term);
        if(props.onValueSelected){
            props.onValueSelected(options[index]);
        }
        
        setOptionSelected(true);
    }
    function saveField(){
        if(props.onValueSelected){
            props.onValueSelected({
                name : searchTerm,
                id : ""
            });
        }
        
        setOptionSelected(true);
    }
    function restart(){
        setSearchterm("");
        setOptions([]);
        setOptionSelected(false);
    }
    function renderOptions(){
        if(loading){
            return <CircularProgress />;
        }
        else if(!optionSelected && (options.length === 0 && searchTerm.length > MIN_LENGTH_SEARCH)){
   
            return(
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom><Translate id="general.no-results"/></Typography> 
                </Grid>
                {
                        props.freeSolo &&
                        <Grid item>
                            <ButtonAccept color="secondary" onClick={saveField}><Translate id="general.add" /></ButtonAccept>
                        </Grid>
                }                
            </Grid>
            );
        }
        else if(searchTerm.length <= MIN_LENGTH_SEARCH || optionSelected){
            return null;
        }
        return(
            <ContainerOptions>
                {
                    options.map((option, index) => {
                        return(<Option onClick={() => onOptionSelected(index, props.getOptionLabel(option))}>
                                <Typography variant="body2" gutterBottom>{ props.getOptionLabel(option)}</Typography> 
                            </Option>)
                    })
                }
            </ContainerOptions>)
    }
    useEffect(() => {
        async function makeRemoteSearch(){
            try{
                if(searchTerm.length > MIN_LENGTH_SEARCH){
                    setLoading(true);
                    const params = Object.values(props.params);
                    const response = await props.remoteSearch(searchTerm, params);
                    if(response.status === 200){
                        setOptions(props.getOptionsResponse(response));
                    }
                    else{
                        setErrorSearch(true);
                    }
                    setLoading(false);
                }
            }
            catch(error){
                setErrorSearch(true);
            }
        }
        if(!optionSelected){
            makeRemoteSearch();
        }
        
    }, [searchTerm])
    return (
        <React.Fragment>
            <TextField value={searchTerm} error={errorSearch || props.error} onFocus={restart}
                onChange={(event) => changeInput(event.target.value)} fullWidth
                label={props.label} variant="outlined" />
            
            {
                renderOptions()
            }
        </React.Fragment>
        
    );
};

export default withLocalize(AutocompleteSherwood);