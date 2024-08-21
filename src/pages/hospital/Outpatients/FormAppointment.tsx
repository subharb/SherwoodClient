import { Button, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import React, { useEffect, useMemo, useState } from 'react';
import { ButtonCancel, ButtonContinue, FieldWrapper } from '../../../components/general/mini_components';
import PatientInfo from '../../../components/PatientInfo';
import { IAgenda, IAppointment, IDepartment } from '../../../constants/types';
import AppointmentDatePicker from './DatePicker';
import { useAgendas, usePrevious, useSnackBarState } from '../../../hooks';
import Typography from '@mui/material/Typography';
import Loader from '../../../components/Loader';
import { Translate } from 'react-localize-redux';
import Grid from '@mui/joy/Grid';

import { connect, useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { isArray } from 'lodash';
import { makeAppointmentService } from '../../../services';



interface FormAppointmentGeneralProps {
    uuidPatient?: string;
    uuidInvestigation:string,
    hospital?: any,
    mode: 'make' | 'consult',
    hidePatientInfo?: boolean,
    showAllAgendas:boolean,
    viewAllAgendasOption?:boolean,
    department?: IDepartment,
    appointmentMadeCallback?: (appointment:IAppointment) => void;
    infoAppointmentReadyCallback?:(uuidAgenda:string[], date:Date) => void;
}

interface FormMakeAppointmentProps {
    uuidPatient: string;
    uuidInvestigation:string,
    department?: IDepartment,
    showAllAgendas:boolean,
    hidePatientInfo?: boolean,
    appointmentMadeCallback: (appointment:IAppointment) => void;
}

interface FormConsultAppointmentProps {
    uuidInvestigation:string,
    showAllAgendas:boolean,
    viewAllAgendasOption:boolean,
    infoAppointmentReadyCallback:(uuidAgenda:string[], date:Date) => void;
}

export const FormConsultAppointment: React.FC<FormConsultAppointmentProps> = ({ uuidInvestigation, showAllAgendas,viewAllAgendasOption, infoAppointmentReadyCallback }) => {
    
    return <FormAppointmentGeneralConnected uuidInvestigation={uuidInvestigation} mode='consult' showAllAgendas={showAllAgendas}
        viewAllAgendasOption={viewAllAgendasOption}
        infoAppointmentReadyCallback={infoAppointmentReadyCallback} />
};

export const FormMakeAppointment: React.FC<FormMakeAppointmentProps> = ({ uuidPatient, showAllAgendas, department, uuidInvestigation, hidePatientInfo, appointmentMadeCallback }) => {
    
    return <FormAppointmentGeneralConnected showAllAgendas={showAllAgendas} uuidInvestigation={uuidInvestigation} uuidPatient={uuidPatient} mode='make'
                hidePatientInfo={hidePatientInfo} department={department}
                appointmentMadeCallback={appointmentMadeCallback} />
};

const FormAppointmentGeneral: React.FC<FormAppointmentGeneralProps> = ({ uuidInvestigation, department, uuidPatient, mode, hospital, hidePatientInfo, showAllAgendas, 
                                                                            viewAllAgendasOption,
                                                                            appointmentMadeCallback, infoAppointmentReadyCallback }) => {
    const {agendas, loadingAgendas} = useAgendas();
    //const appointments =  useSelector((state:any) => state.hospital.data.appointments);
    const [appointments, setAppointments] = useState<IAppointment[] | null>(null);
    const [departmentsWithAgenda, setDepartmentsWithAgenda] = useState<IDepartment[]>([]);
    const prevAppointments:IAppointment[] | null = usePrevious(hospital.data.appointments);
    const [appointmentCreated, setAppointmentCreated] = useState<boolean | IAppointment>(false);
    const [error, setError] = useState<number>(-1);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch();

    async function makeAppointment(uuidAgenda:string, date:Date, idService:number){
        setLoading(true);
        setError(-1);
        makeAppointmentService(uuidInvestigation, uuidAgenda, uuidPatient, date, idService)
            .then((response) => {
                const tempAppointments = appointments ? [...appointments] : [];
                tempAppointments.push(response.appointment);
                setAppointments(tempAppointments);
                setAppointmentCreated(response.appointment);
                setLoading(false);
            })
            .catch((error) => { 
                setAppointmentCreated(false);
                setError(error.errorCode);
                setLoading(false);
            });
    }

    function infoAppointmentReady(uuidAgendas:string[], date:Date, idService:number){
        if(appointmentMadeCallback){
            makeAppointment(uuidAgendas[0], date, idService)
        }
        else if(infoAppointmentReadyCallback){
            infoAppointmentReadyCallback(uuidAgendas, date);
        }
    }

    useEffect(() => {
        if(agendas){
            const departmentsDict:{[uuidDepartment:string]:IDepartment} = {};
            agendas.forEach((agenda) => {
                if(agenda.department){
                    const uuidDepartment = agenda.department.uuid as string;
                    departmentsDict[uuidDepartment] = agenda.department;
                }
            });
            if(department){
                if(departmentsDict[department.uuid as string]){
                    setDepartmentsWithAgenda([department]);
                }
            }
            else{
                const departmentsWithAgenda:IDepartment[] = Object.values(departmentsDict);
                setDepartmentsWithAgenda(departmentsWithAgenda);
            }
        }
        
    }, [agendas]);

    useEffect(() => {
        
        if((!prevAppointments && isArray(appointments) && appointmentCreated && appointmentMadeCallback) || 
            (isArray(prevAppointments) && isArray(appointments) && prevAppointments.length < appointments.length && appointmentMadeCallback)){
            
            setTimeout(() => {
                appointmentMadeCallback(appointmentCreated as IAppointment);
            }, 2000);   
        }
    }, [appointments, appointmentCreated]);

    

    if(loadingAgendas || hospital.loading){
        return <Loader />
    }
    else if(agendas !== null){
        return (
            <>
                <FormAppointmentCore uuidPatient={uuidPatient} departmentsWithAgenda={departmentsWithAgenda} 
                    error={error } mode={mode} showAllAgendas={showAllAgendas} viewAllAgendasOption={Boolean(viewAllAgendasOption)}
                    loading={loading} hidePatientInfo={hidePatientInfo}
                    appointmentCreated={Boolean(appointmentCreated)}
                    agendas={agendas} infoAppointmentCallback={infoAppointmentReady} />
            </>
        );
    }
    else{
        return <Typography>There are no agendas</Typography>
    }
    
};

const mapStateToProps = (state:any) =>{
    return {
        hospital:state.hospital, 
        investigations:state.investigations
    }
}

const FormAppointmentGeneralConnected = connect(mapStateToProps, null)(FormAppointmentGeneral);

interface FormAppointmentCoreProps extends Omit<FormAppointmentGeneralProps, 'makeAppointmentAction' | 'appointmentMadeCallback' | 'uuidInvestigation' | 'hospital'> {
    departmentsWithAgenda:IDepartment[];
    agendas:IAgenda[];
    error:number;
    showAllAgendas:boolean;
    viewAllAgendasOption:boolean;
    hidePatientInfo?:boolean,
    loading:boolean;
    appointmentCreated:boolean;
    infoAppointmentCallback: (uuidAgendas: string[], date: Date, idService?: number) => void;
}

export const FormAppointmentCore: React.FC<FormAppointmentCoreProps> = ({ uuidPatient, loading, showAllAgendas, viewAllAgendasOption, departmentsWithAgenda, hidePatientInfo, agendas, mode, error,appointmentCreated, infoAppointmentCallback }) => {
    const [department, setDepartment] = useState<IDepartment | null>(null);
    const [errorState, setErrorState] = useState<{department:boolean, agenda:boolean, service:boolean, date:boolean}>({department:false, agenda:false, date:false, service:false});
    const [listAgendas, setListAgendas] = useState<IAgenda[]>([]); 
    const [showSnackbar, setShowSnackbar, handleCloseSnackbar] = useSnackBarState();
    const [agendasSelected, setAgendasSelected] = useState<IAgenda[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const [service, setService] = useState<number | null>(null);

    const agendaSelected = React.useMemo(() => {
        return agendasSelected.length > 0 ? agendasSelected[0] : null;
    }, [agendasSelected]);
    
    useEffect(() => {
        if(agendaSelected && !service && agendaSelected.listServicesInvestigation.length === 1){
            setService(agendaSelected.listServicesInvestigation[0].id);
        }
    }, [agendasSelected]);

    function renderDepartments(){
        if(departmentsWithAgenda.length === 0){
            return  null;
        }
        else if(departmentsWithAgenda.length === 1){
            return (
                <>
                    <Typography variant="body2">Department: </Typography>{departmentsWithAgenda[0].name}
                </>)
        }
        else {
            const optionsArray = departmentsWithAgenda.map((department) => {
                return <MenuItem key={department.uuid} value={department.uuid}>{department.name}</MenuItem>
            })
            return (
                <FieldWrapper noWrap ={null}>
                    <FormControl fullWidth variant="outlined" margin="dense" error={errorState.agenda} >
                        <InputLabel id="agenda">Select Department</InputLabel>
                        <Select
                            labelId="department"
                            id="department"
                            label="Select Department"
                            onChange={(event) => {
                                const uuidDepartment = event.target.value as string;
                                const department = departmentsWithAgenda.find((department) => department.uuid === uuidDepartment);
                                if(department){
                                    setDepartment(department);
                                    setAgendasSelected([])
                                }
                            }}
                        >
                        { optionsArray }
                        </Select>
                    </FormControl>
                </FieldWrapper>
            )
        }
    }

    function onDateChange(date:Date | null){
        if(date !== null){
            setDate(date);
            if(mode === 'consult'){
                const uuidsAgendas = agendasSelected ? agendasSelected.map((agenda) => agenda.uuid) : [];
                infoAppointmentCallback(uuidsAgendas, date);
            }
        }
        
    }

    function renderCalendar(){
        if((service && mode !== 'consult') || (agendaSelected && mode === 'consult')){
            return (
                <FieldWrapper noWrap ={null}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <AppointmentDatePicker availableDaysWeek = {agendaSelected!.daysWeek} blockedDates={agendaSelected! .blockedDates} autoCurrentDate={true}
                            slotsPerDay={agendaSelected!.slotsPerDay} datesOccupancy={agendaSelected!.datesOccupancy} onDateChangeCallback={onDateChange} />
                    </MuiPickersUtilsProvider>
                </FieldWrapper>
            )
        }
    }
    function renderServices(){
        if(!agendasSelected || mode === 'consult'){
            return null;
        }
        if(agendaSelected!.listServicesInvestigation.length === 0){
            return <Typography variant="body2"><Translate id="pages.hospital.outpatients.form_appointment.no-services" /></Typography>
        }
        const optionsArray = agendaSelected!.listServicesInvestigation.map((service) => {
            return (
                <MenuItem value={service.id}>{service.description}</MenuItem>
            )
        });
        
        return (
            <FieldWrapper noWrap ={null}>
                <FormControl fullWidth variant="outlined" margin="dense" error={errorState.agenda} >
                    <InputLabel id="service"><Translate id="pages.hospital.outpatients.form_appointment.service" /></InputLabel>
                    <Select disabled={department === null && departmentsWithAgenda.length > 0}
                        labelId="service"
                        id="service"
                        label="Select service"
                        onChange={(event) => {
                            const idService = event.target.value as string;
                            const service = agendaSelected!.listServicesInvestigation.find((service) => service.id === idService);
                            if(service){
                                setService(service);
                            }
                        }}
                    >
                    { optionsArray }
                    </Select>
                </FormControl>
            </FieldWrapper>
        );
    }
    function renderAgendas(){
        if(listAgendas.length === 0){
            return null;
        }
        else if(listAgendas.length === 1){
            return(
                <>
                    <Typography variant="body2"><Translate id="pages.hospital.outpatients.form_appointment.agenda" />: </Typography>{listAgendas[0].name}
                </>
            );
        }
        else{
            let optionsArray = listAgendas.map((agenda) => {
                return (
                    <MenuItem value={agenda.uuid}>{agenda.name}</MenuItem>
                )
            });
            optionsArray.unshift(<MenuItem value="all"><Translate id="pages.hospital.outpatients.form_appointment.select_all_agendas" /></MenuItem>);
            return (
                <FieldWrapper noWrap ={null}>
                    <FormControl fullWidth variant="outlined" margin="dense" error={errorState.agenda} >
                        <InputLabel id="agenda"><Translate id="pages.hospital.outpatients.form_appointment.select_agenda" /></InputLabel>
                        <Select disabled={department === null && departmentsWithAgenda.length > 0}
                            labelId="agendas"
                            id="agendas"
                            label="Select Agenda"
                            onChange={(event) => {
                                const uuidAgenda = event.target.value as string;
                                if(viewAllAgendasOption && uuidAgenda === "all"){
                                    setAgendasSelected(listAgendas);
                                }
                                const agenda = listAgendas.find((agenda) => agenda.uuid === uuidAgenda);
                                if(agenda){
                                    setAgendasSelected([agenda]);
                                }
                            }}
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
        if(department === null && departmentsWithAgenda.length > 0){
            setErrorState({...errorState, department:true});
        }
        else if(!agendaSelected){
            setErrorState({...errorState, agenda:true});
        }
        else if(!service){
            setErrorState({...errorState, service:true});
        }
        else if(!date){
            setErrorState({...errorState, date:true});
        }
        if(agendaSelected && date){
            const uuidAgendas = agendasSelected.map((agenda) => agenda.uuid)
            infoAppointmentCallback(uuidAgendas, date, service!.id);
        }
    }

    useEffect(() => {
        const errorTranslationPath = "pages.hospital.outpatients.appointment.error";
        if(error === 0){
            setShowSnackbar({show:true, message:`${errorTranslationPath}.date_time`, severity:"error"});
        }
        else if(error === 1){
            setShowSnackbar({show:true, message:`${errorTranslationPath}.full_agenda`, severity:"error"});
        }
        else if(error === 2){
            setShowSnackbar({show:true, message:`${errorTranslationPath}.date_blocked`, severity:"error"});
        }
        else if(error === 3){
            setShowSnackbar({show:true, message:`${errorTranslationPath}.week_day_not_available`, severity:"error"});
        }
        else if(appointmentCreated){
            setShowSnackbar({show:true, message:`pages.hospital.outpatients.appointment.success`, severity:"success"});            
        }
        
    }, [error, appointmentCreated]);

    useEffect(() => {
        if(listAgendas.length === 1){
            setAgendasSelected(listAgendas[0]);
        }
    }, [listAgendas])

    useEffect(() => {
        if(!showAllAgendas && department){
            const agendasFromDepartment = agendas.filter((agenda) => (agenda.department  as IDepartment).uuid === department.uuid);
            setListAgendas(agendasFromDepartment);
        }
        else{
            setListAgendas(agendas);
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

    function renderButtons(){
        if(mode === "make" && !loading && !appointmentCreated && (department && departmentsWithAgenda.length > 0) || (!department && departmentsWithAgenda.length === 0)){
            return (
                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal"  spaceright={1}>
                        <Translate id="general.cancel" />
                    </ButtonCancel>
                    &nbsp;
                    <ButtonContinue onClick={confirm} data-testid="continue-modal"  >
                        <Translate id="general.continue" />
                    </ButtonContinue>
                </Grid>
            )
        }
        else if(mode === "make" && loading){
            return (
            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                    <Loader />
            </Grid>);
        }
        
    }
    console.error("ViewallAgenas", viewAllAgendasOption);
    return (
        <>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}>
                   <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                        <Translate id={showSnackbar.message} />                            
                    </Alert>
                    
                </Snackbar>

                <Grid container spacing={1}>
                    { (uuidPatient && !hidePatientInfo) &&
                        <Grid item xs={12}>
                            <PatientInfo uuidPatient={uuidPatient} />
                        </Grid>
                    }
                    
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
                        renderServices()
                    }
                    </Grid>
                    <Grid item xs={12}>
                    {
                        renderCalendar()
                    }
                    </Grid>
                    
                    {
                        renderButtons()
                    }
                   
                </Grid>
        </>
        
    );
};