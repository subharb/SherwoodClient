import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles, styled, ThemeProvider, Theme } from '@mui/styles';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { formatDateByLocale } from '../../../utils/index.jsx';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

declare module '@mui/styles/defaultTheme' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme { }
}

interface AppointmentDatePickerProps extends LocalizeContextProps {
    availableDaysWeek: string[];
    blockedDates: number[],
    slotsPerDay: number,
    autoCurrentDate?: boolean,
    selectBlockedDates?: boolean,
    onDateChangeCallback: (date: Dayjs) => void;
    datesOccupancy: { [date: string]: number }
}


const useStyles = makeStyles((theme) => ({
    dayPicker: {
        color: "#000000de",
        backgroundColor: "transparent",
        //backgroundColor: theme.palette.primary.main,
        fontWeight: 500,
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        tapHighlightColor: 'transparent',
        outline: 0,
        border: 0,
        padding: 0,
        cursor: 'pointer',
        userSelect: 'none',
        verticalAlign: 'middle',
        textDecoration: 'none',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        margin: '0 2px',
    },
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
    freeDay: {
        borderColor: 'green',
        backgroundColor: "green",
        "&:hover": {
            backgroundColor: "green",
        }
    },
    halfBusyDay: {
        borderColor: 'orange',
        backgroundColor: "orange",
        "&:hover": {
            backgroundColor: "orange",
        }
    },
    veryBusyDay: {
        borderColor: 'red',
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "red",
        }
    },
    fullDay: {
        borderColor: 'black',
        backgroundColor: "black",
        "&:hover": {
            backgroundColor: "black",
        }
    },
    daySelected: {
        color: "#ffffff",
        fontWeight: 500,
        width: '36px',
        height: '36px',
    },
    dayDisabled: {
        color: "grey",
        cursor: 'not-allowed',
    }
}))



const AppointmentDatePicker: React.FC<AppointmentDatePickerProps> = ({ availableDaysWeek, autoCurrentDate, blockedDates,
    slotsPerDay, activeLanguage, datesOccupancy,
    selectBlockedDates, onDateChangeCallback, translate }) => {
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
    const classes = useStyles();

    function occupancyLevel(date: MaterialUiPickersDate) {
        const dateString = date!.toISOString().split('T')[0]
        if (datesOccupancy.hasOwnProperty(dateString)) {
            if (slotsPerDay === datesOccupancy[dateString]) {
                return classes.fullDay;
            }
            else {
                const percent = datesOccupancy[dateString] / slotsPerDay;
                return percent < 0.3 ? classes.freeDay : percent < 0.6 ? classes.halfBusyDay : classes.veryBusyDay;
            }
        }
        else {
            return classes.freeDay;
        }
    }

    function isDisabledDate(date: MaterialUiPickersDate, selectBlockedDates?: boolean) {
        const isAnOfficeDay = !availableDaysWeek.includes(date!.toLocaleDateString("en-En", { weekday: 'short' }))
        const isABlockDate = !selectBlockedDates && blockedDates.some((blockedTS) => {
            const blockedDate = new Date(blockedTS);
            return blockedDate.toDateString() === date!.toDateString()
        })
        return isAnOfficeDay || isABlockDate;
    }

    function onDateChange(date: Dayjs | null) {
        console.log("Date selected: ", date?.format("DD/MM/YYYY"));
        if(date){
            console.log("Date selected: ", date.format("DD/MM/YYYY"));
            setSelectedDate(date);
            onDateChangeCallback(date);
        }
    }
    function findNextAvailableDate() {
        for (let i = 0; i < 60; i++) {
            const nextAvailableDate = dayjs();
            nextAvailableDate.set('date', nextAvailableDate.get('date') + i); //(nextAvailableDate.getDate() + i);

            // const nextAvailableDate = new Date();    
            // nextAvailableDate.setDate(nextAvailableDate.getDate() + i);
            if (!isDisabledDate(nextAvailableDate.toDate())) {
                return nextAvailableDate;
            }
        }
        return new Date();
    }
    useEffect(() => {
        if (autoCurrentDate) {
            const nextAvailableDate = findNextAvailableDate();
            setSelectedDate(dayjs(nextAvailableDate.valueOf()));
            onDateChangeCallback(dayjs(nextAvailableDate.valueOf()));
            return;
        }
    }, [])

    const CustomDay = (props: typeof PickersDay) => {
        const { day, today, outsideCurrentMonth,  } = props;
        const selected = day.toDate().getTime() === selectedDate?.toDate().getTime();
        
        const occupancyClass = occupancyLevel(day);
        let classesString = classes.dayPicker;
        classesString = selected ? classesString + " "+classes.daySelected+" "+occupancyClass : classesString;
        classesString = today ? classesString + " MuiPickersDay-today" : classesString;
        const handleDayClick = (date: Dayjs) => {
            setSelectedDate(date); // Update the selected date in state or perform any other logic
        };

        if(isDisabledDate(day.toDate()) || outsideCurrentMonth){
            return (
                <button className={`${classes.dayPicker} ${classes.dayDisabled}`} type="button">
                    { day.format('DD') }
                </button>
            );
        }
        return (
            <button className={classesString} onClick={() => handleDayClick(day)} type="button">
                { day.format('DD') }
                <div className={`${classes.dayWithDot} ${occupancyClass}`}/>
            </button>
        );        
    }
    return (
        <>
            <MobileDatePicker onClose={onDateChange} autoOk={true}
            slots={{
                day: CustomDay,
                //actionBar: () => ['cancel', 'accept'],
            }}
                slotProps={{
                    day: {
                        day: false,
                        selected: false,
                        onAccept: (date: Dayjs) => onDateChange(date), 
                    },
                }}
                value={selectedDate} label={translate("pages.hospital.outpatients.select_date").toString()} shouldDisableDate={(date) => isDisabledDate(date.toDate(), selectBlockedDates)}
                format={formatDateByLocale(activeLanguage.code)}
            />
            {/* <DatePicker value={selectedDate} onChange={onDateChange} shouldDisableDate={(date) => isDisabledDate(date, selectBlockedDates)}
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
            /> */}
        </>
    );
};

export default withLocalize(AppointmentDatePicker);
