
import React, { useState } from 'react';
import { BoxBckgr } from '../../../components/general/mini_components';
import Helmet from "react-helmet";
import { LocalizeContextProps, Translate, withLocalize } from 'react-localize-redux';
import { AccordionSummary, Accordion, Grid, Typography, AccordionDetails, List, ListItem, ListItemText } from '@material-ui/core';
import { useDepartments } from '../../../hooks';
import Loader from '../../../components/Loader';
import { connect } from 'react-redux';
import { IDepartment, IPatient, IWard } from '../../../constants/types';
import Ward, { WardModes, WardView } from './Ward';
import { ExpandMore } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { HOSPITAL_PATIENT } from '../../../routes';


interface PropsRedux {
    investigations:any,
    patients:any,
    loading:boolean
}

const InpatientsRedux:React.FC<PropsRedux> = ({investigations, loading, patients}) => {
    const investigation = investigations.data && investigations.currentInvestigation ? investigations.currentInvestigation : null;
    const {departments, researchers} = useDepartments();
    const history = useHistory();
    
    function goToPatientHistory(uuidPatient:string){
        console.log(uuidPatient);
        history.push(HOSPITAL_PATIENT.replace(":uuidPatient", uuidPatient));
    }

    if(loading){
        return <Loader/>
    }
    return <InpatientsLocalized departments={departments} 
                patients={patients.data[investigations.currentInvestigation.uuid]} 
                goToPatientHistoryCallBack={goToPatientHistory} />
    
}

const mapStateToProps = (state:any) =>{
    return {
        investigations : state.investigations,
        hospital : state.hospital,
        patients: state.patients,
        loading : state.hospital.loading || state.investigations.loading
    }
}


export default connect(mapStateToProps, null)(InpatientsRedux);

interface Props extends LocalizeContextProps{
    departments:IDepartment[],
    patients:IPatient[],
    goToPatientHistoryCallBack:(uuidPatient:string) => void
}
const InpatientsComponent:React.FC<Props> = ({translate, departments, patients, goToPatientHistoryCallBack}) => {
    const titleHelmet:string = translate("pages.hospital.inpatients").toString();

    
    function renderWards(department:IDepartment){
        return department.wards.map((ward:IWard) => {
            return(
                <div style={{width:'100%', paddingTop:'0.5rem'}}>
                     <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography >{ ward.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{"flexDirection": "column"}} className="accordion_details">
                            {
                                <WardView loading={false} mode={WardModes.View} ward={ward}
                                    patients={patients} inModule
                                    bedsProps={ward.beds} error={null}
                                    viewCallBack={(uuidPatient) => goToPatientHistoryCallBack(uuidPatient)} />
                            }                        
                        </AccordionDetails>
                    </Accordion>
                </div>
               
            );
        })
        
    }
    function renderCore(){
        if(!departments || departments.length === 0){
            return "You have no departments"
        }
        return departments.map((department) => 
            <div style={{paddingBottom:'1rem'}}>
                <Typography variant="body2" gutterBottom display="inline">
                    { department.name }
                </Typography>
                { renderWards(department) }
            </div>
        );
    }
    return (
        <BoxBckgr color="text.primary" style={{color:"white"}}>
            <Helmet title={titleHelmet} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid item xs={6} >
                        <Typography variant="h3" gutterBottom display="inline">
                            <Translate id="pages.hospital.inpatients" />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        {
                            renderCore()
                        }
                    </Grid>
                </Grid>
            </Grid> 
        </BoxBckgr>
    )
}



export const InpatientsLocalized = withLocalize(InpatientsComponent);