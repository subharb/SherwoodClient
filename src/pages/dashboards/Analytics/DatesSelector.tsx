import React, { useEffect } from 'react';
import { Button, Button as MuiButton, FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, Typography } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils';
import { FieldWrapper } from '../../../components/general/mini_components';

interface Props extends LocalizeContextProps{
    onCallBack:(dates:Date[]) => void 
}

function DatesSelector(props:Props){
    var d = new Date(2020, 0, 1);
    const [typeRange, setTypeRange] = React.useState(null);
    const [startDate, setStartDate] = React.useState(d);
    const [endDate, setEndDate] = React.useState(new Date());
    const [timePeriod, setTimePeriod] = React.useState<null | number>(null);
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
    function selectChanged(event:React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>){
        console.log(event);
        setTimePeriod(event.target.value as number);
        switch(event.target.value){
            case 0:
                var d = new Date();
                d.setDate(d.getDate() - 7);
                setStartDate(d);
                setEndDate(new Date());
                break;
            case 1:
                var d = new Date();
                d.setDate(d.getDate() - 30);
                setStartDate(d);
                setEndDate(new Date());
                break;
        }

            
    }
    function showStartCalendar(){
        setOpenStartDate(true);
    }
    function showEndCalendar(){
        setOpenEndDate(true);
    }
    useEffect(() =>{
        props.onCallBack([startDate, endDate])
    }, [startDate, endDate])
    
    function renderCustomDatesSelector(){
        return (
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
    
    const optionsArray = [<MenuItem value={0}><Translate id="hospital.analytics.date_selector.last_week" /></MenuItem>, <MenuItem value={1}><Translate id="hospital.analytics.date_selector.last_month" /></MenuItem>, <MenuItem value={2}><Translate id="hospital.analytics.date_selector.custom_period" /></MenuItem>]
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom  ><Translate id="hospital.analytics.date_selector.current_period" />: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={12}> 
                <FieldWrapper noWrap = {false}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="time_period"><Translate id="hospital.analytics.date_selector.select_period"/></InputLabel>
                        <Select
                            labelId="time_period"
                            id="time_period"
                            label="Select a period"
                            onChange={(event) => selectChanged(event)}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </FieldWrapper>    
                {
                    timePeriod === 2 ? renderCustomDatesSelector() : null
                } 
            </Grid>
        </Grid>
    )
        
}

export default withLocalize(DatesSelector)