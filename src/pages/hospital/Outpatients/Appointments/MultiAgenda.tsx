import { useMemo, useState } from 'react'
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { IAgenda, IAppointment, IPatient } from '../../../../constants/types';
import { fetchPatient } from '../../../../db';
import { patientFullName } from '../../../../utils';
import patient from '../../patient';
import Modal from '../../../../components/general/modal';
import { Button, Grid, Typography } from '@mui/material';
import { Translate } from '@mui/icons-material';
import { ButtonCancel, ButtonContinue, IconGenerator } from '../../../../components/general/mini_components';
import moment from 'moment';


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
    cancelCallback: (uuidAgenda:string) => void,
    showUpCallback: (uuidAgenda:string) => void
}

export default function MultiAgenda({ date, appointments, agendas, patients, cancelCallback, showUpCallback }: MultiAgendaProps) {
    const [showModal, setShowModal] = useState(false);
    const [appointmentId, setAppointmentId] = useState(0);
 
    const events = useMemo(() => {
        return appointments.map((appointment, index) => {
            const uuidPatient = appointment.patient.uuid;
            const patient = patients.find(pat => pat.uuid === uuidPatient);
            const patientName = patient ? patientFullName(patient?.personalData) : "Unknown";
            console.log("StartDate: ", new Date(appointment.startDateTime));
            return {
                id: appointment.id,
                title: patientName,
                start: new Date(appointment.startDateTime),
                end: new Date(appointment.endDateTime),
                resourceId: appointment.agendaId
            }
        })
    }, [appointments])
    const resourceMap = useMemo(() => {
        return agendas.map((agenda, index) => {
            return {
                resourceId: agenda.id,
                resourceTitle: agenda.name
            }
        })
    }, [agendas])

    const { defaultDate, views } = useMemo(
        () => ({
            defaultDate: date,
            views: ['day'],
        }),
        [date]
    )

    function handleSelectEvent(event:Event) {
        console.log("Selected event: ", event);
        setShowModal(true);
        setAppointmentId(event.id);
    }

    function resetModal() {
        setShowModal(false);
        setAppointmentId(0);
    }

    if(agendas.length === 0){
        return "No Agendas"
    }
    return (
    <>
        <Modal open={showModal} onClose={resetModal} 
                title={<Translate id="pages.hospital.outpatients.table_patient_appointments.modal.title" />} >
                <>
                {
                    appointmentId !== 0 &&
                    <Grid container>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <Typography variant="body1" component="div" gutterBottom>
                                What action do you want to take?
                                <Translate id="pages.hospital.outpatients.table_patient_appointments.modal.show_up.message" />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop:'1rem'}}>
                            <Button onClick={cancelCallback}>
                                <IconGenerator type="cancel_appointment" />
                            </Button>
                            <Button onClick={showUpCallback}>
                                <IconGenerator type="show_up" />
                            </Button>                            
                        </Grid>
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
                resourceTitleAccessor="resourceTitle"
                step={60}
                views={views}
                onSelectEvent={handleSelectEvent}
                components={{
                    toolbar: () => null
                }}
            />
      </div>
    </>
  )
}