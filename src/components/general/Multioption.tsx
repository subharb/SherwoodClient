import { ButtonGroup, Grid, InputLabel } from '@mui/material';
import React from 'react';
import { ButtonCheck, ButtonEmptyCheck } from './mini_components';

interface MultioptionProps {
    label:string,
    mode:"show" | "input",
    value:{"multioption" : string}[],
    name:string,
    options:{label:string, value:string}[],
    multiOptionSelected: (value: string) => void;
}

const Multioption: React.FC<MultioptionProps> = ({ label, mode, name, value, options, multiOptionSelected }) => {
    const optionButtons = options.map(option => {
        if(value.length > 0 &&  value.find((selection) => selection.multioption === option.value)){
            return <ButtonCheck  onClick={mode === "show" ?  undefined : () => multiOptionSelected(option.value)}>{option.label}</ButtonCheck>
        }
        return <ButtonEmptyCheck color="secondary" onClick={mode === "show" ? undefined : () => multiOptionSelected(option.value) }>{option.label}</ButtonEmptyCheck> 
    });
    console.log("optionButtons",value);
    return (
        <Grid container style={{paddingTop:'0.5rem'}}>
        {
            !label.includes("general.") &&
            <Grid item  xs={12}>
                <InputLabel id={name}>{label}</InputLabel>
            </Grid>
        }
        <Grid item  xs={12}>
            <ButtonGroup color="primary" aria-label="outlined primary button group" style={{flexWrap: "wrap"}}>
                {optionButtons}
            </ButtonGroup>
        </Grid>
    </Grid>
    );
};

export default Multioption;
