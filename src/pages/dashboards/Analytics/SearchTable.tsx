import React, { useEffect } from 'react';
import { Button, Button as MuiButton, Grid, Menu, MenuItem, Paper } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils';
import AutocompleteSherwood from '../../../components/general/Autocomplete';

interface Props extends LocalizeContextProps{
    
}

function SearchTable(props:Props){
    var d = new Date(2020, 0, 1);
    const [startDate, setStartDate] = React.useState(d);
    const [endDate, setEndDate] = React.useState(new Date());

    const [openStartDate, setOpenStartDate] = React.useState(false);
    const [openEndDate, setOpenEndDate] = React.useState(false);

    function handleStartDateChange(date:MaterialUiPickersDate){
        if(date){
            setStartDate(date)
        }
    };

    function handleEndDateChange(date:MaterialUiPickersDate){
        if(date){
            setEndDate(date)
        }
    };

    function showStartCalendar(){
        setOpenStartDate(true);
    }
    function showEndCalendar(){
        setOpenEndDate(true);
    }
    
    return(
        <Paper style={{padding:'1rem'}}>
            <AutocompleteSherwood error={false} freeSolo={false} />
        </Paper>
    )
        
}

export default withLocalize(SearchTable)