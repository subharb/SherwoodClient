import React, { useEffect, useState } from 'react';
import { IAgenda, IAppointment, IPatient } from '../../../../constants/types';
import { FindPatient } from '../../Billing/find_patient';
import { findPatientByIdAndInvestigation, getAllPatientsInvestigation } from '../../../../db';
import { useSelector } from 'react-redux';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { ExtraAppointmentInfo, FormAppointmentCore, FormMakeAppointment } from '../FormAppointment';
import { useAgendas } from '../../../../hooks';
import { ButtonCancel, ButtonContinue, FieldWrapper } from '../../../../components/general/mini_components';
import { makeAppointmentService } from '../../../../services';
import Loader from '../../../../components/Loader';
import PatientInfo from '../../../../components/PatientInfo';

interface NewAppointmentProps extends LocalizeContextProps {
    appointmentInfo: IAppointment;
    extraForm? : number,
    cancelCallback: () => void;
    appointmentCreatedCallback: (appointment: IAppointment) => void;
    appointmentErrorCallback: (error: any) => void;
}

const NewAppointment: React.FC<NewAppointmentProps> = ({ activeLanguage, appointmentInfo, extraForm, cancelCallback, appointmentCreatedCallback, appointmentErrorCallback }) => {
    const [patient, setPatient] = useState<null | IPatient>(null);
    const [patients, setPatients] = useState<IPatient[] | null>(null);
    const [agendaSelected, setAgendaSelected] = useState<IAgenda | null>(null);
    const [service, setService] = useState<null | any>(null);
    const [reason, setReason] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const currentInvestigation = useSelector((state) => state.investigations.currentInvestigation);
    const {agendas} = useAgendas()

    useEffect(() => {
        const fetchPatient = async () => {
            const uuidInvestigation = currentInvestigation.uuid;
            setPatients(await getAllPatientsInvestigation(uuidInvestigation!));
        };
        fetchPatient();
    }, []);

    useEffect(() => {
        if (appointmentInfo && agendas) {
            const agenda = agendas.find((agenda) => agenda.id === appointmentInfo.agendaId);
            setAgendaSelected(agenda);
        }
    }, []);

    async function onPatientSelected(idPatient: number) {
        const patient = await findPatientByIdAndInvestigation(idPatient, currentInvestigation.uuid);
        setPatient(patient);
    }

    function handleAccept(){
        if(!service){
            setError(true);
            return;
        }
        setLoading(true);
        makeAppointmentService(currentInvestigation.uuid, agendaSelected?.uuid, patient?.uuid, appointmentInfo.startDateTime, service.id, patient?.personalData.phone, reason, notes)  
            .then((response) => {
                setLoading(false);
                appointmentCreatedCallback(response.appointment);
            })
            .catch((error) => { 
                appointmentErrorCallback(error)
                setLoading(false);
            });
    }

    function renderServices(){
        if(agendaSelected!.listServicesInvestigation.length === 0){
            return <Typography variant="body2"><Translate id="pages.hospital.outpatients.form_appointment.no-services" /></Typography>
        }
        const optionsArray = agendaSelected!.listServicesInvestigation.sort((a, b) => a.description.localeCompare(b.description)).map((service) => {
            return (
                <MenuItem value={service.id}>{service.description}</MenuItem>
            )
        });
        
        return (
            <FieldWrapper noWrap ={null}>
                <FormControl fullWidth variant="outlined" margin="dense" error={error} >
                    <InputLabel id="service"><Translate id="pages.hospital.outpatients.form_appointment.service" /></InputLabel>
                    <Select
                        labelId="service"
                        id="service"
                        label="Select service"
                        onChange={(event) => {
                            const idService = event.target.value as string;
                            const service = agendaSelected!.listServicesInvestigation.find((service) => service.id === idService);
                            if(service){
                                setService(service);
                            }
                        }}
                    >
                    { optionsArray }
                    </Select>
                </FormControl>
            </FieldWrapper>
        );
    }

    if(!patients){
        return null;
    }
    else if(loading){
        return <Loader />
    }
    else if(!patient){
        return (
            <>
                <FindPatient patients={patients}
                    uuidInvestigation={currentInvestigation.uuid}
                    personalFields={currentInvestigation.personalFields}
                    codeLanguage={activeLanguage.code}
                    onPatientSelected={(idPatient) => onPatientSelected(idPatient)} />
            </>
        );
    }
    else{
        return (
            <Grid container>
                <Grid item xs={12}>
                    <PatientInfo uuidPatient={patient.uuid} activeLanguage={activeLanguage.code}  />
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Agenda: </span>{ agendaSelected?.name }</Typography>
                    <Typography variant="body2"><span style={{ fontWeight: 'bold' }}>Date: </span>{ appointmentInfo.startDateTime.toLocaleString() }</Typography>
                    {
                        renderServices()
                    }
                    {
                        extraForm === 1 && 
                            <ExtraAppointmentInfo
                                reason={reason}
                                setReason={setReason}
                                notes={notes}
                                setNotes={setNotes}
                                />
                    }
                    
                </Grid>
                <Grid item xs={12}>
                    <ButtonContinue onClick={handleAccept}>Accept</ButtonContinue> &nbsp;
                    <ButtonCancel onClick={cancelCallback}>Cancel</ButtonCancel>
                </Grid>
            </Grid>

        );
    }
};

const NewAppointmentLocalized = withLocalize(NewAppointment);
export default NewAppointmentLocalized;
