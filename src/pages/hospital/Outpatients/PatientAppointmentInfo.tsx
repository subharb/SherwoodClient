import { CircularProgress, Grid, Typography } from '@mui/material';
import { CheckCircleIcon } from '@material-ui/data-grid';
import { MonetizationOn, Remove, RemoveCircleOutline } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ButtonAdd } from '../../../components/general/mini_components';
import PatientInfo from '../../../components/PatientInfo';
import { IAppointment } from '../../../constants/types';
import { getPatientsAppoinmentsService, cancelAppointmentService, updateAppoinmentsService } from '../../../services/agenda';
import { dateAndTimeFromPostgresString, fullDateFromPostgresString, researcherFullName, stringDatePostgresToDate, turnsToSchedule } from '../../../utils/index.jsx';
import { RequestStatus } from '../Service/types';
import { FormMakeAppointment } from './FormAppointment';

interface PatientAppointmentInfoProps {
    uuidPatient: string;
    uuidInvestigation: string;
    resetModal: () => void;
    appointmentMadeCallback: () => void;
}

const PatientAppointmentInfo: React.FC<PatientAppointmentInfoProps> = ({ uuidPatient, uuidInvestigation, appointmentMadeCallback, resetModal }) => {
    const [patientsAppointments, setPatientsAppointments] = React.useState<IAppointment[]>([]);
    const [loadingPatientsAppointments, setLoadingPatientsAppointments] = React.useState<boolean>(true);

    useEffect(() => {
        setLoadingPatientsAppointments(true);
        getPatientsAppoinmentsService(uuidInvestigation, uuidPatient)
            .then(response => {
                setPatientsAppointments(response.appointments)
                
                setLoadingPatientsAppointments(false);

            })
            .catch(err => {
                let message;
                if(err.response.status === 401){
                    message = "No tiene permisos para realizar esta acción";
                }
                
                setLoadingPatientsAppointments(false);
            })
    }, []);

    function showUpPatient(idAppointment:number){
        setLoadingPatientsAppointments(true);
        const appointmentToUpdate = patientsAppointments.find(appointment => appointment.id === idAppointment);
        if(appointmentToUpdate){
            const uuidAppointment = appointmentToUpdate.uuid;
            updateAppoinmentsService(uuidInvestigation, uuidAppointment)
                .then(response => {
                    const indexAppointment = patientsAppointments.findIndex((appointment) => appointment.uuid === uuidAppointment);
                    if(indexAppointment !== -1){
                        const currentAppointment = patientsAppointments[indexAppointment];
                        currentAppointment.requestAppointment.status = response.appointment.requestAppointment.status;
                    }
                    //setShowSnackbar({show:true, message:"pages.hospital.outpatients.checkin_success", severity:"success"});
                    setLoadingPatientsAppointments(false);
                })
                .catch(err => {
                    let message = "general.error";
                    if(err.response.status === 401){
                        message = "pages.hospital.outpatients.no_permissions";
                    }
                    //setShowSnackbar({show:true, message:message, severity:"error"});
                    setLoadingPatientsAppointments(false);
                })
        }
        
    }

    function deleteAppointment(idAppointment:number){
        setLoadingPatientsAppointments(true);
        const appointmentToDelete = patientsAppointments.find(appointment => appointment.id === idAppointment);
        if(appointmentToDelete){
            cancelAppointmentService(uuidInvestigation, appointmentToDelete.uuid)
            .then(response => {
                const indexAppointment = patientsAppointments.findIndex((appointment) => appointment.uuid === appointmentToDelete.uuid);
                if(indexAppointment !== -1){
                    patientsAppointments.splice(indexAppointment, 1);
                }
                setLoadingPatientsAppointments(false);
            })
            .catch(err => {
                setLoadingPatientsAppointments(false);
            })
        }
    }

    return (
        <>
            <PatientAppointmentInfoLocalized uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} resetModal={resetModal}
                appointmentMadeCallback={appointmentMadeCallback} patientsAppointments={patientsAppointments} 
                loadingPatientsAppointments={loadingPatientsAppointments} 
                deleteAppointmentCallback={(idAppointment:number) => deleteAppointment(idAppointment)}
                showUpPatientCallback={(idAppointment:number) => showUpPatient(idAppointment)} 
                />
        </>
    );
};

export default PatientAppointmentInfo;

interface PatientAppointmentInfoCoreProps extends PatientAppointmentInfoProps, LocalizeContextProps {
    patientsAppointments:IAppointment[];
    loadingPatientsAppointments: boolean;
    deleteAppointmentCallback: (id:number) => void;
    showUpPatientCallback: (id:number) => void;
}

