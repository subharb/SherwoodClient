import { CircularProgress, Grid, Typography } from '@mui/material';
import { CheckCircleIcon } from '@material-ui/data-grid';
import { MonetizationOn, Remove, RemoveCircleOutline } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { ButtonAdd, ButtonCancel, ButtonContinue } from '../../../components/general/mini_components';
import PatientInfo from '../../../components/PatientInfo';
import { IAppointment, IOutpatientsParams } from '../../../constants/types';
import { getPatientsAppoinmentsService, cancelAppointmentService, updateAppoinmentsService } from '../../../services/agenda';
import { dateAndTimeFromPostgresString, fullDateFromPostgresString, researcherFullName, stringDatePostgresToDate, timeFromPostgresString, turnsToSchedule } from '../../../utils/index.jsx';
import { RequestStatus } from '../Service/types';
import { FormMakeAppointment } from './FormAppointment';
import Modal from '../../../components/general/modal';
import { func } from 'prop-types';
import { canCancelAppointment, canShowUpAppointment, isAppointmentDone } from '../../../utils/agenda';
import EventIcon from '@mui/icons-material/Event';

interface PatientAppointmentInfoProps {
    uuidPatient: string;
    uuidInvestigation: string;
    outpatientsInfo: IOutpatientsParams;
    resetModal: () => void;
    appointmentMadeCallback: () => void;
}

