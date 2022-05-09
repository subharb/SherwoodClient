import React, { useEffect } from 'react';
import { Button, Button as MuiButton, Grid, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils';
import AutocompleteSherwood from '../../../components/general/Autocomplete';
import ICTSelectorOMS from '../../../components/general/SmartFields/ICT/ICTSelectorOMS';

interface Props extends LocalizeContextProps{
    label:string,
    title:string
}

function SearchTable(props:Props){
    function parseDiagnoseResponse(){

    }

    async function diagnosisService(){
        
    }
    function diagnoseSelected(){

    }

    return(
        <Paper style={{padding:'1rem'}}>
            <Typography variant="h4" gutterBottom={true}>{props.title}</Typography>
            <ICTSelectorOMS />
            {/* <AutocompleteSherwood label={props.label} error={false} freeSolo={false} remoteSearch={diagnosisService} params={{}}
                getOptionLabel={(option) => option.name} onValueSelected={diagnoseSelected}
                getOptionsResponse={parseDiagnoseResponse}
                 /> */}
        </Paper>
    )
        
}

export default withLocalize(SearchTable)