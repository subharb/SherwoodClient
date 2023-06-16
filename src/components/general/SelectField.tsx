import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { string } from 'prop-types';
import React, { useState } from 'react';
import { ButtonAdd, ButtonSave } from './mini_components';
import { LocalizeContextProps, LocalizedElement, LocalizedElementMap, Translate, withLocalize } from 'react-localize-redux';
import {TextFieldSherwood} from "./FieldSherwood";

interface Input{
    value:string,
    label:string,
    name:string
}
interface Props extends LocalizeContextProps{
    labelString:string,
    id:string,
    errorState:boolean,
    options:Array<Input>,
    onChange:(values:string) => void
}

const SelectField:React.FC<Props> = ({onChange, id, labelString, options, errorState, translate}) => {
    
   
    const optionsArray = options.map(option => {
            const optionText = translate(option.label).toString().indexOf("Missing translationId:") !== -1 ?  option.label : translate(option.label);
        return <MenuItem value={option.value}>{optionText}</MenuItem>
            
        })
    
    
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl variant="outlined" margin="dense" error={errorState} >
                    <InputLabel id={id}>{labelString}</InputLabel>
                    <Select
                    labelId={id}
                    id={id}
                    onChange={(event) => onChange(event.target.value as string)}
                    >
                    { optionsArray }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}
export default withLocalize(SelectField);