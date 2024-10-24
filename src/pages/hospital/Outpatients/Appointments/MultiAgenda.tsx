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
import NewAppointment from './NewAppointment';
import { FormMakeAppointment } from '../FormAppointment';
import { fetchPatient } from '../../../../db';


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
    extraForm? : number,
    canCreateAppointments: boolean,
    uuidInvestigation: string,
    cancelCallback: (uuidAgenda:string) => void,
    showUpCallback: (uuidAgenda:string) => void,
    callbackSetSnackbar: (showSnackbar:SnackbarType) => void;
    appointmentCreatedCallback: (appointment:IAppointment) => void;
    appointmentErrorCallback: (error:any) => void;
}

export default function MultiAgenda({ date, appointments, agendas, patients, showSnackbar, uuidInvestigation, lastUpdate, extraForm, canCreateAppointments,
                                        callbackSetSnackbar, appointmentCreatedCallback, appointmentErrorCallback, cancelCallback, showUpCallback }: MultiAgendaProps) {
    const [showModal, setShowModal] = useState(false);
    const [appointment, setAppointment] = useState<IAppointment | null>(null);
    const [newAppointment, setNewAppointment] = useState<IAppointment | null>(null);
    const [showNewAppointment, setShowNewAppointment] = useState(false);
    const [fetchedPatient, setFetchedPatient] = useState<IPatient | null>(null);

    const events = useMemo(() => {
        return appointments.map((appointment, index) => {
            const uuidPatient = appointment.patient.uuid;
            const patient = patients.find(pat => pat.uuid === uuidPatient);
            const patientName = patient ? patientFullName(patient?.personalData) : "Unknown";
            const startDateTime = new Date(appointment.startDateTime);
            const twoHoursAgo = new Date(new Date().getTime() - 2 * 60 * 60 * 1000);
            const appointmentStatus = (appointment.requestAppointment.status === RequestStatus.PENDING_APPROVAL) && startDateTime < twoHoursAgo ? RequestStatus.EXPIRED : appointment.requestAppointment.status;
            console.log("StartDate: ", startDateTime);
            return {
                id: appointment.id,
                title: patientName,
                reason: appointment.reasonVisit,
                notes: appointment.notes,
                type: appointmentStatus,
                start: startDateTime,
                end: new Date(appointment.endDateTime),
                resourceId: appointment.agendaId
            }
        })
    }, [appointments, lastUpdate])
    
    const resourceMap = useMemo(() => {
        return agendas.sort((a, b) => a.name.localeCompare(b.name)).map((agenda, index) => {
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

    useEffect(() => {
        async function fetchPatientData() {
            if (showNewAppointment && appointment) {
                const patient = await fetchPatient(appointment.patient.uuid);
                setFetchedPatient(patient);
            }
        }
        fetchPatientData();
    }, [showNewAppointment, appointment]);

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

    function sheduleNewAppointment(){
        setShowNewAppointment(true);
    }

    function renderModalAppointmentCore(){
        switch(appointment?.requestAppointment.status){
            case RequestStatus.PENDING_APPROVAL:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button onClick={cancelAppointment}>
                                <IconGenerator type="cancel_appointment" size="large" />
                            </Button>
                            <Typography variant="body1" component="span" gutterBottom>
                                <Translate id="pages.hospital.outpatients.calendar.modal.cancel_appoinment" />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={showUpAppointment}>
                                <IconGenerator type="show_up" size="large" />
                            </Button>  
                            <Typography variant="body1" component="span" gutterBottom>
                                <Translate id="pages.hospital.outpatients.calendar.modal.check_in_patient" />
                            </Typography>  
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={sheduleNewAppointment}>
                                <IconGenerator color="black" type="outpatients" size="large" />
                            </Button>     
                            <Typography variant="body1" component="span" gutterBottom>
                                <Translate id="pages.hospital.outpatients.calendar.modal.new_appointment.title" />
                            </Typography>             
                        </Grid>
                    </Grid>
                );
            case RequestStatus.PENDING_PAYMENT:
                return (
                    <>
                    <Grid item xs={12} style={{paddingTop:'1rem'}}>
                    <Typography variant="body1" component="p" >
                        <Translate id="pages.hospital.outpatients.table_patient_appointments.modal.pending_payment.message" />
                    </Typography>
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:'1rem'}}>
                    <Typography component="p" variant="body1" >
                    <Translate id="pages.hospital.outpatients.table_patient_appointments.modal.pending_payment.message_2" />
                    <Button onClick={() => {
                        const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", appointment!.patient.uuid)
                        console.log("Next url", nextUrl);
                        //history.push(nextUrl);
                        window.open(nextUrl, '_blank');
                    }}>
                        <IconGenerator type="view" size="large" />
                    </Button>
                    </Typography>
                    </Grid>
                    </>
                ); 
            default:
                const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", appointment!.patient.uuid)
                console.log("Next url", nextUrl);
                //history.push(nextUrl);
                window.open(nextUrl, '_blank');
                resetModal();
        }
    }

    function renderCoreModal() {
        if (showNewAppointment && appointment && fetchedPatient) {
            return (
                <FormMakeAppointment
                    uuidPatient={appointment.patient.uuid}
                    uuidInvestigation={uuidInvestigation}
                    showAllAgendas={false}
                    hidePatientInfo={false}
                    dateTimeAppointment={true}
                    cancelCallback={resetModal}
                    phoneNumber={fetchedPatient.personalData.phone}
                    appointmentMadeCallback={(date) => appointmentCreatedCallback(date)}
                />
            );
        } else if (appointment) {
            return renderModalAppointmentCore();
        } else if (newAppointment) {
            return (
                <NewAppointment
                    appointmentInfo={newAppointment}
                    extraForm={extraForm}
                    cancelCallback={resetModal}
                    appointmentCreatedCallback={appointmentCreatedCallback}
                    appointmentErrorCallback={appointmentErrorCallback}
                />
            );
        }
    }

    function resetModal() {
        setShowModal(false);
        setAppointment(null);
        setNewAppointment(null);
        setFetchedPatient(null);
        setShowNewAppointment(false);
    }

    function handleOnClickSlot(slotInfo:any){
        if(!canCreateAppointments){
            return null;
        }
        const { start, resourceId } = slotInfo;
        console.log('Start time:', start);
        console.log('Resource ID:', resourceId);

        const currentAgenda = agendas.find(agenda => agenda.id === resourceId);
        console.log('Current Agenda:', currentAgenda);
        // Get just the hour of the clicked date
        const clickedHour = start.getHours();
        console.log('Clicked Hour:', clickedHour);
        const newAppointment = {
            startDateTime: start,
            agendaId: resourceId,
        }
        setNewAppointment(newAppointment);
        setShowModal(true);
        
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
            title={appointment ? <Translate id="pages.hospital.outpatients.calendar.modal.existing_appointment.title" /> : <Translate id="pages.hospital.outpatients.calendar.modal.new_appointment.title" />} >
            <>
            {
                renderCoreModal()
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
                step={15}
                timeslots={1} 
                selectable={true} 
                onSelectSlot = {handleOnClickSlot}
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
