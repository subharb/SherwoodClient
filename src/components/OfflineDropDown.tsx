import { connect, ConnectedProps } from 'react-redux'

import React, { useEffect } from 'react';
import { useOffline } from '../hooks';
import { openStore } from '../utils';
import NotificationsDropdown from './NotificationsDropdown';
import { Translate } from 'react-localize-redux';

interface Props{
    offline:{
        loading:string,
        pendingActions:{action:string}[]
    }
}

function OfflineDropDown(props: Props) {
    const offline = useOffline();
    const [notifications, setNotifications] = React.useState([]);
    
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
    return <NotificationsDropdown offline isOffline={offline} notifications={!props.offline.pendingActions ? [] : props.offline.pendingActions.map(action =>{
        return {
            title : <Translate id={`hospital.notification.offline.${action.action}`} />
        }
    })} />
}

const mapStateToProps = (state:any) =>{
    return {
        offline: state.offline
    }
}

export default connect(mapStateToProps, null)(OfflineDropDown)

