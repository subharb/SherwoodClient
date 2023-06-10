import DateFnsUtils from "@date-io/date-fns";
import { Card, Grid, Snackbar, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux'; 
import { useHistory, useParams } from "react-router-dom";
import { ButtonCancel, ButtonContinue } from "../../../components/general/mini_components";
import { ColourChip } from '../../../components/general/mini_components-ts';
import Modal from "../../../components/general/modal";
import Loader from '../../../components/Loader';
import { IAgenda, IAppointment, IBox, IPatient, OutpatientsVisualizationMode, SnackbarType } from '../../../constants/types';
import { HOSPITAL_ACTION_AGENDA_ROUTE, HOSPITAL_AGENDA_ROUTE } from "../../../routes";
import { blockDateAgenda, freeDateAgenda, getAgendaService } from '../../../services/agenda';
import {dateToFullDateString, researcherFullName, turnsToSchedule} from '../../../utils/index.jsx';
import SectionHeader from "../../components/SectionHeader";
import Appointments from './Appointments';
import AppointmentDatePicker  from './DatePicker';
import { useSnackBarState } from '../../../hooks';
import { Alert } from "@mui/lab";

interface SingleAgendaProps {
    investigations:any
}

const SingleAgenda: React.FC<SingleAgendaProps> = ({ investigations }) => {
    const {uuidAgenda} = useParams<{uuidAgenda:string}>();
    const {action} = useParams<{action:string}>();
    const [agenda, setAgenda] = React.useState<IAgenda | null>(null);
    const [loadingAgenda, setLoadingAgenda] = React.useState(false);
    const [showSnackbar, setShowSnackbar] = useSnackBarState();

    useEffect(() => {
        if(!agenda && uuidAgenda && investigations.currentInvestigation){
            setLoadingAgenda(true);
            getAgendaService(investigations.currentInvestigation.uuid, uuidAgenda)
                .then(response => {
                    setAgenda(response.agenda);
                    setLoadingAgenda(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoadingAgenda(false);
                })
        }
    }, [investigations]);
    function unBlockDate(dateTS:number){
        setLoadingAgenda(true);
        freeDateAgenda(investigations.currentInvestigation.uuid, uuidAgenda, dateTS)
            .then(response => {
                setAgenda(response.agenda);
                setLoadingAgenda(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.single_agenda.date_un_blocked", severity:"success"})
            })
            .catch(err => {
                console.log(err);
                setLoadingAgenda(false);
                setShowSnackbar({show:true, message:"general.error", severity:"error"})
            })
    }
    function blockDate(dateTS:number){
        setLoadingAgenda(true);
        blockDateAgenda(investigations.currentInvestigation.uuid, uuidAgenda, dateTS)
            .then(response => {
                setAgenda(response.agenda);
                setLoadingAgenda(false);
                setShowSnackbar({show:true, message:"pages.hospital.outpatients.single_agenda.date_blocked", severity:"success"})
            })
            .catch(err => {
                console.log(err);
                setLoadingAgenda(false);
                setShowSnackbar({show:true, message:"general.error", severity:"error"})
            })
    }
    if(loadingAgenda || !agenda){
        return (
            <Loader />
        )
    }
    else if(agenda){
        return (
            <SingleAgendaCore agenda={agenda} edit={action === "edit"} patientsPersonalData={investigations.currentInvestigation.patientsPersonalData} 
                uuidInvestigation={investigations.currentInvestigation.uuid} showSnackbar={showSnackbar} callbackUnBlockDate={unBlockDate}
                callbackSetSnackbar={((snackbar:SnackbarType) => setShowSnackbar(snackbar))} callbackBlockDate={blockDate}/>
        );
    }
    else{
        return null;
    }
    
};

const mapStateToProps = (state:any) => {
	return {
		investigations: state.investigations
	}
}

export default connect(mapStateToProps, null)(SingleAgenda);

interface SingleAgendaCoreProps extends LocalizeContextProps {
    agenda: IAgenda,
    edit:boolean,
    patientsPersonalData:IPatient[],
    uuidInvestigation:string,
    showSnackbar:SnackbarType,
    callbackBlockDate:(date:number) => void
    callbackSetSnackbar:(snackbar:SnackbarType) => void
    callbackUnBlockDate:(date:number) => void
}

const SingleAgendaCoreLocalized: React.FC<SingleAgendaCoreProps> = ({ agenda, edit, patientsPersonalData, uuidInvestigation, 
                                                                        showSnackbar, activeLanguage, callbackBlockDate, callbackUnBlockDate, callbackSetSnackbar }) => { 
    const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
    const [showModal, setShowModal] = React.useState<{show:boolean, action?:string}>({show:false});
    const [currentAppointments, setCurrentAppointments] = React.useState<IAppointment[] | null>(null);
    const [isBlockedDate, setIsBlockedDate] = React.useState(false);
    const history = useHistory();

    function onDateChange(date:Date | null){
        if(date){
            setCurrentDate(date);
            setCurrentAppointments(null);
            const blockedDate = new Date(date?.getTime());
            blockedDate.setUTCHours(0,0,0,0);
            blockedDate.setUTCMinutes(0,0,0);
            if(agenda.blockedDates.find(date => date === blockedDate.getTime())){
                setIsBlockedDate(true);
            }
            else{
                setIsBlockedDate(false);
            }
        }
        
        
    }
    function unBlockCurrentDate(){
        if(currentDate){
            setShowModal({show:true, action:"un_block"})
        }
    }
    function blockCurrentDate(){
        if(currentDate){
            if(currentAppointments && currentAppointments.length === 0){
                setShowModal({show:true, action:"block"})
            }
            else{
                setShowModal({show:true, action:"no_block"})
            }
        }
    }
    function resetModal(){
        setShowModal({show:false});
    }
    function renderCalendar(){
        return(
            <div style={{paddingTop:'1rem'}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <AppointmentDatePicker availableDaysWeek = {agenda.daysWeek} blockedDates={agenda.blockedDates} autoCurrentDate={true}
                        selectBlockedDates={edit}
                        slotsPerDay={agenda.slotsPerDay} datesOccupancy={agenda.datesOccupancy} onDateChangeCallback={onDateChange} />
                </MuiPickersUtilsProvider>
            </div>
        )
    }
    function canEditAgenda(){
        return true;
    }
    function confirm(){
        console.log("Bloqueamos la fecha");
        if(showModal.action === "block"){
            callbackBlockDate(currentDate!.getTime())   
        }
        else if(showModal.action === "un_block"){
            callbackUnBlockDate(currentDate!.getTime())   
        }
    }
    function renderButtonToggleBlock(){
        if(edit){
            return(
                <div style={{paddingTop:"1rem"}}>
                {
                    !isBlockedDate &&
                    <ButtonCancel disabled={!currentAppointments} onClick={blockCurrentDate}>
                        <Translate id={`pages.hospital.outpatients.single_agenda.block.button`} />
                    </ButtonCancel>
                }
                {
                    isBlockedDate &&
                    <ButtonContinue color="green" disabled={!currentAppointments} onClick={unBlockCurrentDate}>
                        <Translate id={`pages.hospital.outpatients.single_agenda.un_block.button`} />
                    </ButtonContinue>
                }
                </div>
            )
     
        }
    }
    function renderAgendaInfo(){
        const box = agenda.box as IBox;
        return(
            <Grid item xs={12}>
                <Card style={{padding:"1rem"}}>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="general.name" />: </span>{agenda.name}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.agenda.doctor" />: </span>{researcherFullName(agenda.principalResearcher)}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="hospital.departments.department" />: </span>{agenda.department ? agenda.department.name : <Translate id="general.not_defined" />}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.agenda.slotsPerDay" />: </span>{agenda.slotsPerDay}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.box.title" />: </span>{box.name}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.agenda.week_days" />: </span>{agenda.daysWeek.map((day) => {
                        return <ColourChip size="small" label={<Translate id={`general.week_days.${day}`}  />} rgbcolor="#000" />
                    })}</Typography> </div>
                    <div><Typography variant="body2"><span style={{ fontWeight: 'bold' }}><Translate id="pages.hospital.outpatients.agenda.schedule" />: </span>{turnsToSchedule(agenda.turn)}</Typography> </div>
                    {
                        renderCalendar()
                    }
                    {
                        renderButtonToggleBlock()
                    }
                </Card>  
            </Grid>
        )
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
            <Modal key="modal" open={showModal.show} 
                title={<Translate id={`pages.hospital.outpatients.single_agenda.${showModal.action}.title`} />}
                closeModal={resetModal} >
                    <Grid container>
                        {
                            showModal.action === "block" &&
                            <>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <Translate id={`pages.hospital.outpatients.single_agenda.${showModal.action}.message`} /><br/>
                                    {dateToFullDateString(currentDate, activeLanguage.code)}
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                        <Translate id="general.cancel" />
                                    </ButtonCancel>
                                    <ButtonContinue onClick={confirm} data-testid="continue-modal" color="green">
                                        <Translate id="general.continue" />
                                    </ButtonContinue>
                                </Grid>
                            </>
                        }
                        {
                            showModal.action === "un_block" &&
                            <>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <Translate id={`pages.hospital.outpatients.single_agenda.${showModal.action}.message`} /><br/>
                                    {dateToFullDateString(currentDate, activeLanguage.code)}
                                </Grid>
                                <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                    <ButtonCancel onClick={resetModal} data-testid="cancel-modal" color="primary" spaceright={1}>
                                        <Translate id="general.cancel" />
                                    </ButtonCancel>
                                    <ButtonContinue onClick={confirm} data-testid="continue-modal" color="green">
                                        <Translate id="general.continue" />
                                    </ButtonContinue>
                                </Grid>
                            </>
                        }
                        {   
                            showModal.action === "no_block" &&
                            <Grid item xs={12} style={{paddingTop:'1rem'}}>
                                <Translate id={`pages.hospital.outpatients.single_agenda.${showModal.action}.message`} />
                            </Grid>
                        }
                        
                    </Grid>        
            </Modal>
            <SectionHeader alterTitle="pages.hospital.outpatients.agenda.title" section="agenda" 
                edit={edit} editCallback={canEditAgenda() ? () => {
                    let nextUrl = HOSPITAL_AGENDA_ROUTE.replace(":uuidAgenda", agenda.uuid);
                    if(!edit){
                        nextUrl = HOSPITAL_ACTION_AGENDA_ROUTE.replace(":uuidAgenda", agenda.uuid).replace(":action", "edit");
                        
                    }
                    history.push(nextUrl);
                } : undefined}  />
            {
                renderAgendaInfo()
            }
            {
                currentDate &&
                <Appointments patientsPersonalData={patientsPersonalData} uuidAgenda={agenda.uuid} 
                    mode={edit ? OutpatientsVisualizationMode.ADMIN : OutpatientsVisualizationMode.CONSULT}
                    uuidInvestigation={uuidInvestigation} dateSelected={currentDate} 
                    callbackAppointments={(appointments)=> setCurrentAppointments(appointments)}/>
            }
        </>
    );
};
export const SingleAgendaCore = withLocalize(SingleAgendaCoreLocalized);
 