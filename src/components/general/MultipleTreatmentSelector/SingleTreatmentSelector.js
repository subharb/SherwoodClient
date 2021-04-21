import React, { useEffect, useState } from 'react'
import { Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Alert, Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason } from '@material-ui/lab';
import { searchDrugService } from '../../../services/sherwoodService';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ButtonAccept, ButtonCancel } from '../mini_components'; 

// interface Props{
//     name : string,
//     label : string,
//     typeMargin : string,
//        errorState: boolean,
//     drugSelected: (drugSel:string) => void
// }

function SingleTreatmentSelector(props){
    const [searchDrug, setSearchDrug] = useState("");
    const [finishDate, setFinishDate] = useState(null);
    const [isCurrent, setIsCurrent] = useState(true);
    const [posology, setPosology] = useState(null);
    const [errorPosology, setErrorPosology] = useState(false);
    const [errorDrug, setErrorDrug] = useState(false);
    const [errorFinishDate, setErrorFinishDate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [drug, setDrug] = useState(null);
    const [drugOptions, setDrugOptions] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        async function searchDrugRemote(){
            try{
                setLoading(true);
                const response = await searchDrugService(searchDrug);
                if(response.status === 200){
                    setDrugOptions(response.drugs)
                }
                setLoading(false);
            }
            catch(error){
                console.log(error);
                setError(true);
                setLoading(false);
            }
            
        }
        if(!drug && searchDrug.length > 3){
            searchDrugRemote();
        }
    }, [searchDrug]);
    function drugSelected(drug){
        console.log(drug);
        setDrug(drug);
        setErrorDrug(false);
    }
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
        if(!finishDate && !isCurrent){
            setErrorFinishDate(true);
            valid = false;
        }
        if(valid){
            const startDate = new Date();
            props.treatmentSelected({
                treatment:drug.name,"drug-code" : drug.code, "treatment-posology": posology.value,"treatment-start" : startDate, "treatment-finish" : finishDate, 
            });
        }
    }
    function cancel(){
        props.cancelTreatment()
    }
    function posologySelected(posology){
        setPosology(posology);
        setErrorPosology(false);
    }
    function onChangeIsCurrent(e){
        console.log(e.target.checked);
        setIsCurrent(e.target.checked);
    }
    if(error){
        return <Alert severity="error">
            <Translate id="investigation.share.error.description" />
        </Alert>
    }
    const finishDateLabel = props.translate("general.endDate");
    const selectPosology = props.slaves.find(slave => slave.name === "treatment-posology");
    const isCurrentLabel = props.translate("hospital.current");
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Autocomplete
                    id={props.name}
                    loading = {loading}
                    noOptionsText="start typing"
                    options={drugOptions}
                    onInputChange={(event, value, reason) => {
                        if(reason === "clear"){
                            setSearchDrug("");
                        }
                        else{
                            setSearchDrug(value);
                        }
                        
                    }}
                    onChange={(event, value, reason, details) => {
                        drugSelected(value);
                    }}
                
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} value={searchDrug} error={errorDrug} label={props.label} variant="outlined" />}
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    id="posology"
                    
                    options={selectPosology.options}
                    getOptionLabel={(option) => props.translate(option.label)}
                    style={{ width: 300 }}
                    onInputChange={(event, value, reason) => {
                        posologySelected(value);
                    }}
                    onChange={(event, value, reason, details) => {
                        posologySelected(value);
                    }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} 
                        label={selectPosology.label} variant="outlined" helperText="If no options match, write your own" 
                        error={errorPosology} />}
                    />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                        control={<Checkbox checked={isCurrent} onChange={onChangeIsCurrent} />}
                        label={isCurrentLabel}
                    />
            </Grid>
             <Grid item xs={12}>
                <MuiPickersUtilsProvider key="end-date" utils={DateFnsUtils} id="end-date">
                    <KeyboardDatePicker
                        margin={props.typeMargin}
                        id="end-date"
                        inputVariant="outlined"
                        size="small"
                        label={finishDate ? "" : finishDateLabel}
                        format="dd/MM/yyyy"
                        value={finishDate}
                        disabled={isCurrent}
                        defaultValue={finishDate} 
                        openTo="year"
                        minDate={new Date()}
                        onChange={(date, value) => {
                            setFinishDate(value);
                            setErrorFinishDate(false);
                        }}
                        
                        emptyLabel={finishDateLabel}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        error={errorFinishDate} 
                        // helperText={errorString} 
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
                <ButtonAccept onClick={saveDrug}><Translate id="general.add" /></ButtonAccept>
                <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
            
        </Grid>
        
        
    )
}
export default withLocalize(SingleTreatmentSelector);