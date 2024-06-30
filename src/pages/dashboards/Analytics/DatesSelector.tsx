import React, { useEffect } from 'react';
import { Button, Button as MuiButton, FormControl, Grid, InputLabel, Menu, MenuItem, Paper, Select, Typography, SelectChangeEvent } from "@mui/material";

import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils/index.jsx';
import { FieldWrapper } from '../../../components/general/mini_components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

interface Props extends LocalizeContextProps{
    onCallBack:(dates:Date[]) => void 
}

function DatesSelector(props:Props){
    const today = new Date();
    const oneYearAgo = dayjs(today).subtract(1, 'year').toDate();
    const oneWeekAgo = dayjs(today).subtract(1, 'week').toDate()
    
    const [startDate, setStartDate] = React.useState(oneWeekAgo);
    const [endDate, setEndDate] = React.useState(new Date());
    // Para separar la logica de cuando se seleccionan de los selectores
    const [startDateCustom, setStartDateCustom] = React.useState(oneYearAgo);
    const [endDateCustom, setEndDateCustom] = React.useState(new Date());
    
    const [timePeriod, setTimePeriod] = React.useState<null | number>(null);
    const [openStartDate, setOpenStartDate] = React.useState(false);
    const [openEndDate, setOpenEndDate] = React.useState(false);

    function handleStartDateChange(date:dayjs.Dayjs | null){
        if(date){
            setStartDateCustom(date.toDate())
            setOpenStartDate(false);
        }
    };

    function handleEndDateChange(date:dayjs.Dayjs | null){
        if(date){
            setEndDateCustom(date.toDate());
            setOpenEndDate(false);
        }
    };
    function selectChanged(event:SelectChangeEvent){
        console.log(event);
        const valueInt = parseInt(event.target.value);
        setTimePeriod(valueInt);
        switch(valueInt){
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

    useEffect(() =>{
        props.onCallBack([startDate, endDate])
    }, [startDate, endDate])
    

    function showStartCalendar(){
        setOpenStartDate(true);
    }
    function showEndCalendar(){
        setOpenEndDate(true);
    }

    function renderCustomDatesSelector(){
        return (
            <>
                <Typography variant="h4" gutterBottom  >Select dates: </Typography>
                <Grid container spacing={3}>    
                    <Grid item >     
                    <DatePicker  label="Start Date"
                        defaultValue={dayjs(startDateCustom)}
                        format={formatDateByLocale(props.activeLanguage.code)}
                        maxDate = {dayjs()}
                        onChange={handleStartDateChange} 
                        />
                    </Grid>
                    <Grid item >
                        <DatePicker label="End Date"
                            defaultValue={dayjs(endDateCustom)}
                            format={formatDateByLocale(props.activeLanguage.code)}
                            minDate={dayjs(startDateCustom)}
                            maxDate = {dayjs()}
                            onChange={handleEndDateChange} 
                            />
                    </Grid>
                    <Grid item >
                        <Button variant="contained"
                                color="primary" 
                                onClick={() => {
                                    setStartDate(startDateCustom);
                                    setEndDate(endDateCustom);
                                }}>Apply Changes</Button>   
                        
                    </Grid>
                </Grid>
            </>
        )
    }
    
    const optionsArray = [<MenuItem value={0}><Translate id="hospital.analytics.date_selector.last_week" /></MenuItem>, <MenuItem value={1}><Translate id="hospital.analytics.date_selector.last_month" /></MenuItem>, <MenuItem value={2}><Translate id="hospital.analytics.date_selector.custom_period" /></MenuItem>]
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom  ><Translate id="hospital.analytics.date_selector.current_period" />: {startDate.toLocaleDateString(props.activeLanguage.code)} - {endDate.toLocaleDateString(props.activeLanguage.code)}</Typography>
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