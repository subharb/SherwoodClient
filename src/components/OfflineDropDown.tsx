import { connect, ConnectedProps } from 'react-redux'

import React, { useEffect } from 'react';
import { useOffline } from '../hooks';
import { openStore } from '../utils';
import NotificationsDropdown from './NotificationsDropdown';

interface Props{
    offline:{
        loading:string,
        pendingActions:{action:string}[]
    }
}

function OfflineDropDown(props: Props) {
    const offline = useOffline();
    const [notifications, setNotifications] = React.useState([]);

    console.log("Cambio Offline", offline);
    return <NotificationsDropdown offline isOffline={offline} notifications={!props.offline.pendingActions ? [] : props.offline.pendingActions.map(action => {
        if(action.action === "add_patient"){
            return {
                title: "Add Patient",
                description: "Patient wasn't sincronized"
            }
        }
        else{
            return {

            }
        }
    })} />
}

const mapStateToProps = (state:any) =>{
    return {
        offline: state.offline
    }
}

export default connect(mapStateToProps, null)(OfflineDropDown)

