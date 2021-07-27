import React, { useEffect } from 'react';
import { Button, Button as MuiButton, Grid, Menu, MenuItem, Paper } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Translate } from 'react-localize-redux';

interface Props{
    onCallBack:(dates:Date[]) => void 
}

function DatesSelector(props:Props){
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
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
    return [
        <Paper style={{padding:'1rem'}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <Grid container spacing={3}>
                    <Grid item >                    
                        <KeyboardDatePicker
                            margin="normal"
                            open={openStartDate}
                            onClose={() => setOpenStartDate(false)}
                            id="date-picker-dialog-start"
                            label="Start Date"
                            format="MM/dd/yyyy"
                            value={startDate}
                            maxDate = {endDate}
                            onChange={handleStartDateChange}
                            style={{display : 'none'}}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                            
                        />
                        <Button variant="contained"
                            color="secondary" 
                            onClick={showStartCalendar}><Translate id="general.startDate" />: {startDate.toLocaleDateString()}</Button>
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
                            color="secondary"
                            onClick={showEndCalendar}><Translate id="general.endDate" />: {endDate.toLocaleDateString()}</Button>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </Paper>

    ]
}

export default DatesSelector