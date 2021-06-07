import React, { useEffect } from 'react';
import { openStore } from '../utils';
import NotificationsDropdown from './NotificationsDropdown';

interface Props{

}

export default function OfflineDropDown(props: Props) {
    const [offline, setOffline] = React.useState(false);
    const [notifications, setNotifications] = React.useState([]);

    function updateOffline(){
        if(offline !== !navigator.onLine){
            setOffline(!navigator.onLine);
        }
    }
    useEffect(() => {
        async function subscribeToDB(){
            const db = await openStore("workbox-background-sync");
            var tx = db.transaction("requests", "readwrite");

            tx.objectStore("requests").openCursor(0).onsuccess = function (event:any) {
                var cursor, object;

                cursor = event.target.result;
                object = cursor.value;
                object.value = 43;
                cursor.update(object).onsuccess = function (event:any) {
                    db.transaction("requests").objectStore("requests").get(0).onsuccess = function (event:any) {
                        console.log("Cursor update onsuccess event:");
                        console.log(event.target.result);
                    };
                };

            };
        }
        window.addEventListener('online',  updateOffline);
        window.addEventListener('offline', updateOffline);
        subscribeToDB();
        
    }, [offline]);
    return <NotificationsDropdown offline isOffline={offline} notifications={[]} />
}

