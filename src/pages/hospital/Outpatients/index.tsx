import { Grid, Paper, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { connect, useDispatch } from 'react-redux';
import { BedButtonViewPatient, ButtonPatient } from '../../../components/general/BedButton';
import { ButtonCancel, ButtonContinue } from '../../../components/general/mini_components';
import Modal from '../../../components/general/modal';
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import Loader from '../../../components/Loader';
import { IAgenda, IAppointment, IDepartment, IPatient, PersonalData } from '../../../constants/types';
import { useSnackBarState } from '../../../hooks';
import { HOSPITAL_PATIENT } from '../../../routes';
import { getAppoinmentsDateService, updateAppoinmentsService } from '../../../services/agenda';
import SectionHeader from '../../components/SectionHeader';
import { RequestStatus } from '../Service/types';
import { FormConsultAppointment } from './FormAppointment';
import {useHistory, useParams} from 'react-router-dom';
import { areSameDates } from '../../../utils';
import EditOutpatients from './Edit';

interface OutpatientsProps extends LocalizeContextProps {
    investigations:any
}

const Outpatients: React.FC<OutpatientsProps> = ({ investigations, translate }) => {
    const [edit, setEdit] = React.useState(false);
    const [currentAppointments, setCurrentAppointments] = React.useState<IAppointment[]>([]);
    const [loadingAppointments, setLoadingAppointments] = React.useState(false);
    const [loadingSingleAppointment, setLoadingSingleAppointment] = React.useState(false);
    const [selectedAppointment, setSelectedAppointment] = React.useState<IAppointment | null>(null);
    const [validData, setValidData] = React.useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    const [showModal, setShowModal] = React.useState(false);
    const canEditOutPatients = true; useMemo(() =>{
        if(investigations.currentInvestigation){
            return investigations.currentInvestigation.permissions.includes(PERMISSION.EDIT_OUTPATIENTS);
        }
        else return false;
    }, [investigations.currentInvestigation])

    const history = useHistory();

    function toogleEdit(){
        setEdit(!edit);
    }

    async function getAppoinmentsDate(uuidAgenda:string, date:Date){
        console.log("getAppoinmentsDate", uuidAgenda, date);
        setValidData(true);
        setLoadingAppointments(true);
        getAppoinmentsDateService(investigations.currentInvestigation.uuid, uuidAgenda, date)
            .then(response => {
                setCurrentAppointments(response.appointments);
                setLoadingAppointments(false);
            })
            .catch(err => {
                setLoadingAppointments(false);
            })
    }

    function  clickOnAppointment(idAppointment:number){
        console.log("clickOnAppoitment", idAppointment); 
        const currentAppointment = currentAppointments.find((app) => app.id === idAppointment);
        if(currentAppointment){
            if(currentAppointment.requestAppointment.status === RequestStatus.ACCEPTED){
                if(investigations.currentInvestigation.permissions.includes(PERMISSION.MEDICAL_WRITE)){
                    const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", currentAppointment.patient.uuid)
                    console.log("Next url", nextUrl);
                    history.push(nextUrl);
                }
            }
            else if(currentAppointment.requestAppointment.status === RequestStatus.PENDING_APPROVAL){
                if(areSameDates(new Date(currentAppointment.startDateTime), new Date())){
                    setSelectedAppointment(currentAppointment);
                    setShowModal(true);
                }
                else if(investigations.currentInvestigation.permissions.includes(PERMISSION.MEDICAL_WRITE)){
                    const nextUrl = HOSPITAL_PATIENT.replace(":uuidPatient", currentAppointment.patient.uuid)
                    console.log("Next url", nextUrl);
                    history.push(nextUrl);
                }
            }
        }
    }

    function renderAppointments(){
        if(loadingAppointments){
            return <Loader />
        }
        if(currentAppointments.length === 0 && validData){
            return <Typography variant="h6" component="h6" align="left">
                <Translate id="pages.hospital.outpatients.no_appointments" />
            </Typography>
        }
        const appointmentsConfirmed = currentAppointments.filter((appointment) => [RequestStatus.ACCEPTED, RequestStatus.COMPLETED].includes(appointment.requestAppointment.status) );
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
                        const patient:IPatient = investigations.currentInvestigation.patientsPersonalData.find((pat:IPatient) => pat.uuid === appointment.patient.uuid);
                        if(patient){
                            return (
                                <ButtonPatient patient={patient.personalData} 
                                    onSelectPatient={() => clickOnAppointment(appointment.id)}
                                    moneyIcon={false}
                                    age={30} showPersonalData={true} active={true} checkMark={appointment.requestAppointment.status === RequestStatus.COMPLETED}
                                    gender={patient.personalData.sex} />
                            ) 
                        }
                    })
                }
            </Grid>
            </>
            ]
        }
        const appointmentsPending = currentAppointments.filter((appointment) => [RequestStatus.PENDING_APPROVAL, RequestStatus.PENDING_PAYMENT].includes(appointment.requestAppointment.status) );
        if(appointmentsPending.length > 0){
            appointmentsComponent.push( 
                <>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6" align="left"><Translate id="pages.hospital.outpatients.not_confirmed_patients" /></Typography>
                </Grid>
                <Grid container item xs={12}>
                    {
                        appointmentsPending.map((appointment, index) => {
                            const patient:IPatient = investigations.currentInvestigation.patientsPersonalData.find((pat:IPatient) => pat.uuid === appointment.patient.uuid);
                            if(patient){
                                return (
                                    <ButtonPatient patient={patient.personalData} 
                                        onSelectPatient={() =>  clickOnAppointment(appointment.id)} checkMark={false} showPersonalData={true}
                                        moneyIcon={appointment.requestAppointment.status === RequestStatus.PENDING_PAYMENT}
                                        age={30}  active={appointment.requestAppointment.status === RequestStatus.ACCEPTED} 
                                        gender={patient.personalData.sex} />
                                ) 
                            }
                        })
                    }
                </Grid>
                </>)
        }
        return(
            <Grid container spacing={2}>
                {appointmentsComponent}
            </Grid>
        ); 
    }

    function confirm(){
        if(selectedAppointment){
            setLoadingSingleAppointment(true);
            updateAppoinmentsService(investigations.currentInvestigation.uuid, selectedAppointment.uuid)
            .then(response => {
                const indexAppointment = currentAppointments.findIndex((appointment) => appointment.uuid === selectedAppointment.uuid);
                if(indexAppointment !== -1){
                    currentAppointments[indexAppointment] = response.appointment;
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
    }

    function resetModal(){
        setShowModal(false);
        setSelectedAppointment(null);
    }

    function renderModal(){
        if(selectedAppointment){
            const patient:IPatient  = investigations.currentInvestigation.patientsPersonalData.find((pat:IPatient) => pat.uuid === selectedAppointment.patient.uuid);
            if(patient){
                return (
                    <Modal key="modal" open={showModal} 
                            title={translate("pages.hospital.outpatients.confirm")}
                            closeModal={resetModal} >
                                {
                                    (selectedAppointment) &&
                                    <Grid container>
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
                                        </Grid>
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
                        </Modal>
                )
            }
        }
        
    }
    function renderCore(){
        if(edit){
            return(
                <EditOutpatients uuidInvestigation={investigations.currentInvestigation.uuid}  />
            )
        }
        return (
            <Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={{padding:'2rem'}}>
                        <FormConsultAppointment uuidInvestigation={investigations.currentInvestigation.uuid} 
                            infoAppointmentReadyCallback={getAppoinmentsDate} 
                            />
                    </Grid>
                </Grid>
            </Paper>
        );
    }
    if( investigations.loading || !investigations.data){
        return <Loader />
    }
    return (
        <>
            {
                renderModal()
            }
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSnackbar.show}
                autoHideDuration={2000}
                onClose={() => setShowSnackbar({show:false})}>
                    <div>
                        {
                            (showSnackbar.message && showSnackbar.severity) &&
                            <Alert onClose={() => setShowSnackbar({show:false})} severity={showSnackbar.severity}>
                                <Translate id={showSnackbar.message} />
                            </Alert>
                        }
                </div>
            </Snackbar>
            <Grid container spacing={3} >
                <SectionHeader section="outpatients" edit={edit} editCallback={canEditOutPatients ? toogleEdit : undefined}  />
                <Grid item xs={12}>
                    {
                        renderCore()
                    }     
                </Grid>    
                <Grid item xs={12}>
                    {
                        renderAppointments()
                    }     
                </Grid>      
            </Grid>
        </>
    );
};

const mapStateToProps = (state:any) => {
	return {
		investigations: state.investigations
	}
}

export default withLocalize(connect(mapStateToProps, null)(Outpatients));
