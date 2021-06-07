import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import { ButtonAccept } from '../mini_components';

interface Props{
    callbackOffline : (text:string) => void,
    error : boolean,
    variant:"standard" | "filled" | "outlined" | undefined
}
export const OfflineField:React.FC<Props> = (props) => {
    const [text, setText] = useState("");
    const [saved, setSaved] = useState(false);

    function saveField(){
        props.callbackOffline(text);
        setSaved(true);
    }
    return( 
        <React.Fragment>
            <TextField error={props.error} size="small" value={text} variant={props.variant} onChange={ (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setText(e.target.value)} />
            {
                !saved && 
                <ButtonAccept onClick={saveField}><Translate id="general.add" /></ButtonAccept>
            }
            
        </React.Fragment>
    );
}