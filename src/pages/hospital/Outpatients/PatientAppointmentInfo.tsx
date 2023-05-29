import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { CheckCircleIcon } from '@material-ui/data-grid';
import { Remove, RemoveCircleOutline } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ButtonAdd } from '../../../components/general/mini_components';
import PatientInfo from '../../../components/PatientInfo';
import { IAppointment } from '../../../constants/types';
import { getPatientsAppoinmentsService, cancelAppointmentService } from '../../../services/agenda';
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
                loadingPatientsAppointments={loadingPatientsAppointments} deleteAppointmentCallback={(idAppointment:number) => deleteAppointment(idAppointment)} />
        </>
    );
};

export default PatientAppointmentInfo;

interface PatientAppointmentInfoCoreProps extends PatientAppointmentInfoProps, LocalizeContextProps {
    patientsAppointments:IAppointment[];
    loadingPatientsAppointments: boolean;
    deleteAppointmentCallback: (id:number) => void;
}

const PatientAppointmentInfoCore: React.FC<PatientAppointmentInfoCoreProps> = ({ uuidPatient, uuidInvestigation, activeLanguage, loadingPatientsAppointments, 
                                                                                    patientsAppointments, appointmentMadeCallback, deleteAppointmentCallback }) => {
    const [createAppointment, setCreateAppointment] = React.useState<boolean>(false);

    function renderShowIcon(status:number, date:number){
        if([RequestStatus.ACCEPTED, RequestStatus.COMPLETED].includes(status)){
            return (
                <Typography variant="body2" component="div" gutterBottom style={{height:'1px', color:"green"}} >
                    <CheckCircleIcon style={{fontSize:"1.2rem"}} /> 
                </Typography>
            )
        }
        else if(stringDatePostgresToDate(date) > new Date()){
            return (
                <Typography variant='body2'  component="div" gutterBottom style={{height:'1px', color:"orange"}} >
                    <Remove style={{fontSize:"1.2rem"}} />
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
                                    { id: "show", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.show`} /> }  
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
                        show: renderShowIcon(appointment.requestAppointment.status, appointment.startDateTime),
                        startDateTime : appointment.startDateTime
                    }
                });
                return(
                    <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} 
                            actions={[{"type" : "delete", "check" : (row:any) => {
                                return new Date(row.startDateTime) > new Date()
                            }, "func" : (id:number) => deleteAppointmentCallback(id)}]}
                            />
                )
            }
        }
        
    }
    if(!createAppointment){
        return (
            <>
            <Grid item xs={12}>
                <PatientInfo uuidPatient={uuidPatient} />
            </Grid>
            <ButtonAdd onClick={() => setCreateAppointment(true)} />
            {
                renderAppointments()
            }
            </>
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