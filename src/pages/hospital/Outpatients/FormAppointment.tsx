import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect, useState } from 'react';
import { ButtonCancel, ButtonContinue, FieldWrapper } from '../../../components/general/mini_components';
import PatientInfo from '../../../components/PatientInfo';
import { IAgenda, IDepartment } from '../../../constants/types';
import AppointmentDatePicker from './DatePicker';
import { Grid, Typography } from '@mui/material';
import { useAgendas } from '../../../hooks';
import Loader from '../../../components/Loader';
import { Translate } from 'react-localize-redux';


interface FormAppointmentProps {
    uuidPatient: string;
    makeAppointmentAction:boolean
}

const FormAppointment: React.FC<FormAppointmentProps> = ({ uuidPatient, makeAppointmentAction }) => {
    const {agendas, loadingAgendas} = useAgendas();
    const [departmentsWithAgenda, setDepartmentsWithAgenda] = useState<IDepartment[]>([]);

    useEffect(() => {
        if(makeAppointmentAction){

        }
    }, [makeAppointmentAction])
    useEffect(() => {
        if(agendas){
            const departmentsWithAgenda = agendas.filter((agenda) => agenda.department !== null).map((agenda) => agenda.department);
            setDepartmentsWithAgenda(departmentsWithAgenda);
        }
        
    }, [agendas]);

    if(loadingAgendas){
        return <Loader />
    }
    else if(agendas !== null){
        return (
            <>
                <FormAppointmentCore uuidPatient={uuidPatient} departmentsWithAgenda={departmentsWithAgenda} agendas={agendas}/>
            </>
        );
    }
    else{
        return <Typography>There are no agendas</Typography>
    }
    
};
export default FormAppointment;

interface FormAppointmentCoreProps extends Omit<FormAppointmentProps, 'makeAppointmentAction'> {
    departmentsWithAgenda:IDepartment[];
    agendas:IAgenda[];
}

export const FormAppointmentCore: React.FC<FormAppointmentCoreProps> = ({ uuidPatient, departmentsWithAgenda, agendas }) => {
    const [department, setDepartment] = useState<IDepartment | null>(null);
    const [errorState, setErrorState] = useState<{department:boolean, agenda:boolean, date:boolean}>({department:false, agenda:false, date:false});
    const [listAgendas, setListAgendas] = useState<IAgenda[]>([]); 
    const [agenda, setAgenda] = useState<IAgenda | null>(null);
    const [date, setDate] = useState<Date>(new Date());

    function renderDepartments(){
        if(departmentsWithAgenda.length === 0){
            return null;
        }
        else if(departmentsWithAgenda.length === 1){
            return (
                <>
                    <Typography variant="h6">Department: </Typography>{departmentsWithAgenda[0].name}
                </>)
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
            return(
                <>
                    <Typography variant="h6">Agenda: </Typography>{listAgendas[0].name}
                </>
            );
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

    function resetModal(){

    }

    function confirm(){
        
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
        if(departmentsWithAgenda.length === 1){
            setDepartment(departmentsWithAgenda[0]);
        }
    }, [departmentsWithAgenda])

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
            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                    <Translate id="general.cancel" />
                </ButtonCancel>
                <ButtonContinue onClick={confirm} data-testid="continue-modal" color="primary">
                    <Translate id="general.continue" />
                </ButtonContinue>
            </Grid>
        </Grid>
    );
};