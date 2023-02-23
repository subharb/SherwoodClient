import DateFnsUtils from "@date-io/date-fns";
import { Card, Grid, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import { connect } from 'react-redux'; 
import { useHistory, useParams } from "react-router-dom";
import { ColourChip } from '../../../components/general/mini_components-ts';
import Loader from '../../../components/Loader';
import { IAgenda, IBox, IPatient, OutpatientsVisualizationMode } from '../../../constants/types';
import { HOSPITAL_ACTION_AGENDA_ROUTE } from "../../../routes";
import { getAgendaService } from '../../../services/agenda';
import {researcherFullName} from '../../../utils';
import SectionHeader from "../../components/SectionHeader";
import Appointments from './Appointments';
import AppointmentDatePicker  from './DatePicker';

interface SingleAgendaProps {
    investigations:any
}

const SingleAgenda: React.FC<SingleAgendaProps> = ({ investigations }) => {
    const {uuidAgenda} = useParams<{uuidAgenda:string}>();
    const {action} = useParams<{action:string}>();
    const [agenda, setAgenda] = React.useState<IAgenda | null>(null);
    const [loadingAgenda, setLoadingAgenda] = React.useState(false);

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

    if(!loadingAgenda && !agenda){
        return (
            <Loader />
        )
    }
    else if(agenda){
        return (
            <SingleAgendaCore agenda={agenda} edit={action === "edit"} patientsPersonalData={investigations.currentInvestigation.patientsPersonalData} 
                uuidInvestigation={investigations.currentInvestigation.uuid} />
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

interface SingleAgendaCoreProps {
    agenda: IAgenda,
    edit:boolean,
    patientsPersonalData:IPatient[],
    uuidInvestigation:string
}

export const SingleAgendaCore: React.FC<SingleAgendaCoreProps> = ({ agenda, edit, patientsPersonalData, uuidInvestigation }) => { 
    const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
    const history = useHistory();

    function onDateChange(date:Date | null){
        setCurrentDate(date);
    }
    function renderCalendar(){
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <AppointmentDatePicker availableDaysWeek = {agenda.daysWeek} blockedDates={agenda.blockedDates} autoCurrentDate={true}
                        slotsPerDay={agenda.slotsPerDay} datesOccupancy={agenda.datesOccupancy} onDateChangeCallback={onDateChange} />
                </MuiPickersUtilsProvider>
        )
    }
    function canEditAgenda(){
        return true;
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
                    {
                        renderCalendar()
                    }
                </Card>  
            </Grid>
        )
    }
    return (
        <>
            <SectionHeader alterTitle="pages.hospital.outpatients.agenda.title" section="agenda" 
                edit={edit} editCallback={canEditAgenda() ? () => {
                    const nextUrl = HOSPITAL_ACTION_AGENDA_ROUTE.replace(":uuidAgenda", agenda.uuid).replace(":action", "edit");
                    history.push(nextUrl);
                } : undefined}  />
            {
                renderAgendaInfo()
            }
            {
                currentDate &&
                <Appointments patientsPersonalData={patientsPersonalData} uuidAgenda={agenda.uuid} 
                    mode={edit ? OutpatientsVisualizationMode.ADMIN : OutpatientsVisualizationMode.CONSULT}
                    uuidInvestigation={uuidInvestigation} dateSelected={currentDate} />
            }
            
            
        </>
    );
};
