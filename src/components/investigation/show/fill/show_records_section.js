import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBack, ButtonForward } from '../../../general/mini_components';
import { Card, Paper, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { Alert } from "@material-ui/lab";
import { Translate } from 'react-localize-redux';

/**
 * Component that shows all the records/submissions of a section of a patient in a survey
 */


const CardPadding = styled(Card)`
    padding:1rem;
    margin-bottom:1rem;
`;
const GridPadded = styled(Grid)`
    padding:0rem 0rem 2rem 1rem;
`;
export default function ShowRecordsSection(props) {
    let [indexSubmission, setIndexSubmission ] = useState(0);
    let [error, setError] = useState(false);
    function renderSubmission(){
        const submission = props.submissions[indexSubmission];       
        
        return(
            <GridPadded container direction="column" spacing={3}>
                {
                    props.section.fields.map(field => {
                        const valueRecord = submission.surveyRecords.find(record => {
                            return field.id === record.surveyField.id
                        })
                        if(valueRecord){
                            setError(true);
                        }
                        else{
                            return (
                                <Grid item>
                                    <Typography variant="body2" gutterBottom>
                                        {field.label}: {valueRecord.value}
                                    </Typography>
                                </Grid>
                            )
                        }
                        
                    })
                }
            </GridPadded>
        );
    }
    if(!props.submissions || error){
        return (
            <Alert mb={4} severity="error">
                <Translate id="investigation.share.error.description" />
            </Alert>
        );
    }
    if(indexSubmission < props.submissions.length){
        return (
            <CardPadding >
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        {
                            !props.noTitle &&
                            <Typography variant="subtitle1" color="textPrimary">
                                Section: { props.section.name }
                            </Typography>
                        }
                        
                    </Grid>
                    {
                        renderSubmission()
                    }
                    {
                        props.submissions.length > 1 &&
                        <Grid container direction="column" spacing={3}>
                            <Grid item>
                                {
                                    `${indexSubmission+1} / ${props.submissions.length}`
                                }
                            </Grid>
                            <Grid item>
                                <ButtonBack disabled={indexSubmission === 0} onClick={() => setIndexSubmission(indexSubmission-1)}></ButtonBack>
                                <ButtonForward disabled={indexSubmission === props.submissions.length -1} onClick={() => setIndexSubmission(indexSubmission+1)}></ButtonForward>
                            </Grid>
                        </Grid>
                    }
                </Grid> 
            </CardPadding> 
        )
    }
    else{
        return(
            <CardPadding >
                <Grid container direction="column" >
                    <Grid item>
                        <Typography variant="subtitle1" color="textPrimary">
                            Section:{ props.section.name }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" gutterBottom>
                            No records available
                        </Typography>
                    </Grid>
                </Grid>
            </CardPadding>
        )   
    }
}

ShowRecordsSection.propTypes = {
    section: PropTypes.object,
    submissions: PropTypes.array
};