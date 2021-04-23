import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { string } from 'prop-types';
import React, { useState } from 'react'
import { LocalizeContextProps, LocalizedElement, LocalizedElementMap, Translate, withLocalize } from 'react-localize-redux';
import {TextFieldSherwood} from "./FieldSherwood";

interface Input{
    value:string,
    label:string,
    name:string
}
interface Props extends LocalizeContextProps{
    labelString:string,
    input:Input,
    errorState:boolean,
    options:Array<Input>,
    typeMargin:string,
    activationValues?:Array<string>,
    activatedFields?:Array<Input>,
    optionsUrl?:string
}

const SelectField:React.FC<Props> = ({input, labelString, activatedFields, options, activationValues, optionsUrl, errorState, typeMargin, translate}) => {
    const [newOptions, setNewOptions ] = useState<string[]>([""]);
    const [errorOptions, setErrorOption ] = useState<boolean[]>([]);

    function changeNewOption(index, event){
        const tempNewOptions = [...newOptions];
        tempNewOptions[index] = event.target.value;
        setNewOptions(tempNewOptions);
    }
    function addOption(){
        //Revisamos que los anterioes están rellenos y añado un string vacio a "newOptions"
    }
    function renderExtraFields(activationValues:string[] | undefined, activatedFields:Input[] | undefined, value:string){
        if(activationValues && activationValues.indexOf(value) !== -1){

            const htmlOptions = newOptions.map((option, index) => {
                return(<Grid item xs={12}>
                            <TextFieldSherwood label={`Option ${index+1}`} onChange={(event) => changeNewOption(index, event)}variant="outlined" value={option}
                                error={errorOptions[index]} size="small"
                            />
                        </Grid>);
            });
            return(
                <React.Fragment>
                    <Grid item xs={12}>
                        <button onClick={addOption}>Add option</button>
                    </Grid>
                    { htmlOptions }    
                </React.Fragment>
            )
        }
    }
    let optionsArray = [];
    if(typeof optionsUrl !== "undefined"){
        optionsArray = options.map(anOption => {
            return <MenuItem value={anOption.value}>{anOption.label}</MenuItem>
        })
    }
    else{
        optionsArray = options.map(option => {
            const optionText = translate(option.label).toString().indexOf("Missing translationId:") !== -1 ?  option.label : translate(option.label);
        return <MenuItem value={option.value}>{optionText}</MenuItem>
            
        })
    }
    const labelId = `${input.name}_label`;
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl variant="outlined"  style={{width:"235px"}} error={errorState} >
                    <InputLabel id={labelId}>{labelString}</InputLabel>
                    <Select
                    labelId={labelId}
                    id={input.name}
                    {...input} 
                    >
                    { optionsArray }
                    </Select>
                </FormControl>
            </Grid>
            { renderExtraFields(activationValues, activatedFields, input.value)}
        </Grid>
    )
}
export default withLocalize(SelectField);