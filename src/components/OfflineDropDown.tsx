import { connect, ConnectedProps, useDispatch } from 'react-redux'

import React, { useEffect } from 'react';
import { useOffline } from '../hooks';
import NotificationsDropdown from './NotificationsDropdown';
import { Translate } from 'react-localize-redux';
import { resendOfflineRecords } from '../redux/actions/submissionsPatientActions';

interface Props{
    offline:{
        loading:string,
        pendingActions:{action:string}[]
    },
    patientsSubmissions:any,
    investigations:any,
    sendOfflineRecords:(patientRecords:any) => void
}

function OfflineDropDown(props: Props) {
    const offline = useOffline();
    const dispatch = useDispatch();
    useEffect(() =>{
        function unload(){
            
            if(!navigator.onLine){
                return true;
            }
            else{
                return null;
            }
        }
        window.onbeforeunload = unload;
        
        //return () => window.removeEventListener("beforeunload", unload);
    }, []);
    console.log("Cambio Offline", offline);
    return <NotificationsDropdown resendCallback={async () => await dispatch(resendOfflineRecords(props.patientsSubmissions, props.investigations.currentInvestigation.uuid))} 
                offline isOffline={offline} notifications={!props.offline.pendingActions ? [] : props.offline.pendingActions.map(action =>{
        return {
            title : <Translate id={`hospital.notification.offline.${action.action}`} />
        }
    })} />
}

const mapStateToProps = (state:any) =>{
    return {
        offline: state.offline,
        patientsSubmissions : state.patientsSubmissions,
        investigations: state.investigations
    }
}

export default connect(mapStateToProps, null )(OfflineDropDown)

