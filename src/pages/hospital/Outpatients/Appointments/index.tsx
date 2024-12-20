import React, { useEffect } from 'react';
import { IAgenda, IAppointment, IOutpatientsParams, IPatient, OutpatientsTypes, OutpatientsVisualizationMode } from '../../../../constants/types';
import usePageVisibility, { SnackbarType, useSnackBarState } from '../../../../hooks';
import { cancelAppointmentService, getAppoinmentsDateService, updateAppoinmentsService } from '../../../../services/agenda';
import { AppointmentsDate } from './AppointmentsDate';
import MultiAgenda from './MultiAgenda';
import { set } from 'lodash';
import { errorCodesCreateAppointment } from '../../../../utils/agenda';
import { RequestStatus } from '../../Service/types';
import { fetchPatientsAction } from '../../../../redux/actions/patientsActions';
import { useDispatch } from 'react-redux';

interface AppointmentsProps {
    uuidInvestigation: string;
    patientsPersonalData: IPatient[];
    uuidAgendas: string[];
    extraForm?: number;
    agendas:IAgenda[];
    dateSelected: Date;
    canCreateAppointments: boolean;
    type: OutpatientsTypes;
    mode:OutpatientsVisualizationMode,
    callbackAppointments?: (appointments:IAppointment[]) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ uuidInvestigation, mode, uuidAgendas, dateSelected,agendas, canCreateAppointments,
                                                    type, patientsPersonalData, extraForm, callbackAppointments }) => {
    const [loadingAppointments, setLoadingAppointments] = React.useState(false);
    const [appointments, setAppointments] = React.useState<IAppointment[]>([]);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [loadingSingleAppointment, setLoadingSingleAppointment] = React.useState(false);
    const [lastUpdate, setLastUpdate] = React.useState(new Date());
    const [showModal, setShowModal] = React.useState(false);
    const dispatch = useDispatch();

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
                setLastUpdate(new Date());
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
    function cancelAppointment(uuidAppointment:string, byUser:boolean = false){
        setLoadingAppointments(true);
        cancelAppointmentService(uuidInvestigation, uuidAppointment, byUser)
            .then(response => {
                const indexAppointment = appointments.findIndex((appointment) => appointment.uuid === uuidAppointment);
                if(!byUser){
                    appointments.splice(indexAppointment, 1);
                }
                else{
                    appointments[indexAppointment].requestAppointment.status = RequestStatus.CANCELED_BY_USER;
                }
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.cancel_success", severity:"success"});
                setLoadingAppointments(false);
                setLastUpdate(new Date());
            })
            .catch(err => {
                setShowSnackbar({show:true, message:"general.error", severity:"error"});
                setLoadingAppointments(false);
                setLastUpdate(new Date());
            })
    }

    function appointmentCreatedCallback(appointment:IAppointment){
        setAppointments([...appointments, appointment]);
        setShowSnackbar({show:true, message:"pages.hospital.outpatients.calendar.new_appointment.success", severity:"success"});
        setLastUpdate(new Date());
    }

    function appointmentErrorCallback(error:any){
        if(error.errorCode){
            setShowSnackbar({show:true, message:errorCodesCreateAppointment(error.errorCode), severity:"error"});    
        }
    }

    async function getAllAgendas(){
        
        let appointmentsNew: IAppointment[] = [];
        for(let i = 0; i < uuidAgendas.length; i++){
            const uuidAgenda = uuidAgendas[i];
            await getAppoinmentsDate(uuidAgenda, dateSelected, appointmentsNew)
        }
        setLastUpdate(new Date());
        setAppointments(appointmentsNew);
    }
    useEffect(() => {
        if(uuidAgendas && dateSelected){
            getAllAgendas();
        }

    }, [uuidAgendas, dateSelected]);

    usePageVisibility(() => {
        
    });

    usePageVisibility(() => {
        const fetchData = async () => {
          try {
            await dispatch(fetchPatientsAction(uuidInvestigation, true));
          } catch (error) {
            console.error('Error fetching patients:', error);
          }
        };
        
        if(uuidAgendas && dateSelected){
            getAllAgendas();
        }
        
        fetchData();
      });

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
        return <MultiAgenda key={`${dateSelected.getUTCMilliseconds()}-${appointments.length}`} date={dateSelected} agendas={filteredAgendas} appointments={appointments}
                    patients={filteredPatients} showSnackbar={showSnackbar} lastUpdate={lastUpdate.getTime()}
                    uuidInvestigation={uuidInvestigation}
                    extraForm={extraForm} appointmentCreatedCallback={appointmentCreatedCallback}
                    appointmentErrorCallback={appointmentErrorCallback} canCreateAppointments={canCreateAppointments}
                    callbackSetSnackbar={(showSnackbar:SnackbarType) => setShowSnackbar(showSnackbar)}
                    cancelCallback={cancelAppointment} showUpCallback={updateAppointment} />
    }
    return (
        <AppointmentsDate loadingAppointments={loadingAppointments} appointments={appointments} 
            loadingSingleAppointment={loadingSingleAppointment} showSnackbar={showSnackbar}
            callbackResetModal={callbackResetModal} mode={mode} patientsPersonalData={patientsPersonalData}
            callbackSetSnackbar={(showSnackbar:SnackbarType) => setShowSnackbar(showSnackbar)}
            callbackCancelAppointment={(uuidAppointment) => cancelAppointment(uuidAppointment)}
            callbackUpdateAppointment={(uuidAppointment) => updateAppointment(uuidAppointment)}
            />
    );
};

export default Appointments;
