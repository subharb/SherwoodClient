import React from 'react';
import { IPatient, ISubmission, ISurvey } from '../../../constants/types';
import { render } from '@testing-library/react';
import { Divider, Grid, Typography } from '@mui/material';
import { HeaderDocument } from '../Document/header';
import ShowSingleSubmissionPatient, { ShowSingleSubmissionPatientView } from '../ShowSingleSubmissionPatient';

import { useInsurances } from '../../../hooks';
import PatientInfo from '../Billing/PatientInfo';
import { Translate } from 'react-localize-redux';
import { dateAndTimeFromPostgresString, fullDateFromPostgresString, stringDatePostgresToDate } from '../../../utils';


interface SubmissionPDFProps {
    submission:ISubmission,
    currentSurvey:ISurvey,
    locale:string,
    logoBlob:string,
    hospitalName:string,
    address:string,
    city:string,
    phone:string,
    email:string,
    patient:IPatient
}

const SubmissionPDF: React.FC<SubmissionPDFProps> = ({ submission, locale, patient, logoBlob, hospitalName, currentSurvey,
                                                        address, city, phone, email }) => {
    const [insurances, loadingInsurances, patientInsurance] = patient.personalData.insurance ? useInsurances(parseInt(patient.personalData.insurance.toString())) : [null, false];
    
    function renderHeader(){
        return(
            <Grid container item xs={12}>
                <Grid item xs={12}>
                    <HeaderDocument size='A4' address={address} 
                        logoBlob={logoBlob} city={city} locale={locale}
                        hospitalName={hospitalName} email={email} phone={phone} />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h2' style={{fontWeight:'bold'}}>
                        <Translate id="hospital.patient.pdf.prescriptions.title" />
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    function renderBody(){
        return (
            <>
                <PatientInfo patient={patient} rightSide={null} />
                <ShowSingleSubmissionPatientView currentSurvey={currentSurvey} 
                    idSubmission={submission.id} printMode={true}
                    forceEdit={false} submission={submission} 
                /> 
            </>
            
        )
    }

    function renderFooter(){

    }
    
    return (
        <Grid container item xs={12} >
            {
                renderHeader()
            }
            <Grid item xs={12}>
                <div style={{padding:'2rem'}}>
                    <Divider style={{width:'100%'}} />
                </div>
            </Grid>
            {
                renderBody()
            }
            {
                renderFooter()
            }
        </Grid>
    );
};

export default SubmissionPDF;
