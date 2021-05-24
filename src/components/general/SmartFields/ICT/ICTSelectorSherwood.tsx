import React, { useEffect, useState } from 'react'
import { searchDiagnosticService, searchDrugComponentService } from '../../../../services/sherwoodService';
import { Grid, TextField } from '@material-ui/core';
import { ButtonAccept, ButtonCancel } from '../../mini_components';
import { Allergy, BackgroundType, SmartFieldType, FamilyBackground, Diagnosis } from '../index';
import { Autocomplete } from '@material-ui/lab';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { PropsIct } from '../index';
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
   
    function elementSelected(value:Diagnosis){
        props.elementSelected(value);
    }
    
    useEffect(() => {
        async function searchDiagnosticRemote(){
            try{
                setLoading(true);
                let response;
                let elements = []
                if(["ict", "background", "family-background"].includes(props.type)){
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
                props.setError(true);
                setLoading(false);
            }
            
        }
        if(!props.diagnose && searchDiagnosis.length > 3){
            searchDiagnosticRemote();
        }
    }, [searchDiagnosis]);

    return (
        <React.Fragment>
            <Autocomplete
                id="diagnostic"
                loading = {loading} autoComplete
                noOptionsText={ searchDiagnosis.length < 4 ? props.translate("general.start_typing") : diagnosticsOptions.length === 0 ? props.translate("general.no_results") : "BUG" }
                options={diagnosticsOptions}
                filterOptions={x => x}
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
                        const tempValue:SmartFieldType = {
                            "ict" : value.name,
                            "ict-code" : value.code
                        }
                        // if(props.type === "ict"){
                        //     tempValue = {
                        //         "ict" : value.name,
                        //         "ict-code" : value.code
                        //     }
                        // }
                        // else if(props.type === "background"){
                        //     tempValue = {
                        //         "background" : value.name,
                        //         "background-code" : value.code,
                        //         "background-date" : ""
                        //     }
                        // }
                        // else if(props.type === "family-background"){
                        //     tempValue = {
                        //         "family-background" : value.name,
                        //         "family-background-code" : value.code
                        //     }
                        // }
                        // else{ 
                        //     tempValue = {
                        //         "allergy" : value.name,
                        //         "allergy-code" : value.code
                        //     }
                        // }
                       
                        elementSelected(tempValue);
                    }
                }}
            
                getOptionLabel={(option:DiagnosisPost) => {
                    console.log(option.name);
                    return option.name
                }}
                style={{ width: 400 }}
                renderInput={(params) => <TextField {...params} value={searchDiagnosis} fullWidth={true}
                    error={props.error || error} label={props.translate(`hospital.select-${props.type}`)} variant={props.variant} />}
            />
            
            
            
        </React.Fragment>
    )
}
export default withLocalize(ICTSelectorFR)