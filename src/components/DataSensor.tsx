import { connect, ConnectedProps } from 'react-redux'

import React, { useEffect } from 'react';
import { useOffline } from '../hooks';
import { openStore } from '../utils';
import NotificationsDropdown from './NotificationsDropdown';
import { Translate } from 'react-localize-redux';

interface Props{
    data:{
        totalData:string,
        date:Date
    }
}

function DataSensor(props: Props) {

    return <div>{props.data.totalData}</div>
}

const mapStateToProps = (state:any) =>{
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, null)(DataSensor)

