import React, { useEffect, useState } from 'react'
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Alert, Autocomplete } from '@mui/material';
import { searchDrugService } from '../../../services';
import { Translate, withLocalize } from 'react-localize-redux';

import { ButtonAccept, ButtonCancel, ButtonOk } from '../mini_components';
import DrugSelector from './DrugSelector';
import {addMinutes} from 'date-fns'

const DAYS = "days";
const WEEKS = "weeks";
const MONTHS = "months";
// interface Props{
//     name : string,
//     label : string,
//     typeMargin : string,
//        errorState: boolean,
//     drugSelected: (drugSel:string) => void
// }

function SingleTreatmentSelector(props){
    
    const [isCurrent, setIsCurrent] = useState(false);
    const [frecuency, setfrecuency] = useState(null);
    const [dose, setDose] = useState(null);
    const [errorfrecuency, setErrorfrecuency] = useState(false);
    const [isOneDose, setIsOneDose] = useState(false);
    const [errorDose, setErrorDose] = useState(false);
    const [amount, setAmount] = useState(null);
    const [timeUnit, setTimeUnit] = useState(null);
    const [errorDuration, setErrorDuration] = useState(false);
    const [errorDrug, setErrorDrug] = useState(false);
    const [drug, setDrug] = useState(null);
    
    const [error, setError] = useState(false);
    
    
    function saveDrug(){
        let valid = true;
        if(!drug){
            setErrorDrug(true);
            valid = false;
        }
        if(!frecuency){
            setErrorfrecuency(true);
            valid = false;
        }
        if(!dose){
            setErrorDose(true);
            valid = false;
        }
        if(valid && props.type === "treatment_regular"){
            props.elementSelected({
                treatment_regular:drug.name,"drug-code" : drug.id, 
                "treatment_regular-frecuency": frecuency, 
                "treatment_regular-dose": dose
            });
            return;
        }
        if(!isCurrent && (amount === null || !timeUnit)){
            setErrorDuration(true);
            valid = false;
        }
        if(valid){
            const startDate = new Date();
            let finishDate = null;
            if(!isCurrent){
                const unitMinutes = timeUnit === DAYS ? 1440 : timeUnit === WEEKS ? 10080 : timeUnit === MONTHS ? 43200 : null;
                const duration = amount * unitMinutes;
                finishDate = addMinutes(startDate, duration);
            }
            
            const key = props.type === "treatment" ? "treatment" : "treatment_prescription";
            const elementSelected = {
                "drug-code" : drug.id, 
                "treatment-frecuency": frecuency, 
                "treatment-dose": dose, 
                "treatment-start" : startDate, 
                "treatment-finish" : finishDate, 
            };
            elementSelected[key] = drug.name,
             props.elementSelected(elementSelected);
        }
    }
    function drugSelected(drug){
        console.log("Treatment Drug:", drug);
        setErrorDrug(false);
        setDrug(drug);
    }
    function cancel(){
        props.cancel()
    }
    function frecuencySelected(frecuency){
        setfrecuency(frecuency);
        setErrorfrecuency(false);
    }
    function doseSelected(dose){
        setDose(dose);
        setErrorDose(false);
    }
    function onChangeIsCurrent(e){
        console.log(e.target.checked);
        setIsCurrent(e.target.checked);
    }
    function drugError(error){
        setError(error);
    }
    function onChangeIsOnce(e){
        console.log(e.target.checked);
        setIsOneDose(e.target.checked);
        setfrecuency("single-dose");
        setAmount(0);
        setTimeUnit("days");
    }
    if(error){
        return(
            <Alert severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>);
    }
    
    const selectfrecuency = props.slaves.find(slave => slave.name.includes("frecuency"));
    const selectDose = props.slaves.find(slave => slave.name.includes("dose"));
    const isCurrentLabel = props.translate("hospital.chronic");
    const isOneDoseLabel = props.translate("hospital.single-dose");
    const numberElements = [1,2,3,4,5,6,7,8,9,10].map(val => <MenuItem value={val}>{val}</MenuItem>);
    const timesArray = [DAYS, WEEKS, MONTHS].map(val => <MenuItem value={val}><Translate id={`hospital.time-unit-options.${val}`} /></MenuItem>);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid item xs={12} sm={10} lg={3}>
                    <DrugSelector drugSelected={(drug) => drugSelected(drug) } 
                        country={props.country}
                        error={errorDrug} variant={props.variant} type="treatment"
                        freeSolo
                        callbackError={(error) => drugError(error)}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12} sm={4} lg={3}>
                    <Autocomplete
                        id="dose"
                        fullWidth
                        options={selectDose.options}
                        getOptionLabel={(option) => props.translate(option.label)}
                        
                        onInputChange={(event, value, reason) => {
                            doseSelected(value);
                        }}
                        onChange={(event, value, reason, details) => {
                            if(value){
                                doseSelected(value.value);
                            }
                            else{
                                doseSelected(null);
                            }
                            
                        }}
                        freeSolo
                        renderInput={(params) => <TextField {...params} 
                            label={props.translate("hospital.dose")} variant="outlined" 
                            helperText={props.translate("general.no-option-match")} 
                            error={errorDose} />}
                        />
                </Grid>
            </Grid>
            
            {
                ["treatment", "treatment_prescription"].includes(props.type) &&
                <Grid item xs={12}>
                    <FormControlLabel 
                        control={<Checkbox checked={isOneDose} onChange={onChangeIsOnce} />}
                        label={isOneDoseLabel}
                    />
                </Grid>  
            }
           <Grid item xs={12}>
                <Grid item xs={12} sm={4} lg={3}>
                    <Autocomplete
                        id="frecuency" disabled={isOneDose}
                        options={selectfrecuency.options}
                        getOptionLabel={(option) => props.translate(option.label)}
                        onInputChange={(event, value, reason) => {
                            frecuencySelected(value);
                        }}
                        onChange={(event, value, reason, details) => {
                            if(value){
                                frecuencySelected(value.value);
                            }
                            else{
                                frecuencySelected(null);
                            }
                        }}
                        freeSolo
                        renderInput={(params) => <TextField {...params} 
                            label={props.translate("hospital.frecuency")} variant="outlined" helperText={props.translate("general.no-option-match")} 
                            error={errorfrecuency} />}
                        />
                </Grid>
            </Grid>
            {
                 ["treatment", "treatment_prescription"].includes(props.type) &&
                <React.Fragment>
                    <Grid item xs={12}>
                        <FormControlLabel disabled={isOneDose}
                            control={<Checkbox checked={isCurrent} onChange={onChangeIsCurrent} />}
                            label={isCurrentLabel}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <InputLabel id="duration"><Translate id="hospital.duration" /></InputLabel>
                        <FormControl disabled={isOneDose || isCurrent} style={{minWidth: 140}} mt={3} variant="outlined" margin={props.typeMargin} error={errorDuration} >
                            <InputLabel id="numberElements-label"><Translate id="hospital.number-elements" /></InputLabel>
                            <Select
                                id="numberElements"
                                labelId="numberElements-label"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                >
                                { numberElements }
                            </Select>
                        </FormControl>
                        <FormControl disabled={isOneDose || isCurrent} style={{minWidth: 150}} 
                            mt={3} variant="outlined"
                            margin={props.typeMargin} error={errorDuration} >
                            <InputLabel id="timeUnit-label" >
                                <Translate id="hospital.time-unit" />
                            </InputLabel>
                            <Select
                                id="timeUnit"
                                labelId="timeUnit-label"
                                value={timeUnit}
                                onChange={(e) => setTimeUnit(e.target.value)}
                                >
                                { timesArray }
                            </Select>
                        </FormControl>
                    </Grid>
                </React.Fragment>
            }
            <Grid container item xs={12} spacing={1}>
                <Grid item>
                    <ButtonOk onClick={saveDrug}><Translate id="general.add" /></ButtonOk>
                </Grid>
                <Grid item>
                    <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>    
                </Grid>
            </Grid>
        </Grid>
        
        
    )
}
export default withLocalize(SingleTreatmentSelector);