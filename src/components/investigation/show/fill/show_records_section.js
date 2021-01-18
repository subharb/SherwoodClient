import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonBack, ButtonForward } from '../../../general/mini_components';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';

/**
 * Component that shows all the records/submissions of a section of a patient in a survey
 */

const GridPadded = styled(Grid)`
    padding:0rem 0rem 2rem 1rem;
`;
export default function ShowRecordsSection(props) {
    let [indexSubmission, setIndexSubmission ] = useState(0);

    function renderSubmission(){
        const submission = props.submissions[indexSubmission];       
        
        return(
            <GridPadded container direction="column" spacing={3}>
                {
                    props.section.fields.map(field => {
                        const value = submission.answers[field.name] ?  submission.answers[field.name] : "no disponible";
                        return (
                            <Grid item>
                                <Typography variant="subtitle1">
                                    {field.label}: {value}
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </GridPadded>
        );
    }
    if(indexSubmission < props.submissions.length){
        return (
        
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Section: { props.section.name }
                    </Typography>
                </Grid>
                {
                    renderSubmission(0)
                }
                {
                    props.submissions.length > 1 &&
                    <Grid container direction="column" spacing={3}> container direction="column" spacing={3}>
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
        )
    }
    else{
        return(
            <Grid container direction="column" >
                <Grid item>
                    <Typography variant="h6" gutterBottom>
                        Section:{ props.section.name }
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">
                        No records available
                    </Typography>
                </Grid>
            </Grid>
        )   
    }
}

ShowRecordsSection.propTypes = {
    section: PropTypes.object,
    submissions: PropTypes.array
};