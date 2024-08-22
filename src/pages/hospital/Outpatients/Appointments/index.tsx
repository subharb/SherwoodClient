import { Grid, Snackbar, Typography } from '@mui/material';
import { Alert } from "@mui/lab";
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import { useHistory } from 'react-router-dom';
import { ButtonPatient } from '../../../../components/general/BedButton';
import { ButtonCancel, ButtonContinue } from '../../../../components/general/mini_components';
import Modal from '../../../../components/general/modal';
import Loader from '../../../../components/Loader';
import { IAppointment, IPatient, OutpatientsVisualizationMode } from '../../../../constants/types';
import usePageVisibility, { SnackbarType, useSnackBarState } from '../../../../hooks';
import { HOSPITAL_PATIENT } from '../../../../routes/urls';
import { cancelAppointmentService, getAppoinmentsDateService, updateAppoinmentsService } from '../../../../services/agenda';
import { areSameDates, getPatientID, yearsFromDate } from '../../../../utils/index.jsx';
import { RequestStatus } from '../../Service/types';
import { AppointmentsDate } from './AppointmentsDate';

interface AppointmentsProps {
    uuidInvestigation: string;
    patientsPersonalData: IPatient[];
    uuidAgendas: string[];
    dateSelected: Date;
    mode:OutpatientsVisualizationMode,
    callbackAppointments?: (appointments:IAppointment[]) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ uuidInvestigation, mode, uuidAgendas, dateSelected, patientsPersonalData, callbackAppointments }) => {
    const [loadingAppointments, setLoadingAppointments] = React.useState(false);
    const [appointments, setAppointments] = React.useState<IAppointment[]>([]);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [loadingSingleAppointment, setLoadingSingleAppointment] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    function updateAppointment(uuidAppointment:string){
        setLoadingSingleAppointment(true);
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
                let message = "general.error";
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
        setLoadingAppointments(true);
        cancelAppointmentService(uuidInvestigation, uuidAppointment)
            .then(response => {
                const indexAppointment = appointments.findIndex((appointment) => appointment.uuid === uuidAppointment);
                if(indexAppointment !== -1){
                    appointments.splice(indexAppointment, 1);
                }
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.cancel_success", severity:"success"});
                setLoadingAppointments(false);
            })
            .catch(err => {
                setShowSnackbar({show:true, message:"general.error", severity:"error"});
                setLoadingAppointments(false);
            })
    }

    function getAllAgendas(){
        uuidAgendas.forEach((uuidAgenda) => {
            getAppoinmentsDate(uuidAgenda, dateSelected)
        });
    }
    useEffect(() => {
        if(uuidAgendas && dateSelected){
            getAllAgendas();
        }

    }, [uuidAgendas, dateSelected]);

    usePageVisibility(() => {
        if(uuidAgendas && dateSelected){
            getAllAgendas();
        }
    });

    async function getAppoinmentsDate(uuidAgendas:string, date:Date){
        setLoadingAppointments(true);
        getAppoinmentsDateService(uuidInvestigation, uuidAgendas, date)
            .then(response => {
                setAppointments(response.appointments);
                setLoadingAppointments(false);
                if(callbackAppointments){
                    callbackAppointments(response.appointments);
                }
                
            })
            .catch(err => {
                setLoadingAppointments(false);
            })
    }
    return (
        <AppointmentsDate loadingAppointments={loadingAppointments} appointments={appointments} 
            loadingSingleAppointment={loadingSingleAppointment} showSnackbar={showSnackbar}
            callbackResetModal={callbackResetModal} mode={mode} patientsPersonalData={patientsPersonalData}
            callbackSetSnackbar={(showSnackbar:SnackbarType) => setShowSnackbar(showSnackbar)}
            callbackCancelAppointment={(uuidAppointment) => cancelAppointment(uuidAppointment)}
            callbackUpdateAppointment={(uuidAppointment) => updateAppointment(uuidAppointment)}/>
    );
};

export default Appointments;