const PatientAppointmentInfo: React.FC<PatientAppointmentInfoProps> = ({ uuidPatient, uuidInvestigation, outpatientsInfo, appointmentMadeCallback, resetModal }) => {
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

    function cancelAppointment(idAppointment:number){
        setLoadingPatientsAppointments(true);
        const appointmentToDelete = patientsAppointments.find(appointment => appointment.id === idAppointment);
        if(appointmentToDelete){
            cancelAppointmentService(uuidInvestigation, appointmentToDelete.uuid)
            .then(response => {
                const indexAppointment = patientsAppointments.findIndex((appointment) => appointment.uuid === appointmentToDelete.uuid);
                if(indexAppointment !== -1){
                    patientsAppointments[indexAppointment].requestAppointment.status = RequestStatus.CANCELED;
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
                outpatientsInfo={outpatientsInfo}
                cancelAppointmentCallback={(idAppointment:number) => cancelAppointment(idAppointment)}
                showUpPatientCallback={(idAppointment:number) => showUpPatient(idAppointment)} 
                />
        </>
    );
};

export default PatientAppointmentInfo;

interface PatientAppointmentInfoCoreProps extends PatientAppointmentInfoProps, LocalizeContextProps {
    patientsAppointments:IAppointment[];
    outpatientsInfo: OutpatientsInfo;
    loadingPatientsAppointments: boolean;
    cancelAppointmentCallback: (id:number) => void;
    showUpPatientCallback: (id:number) => void;
}

const PatientAppointmentInfoCore: React.FC<PatientAppointmentInfoCoreProps> = ({ uuidPatient, uuidInvestigation, activeLanguage, loadingPatientsAppointments, 
                                                                                    outpatientsInfo,
                                                                                    patientsAppointments, appointmentMadeCallback, showUpPatientCallback, cancelAppointmentCallback }) => {
    const [createAppointment, setCreateAppointment] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showupAppointmentId, setShowupAppointmentId] = React.useState<number>(0);
    const [cancelAppointmentId, setCancelAppointmentId] = React.useState<number>(0);

   
    function renderShowIcon(status:number, date:number){
        if(isAppointmentDone(status)){
            return (
                <Typography variant='body2'  component="div" style={{textAlign:"center"}} >
                    <CheckCircleIcon style={{fontSize:"1.2rem", color:"green"}} /> 
                </Typography>
            )
        }
        else if(status === RequestStatus.PENDING_PAYMENT){
            return(
                <Typography variant='body2'  component="div" style={{textAlign:"center"}} >
                    <MonetizationOn style={{fontSize:"1.2rem", color:"red"}} />
                </Typography>
            )
        }
        else if(status === RequestStatus.PENDING_APPROVAL && stringDatePostgresToDate(date) > new Date()){//Is an appointment that is pending to be approved, meaning the user didnt show up
            return (
                <Typography variant='body2'  component="div" style={{textAlign:"center"}} >
                <EventIcon style={{fontSize:"1.5rem", color:"DodgerBlue", textAlign:"center"}} />
                </Typography>
            )
        }
        else{
            return (
                <Typography variant='body2'  component="div" style={{textAlign:"center"}} >
                    <RemoveCircleOutline style={{fontSize:"1.2rem", color:"red"}} />
                </Typography>
            )
        }
    }

    function resetModal(){
        setShowModal(false);
        setShowupAppointmentId(0);
        setCancelAppointmentId(0);
    }

    function showModalShowUp(idAppointment:number){
        setShowupAppointmentId(idAppointment);
        setShowModal(true);
    }

    function showModalCancel(idAppointment:number){
        setCancelAppointmentId(idAppointment);
        setShowModal(true);
    }

    function confirmShowUpPatient(){
        resetModal();
        showUpPatientCallback(showupAppointmentId);
    }

    function confirmCancelAppointment(){
        resetModal();
        cancelAppointmentCallback(cancelAppointmentId);
    }

    function renderModal(){
        return (
            <Modal open={showModal} onClose={resetModal} 
                title={<Translate id="pages.hospital.outpatients.table_patient_appointments.modal.title" />} >
                <>
                {
                    showupAppointmentId !== 0 &&
                    <Grid container>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <Typography variant="body1" component="div" gutterBottom>
                                <Translate id="pages.hospital.outpatients.table_patient_appointments.modal.show_up.message" />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <ButtonCancel onClick={ resetModal } data-testid="cancel-modal"  spaceright={1}>
                                <Translate id="general.cancel" />
                            </ButtonCancel>
                            &nbsp;
                            <ButtonContinue onClick={ confirmShowUpPatient } data-testid="continue-modal" >
                                <Translate id="general.continue" />
                            </ButtonContinue>
                        </Grid>
                    </Grid>
                }
                {
                    cancelAppointmentId !== 0 &&
                    <Grid container>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <Typography variant="body1" component="div" gutterBottom>
                                <Translate id="pages.hospital.outpatients.table_patient_appointments.modal.cancel.message" />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <ButtonCancel onClick={resetModal} data-testid="cancel-modal" spaceright={1}>
                                <Translate id="general.cancel" />
                            </ButtonCancel>
                            &nbsp;
                            <ButtonContinue onClick={ confirmCancelAppointment } data-testid="continue-modal" >
                                <Translate id="general.continue" />
                            </ButtonContinue>
                        </Grid>
                    </Grid>
                }
                </>
            </Modal>
        )
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
                                    
                                    { id: "bookingDate", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.bookingDate`} /> }, 
                                    { id: "status", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.status`} /> }  
                                ];
                if(outpatientsInfo.type === "date_time"){
                    headCells.splice(2, 0, { id: "time", alignment: "right", label: <Translate id={`pages.hospital.outpatients.table_patient_appointments.time`} /> });
                }
                const rows = patientsAppointments.map((appointment:IAppointment) => {
                    return {
                        id : appointment.id,
                        department: appointment.agenda.department ? appointment.agenda.department.name : "",
                        //@ts-ignore
                        doctor : researcherFullName(appointment.agenda.principalResearcher.researcher),
                        date : fullDateFromPostgresString(activeLanguage.code, appointment.startDateTime),
                        time : timeFromPostgresString( "es", appointment.startDateTime), 
                        bookingDate : dateAndTimeFromPostgresString(activeLanguage.code, appointment.createdAt),
                        status: renderShowIcon(appointment.requestAppointment.status, appointment.startDateTime),
                        appointmentStatus : appointment.requestAppointment.status,
                        startDateTime : appointment.startDateTime
                    }
                }).sort((a, b) => new Date(a.startDateTime) < new Date(b.startDateTime) ? 1 : -1);
                return(
                    <EnhancedTable noHeader noSelectable={true} rows={rows} headCells={headCells} 
                            actions={[{"type" : "cancel_appointment", "check" : (row:any) => {
                                console.log("Date appointment ", new Date(row.startDateTime))
                                return canCancelAppointment(new Date(row.startDateTime), row.appointmentStatus, outpatientsInfo)
                            }, "func" : (id:number) => showModalCancel(id)}, 
                            {"type" : "show_up", "check" : (row:any) => {
                                return canShowUpAppointment(new Date(row.startDateTime), row.appointmentStatus, outpatientsInfo)
                            }, "func" : (id:number) => showModalShowUp(id)}]}
                        />
                )
            }
        }
        
    }
    if(!createAppointment){
        return (
            <Grid xs={12}>
               {
                renderModal()
               }
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
                appointmentMadeCallback={appointmentMadeCallback} dateTimeAppointment={outpatientsInfo.type === "date_time"} />
        </>
    );
};

export const PatientAppointmentInfoLocalized = withLocalize(PatientAppointmentInfoCore);