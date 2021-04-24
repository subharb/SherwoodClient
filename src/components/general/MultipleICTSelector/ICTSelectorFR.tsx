import React, { useEffect, useState } from 'react'
import { searchDiagnosticService } from '../../../services/sherwoodService';
import { Grid, TextField } from '@material-ui/core';
import { ButtonCancel } from '../mini_components';
import { Diagnosis } from './index';
import { Autocomplete } from '@material-ui/lab';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';

interface Props extends LocalizeContextProps{
    //value:Diagnosis[] | false;
    error:boolean,
    label:string,
    //margin:string,
    variant:"standard" | "filled" | "outlined" | undefined,
    size:string,
    diagnosisSelected: (diag:Diagnosis) => void,
    cancel: () => void
}

interface DiagnosisPost{
    name:string,
    code:string
}
export const ICTSelectorFR:React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [diagnosticsOptions, setDiagnosticsOptions] = useState<DiagnosisPost[]>([]);
    const [searchDiagnosis, setSearchDiagnosis] = useState("");
    const [error, setError] = useState(false);
    const [diagnose, setDiagnose] = useState(null);

    // function resetField(){
    //     //props.resetDiagnose();
    //     setDiagnose(null);
    // }
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

    //const value = diagnose !== "" ? diagnose : props.value;
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
            
                getOptionLabel={(option:DiagnosisPost) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} value={searchDiagnosis} 
                    error={props.error} label={props.translate("hospital.select-diagnostic")} variant={props.variant} />}
            />
            <Grid item xs={12}>
                <ButtonCancel onClick={cancel} ><Translate id="general.cancel" /></ButtonCancel>
            </Grid>
        </React.Fragment>
    )
}
export default withLocalize(ICTSelectorFR)