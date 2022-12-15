import React, { useEffect } from 'react';
import { Button, Button as MuiButton, Grid, Menu, MenuItem, Paper, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils';

interface Props extends LocalizeContextProps{
    onCallBack:(dates:Date[]) => void 
}

function DatesSelector(props:Props){
    var d = new Date(2020, 0, 1);
    const [typeRange, setTypeRange] = React.useState(null);
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
    useEffect(() =>{
        props.onCallBack([startDate, endDate])
    }, [startDate, endDate])
    
    return(
        
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <Typography variant="h4" gutterBottom  >Select dates: </Typography>
                <Grid container spacing={3}>    
                    <Grid item >                    
                        <KeyboardDatePicker
                            margin="normal"
                            open={openStartDate}
                            onClose={() => setOpenStartDate(false)}
                            id="date-picker-dialog-start"
                            label="Start Date"
                            format={formatDateByLocale(props.activeLanguage.code)}
                            value={startDate}
                            maxDate = {endDate}
                            onChange={handleStartDateChange}
                            style={{display : 'none'}}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                            
                        />
                        <Button variant="contained"
                            color="primary" 
                            onClick={showStartCalendar}><Translate id="general.startDate" />: {startDate.toLocaleDateString(props.activeLanguage.code)}</Button>
                    </Grid>
                    <Grid item >
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-end"
                            open={openEndDate}
                            onClose={() => setOpenEndDate(false)}
                            label="End Date"
                            format="MM/dd/yyyy"
                            value={endDate}
                            minDate={startDate}
                            maxDate = {new Date()}
                            style={{display : 'none'}}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <Button variant="contained"
                            color="primary" 
                            onClick={showEndCalendar}><Translate id="general.endDate" />: {endDate.toLocaleDateString()}</Button>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        
    )
        
}

export default withLocalize(DatesSelector)