const PatientAppointmentInfoCore: React.FC<PatientAppointmentInfoCoreProps> = ({ uuidPatient, uuidInvestigation, activeLanguage, loadingPatientsAppointments, 
                                                                                    patientsAppointments, appointmentMadeCallback, showUpPatientCallback, deleteAppointmentCallback }) => {
    const [createAppointment, setCreateAppointment] = React.useState<boolean>(false);


    function isAppointmentDone(status:number){
        return [RequestStatus.ACCEPTED, RequestStatus.COMPLETED].includes(status);
    }
    function renderShowIcon(status:number, date:number){
        if(isAppointmentDone(status)){
            return (
                <Typography variant="body2" component="div" gutterBottom style={{height:'1px', textAlign:"center"}} >
                    <CheckCircleIcon style={{fontSize:"1.2rem", color:"green"}} /> 
                </Typography>
            )
        }
        else if(status === RequestStatus.PENDING_PAYMENT){
            return(
                <Typography variant='body2'  component="div" gutterBottom style={{textAlign:"center"}} >
                    <MonetizationOn style={{fontSize:"1.2rem", color:"red"}} />
                </Typography>
            )
        }
        else if(stringDatePostgresToDate(date) > new Date()){
            return (
                <Typography variant='body2'  component="div" gutterBottom style={{height:'1px', textAlign:"center"}} >
                    <Remove style={{fontSize:"1.2rem", color:"orange"}} />
                </Typography>
            )
        }
        else{
            return (
                <Typography variant='body2'  component="div" gutterBottom style={{height:'1px', color:"red"}} >
                    <RemoveCircleOutline style={{fontSize:"1.2rem"}} />
                </Typography>
            )
        }
    }
    function renderAppointments(){
        if(loadingPatientsAppointments){
            return (
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
            );
        }
        else{
            if(patientsAppointments.length === 0){
                return (
                    <Grid item xs={12}>
                        <p><Translate id="pages.hospital.outpatients.no_appointments_patient" /></p>
                    </Grid>
                );
            }
            else{
                const headCells = [ 
                                    { id: "department", alignment: "right", label: <Translate id="pages.hospital.outpatients.table_patient_appointments.department" /> },
                                    { id: "doctor", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.doctor`} /> },
                                    { id: "date", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.date`} /> },
                                    { id: "turn", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.turn`} /> }, 
                                    { id: "bookingDate", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.bookingDate`} /> }, 
                                    { id: "status", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.status`} /> }  
                                ];
                const rows = patientsAppointments.map((appointment:IAppointment) => {
                    return {
                        id : appointment.id,
                        department: appointment.agenda.department ? appointment.agenda.department.name : "",
                        //@ts-ignore
                        doctor : researcherFullName(appointment.agenda.principalResearcher.researcher),
                        date : fullDateFromPostgresString(activeLanguage.code, appointment.startDateTime),
                        turn : turnsToSchedule(appointment.agenda.turn),
                        bookingDate : dateAndTimeFromPostgresString(activeLanguage.code, appointment.createdAt),
                        status: renderShowIcon(appointment.requestAppointment.status, appointment.startDateTime),
                        appointmentStatus : appointment.requestAppointment.status,
                        startDateTime : appointment.startDateTime
                    }
                }).sort((a, b) => new Date(a.startDateTime) < new Date(b.startDateTime) ? 1 : -1);
                return(
                    <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} 
                            actions={[{"type" : "delete", "check" : (row:any) => {
                                return new Date(row.startDateTime) > new Date()
                            }, "func" : (id:number) => deleteAppointmentCallback(id)}, 
                            {"type" : "show_up", "check" : (row:any) => {
                                return row.appointmentStatus === RequestStatus.PENDING_APPROVAL
                            }, "func" : (id:number) => showUpPatientCallback(id)}]}
                        />
                )
            }
        }
        
    }
    if(!createAppointment){
        return (
            <Grid xs={12}>
                <Grid item xs={12}>
                    <PatientInfo uuidPatient={uuidPatient} />
                </Grid>
                <Grid item xs={12}>
                    <ButtonAdd onClick={() => setCreateAppointment(true)} />
                    {
                        renderAppointments()
                    }
                </Grid>
            </Grid>
        );
    }
    return (
        <>
            <FormMakeAppointment showAllAgendas={false} uuidPatient={uuidPatient} uuidInvestigation={uuidInvestigation} 
                appointmentMadeCallback={appointmentMadeCallback} />
        </>
    );
};

export const PatientAppointmentInfoLocalized = withLocalize(PatientAppointmentInfoCore);