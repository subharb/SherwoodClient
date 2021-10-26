import { connect, ConnectedProps } from 'react-redux'

import React, { useEffect, useState } from 'react';
import { useOffline } from '../hooks';
import { formatData, openStore } from '../utils';
import NotificationsDropdown from './NotificationsDropdown';
import { Translate } from 'react-localize-redux';
import { IconButton, Tooltip, Typography } from '@material-ui/core';

interface Props{
    data:{
        totalData:string,
        date:Date
    }
}

export default function DataSensor(props: Props) {
    const [data, setData] = useState<string | null>("");

    useEffect(() =>{
        const interval = setInterval(function(){
            setData(formatData(localStorage.getItem("data_download")));
       }, 2000);
       return () => clearInterval(interval);
    }, []);
    return (
        <React.Fragment>
            <Tooltip title="Datos consumidos día de hoy">
                <IconButton color="inherit" >
                    <Typography variant="body2">
                        {data}
                    </Typography> 
                </IconButton>
            </Tooltip>
        </React.Fragment>)
}




