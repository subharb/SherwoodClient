import { Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { useHistory } from 'react-router-dom';
import { ButtonPatient } from '../../../components/general/BedButton';
import { ButtonCancel, ButtonContinue } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import Loader from '../../../components/Loader';
import { IAppointment, IPatient, OutpatientsVisualizationMode } from '../../../constants/types';
import { SnackbarType, useSnackBarState } from '../../../hooks';
import { HOSPITAL_PATIENT } from '../../../routes';
import { getAppoinmentsDateService, updateAppoinmentsService } from '../../../services/agenda';
import { areSameDates, yearsFromDate } from '../../../utils';
import { RequestStatus } from '../Service/types';

interface AppointmentsProps {
    uuidInvestigation: string;
    patientsPersonalData: IPatient[];
    mode:OutpatientsVisualizationMode,
}

const Appointments: React.FC<AppointmentsProps> = ({ uuidInvestigation, mode, patientsPersonalData }) => {
    const [loadingAppointments, setLoadingAppointments] = React.useState(false);
    const [appointments, setAppointments] = React.useState<IAppointment[]>([]);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [loadingSingleAppointment, setLoadingSingleAppointment] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    function updateAppointment(uuidAppointment:string){
        updateAppoinmentsService(uuidInvestigation, uuidAppointment)
            .then(response => {
                const indexAppointment = appointments.findIndex((appointment) => appointment.uuid === uuidAppointment);
                if(indexAppointment !== -1){
                    appointments[indexAppointment] = response.appointment;
                }
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.checkin_success", severity:"success"});
                setLoadingSingleAppointment(false);
                resetModal();
            })
            .catch(err => {
                let message;
                if(err.response.status === 401){
                    message = "pages.hospital.outpatients.no_permissions";
                }
                setShowSnackbar({show:true, message:message, severity:"error"});
                setLoadingSingleAppointment(false);
            })
    }
    function resetModal(){
        setShowModal(false);
    }
    function callbackResetModal(){
        resetModal();
    }
    function cancelAppointment(uuidAppointment:string){
        
    }
    async function getAppoinmentsDate(uuidAgenda:string, date:Date){
        setLoadingAppointments(true);
        getAppoinmentsDateService(uuidInvestigation, uuidAgenda, date)
            .then(response => {
                setAppointments(response.appointments);
                setLoadingAppointments(false);
            })
            .catch(err => {
                setLoadingAppointments(false);
            })
    }
    return (
        <AppointmentsCore loadingAppointments={loadingAppointments} appointments={appointments} 
            loadingSingleAppointment={loadingSingleAppointment} showSnackbar={showSnackbar}
            callbackResetModal={callbackResetModal} mode={mode} patientsPersonalData={patientsPersonalData}
            callbackSetSnackbar={(showSnackbar:SnackbarType) => setShowSnackbar(showSnackbar)}
            callbackCancelAppointment={(uuidAppointment) => cancelAppointment(uuidAppointment)}
            callbackUpdateAppointment={(uuidAppointment) => updateAppointment(uuidAppointment)}/>
    );
};

export default Appointments;

interface AppointmentsCoreProps{
    appointments: IAppointment[],
    loadingAppointments: boolean,
    loadingSingleAppointment: boolean,
    patientsPersonalData: IPatient[];
    showSnackbar:SnackbarType,
    mode:OutpatientsVisualizationMode,
    callbackSetSnackbar: (showSnackbar:SnackbarType) => void;
    callbackUpdateAppointment: (uuidAppointment: string) => void;
    callbackCancelAppointment: (uuidAppointment: string) => void;
    callbackResetModal: () => void;
}

enum ModalAction{
    CHECKIN = "CHECKIN",
    CANCEL = "CANCEL",
    ERROR_CANCEL = "ERROR_CANCEL"

}
export const AppointmentsCore: React.FC<AppointmentsCoreProps> = ({loadingAppointments, loadingSingleAppointment, appointments, mode, showSnackbar,
                                                                patientsPersonalData, callbackUpdateAppointment, callbackSetSnackbar, callbackCancelAppointment }) => {
    const [selectedAppointment, setSelectedAppointment] = React.useState<IAppointment | null>(null);
    const [showModal, setShowModal] = React.useState<{show:boolean, action?:ModalAction}>({show:false});
    const history = useHistory();


    function resetModal(){
        setShowModal({show:false});
        setSelectedAppointment(null);
    }

    function confirm(){
        if(selectedAppointment && showModal.action === ModalAction.CHECKIN){
            callbackUpdateAppointment(selectedAppointment.uuid);
        }
        if(selectedAppointment && showModal.action === ModalAction.CANCEL){
            callbackCancelAppointment(selectedAppointment.uuid);
        }
    }

    function renderModal(){
        if(selectedAppointment){
            const patient  = patientsPersonalData.find((pat:IPatient) => pat.uuid === selectedAppointment.patient.uuid);
            if(patient){
                return (
                    <Modal key="modal" open={showModal.show} 
                            title={<Translate id={`pages.hospital.outpatients.confirm.${showModal.action}`} />}
                            closeModal={resetModal} >
                                <Grid container>
                                {
                                    (selectedAppointment && showModal.action !== ModalAction.ERROR_CANCEL) &&
                                    
                                        <Grid item xs={12}>
                                            {
                                                patient.personalData.health_id &&
                                                [
                                                    <Translate id="investigation.create.personal_data.fields.health_id" />, ":", patient.personalData.health_id
                                                ]
                                            }
                                            {
                                                !patient.personalData.health_id && 
                                                <Typography variant="body2" >
                                                    <Translate id="investigation.create.personal_data.fields.uuid" />:{ selectedAppointment.patient?.id}
                                                </Typography>
                                            }
                                            <Typography variant="body2">
                                                <Translate id="investigation.create.personal_data.fields.name" />: {patient.personalData.name}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Translate id="investigation.create.personal_data.fields.surnames" />: {patient.personalData.surnames}    
                                            </Typography>
                                            <Typography variant="body2">
                                                <Translate id="investigation.create.personal_data.fields.sex" />: {patient.personalData.sex === "Male" ? <Translate id="general.male" /> : <Translate id="general.female" />}    
                                            </Typography>
                                            <Typography variant="body2">
                                                <Translate id="investigation.create.personal_data.fields.birthdate" />: {patient.personalData.birthdate.toLocaleDateString()}    
                                            </Typography>
                                            {
                                                showModal.action === ModalAction.CANCEL &&
                                                <Typography variant="body2">
                                                    <Translate id="pages.hospital.outpatients.appointment.date" />: {new Date(selectedAppointment.startDateTime).toLocaleDateString()}
                                                </Typography>
                                            }
                                        
                                        
                                        {
                                            !loadingSingleAppointment &&
                                            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                                <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                                    <Translate id="general.cancel" />
                                                </ButtonCancel>
                                                <ButtonContinue onClick={confirm} data-testid="continue-modal" color="primary">
                                                    <Translate id="general.continue" />
                                                </ButtonContinue>
                                            </Grid>
                                        }
                                        {
                                            loadingSingleAppointment &&
                                            <Loader />
                                        }
                                        </Grid>
                                }
                                {
                                    (selectedAppointment && showModal.action === ModalAction.ERROR_CANCEL) &&
                                    <Typography variant="body2">
                                            <Translate id="pages.hospital.outpatients.error_cancel" />
                                    </Typography>
                                }
                                </Grid>
                                        
                        </Modal>
                )
            }
        }
        
    }
    function  clickOnAppointment(idAppointment:number){
        console.log("clickOnAppoitment", idAppointment); 
        const currentAppointment = appointments.find((app) => app.id === idAppointment);
        if(currentAppointment){
            if(mode === OutpatientsVisualizationMode.CONSULT){
                if(currentAppointment.requestAppointment.status === RequestStatus.PENDING_APPROVAL 
                    && areSameDates(new Date(currentAppointment.startDateTime), new Date())){
                        
                    setSelectedAppointment(currentAppointment);
                    setShowModal({show:true, action:ModalAction.CHECKIN});
                    console.log("Confirmamos si se quiere hacer checkin");
                }
                else{
                    const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", currentAppointment.patient.uuid)
                    console.log("Next url", nextUrl);
                    history.push(nextUrl);
                    console.log("Cita NO aceptada, navegamos a la historia clinica del paciente");    
                }
                
            }
            else if(mode === OutpatientsVisualizationMode.ADMIN){
                if(currentAppointment.requestAppointment.status === RequestStatus.PENDING_APPROVAL){
                    setSelectedAppointment(currentAppointment);
                    setShowModal({show:true, action:ModalAction.CANCEL});
                    console.log("Preguntamos si quiere cancelar la cita");
                }
                else{
                    setSelectedAppointment(currentAppointment);
                    setShowModal({show:true, action:ModalAction.ERROR_CANCEL});
                    console.log("No se puede cancelar una cita ya aceptada");
                }
                
            }
            
           
        }
    }

    if(loadingAppointments){
        return <Loader />
    }
    if(appointments.length === 0){
        return(
        <Typography variant="h6" component="h6" align="left">
            <Translate id="pages.hospital.outpatients.no_appointments" />
        </Typography>)
    }
    const appointmentsConfirmed = appointments.filter((appointment) => [RequestStatus.ACCEPTED, RequestStatus.COMPLETED].includes(appointment.requestAppointment.status) );
    appointmentsConfirmed.sort((appA, appB) => appA.order - appB.order);
    let appointmentsComponent:JSX.Element[] = [];
    
    if(appointmentsConfirmed.length > 0){
        appointmentsComponent = [<>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6" align="left"><Translate id="pages.hospital.outpatients.checked_in_patients" /></Typography>
            </Grid>
            <Grid container item xs={12}>
            {
                appointmentsConfirmed.map((appointment, index) => {
                    const patient = patientsPersonalData.find((pat:IPatient) => pat.uuid === appointment.patient.uuid);
                    if(patient){
                        const patientAge = yearsFromDate(patient.personalData.birthdate); 
                        return (
                            <ButtonPatient patient={patient.personalData} 
                                onSelectPatient={() => clickOnAppointment(appointment.id)}
                                moneyIcon={false}
                                age={patientAge} showPersonalData={true} active={true} checkMark={appointment.requestAppointment.status === RequestStatus.COMPLETED}
                                gender={patient.personalData.sex} />
                        ) 
                    }
                })
            }
        </Grid>
        </>
        ]
    }
    const appointmentsPending = appointments.filter((appointment) => [RequestStatus.PENDING_APPROVAL, RequestStatus.PENDING_PAYMENT].includes(appointment.requestAppointment.status) );
    if(appointmentsPending.length > 0){
        appointmentsComponent.push( 
            <>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6" align="left"><Translate id="pages.hospital.outpatients.not_confirmed_patients" /></Typography>
            </Grid>
            <Grid container item xs={12}>
                {
                    appointmentsPending.map((appointment, index) => {
                        const patient = patientsPersonalData.find((pat:IPatient) => pat.uuid === appointment.patient.uuid);
                        if(patient){
                            const patientAge = yearsFromDate(patient.personalData.birthdate); 
                            return (
                                <ButtonPatient patient={patient.personalData} 
                                    onSelectPatient={() =>  clickOnAppointment(appointment.id)} checkMark={false} showPersonalData={true}
                                    moneyIcon={appointment.requestAppointment.status === RequestStatus.PENDING_PAYMENT}
                                    age={patientAge}  active={appointment.requestAppointment.status === RequestStatus.ACCEPTED} 
                                    gender={patient.personalData.sex} />
                            ) 
                        }
                    })
                }
            </Grid>
            </>)
    }
    return(
        <>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={2000}
                onClose={() => callbackSetSnackbar({show:false})}>
                    <div>
                        {
                            (showSnackbar.message && showSnackbar.severity) &&
                            <Alert onClose={() => callbackSetSnackbar({show:false})} severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                </div>
            </Snackbar>
            {renderModal()}
            <Grid container spacing={2}>
                {appointmentsComponent}
            </Grid>
        </>
        
    ); 
}