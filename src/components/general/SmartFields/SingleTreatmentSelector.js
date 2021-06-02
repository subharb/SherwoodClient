import React, { useEffect, useState } from 'react'
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Alert, Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason } from '@material-ui/lab';
import { searchDrugService } from '../../../services/sherwoodService';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ButtonAccept, ButtonCancel } from '../mini_components'; 
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
    const [posology, setPosology] = useState(null);
    const [dose, setDose] = useState(null);
    const [errorPosology, setErrorPosology] = useState(false);
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
        if(!posology){
            setErrorPosology(true);
            valid = false;
        }
        if(!dose){
            setErrorDose(true);
            valid = false;
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
            
             props.elementSelected({
                treatment:drug.name,"drug-code" : drug.cis, 
                "treatment-posology": posology, 
                "treatment-dose": dose, 
                "treatment-start" : startDate, 
                "treatment-finish" : finishDate, 
            });
        }
    }
    function drugSelected(drug){
        console.log(drug);
        setErrorDrug(false);
        setDrug(drug);
    }
    function cancel(){
        props.cancelTreatment()
    }
    function posologySelected(posology){
        setPosology(posology);
        setErrorPosology(false);
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
        setPosology("single-dose");
        setAmount(0);
        setTimeUnit("days");
    }
    if(error){
        return(
            <Alert severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>);
    }
    
    const selectPosology = props.slaves.find(slave => slave.name === "treatment-posology");
    const selectDose = props.slaves.find(slave => slave.name === "treatment-dose");
    const isCurrentLabel = props.translate("hospital.chronic");
    const isOneDoseLabel = props.translate("hospital.single-dose");
    const numberElements = [1,2,3,4,5,6,7,8,9,10].map(val => <MenuItem value={val}>{val}</MenuItem>);
    const timesArray = [DAYS, WEEKS, MONTHS].map(val => <MenuItem value={val}><Translate id={`hospital.time-unit-options.${val}`} /></MenuItem>);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DrugSelector drugSelected={(drug) => drugSelected(drug) }  error={errorDrug}
                    callbackError={(error) => drugError(error)}/>
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    id="dose"
                    options={selectDose.options}
                    getOptionLabel={(option) => props.translate(option.label)}
                    style={{ width: 300 }}
                    onInputChange={(event, value, reason) => {
                        doseSelected(value);
                    }}
                    onChange={(event, value, reason, details) => {
                        doseSelected(value.value);
                    }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} 
                        label={selectDose.label} variant="outlined" 
                        helperText={props.translate("general.no-option-match")} 
                        error={errorDose} />}
                    />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel 
                    control={<Checkbox checked={isOneDose} onChange={onChangeIsOnce} />}
                    label={isOneDoseLabel}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    id="posology" disabled={isOneDose}
                    options={selectPosology.options}
                    getOptionLabel={(option) => props.translate(option.label)}
                    style={{ width: 300 }}
                    onInputChange={(event, value, reason) => {
                        posologySelected(value);
                    }}
                    onChange={(event, value, reason, details) => {
                        posologySelected(value.value);
                    }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} 
                        label={selectPosology.label} variant="outlined" helperText={props.translate("general.no-option-match")} 
                        error={errorPosology} />}
                    />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel disabled={isOneDose}
                    control={<Checkbox checked={isCurrent} onChange={onChangeIsCurrent} />}
                    label={isCurrentLabel}
                />
            </Grid>
            
            <Grid item xs={12}>
                <InputLabel id="duration"><Translate id="hospital.duration" /></InputLabel>
                <FormControl disabled={isOneDose || isCurrent} style={{minWidth: 140}} mt={3} variant="outlined" margin={props.typeMargin} error={errorDuration} >
                    <InputLabel id="numberElements"><Translate id="hospital.number-elements" /></InputLabel>
                    <Select
                        id="numberElements"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        >
                        { numberElements }
                    </Select>
                </FormControl>
                <FormControl disabled={isOneDose || isCurrent} style={{minWidth: 150}} mt={3} variant="outlined" margin={props.typeMargin} error={errorDuration} >
                    <InputLabel id="timeUnit"><Translate id="hospital.time-unit" /></InputLabel>
                    <Select
                        id="timeUnit"
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value)}
                        >
                        { timesArray }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <ButtonAccept onClick={saveDrug}><Translate id="general.add" /></ButtonAccept>
                <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
            
        </Grid>
        
        
    )
}
export default withLocalize(SingleTreatmentSelector);