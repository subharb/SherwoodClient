import { Grid, Paper, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import Loader from '../../../components/Loader';
import { IOutpatientsInfo, IPatient, OutpatientsVisualizationMode } from '../../../constants/types';
import { useAgendas, useSnackBarState } from '../../../hooks';
import { getOutpatientsInfo } from '../../../services/agenda';
import SectionHeader from '../../components/SectionHeader';
import { FormConsultAppointment } from './FormAppointment';
import EditOutpatients from './EditOutpatients';
import Appointments from './Appointments';
import { useHistory, useParams } from 'react-router-dom';
import { HOSPITAL_OUTPATIENTS_EDIT_ROUTE, HOSPITAL_OUTPATIENTS_ROUTE } from '../../../routes/urls';

interface OutpatientsProps extends LocalizeContextProps {
    investigations:any,
    personalData:IPatient
}

const Outpatients: React.FC<OutpatientsProps> = ({ investigations, personalData }) => {
    const {action} = useParams<{action:string}>();
    const [edit, setEdit] = React.useState(action === 'edit');
    const history = useHistory();
    const {agendas, loadingAgendas} = useAgendas();
    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    
    const [outpatientsInfo, setOutpatientsInfo] = React.useState<IOutpatientsInfo | null>(null);
    const [uuidAgendasSelected, setUuidAgendasSelected] = React.useState<string[]>([]);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const canEditOutPatients = useMemo(() =>{
        if(investigations.currentInvestigation){
            return investigations.currentInvestigation.permissions.includes(PERMISSION.EDIT_OUTPATIENTS);
        }
        else return false;
    }, [investigations.currentInvestigation])

    const canCreateAppointments = useMemo(() =>{
        if(investigations.currentInvestigation){
            return investigations.currentInvestigation.permissions.includes(PERMISSION.CREATE_APPOINTMENTS);
        }
        else return false;
    }, [investigations.currentInvestigation])

    function toogleEdit(){
        let nextUrl;
        if(edit){
            nextUrl = HOSPITAL_OUTPATIENTS_ROUTE;
        }
        else{
            nextUrl = HOSPITAL_OUTPATIENTS_EDIT_ROUTE.replace(":action", "edit");
        }
        history.push(nextUrl);
    }

    useEffect(() => {
        if(investigations.currentInvestigation){
            getOutpatientsInfo(investigations.currentInvestigation.uuid)
            .then(response => {
                setOutpatientsInfo(response.outpatientInfo);
                
            })
            .catch(err => {
                console.log(err);
            })
        }
       
    }, [investigations.currentInvestigation])

    useEffect(() => {
        if(investigations.currentInvestigation && edit){
            if(!canEditOutPatients){
                history.push(HOSPITAL_OUTPATIENTS_ROUTE);
            }
        }
        
    }, [edit, canEditOutPatients])

    function renderAppointments(){
        if(uuidAgendasSelected && selectedDate){
            return(
                <Appointments uuidAgendas={uuidAgendasSelected} uuidInvestigation={investigations.currentInvestigation.uuid} 
                    type={outpatientsInfo?.params.type} agendas={agendas} extraForm = {outpatientsInfo?.params.extraForm}
                    dateSelected={selectedDate} mode={OutpatientsVisualizationMode.CONSULT} 
                    canCreateAppointments={canCreateAppointments}
                    patientsPersonalData={personalData} 
                />
            )
        }
    }

    function renderCore(){
        if(edit || agendas?.length === 0){
            return(
                <Grid item xs={12}>
                    <EditOutpatients uuidInvestigation={investigations.currentInvestigation.uuid} 
                        billingInfo={investigations.currentInvestigation.billingInfo}
                        outpatientsInfo={outpatientsInfo} />
                </Grid>
            )
        }
        return (
            <>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} style={{padding:'2rem'}}>
                                <FormConsultAppointment uuidInvestigation={investigations.currentInvestigation.uuid} 
                                    showAllAgendas={false} dateTimeAppointment={outpatientsInfo ? outpatientsInfo.params.type === "date_time" : false}
                                    agendaChangedCallback={(uuidAgendas) => {
                                        setUuidAgendasSelected(uuidAgendas);
                                    }}
                                    infoAppointmentReadyCallback={(uuidAgendas, date) => {
                                        setUuidAgendasSelected(uuidAgendas);
                                        setSelectedDate(date);
                                    }} 
                                    />
                            </Grid>
                        </Grid>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                    {
                        renderAppointments()
                    }     
                </Grid> 
            </>
        );
    }
    if( investigations.loading || !investigations.data || loadingAgendas || !outpatientsInfo){
        return <Loader />
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
                <Grid item xs={12}>
                    <SectionHeader section="outpatients" edit={edit} editCallback={canEditOutPatients ? toogleEdit : undefined}  />
                </Grid>
                    {
                        renderCore()
                    }     
                 
            </Grid>
        </>
    );
};

const mapStateToProps = (state:any) => {
	return {
		investigations: state.investigations,
        personalData : state.investigations.currentInvestigation && state.patients.data ? state.patients.data[state.investigations.currentInvestigation.uuid] : []
	}
}

export default withLocalize(connect(mapStateToProps, null)(Outpatients));
