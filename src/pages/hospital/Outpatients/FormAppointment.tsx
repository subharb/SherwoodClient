import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect, useState } from 'react';
import { FieldWrapper } from '../../../components/general/mini_components';
import PatientInfo from '../../../components/PatientInfo';
import { IAgenda, IDepartment } from '../../../constants/types';
import AppointmentDatePicker from './DatePicker';
import { Grid } from '@mui/material';


interface FormAppointmentProps {
    uuidPatient: string;
    departmentsWithAgenda:IDepartment[];
    agendas:IAgenda[];
}

const FormAppointment: React.FC<FormAppointmentProps> = ({ uuidPatient, departmentsWithAgenda, agendas }) => {
    return (
        <>
            <FormAppointmentCore uuidPatient={uuidPatient} departmentsWithAgenda={departmentsWithAgenda} agendas={agendas}/>
        </>
    );
};
export default FormAppointment;

export const FormAppointmentCore: React.FC<FormAppointmentProps> = ({ uuidPatient, departmentsWithAgenda, agendas }) => {
    const [department, setDepartment] = useState<IDepartment | null>(null);
    const [errorState, setErrorState] = useState<{department:boolean, agenda:boolean, date:boolean}>({department:false, agenda:false, date:false});
    const [listAgendas, setListAgendas] = useState<IAgenda[]>([]); 
    const [agenda, setAgenda] = useState<IAgenda | null>(null);
    const [date, setDate] = useState<Date>(new Date());

    function renderDepartments(){
        if(departmentsWithAgenda.length === 0){
            return null;
        }
        else{

        }
    }

    function renderCalendar(){
        if(agenda){
            return (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <AppointmentDatePicker availableDaysWeek = {agenda.daysWeek} blockedDates={agenda.blockedDates} 
                        slotsPerDay={agenda.slotsPerDay} datesOccupancy={agenda.datesOccupancy} />
                </MuiPickersUtilsProvider>
            )
        }
    }
    function renderAgendas(){
        if(listAgendas.length === 1){
            return listAgendas[0].name;
        }
        else{
            const optionsArray = listAgendas.map((agenda) => {
                return (
                    <MenuItem value={agenda.uuid}>{agenda.name}</MenuItem>
                )
            });
            return (
                <FieldWrapper noWrap ={null}>
                    <FormControl fullWidth variant="outlined" margin="dense" error={errorState.agenda} >
                        <InputLabel id="agenda">Select AGenda</InputLabel>
                        <Select
                            labelId="agendas"
                            id="agendas"
                            label="Select Agenda"
                            
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </FieldWrapper>
            );
        }
        
    }

    useEffect(() => {
        if(listAgendas.length === 1){
            setAgenda(listAgendas[0]);
        }
    }, [listAgendas])

    useEffect(() => {
        if(department){
            const agendasFromDepartment = agendas.filter((agenda) => agenda.department.uuid === department.uuid);
            setListAgendas(agendasFromDepartment);
        }
    }, [department])

    useEffect(() => {
        if(departmentsWithAgenda.length === 0){
            const agendasNoDepartment = agendas.filter((agenda) => agenda.department === null);
            setListAgendas(agendasNoDepartment);
        }
        else{
            
        }
    }, [])
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <PatientInfo uuidPatient={uuidPatient} />
            </Grid>
            <Grid item xs={12}>
            {
                renderDepartments()
            }
            </Grid>
            <Grid item xs={12}>
            {
                renderAgendas()
            }
            </Grid>
            <Grid item xs={12}>
            {
                renderCalendar()
            }
            </Grid>
        </Grid>
    );
};