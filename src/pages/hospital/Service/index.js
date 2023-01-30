import React, {useState, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';

import { Box, Grid, Paper, Typography, Button, IconButton, Card } from '@material-ui/core';
import Form  from '../../../components/general/form';
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useParams} from 'react-router-dom';
import { EnhancedTable } from '../../../components/general/EnhancedTable';
import { HOSPITAL_LAB_REQUEST, HOSPITAL_LAB, HOSPITAL_PATIENT_SUBMISSION, HOSPITAL_LAB_RESULT, HOSPITAL_IMAGING_REQUEST, HOSPITAL_IMAGES, } from '../../../routes';
import Loader from '../../../components/Loader';

import {
    useLocation
  } from "react-router-dom";
import { connect } from 'react-redux';
import EditServices from './Edit';
import { RequestStatus, ServiceType } from './types';
import RequestTable, { serviceToColor } from './RequestTable';
import { fetchProfileInfo } from '../../../redux/actions/profileActions';
import RequestSingle from './RequestSingle';
import { TYPE_IMAGE_SURVEY, TYPE_LAB_SURVEY, TYPE_REQUEST_LAB } from '../../../constants';
import SectionHeader from '../../components/SectionHeader';
import { serviceTypeToTranslation } from '../../../utils';
import { FUNCTIONALITY } from '../../../constants/types';
import ServiceRecords from './ServiceRecords';



export function TestsHome(props){
    let location = useLocation();
    const parameters = useParams();
    const typeService = location.pathname.includes("/images") ? ServiceType.IMAGING : location.pathname.includes("/lab") ? ServiceType.LABORATORY : ServiceType.SHOE;
    return <TestsHomeComponent type={typeService} parameters={parameters} {...props}/>
}

export function TestsHomeComponent(props) {
    const [edit, setEdit] = useState(false);
    const history = useHistory();
    const idRequest = props.parameters.idRequest;
   
    const dispatch = useDispatch(); 
    const showRequests = useMemo(() => {
        return props.investigations.currentInvestigation ? (([ServiceType.IMAGING, ServiceType.LABORATORY].includes(props.type) && props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.REQUESTS))
        ||(props.type === ServiceType.SHOE && props.investigations.currentInvestigation.functionalities.includes(FUNCTIONALITY.SHOE_SHOP))) : false;
    }, [props.investigations]);


    useEffect(() => {
        
        if(props.investigations.currentInvestigation){
            if(!props.profile.info){
                dispatch(fetchProfileInfo(props.investigations.currentInvestigation.uuid));
            }
        }
    }, [ props.investigations]);
    
    function toogleEditLab(){
        setEdit(edit => !edit);
    }
    function accessRequest(request){
        let nextUrl = null;
        
        if(props.type === TYPE_REQUEST_LAB){
            nextUrl = HOSPITAL_LAB_REQUEST.replace(":idRequest", request.id)    
        }
        else{
            nextUrl = HOSPITAL_IMAGING_REQUEST.replace(":idRequest", request.id)
        }
        if(nextUrl){
            history.push(nextUrl);
        }
        
    }
    function goToHomeTest(typeRequest){
        if(typeRequest === TYPE_REQUEST_LAB){
            history.push(HOSPITAL_LAB);
        }
        else{
            history.push(HOSPITAL_IMAGES);
        
        }
        
    }
    function renderCore(){
        
        if(showRequests){
            if(edit){
                return (
                    <EditServices serviceType={props.type} uuidInvestigation={props.investigations.currentInvestigation.uuid} 
                        surveys={props.investigations.currentInvestigation.surveys} />
                );
            }
            else if(idRequest){
                return (
                    <RequestSingle idRequest={idRequest} permissions={props.investigations.currentInvestigation.permissions}
                        uuidInvestigation={props.investigations.currentInvestigation.uuid} researcher={props.researcher}
                        country={props.investigations.currentInvestigation.country} requestSentCallBack={(typeRequest) => goToHomeTest(typeRequest)}
                        surveys={props.investigations.currentInvestigation.surveys}/>
                )
            }
            else{
                return <RequestTable serviceType={props.type} showActions={true} fillRequest={true} callBackRequestSelected={(request) => accessRequest(request)}
                            encryptionData={{
                                encryptedKeyUsed : props.investigations.currentInvestigation.encryptedKeyUsed,
                                keyResearcherInvestigation: props.investigations.currentInvestigation.keyResearcherInvestigation,
                                permissions: props.investigations.currentInvestigation.permissions,
                                personalFields: props.investigations.currentInvestigation.personalFields 
                            }}
                            surveys={props.investigations.currentInvestigation.surveys}
                            uuidInvestigation={props.investigations.currentInvestigation.uuid}  />
    
            }
        }
        else{
            return <ServiceRecords submissions={props.submissions} patients={props.patients} 
                        investigations={props.investigations} type={props.type === ServiceType.IMAGING ? TYPE_IMAGE_SURVEY : TYPE_LAB_SURVEY} />
        }
        
    }
    
    if(!props.investigations.currentInvestigation){
        return <Loader />
    }
    return (
        <React.Fragment>
            <Grid container spacing={3} >
                <SectionHeader section={serviceTypeToTranslation(props.type)} edit={edit} editCallback={showRequests ? toogleEditLab : null} />
                <Grid item xs={12}>
                    {
                        renderCore()
                    }     
                </Grid>         
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {
        investigations:state.investigations,
        submissions:state.submissions,
        patients:state.patients,
        profile:state.profile,
    }
}

TestsHome.propTypes = {
    personalFields:PropTypes.array,
}

export default connect(mapStateToProps, null)(TestsHome)