import React, { useEffect, useState } from 'react'
import { searchDiagnosticService, searchDrugComponentService } from '../../../services/sherwoodService';
import { Grid, TextField } from '@material-ui/core';
import { ButtonAccept, ButtonCancel } from '../mini_components';
import { Allergy, Background, Smartfield } from './index';
import { Autocomplete } from '@material-ui/lab';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { PropsIct } from './ICTSelectorGeneral';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface Props extends LocalizeContextProps, PropsIct{

}

interface DiagnosisPost{
    name:string,
    code:string
}
const ICTSelectorFR:React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [diagnosticsOptions, setDiagnosticsOptions] = useState<DiagnosisPost[]>([]);
    const [searchDiagnosis, setSearchDiagnosis] = useState("");
    const [error, setError] = useState(false);
    const [errorDate, setErrorDate] = useState(false);
    const [diagnose, setDiagnose] = useState<Smartfield | null>(null);
    
    const [date, setDate] = useState<string | null | undefined>(null);

    function cancel(){
        props.cancel();
    }
    function elementSelected(value:Smartfield){
        if(props.type === "background"){
            setDiagnose(value);
        }
        else{
            props.elementSelected(value);
        }
    }
    function addBackground(){
        if(diagnose && date){
            const background = diagnose as Background;
            background["background-date"] = date;
            props.elementSelected(diagnose);
        }
        else{
            if(!diagnose){
                setError(true);
            }
            if(!date){
                setErrorDate(true);
            }
        }
    }
    useEffect(() => {
        async function searchDiagnosticRemote(){
            try{
                setLoading(true);
                let response;
                let elements = []
                if(props.type === "ict" || props.type === "background" ){
                    response = await searchDiagnosticService(searchDiagnosis);
                    elements = response.diagnostics;
                }
                else{
                    response = await searchDrugComponentService(searchDiagnosis);
                    elements = response.drugComposition;
                }
                
                if(response.status === 200){
                    setDiagnosticsOptions(elements);
                }
                setLoading(false);
            }
            catch(error){
                console.log(error);
                setError(true);
                setLoading(false);
            }
            
        }
        if(!diagnose && searchDiagnosis.length > 3){
            searchDiagnosticRemote();
        }
    }, [searchDiagnosis]);

    const dateLabel = props.translate("general.date").toString();
    const emptyLabel = props.translate("hospital.background-date").toString();
    return (
        <React.Fragment>
            <Autocomplete
                id="diagnostic"
                loading = {loading}
                noOptionsText="start typing"
                options={diagnosticsOptions}
                onInputChange={(event, value, reason) => {
                    if(reason === "clear"){
                        setSearchDiagnosis("");
                    }
                    else{
                        setSearchDiagnosis(value);
                    }
                    
                }}
                onChange={(event, value, reason, details) => {
                    if(value){
                        let tempValue:Smartfield;
                        if(props.type === "ict"){
                            tempValue = {
                                "ict" : value.name,
                                "ict-code" : value.code
                            }
                        }
                        else if(props.type === "background"){
                            tempValue = {
                                "background" : value.name,
                                "background-code" : value.code,
                                "background-date" : ""
                            }
                        }
                        else{ 
                            tempValue = {
                                "allergy" : value.name,
                                "allergy-code" : value.code
                            }
                        }
                       
                        elementSelected(tempValue);
                    }
                }}
            
                getOptionLabel={(option:DiagnosisPost) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => <TextField {...params} value={searchDiagnosis} fullWidth={true}
                    error={props.error || error} label={props.translate(`hospital.select-${props.type}`)} variant={props.variant} />}
            />
            {
                props.type === "background" &&
                
                    <Grid item xs={12}>
                    <MuiPickersUtilsProvider key="end-date" utils={DateFnsUtils} >
                        <KeyboardDatePicker
                            margin={props.typeMargin}
                            id="date"
                            inputVariant="outlined"
                            size="small"
                            label={date ? "" : dateLabel}
                            format="yyyy"
                            value={date}
                            views={["year"]}
                            defaultValue={date} 
                            openTo="year"
                            maxDate={new Date()}
                            onChange={(date: MaterialUiPickersDate, value?: string | null | undefined) => {
                                setDate(value);
                                setErrorDate(false);
                            }}
                            
                            emptyLabel={emptyLabel}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            error={errorDate} 
                            // helperText={errorString} 
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                
            
            }
            <Grid item xs={12}>
            {
                props.type === "background" &&
                <ButtonAccept onClick={addBackground}><Translate id="general.add" /></ButtonAccept>
            }
                <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
        </React.Fragment>
    )
}
export default withLocalize(ICTSelectorFR)