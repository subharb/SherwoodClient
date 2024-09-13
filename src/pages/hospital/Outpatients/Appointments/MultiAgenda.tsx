import { useEffect, useMemo, useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IAgenda, IAppointment, IPatient, SnackbarType } from '../../../../constants/types';
import { patientFullName } from '../../../../utils';
import Modal from '../../../../components/general/modal';
import { Alert, Button, Grid, Snackbar, Typography } from '@mui/material';

import { IconGenerator } from '../../../../components/general/mini_components';
import moment from 'moment';
import { turnsAgendaDates } from '../../../../utils/agenda';
import { Translate } from 'react-localize-redux';
import { CustomEvent, eventStyleGetter } from './calendarStyles';
import { render } from '@testing-library/react';
import { RequestStatus } from '../../Service/types';
import { HOSPITAL_PATIENT } from '../../../../routes/urls';


interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    resourceId: number | number[]; // Adjust based on your resourceId type
}

export interface MultiAgendaProps {
    patients: IPatient[] // Replace 'any' with the actual type if known
    appointments: IAppointment[] // Replace 'any' with the actual type if known
    agendas: IAgenda[] // Replace 'any' with the actual type if known
    date: Date,
    lastUpdate: number,
    showSnackbar:SnackbarType,
    cancelCallback: (uuidAgenda:string) => void,
    showUpCallback: (uuidAgenda:string) => void,
    callbackSetSnackbar: (showSnackbar:SnackbarType) => void;
}

export default function MultiAgenda({ date, appointments, agendas, patients, showSnackbar, lastUpdate,
                                        callbackSetSnackbar, cancelCallback, showUpCallback }: MultiAgendaProps) {
    const [showModal, setShowModal] = useState(false);
    const [appointment, setAppointment] = useState<IAppointment | null>(null);

    const events = useMemo(() => {
        return appointments.map((appointment, index) => {
            const uuidPatient = appointment.patient.uuid;
            const patient = patients.find(pat => pat.uuid === uuidPatient);
            const patientName = patient ? patientFullName(patient?.personalData) : "Unknown";
            console.log("StartDate: ", new Date(appointment.startDateTime));
            return {
                id: appointment.id,
                title: patientName,
                reason: appointment.reasonVisit,
                notes: appointment.notes,
                type: appointment.requestAppointment.status,
                start: new Date(appointment.startDateTime),
                end: new Date(appointment.endDateTime),
                resourceId: appointment.agendaId
            }
        })
    }, [appointments, lastUpdate])
    
    const resourceMap = useMemo(() => {
        return agendas.map((agenda, index) => {
            return {
                resourceId: agenda.id,
                resourceTitle: agenda.name
            }
        })
    }, [agendas, lastUpdate])
    
    const [minHour, maxHour] = useMemo(() => {
        let minHour = 24;
        let maxHour = 0;
        agendas.forEach(agenda => {
            const [startTurn, endTurn] = turnsAgendaDates(agenda.turn);
            const startHour = startTurn.getHours();
            const endHour = endTurn.getHours();
            if(startHour < minHour){
                minHour = startHour;
            }
            if(endHour > maxHour){
                maxHour = endHour;
            }
        })
        return [minHour, maxHour];
    }, [agendas])
    
    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: date,
            views: ['day'],
        }),
        [date]
    )

    useEffect(() => {
        resetModal();
    }, [appointments.length])

    useEffect(() => {
        if (showSnackbar.show && showSnackbar.severity === "success") {
            setShowModal(false);
        }
    }, [showSnackbar.show]);

    function handleSelectEvent(event:Event) {
        console.log("Selected event: ", event);
        setShowModal(true);
        const appointment = appointments.find(app => app.id === event.id);
        setAppointment(appointment);
    }

    function cancelAppointment(){
        if(appointment){
            cancelCallback(appointment.uuid);
        }
    }

    function showUpAppointment(){
        if(appointment){
            showUpCallback(appointment.uuid);
        }
    }

    function renderModalCore(){
        switch(appointment?.requestAppointment.status){
            case RequestStatus.PENDING_APPROVAL:
                return (
                    <>
                    <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <Typography variant="body1" component="div" gutterBottom>
                                <Translate id="pages.hospital.outpatients.table_patient_appointments.modal.show_up.message" />
                            </Typography>
                        </Grid>
                    <Grid item xs={12} style={{paddingTop:'1rem'}}>
                        <Button onClick={cancelAppointment}>
                            <IconGenerator type="cancel_appointment" size="large" />
                        </Button>
                        <Button onClick={showUpAppointment}>
                            <IconGenerator type="show_up" size="large" />
                        </Button>                            
                    </Grid>
                    </>
                );
            case RequestStatus.PENDING_PAYMENT:
                return (
                    <Typography variant="body1" component="div" gutterBottom>
                        <Translate id="pages.hospital.outpatients.table_patient_appointments.modal.pending_payment.message" />
                    </Typography>
                ); 
            default:
                const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", appointment!.patient.uuid)
                console.log("Next url", nextUrl);
                //history.push(nextUrl);
                window.open(nextUrl, '_blank');
                resetModal();
        }
    
    }

    function resetModal() {
        setShowModal(false);
        setAppointment(null);
    }

    if(agendas.length === 0){
        return "No Agendas"
    }
    return (
    <>
        <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={2000}
                onClose={() => callbackSetSnackbar({ show: false })}>
                <div>
                    {
                        (showSnackbar.message && showSnackbar.severity) &&
                        <Alert onClose={() => callbackSetSnackbar({ show: false })} severity={showSnackbar.severity}>
                            <Translate id={showSnackbar.message} />
                        </Alert>
                    }
                </div>
            </Snackbar>
        <Modal open={showModal} closeModal={resetModal} 
            title={<Translate id="pages.hospital.outpatients.table_patient_appointments.modal.title" />} >
            <>
            {
                appointment !== null &&
                <Grid container>
                    {
                        renderModalCore()
                    }
                </Grid>
            }
            </>
        </Modal>
        <div className="height600">
            <Calendar
                key={defaultDate.toISOString()}
                defaultDate={defaultDate}
                defaultView={Views.DAY}
                events={events}
                localizer={momentLocalizer(moment)}
                resourceIdAccessor="resourceId"
                resources={resourceMap}
                formats={{ eventTimeRangeFormat: () => null }}
                resourceTitleAccessor="resourceTitle"
                step={60}
                timeslots={1} 
                views={views}
                onSelectEvent={handleSelectEvent}
                components={{
                    toolbar: () => null,
                    event: CustomEvent
                }}
                
                eventPropGetter={eventStyleGetter}
                style={{ height: 1000 }}
                min={new Date(2024, 8, 21, minHour, 0, 0)} // 8:00 AM
                max={new Date(2024, 8, 21, maxHour, 0, 0)} // 6:00 PM
            />
      </div>
    </>
  )
}