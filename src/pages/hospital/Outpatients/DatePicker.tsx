import { Box, createMuiTheme } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles, styled, ThemeProvider } from '@material-ui/styles';
import { Grid, Paper } from '@mui/material';
import React from 'react';



interface AppointmentDatePickerProps {
    availableDaysWeek:string[];
    blockedDates:number[],
    slotsPerDay:number,
    datesOccupancy:{[date:string]:number}
}

const selectedDateStyle = {
    MuiPickersDay:{daySelected:{
        backgroundColor: 'green',
    }}
}

const materialTheme = createMuiTheme({
    overrides: {
       '.MuiPickersDay': {
            daySelected:{
                xborderRadius: '0%'
            }
        },
    },
});
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



const AppointmentDatePicker: React.FC<AppointmentDatePickerProps> = ({ availableDaysWeek, blockedDates, slotsPerDay, datesOccupancy }) => {
    const [selectedDate, setSelectedDate] = React.useState<MaterialUiPickersDate>(new Date());
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

    function isDisabledDate(date:MaterialUiPickersDate){
        const isAnOfficeDay = !availableDaysWeek.includes(date!.toLocaleDateString("en-En", { weekday: 'narrow' }))
                    const isABlockDate = blockedDates.some((blockedTS) => {
                        const blockedDate = new Date(blockedTS);
                        return blockedDate.toDateString() === date!.toDateString()
                    })
                    return isAnOfficeDay || isABlockDate;
    }

    return (
        <>
            <DatePicker value={selectedDate} onChange={setSelectedDate} shouldDisableDate={(date) => isDisabledDate(date)}
                renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                    if(isDisabledDate(day) || !isInCurrentMonth){
                        return dayComponent;
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

export default AppointmentDatePicker;
