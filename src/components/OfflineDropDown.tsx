import React, { useEffect } from 'react';
import { useOffline } from '../hooks';
import { openStore } from '../utils';
import NotificationsDropdown from './NotificationsDropdown';

interface Props{

}

export default function OfflineDropDown(props: Props) {
    const offline = useOffline();
    const [notifications, setNotifications] = React.useState([]);

    console.log("Cambio Offline", offline);
    return <NotificationsDropdown offline isOffline={offline} notifications={[]} />
}

