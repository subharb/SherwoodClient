import React, { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core';
import { Alert, Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason } from '@material-ui/lab';
import { searchDrugService } from '../../services/sherwoodService';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

// interface Props{
//     name : string,
//     label : string,
//     typeMargin : string,
//     drugSelected: (drugSel:string) => void
// }

function DrugSelector(props){
    const [searchDrug, setSearchDrug] = useState("");
    const [startDate, setStartDate] = useState(null);
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
        props.drugSelected(drug);
    }
    if(error){
        return <Alert severity="error">
            <Translate id="investigation.share.error.description" />
        </Alert>
    }
    const startDateLabel = props.translate("general.startDate")
    const endDateLabel = props.translate("general.endDate")
    return (
        <React.Fragment>
            <Autocomplete
                id={props.name}
                loading = {loading}
                options={drugOptions}
                onInputChange={(event, value, reason) => {
                    setSearchDrug(value);
                }}
                onChange={(event, value, reason, details) => {
                    drugSelected(value);
                }}
            
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} value={searchDrug} label={props.label} variant="outlined" />}
            />,
            <MuiPickersUtilsProvider key="start-date" utils={DateFnsUtils} id="start-date">
                <KeyboardDatePicker
                    margin={props.typeMargin}
                    id="start-date"
                    inputVariant="outlined"
                    size="small"
                    label={startDate ? "" : startDateLabel}
                    format="dd/MM/yyyy"
                    value={startDate}
                    defaultValue={startDate} 
                    openTo="year"
                    onChange={(date, value) => {
                        setStartDate(value)
                    }}
                    
                    emptyLabel={startDateLabel}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    // error={errorState} 
                    // helperText={errorString} 
                />
            </MuiPickersUtilsProvider>
        </React.Fragment>
        
        
    )
}
export default withLocalize(DrugSelector);