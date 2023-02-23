import { Grid, Paper, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useMemo } from 'react';
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { PERMISSION } from '../../../components/investigation/share/user_roles';
import Loader from '../../../components/Loader';
import { IOutpatientsInfo, OutpatientsVisualizationMode } from '../../../constants/types';
import { useSnackBarState } from '../../../hooks';
import { getOutpatientsInfo } from '../../../services/agenda';
import SectionHeader from '../../components/SectionHeader';
import { FormConsultAppointment } from './FormAppointment';
import EditOutpatients from './EditOutpatients';
import Appointments from './Appointments';

interface OutpatientsProps extends LocalizeContextProps {
    investigations:any
} 

const Outpatients: React.FC<OutpatientsProps> = ({ investigations, translate }) => {
    const [edit, setEdit] = React.useState(false);

    const [showSnackbar, setShowSnackbar] = useSnackBarState();
    
    const [outpatientsInfo, setOutpatientsInfo] = React.useState<IOutpatientsInfo | null>(null);
    const [uuidAgenda, setUuidAgenda] = React.useState<string | null>(null);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const canEditOutPatients = true; useMemo(() =>{
        if(investigations.currentInvestigation){
            return investigations.currentInvestigation.permissions.includes(PERMISSION.EDIT_OUTPATIENTS);
        }
        else return false;
    }, [investigations.currentInvestigation])

    function toogleEdit(){
        setEdit(!edit);
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

    // async function getAppoinmentsDate(uuidAgenda:string, date:Date){
    //     console.log("getAppoinmentsDate", uuidAgenda, date);
    //     setValidData(true);
    //     setLoadingAppointments(true);
    //     getAppoinmentsDateService(investigations.currentInvestigation.uuid, uuidAgenda, date)
    //         .then(response => {
    //             setCurrentAppointments(response.appointments);
    //             setLoadingAppointments(false);
    //         })
    //         .catch(err => {
    //             setLoadingAppointments(false);
    //         })
    // }

    function renderAppointments(){
        if(uuidAgenda && selectedDate){
            return(
                <Appointments uuidAgenda={uuidAgenda} uuidInvestigation={investigations.currentInvestigation.uuid} dateSelected={selectedDate} mode={OutpatientsVisualizationMode.CONSULT}
                    patientsPersonalData={investigations.currentInvestigation.patientsPersonalData} />
            )
        }
    }

    function renderCore(){
        if(edit){
            return(
                <Grid item xs={12}>
                    <EditOutpatients uuidInvestigation={investigations.currentInvestigation.uuid} 
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
                                    showAllAgendas={true} infoAppointmentReadyCallback={(uuidAgenda, date) => {
                                        setUuidAgenda(uuidAgenda);
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
    if( investigations.loading || !investigations.data){
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
                <SectionHeader section="outpatients" edit={edit} editCallback={canEditOutPatients ? toogleEdit : undefined}  />
                
                    {
                        renderCore()
                    }     
                 
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
