import React, { useState } from 'react'
import { Grid, Typography, Paper } from '@mui/material';
import { BoxBckgr, IconPatient, ButtonAdd, CheckCircleOutlineSvg, TypographyStyled } from '../../components/general/mini_components';
import SectionForm from '../../components/general/SectionForm';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { useDispatch, useSelector } from "react-redux";
import { postSubmissionPatientAction, updateSubmissionPatientAction } from '../../redux/actions/submissionsPatientActions';
import FillSurvey from './FillSurvey';

export default function FillDataCollection(props) {
    
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item container xs={12} spacing={3} style={{color:"white", padding:"1rem"}}>
                    {
                        !props.hideCollectionName && 
                        <Grid item xs={12}>
                            <TypographyStyled variant="subtitle1" gutterBottom>
                                {props.dataCollection.name}
                            </TypographyStyled>
                        </Grid>
                    }
                    
                    <Grid item xs={12}>
                        {
                            <FillSurvey uuid={props.dataCollection.uuid} sections={props.dataCollection.sections} 
                                sectionSelected={props.sectionSelected} idSubmission={props.idSubmission} nameSurvey={props.dataCollection.name}
                                typeSurvey={props.dataCollection.type} 
                                initData={props.initData} country={props.country} uuidInvestigation={props.uuidInvestigation}
                                uuidPatient={props.uuidPatient} department={props.department} alterSubmitButton={props.alterSubmitButton}
                                callBackDataCollectionSaved={props.callBackDataCollection}/>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

FillDataCollection.propTypes = {
    sectionSelected : PropTypes.object,
    /** Data Collection */
    dataCollection: PropTypes.object.isRequired,
    hideCollectionName:PropTypes.bool,
    requestServiceId:PropTypes.number,
    country:PropTypes.string,
    researcher:PropTypes.object,
    uuidPatient:PropTypes.string,
    uuidInvestigation:PropTypes.string,
    initData:PropTypes.object,
    alterSubmitButton:PropTypes.string,
    idSubmission:PropTypes.number,
    /** Callback function from parent */
    callBackDataCollection: PropTypes.func.isRequired,
  };