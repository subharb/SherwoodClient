import { Box, createMuiTheme } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles, styled, ThemeProvider } from '@material-ui/styles';
import { Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils';



interface AppointmentDatePickerProps extends LocalizeContextProps{
    availableDaysWeek:string[];
    blockedDates:number[],
    slotsPerDay:number,
    autoCurrentDate?:boolean,
    selectBlockedDates?:boolean,
    onDateChangeCallback: (date:MaterialUiPickersDate) => void;
    datesOccupancy:{[date:string]:number}
}

const useStyles = makeStyles((theme) => ({
    dayWithDotContainer: {
        position: 'relative',
    },
    dayWithDot: {
        position: 'absolute',
        height: 0,
        width: 0,
        border: '4px solid',
        borderRadius: 4,
        right: '50%',
        transform: 'translateX(4px)',
        top: '75%'
    },
    freeDay:{
        borderColor: 'green',
        backgroundColor: "green",
        "&:hover": {
            backgroundColor: "green",
        }
    },
    halfBusyDay:{
        borderColor: 'orange',
        backgroundColor: "orange",
        "&:hover": {
            backgroundColor: "orange",
        }
    },
    veryBusyDay:{
        borderColor: 'red',
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "red",
        }
    },
    fullDay:{
        borderColor: 'black',
        backgroundColor: "black",
        "&:hover": {
            backgroundColor: "black",
        }
    },
    daySelected:{
        color: "#FFF",
        fontWeight: 500,
        width: '36px',
        height: '36px',    
    }
}))



const AppointmentDatePicker: React.FC<AppointmentDatePickerProps> = ({ availableDaysWeek, autoCurrentDate, blockedDates, 
                                                                        slotsPerDay, activeLanguage,  datesOccupancy, 
                                                                        selectBlockedDates, onDateChangeCallback,  translate }) => {
    const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate>(null);
    const classes = useStyles();

    function occupancyLevel(date:MaterialUiPickersDate){
        const dateString = date!.toISOString().split('T')[0]
        if(datesOccupancy.hasOwnProperty(dateString)){
            if(slotsPerDay === datesOccupancy[dateString]){
                return classes.fullDay;
            }
            else{
                const percent = datesOccupancy[dateString] / slotsPerDay;
                return percent < 0.3 ? classes.freeDay : percent < 0.6 ? classes.halfBusyDay : classes.veryBusyDay;
            }
        }
        else{
            return classes.freeDay;
        }
    }

    function isDisabledDate(date:MaterialUiPickersDate, selectBlockedDates?:boolean){
        const isAnOfficeDay = !availableDaysWeek.includes(date!.toLocaleDateString("en-En", { weekday: 'narrow' }))
                    const isABlockDate = !selectBlockedDates && blockedDates.some((blockedTS) => {
                        const blockedDate = new Date(blockedTS);
                        return blockedDate.toDateString() === date!.toDateString()
                    })
                    return isAnOfficeDay || isABlockDate;
    }

    function onDateChange(date:MaterialUiPickersDate){
        setSelectedDate(date);
        onDateChangeCallback(date);
    }
    function findNextAvailableDate(){
        for(let i = 0; i < 7; i++){
            const nextAvailableDate = new Date();    
            nextAvailableDate.setDate(nextAvailableDate.getDate() + i);
            if(!isDisabledDate(nextAvailableDate)){
                return nextAvailableDate;
            }
        }
        return new Date();
    }
    useEffect(() => {
        if(autoCurrentDate){
            const nextAvailableDate = findNextAvailableDate();
            setSelectedDate(nextAvailableDate);
            onDateChangeCallback(nextAvailableDate);
            return;
        }
    }, [])

    return (
        <>
            <DatePicker value={selectedDate} onChange={onDateChange} shouldDisableDate={(date) => isDisabledDate(date, selectBlockedDates)}
                emptyLabel={translate("pages.hospital.outpatients.select_date").toString()} label={translate("pages.hospital.outpatients.select_date").toString()}
                inputVariant="outlined" format={formatDateByLocale(activeLanguage.code)} autoOk={true}
                renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                    if(isDisabledDate(day) || !isInCurrentMonth){
                        return(
                            dayComponent
                        );
                    }
                    const occupancyClass = occupancyLevel(day);
                    if(day?.getTime() === selectedDate?.getTime()){
                        dayComponent = React.cloneElement(
                            dayComponent, 
                            { className: `${classes.daySelected} ${occupancyClass}` }
                          );   
                    }
                    return(
                        <div className={classes.dayWithDotContainer}>
                            <div className={`${classes.dayWithDot} ${occupancyClass}`}/>
                            {dayComponent}
                        </div>
                    )
                }}
            />
        </>
    );
};

export default withLocalize(AppointmentDatePicker);
