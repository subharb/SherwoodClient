import React from 'react';
import { ISubmission, ISurvey } from '../../../constants/types';
import { render } from '@testing-library/react';
import { Grid } from '@mui/material';
import { HeaderDocument } from '../Document/header';
import ShowSingleSubmissionPatient, { ShowSingleSubmissionPatientView } from '../ShowSingleSubmissionPatient';

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

}

const SubmissionPDF: React.FC<SubmissionPDFProps> = ({ submission, locale, logoBlob, hospitalName, currentSurvey,
                                                        address, city, phone, email }) => {
    function renderHeader(){
        return(
            <Grid container item xs={12}>
                <HeaderDocument size='A4' address={address} 
                    logoBlob={logoBlob} city={city} locale={locale}
                    hospitalName={hospitalName} email={email} phone={phone} />
            </Grid>
        );
    }

    function renderBody(){
        return (
            <ShowSingleSubmissionPatientView currentSurvey={currentSurvey} 
                idSubmission={submission.id}
                forceEdit={false} submission={submission} 
            /> 
        )
    }

    function renderFooter(){

    }
    
    return (
        <>
            {
                renderHeader()
            }
            {
                renderBody()
            }
            {
                renderFooter()
            }
        </>
    );
};

export default SubmissionPDF;
