import React, { useEffect, useState } from 'react'
import { searchDiagnosticService } from '../../../services/sherwoodService';
import { Grid, TextField } from '@material-ui/core';
import { ButtonCancel } from '../mini_components';
import { Diagnosis } from './index';
import { Autocomplete } from '@material-ui/lab';
import { Translate } from 'react-localize-redux';

interface Props{
    value:Diagnosis[] | false;
    error:boolean,
    label:string,
    diagnosisSelected: (diag:Diagnosis) => void
    cancel: () => void;
}

export const ICTSelectorFR:React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [diagnosticsOptions, setDiagnosticsOptions] = useState<Diagnosis[]>([]);
    const [searchDiagnosis, setSearchDiagnosis] = useState("");
    const [error, setError] = useState(false);
    const [diagnose, setDiagnose] = useState(null);

    function resetField(){
        //props.resetDiagnose();
        setDiagnose("");
    }
    function cancel(){
        props.cancel();
    }
    function diagnoseSelected(){

    }
    useEffect(() => {
        async function searchDiagnosticRemote(){
            try{
                setLoading(true);
                const response = await searchDiagnosticService(searchDiagnosis);
                if(response.status === 200){
                    setDiagnosticsOptions(response.diagnostics)
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

    const value = diagnose !== "" ? diagnose : props.value;
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
                        props.diagnosisSelected({
                            ict:value.name,
                            "ict-code" : value.code
                        });
                    }
                }}
            
                getOptionLabel={(option:Diagnosis) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} value={searchDiagnosis} 
                    error={props.error} label={props.label} variant="outlined" />}
            />
            <Grid item xs={12}>
                <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
        </React.Fragment>
    )
}