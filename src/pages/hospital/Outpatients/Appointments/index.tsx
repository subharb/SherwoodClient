import React, { useEffect } from 'react';
import { IAgenda, IAppointment, IOutpatientsParams, IPatient, OutpatientsTypes, OutpatientsVisualizationMode } from '../../../../constants/types';
import usePageVisibility, { SnackbarType, useSnackBarState } from '../../../../hooks';
import { cancelAppointmentService, getAppoinmentsDateService, updateAppoinmentsService } from '../../../../services/agenda';
import { AppointmentsDate } from './AppointmentsDate';
import MultiAgenda from './MultiAgenda';
import { set } from 'lodash';

interface AppointmentsProps {
    uuidInvestigation: string;
    patientsPersonalData: IPatient[];
    uuidAgendas: string[];
    agendas:IAgenda[];
    dateSelected: Date;
    type: OutpatientsTypes;
    mode:OutpatientsVisualizationMode,
    callbackAppointments?: (appointments:IAppointment[]) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ uuidInvestigation, mode, uuidAgendas, dateSelected,agendas,
                                                    type, patientsPersonalData, callbackAppointments }) => {
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

    async function getAllAgendas(){
        
        let appointmentsNew: IAppointment[] = [];
        for(let i = 0; i < uuidAgendas.length; i++){
            const uuidAgenda = uuidAgendas[i];
            await getAppoinmentsDate(uuidAgenda, dateSelected, appointmentsNew)
        }

        setAppointments(appointmentsNew);
    }
    useEffect(() => {
        if(uuidAgendas && dateSelected){
            getAllAgendas();
        }

    }, [uuidAgendas, dateSelected]);

    // usePageVisibility(() => {
    //     if(uuidAgendas && dateSelected){
    //         getAllAgendas();
    //     }
    // });

    async function getAppoinmentsDate(uuidAgendas:string, date:Date, appointmentsExt:IAppointment[]){
        setLoadingAppointments(true);
        try {
            const response = await getAppoinmentsDateService(uuidInvestigation, uuidAgendas, date);
            appointmentsExt.push(...response.appointments); // Modify appointmentsExt directly
            if (callbackAppointments) {
                callbackAppointments(response.appointments);
            }
        } catch (err) {
            // Handle error if needed
        } finally {
            setLoadingAppointments(false);
        }
    }
    
    if(type === OutpatientsTypes.DATE_TIME){
        const filteredAgendas = agendas.filter(agenda => uuidAgendas.includes(agenda.uuid));
        const uuidPatients = appointments.map(appointment => appointment.patient.uuid);
        const filteredPatients = patientsPersonalData.filter(patient => uuidPatients.includes(patient.uuid));
        return <MultiAgenda date={dateSelected} agendas={filteredAgendas} appointments={appointments}
                patients={filteredPatients} 
                    cancelCallback={cancelAppointment} showUpCallback={updateAppointment} />
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
